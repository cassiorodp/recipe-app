// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Bootstrap
import { Button, ButtonGroup, ButtonToolbar, Modal } from 'react-bootstrap';

// Children
import copy from 'clipboard-copy';
import Header from '../components/Header';

// Services

// Helpers
import { loadLocalStorage } from '../helpers/localStorageHelper';

// Images
import shareIcon from '../images/shareIcon.svg';
import notEmpty from '../helpers/notEmpty';

function Done() {
  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [filterBtns, setFilterBtns] = useState('all');

  const doneRecipes = loadLocalStorage('doneRecipes');

  function filterByType() { // talvez vire uam funcao helper, pois está sendo usada em Favorites
    const filtering = doneRecipes.filter((recipe) => recipe.type === filterBtns);
    return filtering;
  }

  function renderTags(tags, recipeIndex) {
    return (
      <ButtonToolbar aria-label="Toolbar with button groups">
        {
          tags.map((tag) => (
            <ButtonGroup
              key={ `${recipeIndex}-${tag}-BtnGroup` }
              className="me-2"
              aria-label="First group"
            >
              <Button
                data-testid={ `${recipeIndex}-${tag}-horizontal-tag` }
              >
                { tag }
              </Button>
            </ButtonGroup>))
        }
      </ButtonToolbar>
    );
  }

  function renderDoneRecipes() {
    const filterCheck = filterBtns === 'all' ? doneRecipes : filterByType();
    return (filterCheck).map(({
      id,
      image,
      category,
      type,
      name,
      area,
      alcoholicOrNot,
      doneDate,
      tags,
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

        <Modal show={ showModal } onHide={ handleCloseModal }>
          <Modal.Header closeButton>
            Link copiado!
          </Modal.Header>
        </Modal>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        { renderTags(tags, index) }
        {/* RENDER TAGS USA O INDEX DE FILTERCHECK PARA PASSAR NO TESTE */}
      </div>
    ));
  }

  return (
    <section>
      <Header title="Receitas Feitas" />
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
      { notEmpty(doneRecipes) ? renderDoneRecipes() : <p>Adicione novas Receitas!</p> }
    </section>
  );
}

export default Done;
