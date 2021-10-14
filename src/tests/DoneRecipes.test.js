import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// Children
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import Done from '../pages/Done';
// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Mocks
import { doneMock, drinksQuantity, foodQuantity } from '../mocks/DoneMock';
import * as lsModules from '../helpers/localStorageHelper';

// Mock copy library
jest.mock('clipboard-copy');

// History
let mockHistory = {};

// CONSTS
const PROFILE_ICON = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const ALL_BTN = 'filter-by-all-btn';
const FOOD_BTN = 'filter-by-food-btn';
const DRINK_BTN = 'filter-by-drink-btn';
const FOOD_NAME = 'comida';
const DRINK_NAME = 'bebida';
const FIRST_RECIPE = doneMock[0];
const FIRST_RECIPE_DATA_TESTID_NAME = '0-horizontal-name';
const FIRST_RECIPE_DATA_TESTID_IMG = '0-horizontal-image';
const DONE_RECIPES_LOCAL_STORAGE_MOCK = {
  items: { doneRecipes: JSON.stringify(doneMock) },
};
const DONE_RECIPES_EMPTY_LOCAL_STORAGE = {
  items: { doneRecipes: JSON.stringify([]) },
};
const SHARE_BTN = '0-horizontal-share-btn';
const EMPTY_DONE_RECIPES = /Adicione novas Receitas!/i;
const COPY_LINK = /Link copiado!/i;

describe('Testa as funcionalidades da Done.jsx', () => {
  beforeEach(() => {
    renderWithReduxAndRouter(<Done />, DONE_RECIPES_LOCAL_STORAGE_MOCK);
    // mockHistory = history;
  });
  it('Testa se renderiza o componente Header sem o searchButton.', () => {
    const profileImage = screen.getByTestId(PROFILE_ICON);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(profileImage).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toContainHTML('Receitas Feitas');
  });
  it('Testa se renderiza os três botões de filtragem.', () => {
    const allButton = screen.getByTestId(ALL_BTN);
    const foodButton = screen.getByTestId(FOOD_BTN);
    const drinkButton = screen.getByTestId(DRINK_BTN);

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });
  it('Testa se as receitas prontas são renderizadas à tela.', () => {
    // https://trybecourse.slack.com/archives/C0219LZPB9N/p1633048749043600
    const comidas = screen.getAllByTestId(FOOD_NAME);
    const bebidas = screen.getAllByTestId(DRINK_NAME);

    const totalItens = bebidas.length + comidas.length;

    expect(totalItens).toBe(foodQuantity + drinksQuantity);
  });
  it('Testa se, ao clicar no botão Food, filtra a lista por comidas', () => {
    const foodButton = screen.getByTestId(FOOD_BTN);

    userEvent.click(foodButton);

    const comidas = screen.queryAllByTestId(FOOD_NAME);
    const bebidas = screen.queryAllByTestId(DRINK_NAME);
    const totalBebidas = bebidas.length;
    const totalComidas = comidas.length;

    expect(totalBebidas).toBe(0);
    expect(totalComidas).toBe(foodQuantity);
  });
  it('Testa se, ao clicar no botão Drinks, filtra a lista por bebidas', () => {
    const drinkButton = screen.getByTestId(DRINK_BTN);

    userEvent.click(drinkButton);

    const comidas = screen.queryAllByTestId(FOOD_NAME);
    const bebidas = screen.queryAllByTestId(DRINK_NAME);
    const totalBebidas = bebidas.length;
    const totalComidas = comidas.length;

    expect(totalBebidas).toBe(drinksQuantity);
    expect(totalComidas).toBe(0);
  });
  it('Testa se, ao clicar no botão All, são exibidas todas as comidas e bebidas', () => {
    const allButton = screen.getByTestId(ALL_BTN);

    userEvent.click(allButton);

    const comidas = screen.queryAllByTestId(FOOD_NAME);
    const bebidas = screen.queryAllByTestId(DRINK_NAME);
    const totalBebidas = bebidas.length;
    const totalComidas = comidas.length;
    expect(totalBebidas).toBe(drinksQuantity);
    expect(totalComidas).toBe(foodQuantity);
  });

  it('Testa se ao clicar no botão de compartilhar é exibida uma mensagem'
  + ' com o texto "Link copiado!', async () => {
    const shareBtn = await screen.findByTestId(SHARE_BTN);

    userEvent.click(shareBtn);

    const shareMsg = await screen.findAllByText(COPY_LINK);

    expect(copy).toHaveBeenCalledWith(`http://localhost:3000/comidas/${FIRST_RECIPE.id}`);
    expect(shareMsg[0]).toBeInTheDocument();
  });
  it('Testa se renderiza uma tag <p> com o texto "Adicione novas Receitas!" '
  + 'se doneRecipes estiver vazio. ', () => {
    renderWithReduxAndRouter(<Done />, DONE_RECIPES_EMPTY_LOCAL_STORAGE);

    const doneRecipesEmptyMSG = screen.getByText(EMPTY_DONE_RECIPES);

    expect(doneRecipesEmptyMSG).toBeInTheDocument();
  });
});
describe('Testa as funcionalidades da Done.jsx para as rotas de redirecionamento', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<Done />,
      DONE_RECIPES_LOCAL_STORAGE_MOCK);

    mockHistory = history;
  });
  it('Testa se ao clicar na imagem da Receita redireciona para página de detalhe', () => {
    const recipeName = screen.getByTestId(FIRST_RECIPE_DATA_TESTID_NAME).innerHTML;
    const recipeIMG = screen.getByTestId(FIRST_RECIPE_DATA_TESTID_IMG);

    userEvent.click(recipeIMG);

    const actualPage = mockHistory.location.pathname;

    expect(recipeName).toBe(FIRST_RECIPE.name);
    expect(actualPage).toBe(`/comidas/${FIRST_RECIPE.id}`);

    const recipeNameInActualPage = screen.getByText(recipeName);
    expect(recipeNameInActualPage).toBeInTheDocument();
  });
  it('Testa se ao clicar no nome da Receita redireciona para página de detalhes', () => {
    const recipeName = screen.getByTestId(FIRST_RECIPE_DATA_TESTID_NAME);

    userEvent.click(recipeName);

    const actualPage = mockHistory.location.pathname;

    expect(recipeName.innerHTML).toBe(FIRST_RECIPE.name);
    expect(actualPage).toBe(`/comidas/${FIRST_RECIPE.id}`);

    const recipeNameInActualPage = screen.getByText(recipeName.innerHTML);
    expect(recipeNameInActualPage).toBeInTheDocument();
  });
});
test('Testa se save/loadLocalStorage atualiza as receitas do compoente.', () => {
  const spySaveLS = jest.spyOn(lsModules, 'saveLocalStorage');
  const spyLoadLS = jest.spyOn(lsModules, 'loadLocalStorage');
  const ONE = 1;
  const TWO = 2;
  renderWithReduxAndRouter(<Done />, DONE_RECIPES_LOCAL_STORAGE_MOCK);

  expect(spySaveLS).not.toHaveBeenCalled();
  expect(spyLoadLS).toHaveBeenCalledTimes(ONE);

  // testa se retorna [] quando não tem uma chave no local storage
  const emptyStore = lsModules.loadLocalStorage('checkEmptyKeyCoverage');
  expect(spyLoadLS).toHaveBeenCalledTimes(TWO);
  expect(emptyStore).toEqual([]);
});
