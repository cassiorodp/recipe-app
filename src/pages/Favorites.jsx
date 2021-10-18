// React
import React, { useState } from 'react';

// Router
import { Link } from 'react-router-dom';

// Helpers
import { loadLocalStorage, saveLocalStorage } from '../helpers/localStorageHelper';

// Children
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

// Images
import notEmpty from '../helpers/notEmpty';

// Styles
import {
  Button,
  Container,
  IconBtn,
} from '../styles/Styled';

import CardExt from '../styles/Styled3';

function Favorites() {
  // State Hooks
  const [favorites, setFavorites] = useState(loadLocalStorage('favoriteRecipes'));
  const [filterBtns, setFilterBtns] = useState('all');

  // Estilo Desfavoritar
  const heartbreak = (target) => {
    target.innerText = '';
    target.className = 'uil uil-heart-break icon-pale';
  };

  // Remover Favorito
  const removeFavorite = ({ target }) => {
    const filterFavorites = favorites.filter((favorite) => favorite.id !== target.name);
    setFavorites(filterFavorites);

    saveLocalStorage('favoriteRecipes', filterFavorites);

    console.log(target);
    heartbreak(target);
  };

  // Filtrar por tipo
  const filterByType = () => {
    const filtered = favorites.filter((favorite) => favorite.type === filterBtns);
    return filtered;
  };

  // Renderizar cards de receitas favoritas
  const renderFavorites = () => {
    const filterCheck = filterBtns === 'all' ? favorites : filterByType();

    return (filterCheck).map(({
      id,
      image,
      category,
      type,
      name,
      area,
      alcoholicOrNot,
    }, i) => (
      <CardExt key={ i } favorite>
        <div className="card-ext-content">
          <Link className="card-ext-thumb" to={ `${type}s/${id}` }>
            <img src={ image } alt={ image } />
          </Link>

          <div className="card-ext-info">
            {/* Nome */}
            <h4>{name}</h4>

            {/* Alcólico, Categoria, Origem */}
            <span>
              {type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}`}
            </span>
          </div>
        </div>

        <div className="card-ext-buttons">
          {/* Desfavoritar */}
          <IconBtn
            onClick={ (evt) => removeFavorite(evt) }
          >
            <i className="material-icons icon">favorite</i>
          </IconBtn>

          {/* Compartilhar */}
          <ShareButton foodDrink={ type } id={ id } />
        </div>
      </CardExt>
    ));
  };

  return (
    <Container>
      <Header title="Receitas Favoritas" />
      <Container style={ { margin: '1em auto' } }>
        {/* Comidas e bebidas feitas */}
        <Button onClick={ () => setFilterBtns('all') } small>All</Button>

        {/* Comidas feitas */}
        <Button onClick={ () => setFilterBtns('comida') } small>Food</Button>

        {/* Bebidas feitas */}
        <Button onClick={ () => setFilterBtns('bebida') } small>Drinks</Button>
      </Container>

      {/* Cards */}
      { notEmpty(favorites) ? renderFavorites() : <p>Adicione novos favoritos!</p> }

    </Container>
  );
}

export default Favorites;
