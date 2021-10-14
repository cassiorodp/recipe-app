// React
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Children
import App from '../App';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Variables
const EMAIL_EXAMPLE = 'exemplo@email.com';
const PW_EXAMPLE = '1234567';
const EMAIL_INPUT = 'email-input';
const PW_INPUT = 'password-input';
const SUBMIT_BTN = 'login-submit-btn';

// History
let mockHistory = {};

describe('Testa a página de login', () => {
  beforeEach(() => {
    const { history } = renderWithReduxAndRouter(<App />);
    mockHistory = history;
  });

  it('2 - Testa se os componentes aparecem na tela', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PW_INPUT);
    const submitBtn = screen.getByTestId(SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it('3 - Testa se é possível escrever no input de email', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);

    userEvent.type(emailInput, EMAIL_EXAMPLE);
    expect(emailInput.value).toBe(EMAIL_EXAMPLE);
  });

  it('4 - Testa se é possível escrever no input de password', () => {
    const passwordInput = screen.getByTestId(PW_INPUT);

    userEvent.type(passwordInput, PW_EXAMPLE);
    expect(passwordInput.value).toBe(PW_EXAMPLE);
  });

  it('5 - Testa se o botão só é habilitado quando o email e senha são validos', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PW_INPUT);
    const submitBtn = screen.getByTestId(SUBMIT_BTN);

    expect(submitBtn).toHaveAttribute('disabled');

    userEvent.type(emailInput, EMAIL_EXAMPLE);
    userEvent.type(passwordInput, PW_EXAMPLE);

    expect(submitBtn).not.toHaveAttribute('disabled');
  });

  it('6 - Testa se foi salvo 2 tokens no localStorage após a submissão', () => {});

  it('7 - Testa se o e-mail foi salvo no localStorage após a submissão', () => {});

  it('8 - Redireciona a pessoa usuária para a tela principal após a submissão', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PW_INPUT);
    const submitBtn = screen.getByTestId(SUBMIT_BTN);

    userEvent.type(emailInput, EMAIL_EXAMPLE);
    userEvent.type(passwordInput, PW_EXAMPLE);
    userEvent.click(submitBtn);

    const path = mockHistory.location.pathname;
    expect(path).toBe('/comidas');
  });
});
