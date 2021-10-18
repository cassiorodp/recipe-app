// React
import React, { useState } from 'react';

// Router
import { Link } from 'react-router-dom';

// Children
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

// Helpers
import { loadLocalStorage } from '../helpers/localStorageHelper';
import notEmpty from '../helpers/notEmpty';

// Styles
import {
  Button,
  Container,
} from '../styles/Styled';

import CardExt from '../styles/Styled3';

function Done() {
  // Variables
  const doneRecipes = loadLocalStorage('doneRecipes');

  // State Hooks
  const [filterBtns, setFilterBtns] = useState('all');

  // Filtrar por tipo
  const filterByType = () => {
    const filtered = doneRecipes.filter((recipe) => recipe.type === filterBtns);
    return filtered;
  };

  // Renderizar categorias do card
  const renderTags = (tags) => tags.map((tag, i, arr) => {
    if (i !== (arr.length - 1)) {
      return (
        <span className="recipe-tag" key={ i }>
          { tag }
          ,
          {' '}
        </span>);
    }
    return (<span className="recipe-tag" key={ i }>{ tag }</span>);
  });

  // Renderizar cards
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
    }, i) => (
      <CardExt key={ i } secondary>
        {/* Thumb */}
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

          {/* Data de conclusão */}
          <div className="card-ext-date">
            <p>{ doneDate }</p>
          </div>
        </div>

        <div className="card-ext-taglist">
          <i className="uil uil-tag-alt icon" />

          {/* Tags */}
          { renderTags(tags) }

          {/* Compartilhar */}
          <ShareButton foodDrink={ type } id={ id } />
        </div>
      </CardExt>
    ));
  }

  return (
    <Container>
      <Header title="Receitas Feitas" />
      <Container style={ { margin: '1em auto' } }>
        {/* Comidas e bebidas feitas */}
        <Button onClick={ () => setFilterBtns('all') } small>All</Button>

        {/* Comidas feitas */}
        <Button onClick={ () => setFilterBtns('comida') } small>Food</Button>

        {/* Bebidas feitas */}
        <Button onClick={ () => setFilterBtns('bebida') } small>Drinks</Button>
      </Container>

      {/* Cards */}
      { notEmpty(doneRecipes) ? renderDoneRecipes() : <p>Adicione novas Receitas!</p>}

    </Container>
  );
}

export default Done;
