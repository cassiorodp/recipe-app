// React
import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Children
import Header from '../components/Header';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// History
let mockHistory = {};

const PROFILE_ICON = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const SEARCH_BUTTON = 'search-top-btn';

describe('Testa o Header e suas funcionalidades', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<Header
      searchBtn
      title="Comidas"
    />);
    mockHistory = history;
  });
  it('1 - Testa se existe um componente Header', () => {
    const profileImage = screen.getByTestId(PROFILE_ICON);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(profileImage).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('2 - Testa se o componente Header é renderizado na FoodRecipes.', () => {
    mockHistory.push('/comidas');
    const profileImage = screen.getByTestId(PROFILE_ICON);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(profileImage).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('3 - Testa se, ao clicar no ícone de perfil, redireciona a página', () => {
    mockHistory.push('/comidas');

    const profileImage = screen.getByTestId(PROFILE_ICON);
    userEvent.click(profileImage);

    const actualPage = mockHistory.location.pathname;
    expect(actualPage).toBe('/perfil');
  });
  it('4 - Testa se, ao clicar no ícone de Search, abre o form de busca.', () => {
    mockHistory.push('/comidas');

    const searchButton = screen.getByRole('img', { name: /search button icon/i });

    act(() => { userEvent.click(searchButton); });
    const searchBar = screen.getByPlaceholderText(/buscar receita/i);

    expect(searchBar).toBeInTheDocument();
  });
});
