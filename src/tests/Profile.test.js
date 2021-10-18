import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';
import App from '../App';
import { Profile } from '../pages';

const PROFILE_EMAIL = 'profile-email';
const DONE_BTN = 'profile-done-btn';
const FAVORITE_BTN = 'profile-favorite-btn';
const LOGOUT_BTN = 'profile-logout-btn';

let mockHistory = {};

describe('1. Testar o componente profile', () => {
  beforeEach(() => {
    const email = JSON.stringify({ email: 'email@example.com' });
    const recipe = { alcoholicOrNot: '',
      area: 'Turkish',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      type: 'comida' };
    const recipes = JSON.stringify([recipe]);
    const { history } = renderWithReduxAndRouter(<App />,
      { items: { user: email, favoriteRecipes: recipes }, initialEntries: ['/perfil'] });
    mockHistory = history;
    jest.clearAllMocks();
  });
  it('1-1. Testar se os elementos do profile estão sendo renderizados', () => {
    const profileEmail = screen.getByTestId(PROFILE_EMAIL);
    const doneBtn = screen.getByTestId(DONE_BTN);
    const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
    const logoutBtn = screen.getByTestId(LOGOUT_BTN);

    expect(profileEmail).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  it('1-2. Testar a funcionalidade do botão logout', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;

    const logoutBtn = screen.getByTestId(LOGOUT_BTN);
    userEvent.click(logoutBtn);

    expect(mockHistory.location.pathname).toBe('/');
    expect(localStorage.clear).toHaveBeenCalled();
  });
  it('1-3. Testar a funcionalidade do botão receitas favoritas', () => {
    const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
    userEvent.click(favoriteBtn);

    expect(mockHistory.location.pathname).toBe('/receitas-favoritas');
  });
  it('1-4. Testar a funcionalidade do botão receitas feitas', () => {
    const doneBtn = screen.getByTestId(DONE_BTN);
    userEvent.click(doneBtn);

    expect(mockHistory.location.pathname).toBe('/receitas-feitas');
  });
});
describe('Testa funcionalidades do Profile', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<Profile />);
    mockHistory = history;
  });
  it('1-3 Testa se, ao clicar em Receitas feitas, redireciona à lista.', () => {
    const doneBtn = screen.getByTestId(DONE_BTN);

    act(() => { userEvent.click(doneBtn); });

    expect(mockHistory.location.pathname).toBe('/receitas-feitas');
  });
  it('1-4 Testa se, ao clicar em Receitas Favoritas, redireciona à lista', () => {
    const favoriteButton = screen.getByRole('button', { name: /receitas favoritas/i });

    act(() => { userEvent.click(favoriteButton); });

    expect(mockHistory.location.pathname).toBe('/receitas-favoritas');
  });
});
