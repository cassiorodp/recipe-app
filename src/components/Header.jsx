// React
import React, { useState } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Children
import SearchBar from './SearchBar';

// Styles
import {
  HeaderSc,
  H2,
  IconBtn,
} from '../styles/Styled';

function Header({ searchBtn, title }) {
  /* Router */
  const history = useHistory();

  /* Mostra a barra de pesquisa */
  const [toggleSearch, setToggleSearch] = useState(false);

  return (
    <>
      <HeaderSc>
        {/* Ir para a página de Perfíl */}
        <IconBtn
          type="button"
          onClick={ () => history.push('/perfil') }
        >
          <i className="uil uil-user icon" />
        </IconBtn>

        {/* Título da página */}
        <H2 data-testid="page-title">{ title }</H2>

        <IconBtn
          type="button"
          onClick={ () => setToggleSearch(!toggleSearch) }
          className={ !searchBtn && 'hidden' }
        >
          <i className="uil uil-search-alt icon" />
        </IconBtn>
      </HeaderSc>
      { toggleSearch && <SearchBar /> }
    </>
  );
}

Header.propTypes = {
  searchBtn: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;

export default Header;
