// React
import React from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

// Styles
import {
  Button,
  Wrapper,
} from '../styles/Styled';

const ExploreNav = ({ history }) => (
  <Wrapper secondary>
    {/* Ir para tela de explorar comidas */}
    <Button
      type="button"
      data-testid="explore-food"
      onClick={ () => history.push('/explorar/comidas') }
    >
      Explorar Comidas
    </Button>

    {/* Ir para tela de explorar bebidas */}
    <Button
      type="button"
      data-testid="explore-drinks"
      onClick={ () => history.push('/explorar/bebidas') }
    >
      Explorar Bebidas
    </Button>
  </Wrapper>
);

ExploreNav.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ExploreNav);
