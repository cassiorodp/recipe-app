// React
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Styles
import {
  Wrapper,
  Logo,
  H1,
  LoginForm,
  Label,
  TextInput,
  Button,
} from '../styles/Styled';

// Images
import logo from '../images/logo.png';

function Login() {
  /* Retorna um booleano com o estado disabled do botão */
  const disableSubmit = (email, password) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^[a-zA-Z0-9]{7,}/;

    return !(regexEmail.test(email) && regexPassword.test(password));
  };

  const [email, setEmail] = useState(''); // Email
  const [password, setPassword] = useState(''); // Senha
  const [redirect, setRedirect] = useState(false); // Redirect

  const handleSubmit = () => {
    const userValue = { email };

    // Salva informações no localStorage
    localStorage.setItem('user', JSON.stringify(userValue));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    // Redireciona para a página de receitas de comidas
    setRedirect(true);
  };

  return (
    redirect ? (
      <Redirect to="/comidas" />
    ) : (
      <Wrapper>
        <Logo src={ logo } alt="logo" style={ { height: '11.5em' } } />
        <H1>Let&apos;s Cook</H1>
        <LoginForm>
          {/* Input Email */}
          <Label htmlFor="email-input">
            <span>Email:</span>
            <TextInput
              id="email-input"
              type="email"
              data-testid="email-input"
              onChange={ ({ target: { value } }) => setEmail(value) }
              placeholder="Email"
            />
          </Label>
          {/* Input Senha */}
          <Label htmlFor="password-input">
            <span>Senha:</span>
            <TextInput
              id="password-input"
              type="password"
              data-testid="password-input"
              onChange={ ({ target: { value } }) => setPassword(value) }
              placeholder="Senha"
            />
          </Label>
          {/* Botão submit */}
          <Button
            id="login-submit-btn"
            data-testid="login-submit-btn"
            type="button"
            disabled={ disableSubmit(email, password) }
            onClick={ () => handleSubmit() }
          >
            Login
          </Button>
        </LoginForm>
      </Wrapper>
    )
  );
}

export default Login;
