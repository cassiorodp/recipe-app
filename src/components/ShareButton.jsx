// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Services
import copy from 'clipboard-copy';

// Styles
import {
  IconBtn,
} from '../styles/Styled';

function ShareButton({ handleShowModal, foodDrink, id }) {
  return (
    <IconBtn
      type="button"
      className="details-share-btn"
      data-testid="share-btn"
      onClick={ () => {
        copy(`http://localhost:3000/${foodDrink}/${id}`);
        handleShowModal();
      } }
    >
      <i className="uil uil-share-alt icon" />
    </IconBtn>
  );
}

ShareButton.propTypes = {
  handleShowModal: PropTypes.func,
}.isRequired;

export default ShareButton;
