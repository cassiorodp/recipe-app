// React
import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// Children
import SearchBar from '../components/SearchBar';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Variables

const SEARCH_INPUT = 'search-input';
const INGREDIENT_BTN = 'ingredient-search-radio';
const NAME_BTN = 'name-search-radio';
const LETTER_BTN = 'first-letter-search-radio';
const SEARCH_BTN = 'exec-search-btn';

describe('Testa a barra de pesquisa', () => {
  it('testa se os elementos estão presentes na tela', () => {
    renderWithReduxAndRouter(<SearchBar />);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientBtn = screen.getByTestId(INGREDIENT_BTN);
    const nameBtn = screen.getByTestId(NAME_BTN);
    const letterBtn = screen.getByTestId(LETTER_BTN);
    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientBtn).toBeInTheDocument();
    expect(nameBtn).toBeInTheDocument();
    expect(letterBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});
