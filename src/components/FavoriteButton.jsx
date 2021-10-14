import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Styles
import {
  IconBtn,
} from '../styles/Styled';

function FavoriteButton({ isFavorite, manageFavorites }) {
  return (
    <IconBtn
      type="button"
      className="details-favorites-btn"
      onClick={ () => manageFavorites() }
    >
      { isFavorite ? (
        <i className="material-icons icon">favorite</i>
      ) : (
        <i className="material-icons icon">favorite_border</i>
      ) }
    </IconBtn>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  manageFavorites: PropTypes.func,
}.isRequired;

export default FavoriteButton;
