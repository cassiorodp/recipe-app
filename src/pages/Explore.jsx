// React
import React, { useEffect, useState } from 'react';

// Router
import { Link, useHistory } from 'react-router-dom';

// PropTypes
import PropTypes from 'prop-types';

// Children
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreNav from '../components/ExploreNav';
import ExploreNavFd from '../components/ExploreNavFd';

// Helpers
import {
  explorePageTitle,
  shouldRenderIngrs,
  shouldRenderAreas,
} from '../helpers/explore';

// Services
import { ingredientsAPI, areasAPI, recipesByAreaAPI } from '../services/apiRequest';

// Styles
// import {
//   Container,
// } from '../styles/Styled';

import {
  // List,
  Card,
} from '../styles/Styled2';

function Explore(props) {
  // Props
  const { foodDrink, explore } = props;
  const browseByArea = explore === 'area';
  const browseByIngr = explore === 'ingredients';

  // Hooks
  const history = useHistory();

  // State Hooks
  const [loading, setLoading] = useState(false); // Carregando
  const [ingredients, setIngredients] = useState([]); // Ingredientes
  const [areas, setAreas] = useState([]); // Areas
  const [recipes, setRecipes] = useState([]); // Receitas, por area
  const [option, setOption] = useState('All'); // Area, valor do dropdown

  useEffect(() => {
    if (browseByIngr) {
      const fetchIngredients = async () => {
        setLoading(true);
        setIngredients(await ingredientsAPI(foodDrink));
        setLoading(false);
      };
      fetchIngredients();
    } else if (browseByArea) {
      const fetchAreas = async () => {
        setLoading(true);
        setAreas(await areasAPI());
        setLoading(false);
      };
      fetchAreas();
    }
  }, [browseByIngr, browseByArea, foodDrink]);

  useEffect(() => {
    if (browseByArea) {
      const fetchRecipesByArea = async () => {
        setLoading(true);
        setRecipes(await recipesByAreaAPI(option));
        setLoading(false);
      };
      fetchRecipesByArea();
    }
  }, [browseByArea, option]);

  // Mudar filtro de area
  const handleChange = ({ target: { value } }) => {
    setOption(value);
  };

  return (
    <section>
      {/* Cabeçalho */}
      <Header
        title={ explorePageTitle(props) }
        searchBtn={ browseByArea }
      />

      {/* Botões de navegar bebidas ou comidas */}
      { !Object.keys(props).length && <ExploreNav history={ history } /> }

      {/* Botões de navegar por ingredientes e/ou por origem */}
      { (foodDrink && !explore) && (
        <ExploreNavFd
          foodDrink={ foodDrink }
          explore={ explore }
          history={ history }
        />
      ) }

      { loading && <span className="loading">Carregando...</span> }

      {/* Cards de ingredientes */}
      { shouldRenderIngrs(browseByIngr, ingredients, loading) && (
        ingredients.map(({ name, thumb, type }, i) => (
          <Link
            key={ i }
            to={ {
              pathname: `/${type}`,
              state: name,
            } }
          >
            <Card
              style={ {
                backgroundImage: `url(${thumb})`,
                backgroundSize: 'contain',
                margin: '1em auto',
              } }
            >
              <span data-testid={ `${i}-card-name` }>{ name }</span>
            </Card>
          </Link>
        ))
      ) }

      {/* Dropdown areas */}
      { shouldRenderAreas(browseByArea, loading) && (
        <>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ (evt) => handleChange(evt) }
          >
            {/* Mostra todas as receitas */}
            <option data-testid="All-option" value="All">All</option>

            {/* Receitas por país */}
            { areas.map((area, i) => (
              <option
                key={ i }
                data-testid={ `${area}-option` }
                value={ area }
              >
                { area }
              </option>
            )) }
          </select>

          { recipes.map(({ idMeal, strMeal, strMealThumb }, i) => (
            <div key={ i } data-testid={ `${i}-recipe-card` }>
              <Link to={ `/comidas/${idMeal}` }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${i}-card-img` }
                  style={ { width: '300px' } }
                />
                <span data-testid={ `${i}-card-name` }>
                  { strMeal }
                </span>
              </Link>
            </div>
          )) }
        </>
      ) }

      <Footer />
    </section>
  );
}

Explore.propTypes = {
  foodDrink: PropTypes.string,
  explore: PropTypes.string,
}.isRequired;

export default Explore;
