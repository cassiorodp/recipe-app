import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// Children
import Done from '../pages/Done';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// History
// let mockHistory = {};

const PROFILE_ICON = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const ALL_BTN = 'filter-by-all-btn';
const FOOD_BTN = 'filter-by-food-btn';
const DRINK_BTN = 'filter-by-drink-btn';

describe('Testa as funcionalidades da Favorites.jsx', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<Done />);
    mockHistory = history;
  });
  it('Testa se renderiza o componente Header sem o searchButton.', () => {
    const profileImage = screen.getByTestId(PROFILE_ICON);
    const pageTitle = screen.getByTestId(PAGE_TITLE);

    expect(profileImage).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toContainHTML('Receitas Favoritas');
  });
  it('Testa se renderiza os três botões de filtragem.', () => {
    const allButton = screen.getByTestId(ALL_BTN);
    const foodButton = screen.getByTestId(FOOD_BTN);
    const drinkButton = screen.getByTestId(DRINK_BTN);

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });
  it('Testa se, ao filtrar por foods ou drinks, os resultados são filtrados', () => {
    // const foodButton = screen.getByTestId(FOOD_BTN);
    // const drinkButton = screen.getByTestId(DRINK_BTN);
  });
});
