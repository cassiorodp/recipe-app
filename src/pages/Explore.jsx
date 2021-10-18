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
import {
  Container,
} from '../styles/Styled';

import {
  Card,
  Dropdown,
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
        <Container>
          { ingredients.map(({ name, thumb, type }, i) => (
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
                } }
              >
                <span data-testid={ `${i}-card-name` }>{ name }</span>
              </Card>
            </Link>
          )) }
        </Container>
      ) }

      {/* Dropdown areas */}
      { shouldRenderAreas(browseByArea, loading) && (
        <>
          <Container>
            <Dropdown onChange={ (evt) => handleChange(evt) }>
              {/* Opção todos os países */}
              <option data-testid="All-option" value="All">All</option>

              { areas.map((area, i) => (
                <option
                  key={ i }
                  data-testid={ `${area}-option` }
                  value={ area }
                >
                  { area }
                </option>
              )) }
            </Dropdown>
          </Container>

          <Container>
            { recipes.map(({ idMeal, strMeal, strMealThumb }, i) => (
              <Link
                key={ i }
                to={ `/comidas/${idMeal}` }
              >
                <Card
                  style={ {
                    backgroundImage: `url(${strMealThumb})`,
                    backgroundSize: 'contain',
                  } }
                >
                  <span>{ strMeal }</span>
                </Card>
              </Link>
            )) }
          </Container>
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
