// React
import React from 'react';
import { screen } from '@testing-library/react';

// Children
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';
// Mock copy library
jest.mock('clipboard-copy');

// Variables;
const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const SHARE_BTN = 'share-btn';
const FAVORITE_BTN = 'favorite-btn';
const RECIPE_CATEGORY = 'recipe-category';
const CHECKBOX_ITEM = '0-ingredient-step';
const INSTRUCTIONS = 'instructions';
const FINISH_RECIPE_BTN = 'finish-recipe-btn';

// Mock copy library
jest.mock('clipboard-copy');

// History mock
let historyMock;

describe('Testa a página de progresso', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<App />,
      { initialState: {}, initialEntries: ['/comidas/52977/in-progress'] });
    historyMock = history;
  });

  it('Contem os elementos da tela', async () => {
    const img = await screen.findByTestId(RECIPE_PHOTO);
    const tittle = await screen.findByTestId(RECIPE_TITLE);
    const shareBtn = await screen.findByTestId(SHARE_BTN);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY);
    const checkboxItem = await screen.findByTestId(CHECKBOX_ITEM);
    const instructions = await screen.findByTestId(INSTRUCTIONS);
    const finishBtn = await screen.findByTestId(FINISH_RECIPE_BTN);

    expect(img).toBeInTheDocument();
    expect(tittle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(checkboxItem).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });

  it('testa checkbox', async () => {
    const checkboxItem = await screen.findByRole('checkbox', {
      name: /Lentils/i,
    });
    userEvent.click(checkboxItem);

    expect(checkboxItem.checked).toBeTruthy();
  });

  it('testa botão de favorito', async () => {
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    const fullHeart = 'http://localhost/blackHeartIcon.svg';
    const emptyHeart = 'http://localhost/whiteHeartIcon.svg';
    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toBeInTheDocument();
    expect(fullHeart).toEqual(favoriteBtn.src);

    userEvent.click(favoriteBtn);
    expect(emptyHeart).toEqual(favoriteBtn.src);
  });

  it('testa botão de compartilhar', async () => {
    const shareBtn = await screen.findByTestId(SHARE_BTN);

    userEvent.click(shareBtn);

    const shareMsg = await screen.findByText(/Link copiado!/i);

    expect(copy).toHaveBeenCalledWith('http://localhost:3000/comidas/52977');
    expect(shareMsg).toBeInTheDocument();
  });

  it('testa as checkboxs e o botao de finalizar receita', async () => {
    const checkboxes = await screen.findAllByTestId(/ingredient-step/i);

    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    const finishBtn = await screen.findByTestId(FINISH_RECIPE_BTN);
    expect(finishBtn.disabled).toBeFalsy();

    userEvent.click(finishBtn);

    expect(historyMock.location.pathname).toBe('/receitas-feitas');
  });

  it('testa funcionamento de atualizar data da receita', async () => {
    const recipe = [{ id: '52977', type: 'comida', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', doneDate: '02/10/2021', tags: ['Soup'] }];

    localStorage.setItem('doneRecipes', JSON.stringify(recipe));

    const checkboxes = await screen.findAllByTestId(/ingredient-step/i);

    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    const finishBtn = await screen.findByTestId(FINISH_RECIPE_BTN);
    userEvent.click(finishBtn);

    const date = JSON.parse(localStorage.getItem('doneRecipes'))[0].doneDate;
    expect(date).not.toBe(recipe[0].doneDate);
  });
});
