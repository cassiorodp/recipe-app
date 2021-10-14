// React
import React from 'react';

// Router
import { useHistory } from 'react-router';

// Children
import Header from '../components/Header';
import Footer from '../components/Footer';

// Helpers
import { loadLocalStorage } from '../helpers/localStorageHelper';

// Styles
import {
  Button,
  Wrapper,
} from '../styles/Styled';

function Profile() {
  /* usando useHistory para trocar de pagina */
  const history = useHistory();

  /* função que volta pra pagina inicial e limpa o localStorage */
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const user = loadLocalStorage('user'); // modificado a linha 24

  return (
    <>
      <Header title="Perfil" />
      <Wrapper secondary>
        <p data-testid="profile-email">{user.email}</p>
        <Button
          onClick={ () => history.push('/receitas-feitas') }
          data-testid="profile-done-btn"
          variant="secondary"
        >
          Receitas Feitas
        </Button>
        <Button
          onClick={ () => history.push('/receitas-favoritas') }
          data-testid="profile-favorite-btn"
          variant="secondary"
        >
          Receitas Favoritas
        </Button>
        <Button
          onClick={ () => handleLogout() }
          data-testid="profile-logout-btn"
          variant="secondary"
        >
          Sair
        </Button>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Profile;
