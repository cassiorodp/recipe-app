import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Children
import Explore from '../pages/Explore';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Mocks
let mockHistory = {};

// Test Variables
const EXPLORE_FOOD_BTN = 'explore-food';
const EXPLORE_DRINKS_BTN = 'explore-drinks';
const EXPLORE_BY_AREA_BTN = 'explore-by-area';
const EXPLORE_BY_INGR_BTN = 'explore-by-ingredient';
const EXPLORE_SURPRISE_BTN = 'explore-surprise';

/* ====================== EXPLORAR ====================== */
describe('testa tela principal de explorar', () => {
  it('1. testa se é possível encontrar os elementos através dos test ids', () => {
    renderWithReduxAndRouter(<Explore />);

    const exploreFoodBtn = screen.getByTestId(EXPLORE_FOOD_BTN);
    const exploreDrinksBtn = screen.getByTestId(EXPLORE_DRINKS_BTN);

    expect(exploreFoodBtn).toBeInTheDocument();
    expect(exploreDrinksBtn).toBeInTheDocument();
  });

  it('2. testa se os botões possuem os nomes corretos', () => {
    renderWithReduxAndRouter(<Explore />);

    const exploreFoodBtn = screen.getByTestId(EXPLORE_FOOD_BTN);
    const exploreDrinksBtn = screen.getByTestId(EXPLORE_DRINKS_BTN);

    expect(exploreFoodBtn).toHaveTextContent('Explorar Comidas');
    expect(exploreDrinksBtn).toHaveTextContent('Explorar Bebidas');
  });

  it('3.1. testa se os botões redirecionam para as rotas corretas', () => {
    const { history } = renderWithReduxAndRouter(<Explore />);
    mockHistory = history;

    const exploreFoodBtn = screen.getByTestId(EXPLORE_FOOD_BTN);

    userEvent.click(exploreFoodBtn);

    expect(mockHistory.location.pathname).toEqual('/explorar/comidas');
  });

  it('3.2. testa se os botões redirecionam para as rotas corretas', () => {
    const { history } = renderWithReduxAndRouter(<Explore />);
    mockHistory = history;

    const exploreDrinksBtn = screen.getByTestId(EXPLORE_DRINKS_BTN);

    userEvent.click(exploreDrinksBtn);

    expect(mockHistory.location.pathname).toEqual('/explorar/bebidas');
  });
});

/* ============= EXPLORAR COMIDAS OU BEBIDAS ============= */
describe('testa tela de explorar comidas ou bebidas', () => {
  it('1.1. testa se é possível encontrar os elementos através dos test ids', () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" />);

    const exploreByAreaBtn = screen.getByTestId(EXPLORE_BY_AREA_BTN);
    const exploreByIngrBtn = screen.getByTestId(EXPLORE_BY_INGR_BTN);
    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE_BTN);

    expect(exploreByAreaBtn).toBeInTheDocument();
    expect(exploreByIngrBtn).toBeInTheDocument();
    expect(exploreSurpriseBtn).toBeInTheDocument();
  });

  it('1.2. testa se é possível encontrar os elementos através dos test ids', () => {
    renderWithReduxAndRouter(<Explore foodDrink="drinks" />);

    const exploreByIngrBtn = screen.getByTestId(EXPLORE_BY_INGR_BTN);
    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE_BTN);

    expect(exploreByIngrBtn).toBeInTheDocument();
    expect(exploreSurpriseBtn).toBeInTheDocument();
  });

  it('2.1. testa se os botões possuem os nomes corretos', () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" />);

    const exploreByAreaBtn = screen.getByTestId(EXPLORE_BY_AREA_BTN);
    const exploreByIngrBtn = screen.getByTestId(EXPLORE_BY_INGR_BTN);
    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE_BTN);

    expect(exploreByAreaBtn).toHaveTextContent('Por Local de Origem');
    expect(exploreByIngrBtn).toHaveTextContent('Por Ingredientes');
    expect(exploreSurpriseBtn).toHaveTextContent('Me Surpreenda!');
  });

  it('2.2. testa se os botões possuem os nomes corretos', () => {
    renderWithReduxAndRouter(<Explore foodDrink="drinks" />);

    const exploreByIngrBtn = screen.getByTestId(EXPLORE_BY_INGR_BTN);
    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE_BTN);

    expect(exploreByIngrBtn).toHaveTextContent('Por Ingredientes');
    expect(exploreSurpriseBtn).toHaveTextContent('Me Surpreenda!');
  });

  it('3. testa o botão de explorar por origem', () => {
    const { history } = renderWithReduxAndRouter(<Explore foodDrink="meals" />);
    mockHistory = history;

    const exploreByAreaBtn = screen.getByTestId(EXPLORE_BY_AREA_BTN);

    userEvent.click(exploreByAreaBtn);

    expect(mockHistory.location.pathname).toEqual('/explorar/comidas/area');
  });

  it('4.1. testa o botão de explorar por ingredientes', () => {
    const { history } = renderWithReduxAndRouter(<Explore foodDrink="meals" />);
    mockHistory = history;

    const exploreByIngrBtn = screen.getByTestId(EXPLORE_BY_INGR_BTN);

    userEvent.click(exploreByIngrBtn);

    expect(mockHistory.location.pathname).toEqual('/explorar/comidas/ingredientes');
  });

  it('4.2. testa o botão de explorar por ingredientes', () => {
    const { history } = renderWithReduxAndRouter(<Explore foodDrink="drinks" />);
    mockHistory = history;

    const exploreByIngrBtn = screen.getByTestId(EXPLORE_BY_INGR_BTN);

    userEvent.click(exploreByIngrBtn);

    expect(mockHistory.location.pathname).toEqual('/explorar/bebidas/ingredientes');
  });
});
