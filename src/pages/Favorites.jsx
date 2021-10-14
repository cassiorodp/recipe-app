// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Bootstrap
import { Button, Modal } from 'react-bootstrap';

// Services
import copy from 'clipboard-copy';

// Children
import Header from '../components/Header';

// Helpers
import { loadLocalStorage, saveLocalStorage } from '../helpers/localStorageHelper';

// Images
import shareIcon from '../images/shareIcon.svg';
import fullHeart from '../images/blackHeartIcon.svg';
import notEmpty from '../helpers/notEmpty';

function Favorites() {
  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [favorites, setFavorites] = useState(loadLocalStorage('favoriteRecipes'));
  const [filterBtns, setFilterBtns] = useState('all');

  const removeFavorite = (name) => {
    const filterFavorites = favorites.filter((favorite) => favorite.id !== name);
    setFavorites(filterFavorites);
    saveLocalStorage('favoriteRecipes', filterFavorites);
  };

  function filterByType() {
    const filtering = favorites.filter((favorite) => favorite.type === filterBtns);
    return filtering;
  }

  function renderFavorites() {
    const filterCheck = filterBtns === 'all' ? favorites : filterByType();
    return (filterCheck).map(({
      id,
      image,
      category,
      type,
      name,
      area,
      alcoholicOrNot,
    }, index) => (
      <div key={ index } data-testid={ type }>
        <Link to={ `${type}s/${id}` }>
          <img
            style={ { width: '100%' } }
            src={ image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          { type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}` }
        </h4>
        <p>{type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}`}</p>
        <Link to={ `${type}s/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        </Link>
        <button
          type="button"
          className="details-share-btn"
          onClick={ () => {
            copy(`http://localhost:3000/${type}s/${id}`); // Copia o link de acordo com o tipo e id
            handleShowModal();
          } }
        >
          <img
            src={ shareIcon }
            alt="Copiar Link"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          type="button"
          className="details-favorites-btn"
          onClick={ ({ target }) => removeFavorite(target.name) }
        >
          <img
            name={ id }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ fullHeart }
            alt="Remover dos favoritos"
          />
        </button>
        <Modal show={ showModal } onHide={ handleCloseModal }>
          <Modal.Header closeButton>
            Link copiado!
          </Modal.Header>
        </Modal>
      </div>
    ));
  }

  return (
    <section>
      <Header title="Receitas Favoritas" />
      <section>
        <Button
          variant="dark"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterBtns('all') }
        >
          All
        </Button>
        <Button
          variant="danger"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterBtns('comida') }
        >
          Food
        </Button>
        <Button
          variant="success"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterBtns('bebida') }
        >
          Drinks
        </Button>
      </section>
      { notEmpty(favorites) ? renderFavorites() : <p>Adicione novos favoritos!</p> }
    </section>
  );
}

export default Favorites;
