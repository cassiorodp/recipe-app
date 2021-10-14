// React
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';
import Footer from '../components/Footer';

// History
let mockHistory = {};

const DRINK_BTN = 'drinks-bottom-btn';
const EXPLORE_BTN = 'explore-bottom-btn';
const FOOD_BTN = 'food-bottom-btn';
const FOOTER_BAR = 'footer';
const DRINK_BTN_ICON = 'Drink icon button';
const EXPLORE_BTN_ICON = 'Explore icon button';
const FOOD_BTN_ICON = 'Food icon button';
describe('1. Testar o componente footer', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<Footer />);
    mockHistory = history;
  });
  it('1-1. Testar se os botões do footer estão sendo renderizados', () => {
    const footerBar = screen.getByTestId(FOOTER_BAR);
    const drinkBtn = screen.getByTestId(DRINK_BTN);
    const exploreBtn = screen.getByTestId(EXPLORE_BTN);
    const foodBtn = screen.getByTestId(FOOD_BTN);

    expect(footerBar).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
  });
  it('1-2. Testar se os botões possuem um ícone associado', () => {
    const drinkBtn = screen.getByTestId(DRINK_BTN);
    const exploreBtn = screen.getByTestId(EXPLORE_BTN);
    const foodBtn = screen.getByTestId(FOOD_BTN);

    expect(drinkBtn).toContainHTML(DRINK_BTN_ICON);
    expect(exploreBtn).toContainHTML(EXPLORE_BTN_ICON);
    expect(foodBtn).toContainHTML(FOOD_BTN_ICON);
  });
  it('1-3. Testar se o componente footer é renderizado na página Recipes', () => {
    mockHistory.push('/comidas');
    const footerBar = screen.getByTestId(FOOTER_BAR);
    expect(footerBar).toBeInTheDocument();
  });
  it('1-4. Testar se o botão de drink redireciona para a página de drinks', () => {
    mockHistory.push('/comidas');

    const drinkBtn = screen.getByTestId(DRINK_BTN);

    userEvent.click(drinkBtn);

    const afterClickPage = mockHistory.location.pathname;
    expect(afterClickPage).toBe('/bebidas');
  });
  it('1-5. Testar se o botão de explore redireciona para a tela de explorar item', () => {
    mockHistory.push('/comidas');

    const exploreBtn = screen.getByTestId(EXPLORE_BTN);

    userEvent.click(exploreBtn);

    const afterClickPage = mockHistory.location.pathname;
    expect(afterClickPage).toBe('/explorar');
  });
  it('1-6. Testar se o botão de comida redireciona para a página Recipes', () => {
    mockHistory.push('/explorar');

    const foodBtn = screen.getByTestId(FOOD_BTN);

    userEvent.click(foodBtn);

    const afterClickPage = mockHistory.location.pathname;
    expect(afterClickPage).toBe('/comidas');
  });
});
