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
const INGREDIENT_CARD = '0-ingredient-card';
const FIRST_ING_CARD = '0-ingredient-card';
const LAST_ING_CARD = '11-ingredient-card';
const FIRST_ING_IMG = '0-card-img';
const LAST_ING_IMG = '11-card-img';
const FIRST_ING_NAME = '0-card-name';
const LAST_ING_NAME = '11-card-name';
const AREA_DROPDOWN = 'explore-by-area-dropdown';

/* ================ EXPLORAR INGREDIENTES ================ */
describe('testa a tela de explorar por ingredientes', () => {
  it('1.1. testa se é possível encontrar os cards através dos test ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" explore="ingredients" />);

    const firstIngCard = await screen.findByTestId(FIRST_ING_CARD);
    const lastIngCard = await screen.findByTestId(LAST_ING_CARD);

    expect(firstIngCard).toBeInTheDocument();
    expect(lastIngCard).toBeInTheDocument();
  });

  it('1.2. testa se é possível encontrar os cards através dos test ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="drinks" explore="ingredients" />);

    const firstIngCard = await screen.findByTestId(FIRST_ING_CARD);
    const lastIngCard = await screen.findByTestId(LAST_ING_CARD);

    expect(firstIngCard).toBeInTheDocument();
    expect(lastIngCard).toBeInTheDocument();
  });

  it('2.1. testa se é possível encontrar as imagens através dos test ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" explore="ingredients" />);

    const firstIngImage = await screen.findByTestId(FIRST_ING_IMG);
    const lastIngImage = await screen.findByTestId(LAST_ING_IMG);

    expect(firstIngImage).toBeInTheDocument();
    expect(lastIngImage).toBeInTheDocument();
  });

  it('2.2. testa se é possível encontrar as imagens através dos test ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="drinks" explore="ingredients" />);

    const firstIngImage = await screen.findByTestId(FIRST_ING_IMG);
    const lastIngImage = await screen.findByTestId(LAST_ING_IMG);

    expect(firstIngImage).toBeInTheDocument();
    expect(lastIngImage).toBeInTheDocument();
  });

  it('3.1. testa se é possível encontrar os nomes através dos test ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" explore="ingredients" />);

    const firstIngName = await screen.findByTestId(FIRST_ING_NAME);
    const lastIngName = await screen.findByTestId(LAST_ING_NAME);

    expect(firstIngName).toBeInTheDocument();
    expect(lastIngName).toBeInTheDocument();
  });

  it('3.2. testa se é possível encontrar os nomes através dos test ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="drinks" explore="ingredients" />);

    const firstIngName = await screen.findByTestId(FIRST_ING_NAME);
    const lastIngName = await screen.findByTestId(LAST_ING_NAME);

    expect(firstIngName).toBeInTheDocument();
    expect(lastIngName).toBeInTheDocument();
  });

  it('4.1. testa se o usuário é redirecionado ao clicar no ingrediente', async () => {
    const { history } = renderWithReduxAndRouter(
      <Explore foodDrink="meals" explore="ingredients" />,
    );
    mockHistory = history;

    const ingredientCard = await screen.findByTestId(INGREDIENT_CARD);

    userEvent.click(ingredientCard);

    expect(mockHistory.location.pathname).toEqual('/comidas');
  });

  it('4.2. testa se o usuário é redirecionado ao clicar no ingrediente', async () => {
    const { history } = renderWithReduxAndRouter(
      <Explore foodDrink="drinks" explore="ingredients" />,
    );
    mockHistory = history;

    const ingredientCard = await screen.findByTestId(INGREDIENT_CARD);

    userEvent.click(ingredientCard);

    expect(mockHistory.location.pathname).toEqual('/bebidas');
  });
});

/* =================== EXPLORAR ORIGEM =================== */
describe('testa a tela de explorar por origem', () => {
  it('testa se é possível encontrar o select através do test id', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" explore="area" />);

    const areaDropdown = await screen.findByTestId(AREA_DROPDOWN);
    expect(areaDropdown).toBeInTheDocument();
  });

  it('testa se é possível encontrar as options através dos tests ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" explore="area" />);

    expect(await screen.findByText(/all/i)).toBeInTheDocument();
    expect(await screen.findByText(/american/i)).toBeInTheDocument();
    expect(await screen.findByText(/british/i)).toBeInTheDocument();
    expect(await screen.findByText(/canadian/i)).toBeInTheDocument();
    expect(await screen.findByText(/chinese/i)).toBeInTheDocument();
    expect(await screen.findByText(/croatian/i)).toBeInTheDocument();
    expect(await screen.findByText(/dutch/i)).toBeInTheDocument();
    expect(await screen.findByText(/egyptian/i)).toBeInTheDocument();
    expect(await screen.findByText(/french/i)).toBeInTheDocument();
    expect(await screen.findByText(/greek/i)).toBeInTheDocument();
    expect(await screen.findByText(/indian/i)).toBeInTheDocument();
    expect(await screen.findByText(/irish/i)).toBeInTheDocument();
    expect(await screen.findByText(/italian/i)).toBeInTheDocument();
    expect(await screen.findByText(/jamaican/i)).toBeInTheDocument();
    expect(await screen.findByText(/japanese/i)).toBeInTheDocument();
    expect(await screen.findByText(/kenyan/i)).toBeInTheDocument();
    expect(await screen.findByText(/malaysian/i)).toBeInTheDocument();
    expect(await screen.findByText(/mexican/i)).toBeInTheDocument();
    expect(await screen.findByText(/moroccan/i)).toBeInTheDocument();
    expect(await screen.findByText(/polish/i)).toBeInTheDocument();
    expect(await screen.findByText(/portuguese/i)).toBeInTheDocument();
    expect(await screen.findByText(/russian/i)).toBeInTheDocument();
    expect(await screen.findByText(/spanish/i)).toBeInTheDocument();
    expect(await screen.findByText(/thai/i)).toBeInTheDocument();
    expect(await screen.findByText(/tunisian/i)).toBeInTheDocument();
    expect(await screen.findByText(/turkish/i)).toBeInTheDocument();
    expect(await screen.findByText(/unknown/i)).toBeInTheDocument();
    expect(await screen.findByText(/vietnamese/i)).toBeInTheDocument();
  });

  it('testa se é possível encontrar as receitas através dos test ids', async () => {
    renderWithReduxAndRouter(<Explore foodDrink="meals" explore="area" />);

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
    expect(await screen.findByText(/burek/i)).toBeInTheDocument();
    expect(await screen.findByText(/kumpir/i)).toBeInTheDocument();
    expect(await screen.findByText(/tamiya/i)).toBeInTheDocument();
    expect(await screen.findByText(/dal fry/i)).toBeInTheDocument();
    expect(await screen.findByText(/poutine/i)).toBeInTheDocument();
    expect(await screen.findByText(/lasagne/i)).toBeInTheDocument();
    expect(await screen.findByText(/timbits/i)).toBeInTheDocument();
    expect(await screen.findByText(/wontons/i)).toBeInTheDocument();
    expect(await screen.findByText(/kafteji/i)).toBeInTheDocument();
    expect(await screen.findByText(/big mac/i)).toBeInTheDocument();
    expect(await screen.findByText(/koshari/i)).toBeInTheDocument();
  });
});
