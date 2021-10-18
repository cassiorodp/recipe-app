// React
import React, { useEffect, useState } from 'react';

// Router
import { useHistory, useLocation, useParams } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

// Helpers
import { Modal } from 'react-bootstrap';
import capitalize from '../helpers/capitalizeStr';
import checkFavorite from '../helpers/checkFavorite';
import { loadLocalStorage, saveLocalStorage } from '../helpers/localStorageHelper';
import { getDate, getTags, getType } from '../helpers/getRecipeHelpers';

// Services
import { detailsAPI } from '../services/apiRequest';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import newRecipe from '../helpers/newRecipe';
import RenderCheckbox from '../components/RenderCheckbox';

// Styles
import {
  CheckboxList,
  DetailsBtns,
  DetailsContent,
  DetailsThumb,
} from '../styles/Styled2';

function Progress({ foodDrink }) {
  const path = useLocation().pathname; // Caminho atual
  const { id } = useParams(); // Id da receita
  const foodDrinkPT = path.split('/')[1]; // comida ou bebida
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1); // Meal ou Drink
  const [loading, setLoading] = useState(false); // Carregando
  const [recipe, setRecipe] = useState(); // Detalhes
  const [isFavorite, setIsFavorite] = useState(false); // Favoritado
  const [doneRecipe, setDoneRecipe] = useState(true); // Finalizar receita

  const history = useHistory();

  const [showModal, setShowModal] = useState(false); // Mostrar mensagem
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  /* fetch recipe */
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const data = await detailsAPI(id, foodDrinkPT);
      setRecipe(data[foodDrink][0]);
      setLoading(false);
    };
    fetchRecipe();
  }, [foodDrink, foodDrinkPT, id]);

  /* setIsFavorite */
  useEffect(() => checkFavorite(id, setIsFavorite), [id, isFavorite]);

  /* Gerencia as receitas favoritas */
  const manageFavorites = () => {
    if (isFavorite) { // Caso seja favorito - desfavoritar
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const removed = favoriteRecipes.filter((item) => item.id !== id);

      localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
      setIsFavorite(false);
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      favoriteRecipes.push(newRecipe(
        recipe,
        foodDrink,
        foodDrinkPT,
        foodDrinkCap,
      ));

      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
    }
  };

  const manageAddDoneRecipe = (recipeDone) => {
    const EMPTY_FIELD = '';

    const lastDoneRecipe = {
      id: recipeDone[`id${foodDrinkCap}`],
      type: getType(foodDrinkPT), // type === comida ou bebida
      area: recipeDone.strArea || EMPTY_FIELD,
      category: recipeDone.strCategory || EMPTY_FIELD,
      alcoholicOrNot: recipeDone.strAlcoholic || EMPTY_FIELD,
      name: recipeDone[`str${foodDrinkCap}`],
      image: recipeDone[`str${foodDrinkCap}Thumb`],
      doneDate: getDate(),
      tags: getTags(recipeDone),
    };

    const doneRecipes = loadLocalStorage('doneRecipes') || [];
    console.log(doneRecipes);
    const recipeID = doneRecipes
      .findIndex((localStorageRecipe) => localStorageRecipe.id === lastDoneRecipe.id);
    const NOT_FOUND = -1;

    if (recipeID === NOT_FOUND) {
      const addLastDoneRecipe = [...doneRecipes, lastDoneRecipe];
      saveLocalStorage('doneRecipes', addLastDoneRecipe);
    } else {
      doneRecipes[recipeID].doneDate = getDate(); // atualiza a receita feita com a última data que ela foi realizada
      saveLocalStorage('doneRecipes', doneRecipes);
    }
  };

  return (
    <section>
      {loading && <span className="loading">Carregando...</span>}
      {recipe && (
        <>
          {/* Thumb */}
          <DetailsThumb>
            <img
              src={ recipe[`str${foodDrinkCap}Thumb`] }
              alt={ recipe[`str${foodDrinkCap}`] }
            />
          </DetailsThumb>

          <DetailsContent>
            <DetailsBtns>
              {/* Compartilhar */}
              <ShareButton
                handleShowModal={ handleShowModal }
                foodDrink={ foodDrinkPT }
                id={ id }
              />

              {/* Favoritar */}
              <FavoriteButton
                isFavorite={ isFavorite }
                manageFavorites={ manageFavorites }
              />
            </DetailsBtns>

            {/* Título */}
            <h1 className="details-title">
              { recipe[`str${foodDrinkCap}`] }
            </h1>

            {/* Categoria */}
            <span className="details-category">
              {foodDrink === 'drinks' ? recipe.strAlcoholic : recipe.strCategory}
            </span>

            {/* Ingredientes */}
            <h2>Ingredients</h2>
            <CheckboxList>
              <RenderCheckbox
                data={ recipe }
                checkbox
                className="progress-done"
                id={ id }
                foodDrink={ foodDrink }
                setDoneRecipe={ setDoneRecipe }
              />
            </CheckboxList>

            {/* Instruções */}
            <h2>Instructions</h2>
            <p className="details-instructions" style={ { margin: '0 auto 5em' } }>
              { recipe.strInstructions }
            </p>
          </DetailsContent>

          {/* Iniciar receita */}
          <button
            type="button"
            className="details-action-btn action-alt"
            disabled={ doneRecipe }
            onClick={ () => {
              manageAddDoneRecipe(recipe);
              history.push('/receitas-feitas');
            } }
          >
            Finalizar Receita
          </button>

          <Modal show={ showModal } onHide={ handleCloseModal }>
            <Modal.Header closeButton>
              Link copiado!
            </Modal.Header>
          </Modal>
        </>
      )}
    </section>
  );
}

Progress.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;
export default Progress;
