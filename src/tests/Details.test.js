// React
import React from 'react';
import { screen } from '@testing-library/react';

// Children
import userEvent from '@testing-library/user-event';
import App from '../App';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Variables;
const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const SHARE_BTN = 'share-btn';
const FAVORITE_BTN = 'favorite-btn';
const RECIPE_CATEGORY = 'recipe-category';
const INSTRUCTIONS = 'instructions';
const START_RECIPE_BTN = 'start-recipe-btn';
const VIDEO_FRAME = 'video';

// Mock copy library
jest.mock('clipboard-copy');

// History mock
let historyMock;

describe('Testa a página de detalhes', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<App />,
      { initialState: {}, initialEntries: ['/comidas/52977'] });
    historyMock = history;
  });

  it('Contem os elementos da tela', async () => {
    const img = await screen.findByTestId(RECIPE_PHOTO);
    const tittle = await screen.findByTestId(RECIPE_TITLE);
    const shareBtn = await screen.findByTestId(SHARE_BTN);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY);
    const instructions = await screen.findByTestId(INSTRUCTIONS);
    const startBtn = await screen.findByTestId(START_RECIPE_BTN);
    const video = await screen.findByTestId(VIDEO_FRAME);

    expect(img).toBeInTheDocument();
    expect(tittle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
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

  it('renderização condicional do botão iniciar receita', async () => {
    const recipes = {
      cocktails: {},
      meals: { 52977: ['Cumin - 2 tsp', 'Tomato Puree - 1 tbs'] },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));

    const startBtn = await screen.findByTestId(START_RECIPE_BTN);

    expect(startBtn.innerHTML).toBe('Continuar Receita');
  });

  it('testa redirecionamento do botão iniciar receita', async () => {
    const startBtn = await screen.findByTestId(START_RECIPE_BTN);

    userEvent.click(startBtn);

    expect(historyMock.location.pathname).toBe('/comidas/52977/in-progress');
  });
});
