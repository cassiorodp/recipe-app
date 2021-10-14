// React
import React from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Styles
import {
  IconBtn,
} from '../styles/Styled';

import {
  FooterSc,
} from '../styles/Styled2';

function Footer() {
  const history = useHistory();

  return (
    <FooterSc>
      <IconBtn
        type="button"
        onClick={ () => history.push('/bebidas') }
      >
        <i className="uil uil-glass-martini-alt icon" />
      </IconBtn>
      <IconBtn
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        <i className="uil uil-compass icon" />
      </IconBtn>
      <IconBtn
        type="button"
        onClick={ () => history.push('/comidas') }
      >
        <i className="uil uil-pizza-slice icon" />
      </IconBtn>
    </FooterSc>

  );
}

export default Footer;
