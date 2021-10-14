// React
import React, { useEffect, useState } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Router
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions';

// Helpers
import capitalize from '../helpers/capitalizeStr';

// Children
import Footer from '../components/Footer';
import Header from '../components/Header';

// Services
import { categoriesAPI, filterCategoryAPI } from '../services/apiRequest';

// Styles
import {
  Container,
} from '../styles/Styled';

import {
  List,
  Card,
} from '../styles/Styled2';

function Recipes({ foodDrink }) {
  // Variables
  const foodDrinkCap = capitalize(foodDrink).slice(0, foodDrink.length - 1);

  // Redux
  const { loading, results } = useSelector((state) => state.recipes);
  const recipes = results[foodDrink] || []; // se results estiver em fetching retorna []

  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const path = useLocation().pathname;
  const ingredient = useLocation().state;
  const treatedPath = path.slice(1);

  // State Hooks
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  /* Faz fetch das categorias */
  useEffect(() => {
    const MAX_CATEGORIES = 5;
    const fetchCategories = async () => {
      const categoriesResult = await categoriesAPI(foodDrink); // retorno da API => { drinks :{}}  || { meals: {}}
      setCategories(await categoriesResult[foodDrink].slice(0, MAX_CATEGORIES)); // foodDrink => 'meals' or 'drinks'
    };
    fetchCategories();
  }, [foodDrink]);

  /* Filtra as receitas baseado na categoria selecionada */
  useEffect(() => {
    async function categoryFilterRecipes() {
      if (categoryFilter !== 'All') {
        const categoryItens = await filterCategoryAPI(foodDrink, categoryFilter);
        setFilteredRecipes(await categoryItens);
      }
    }
    categoryFilterRecipes();
  }, [categoryFilter, foodDrink]);

  /* Busca as receitas por filtro */
  useEffect(() => {
    const foodOrDrinkLoad = () => {
      if (ingredient) {
        dispatch(fetchRecipes(ingredient, 'ingredient', treatedPath));
      } else {
        setCategoryFilter('All');
        dispatch(fetchRecipes('', '', treatedPath));
      }
    };
    foodOrDrinkLoad();
  }, [path, treatedPath, dispatch, ingredient]);

  function renderRecipes() {
    if (categoryFilter === 'All') return recipes;
    return (filteredRecipes && filteredRecipes.length ? filteredRecipes : recipes);
  }

  // Category Button
  function categoryClick(evt) {
    // Set filter
    const { value } = evt.target;
    setCategoryFilter(value);

    // Apply Styles
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach((btn) => btn.classList.remove('category-selected'));

    const { target } = evt;
    target.classList.add('category-selected');
  }

  return (
    <>
      <Header searchBtn title={ capitalize(path.slice(1, path.length)) } />
      <main>
        {/* Filtro Por Categoria */}
        <List>
          <button
            onClick={ (evt) => categoryClick(evt) }
            type="button"
            data-testid="All-category-filter"
            value="All"
            className="category-btn category-selected"
          >
            All
          </button>

          {categories.map(({ strCategory }, index) => (
            <button
              key={ `${strCategory} - ${index}` }
              onClick={ (evt) => categoryClick(evt) }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              value={ strCategory }
              className="category-btn"
            >
              {strCategory}
            </button>))}
        </List>

        {/* Alertas e mensagens */}
        { (!loading && !recipes) && <p>Digite algum termo de pesquisa</p> }

        { loading && <span className="loading">Carregando...</span> }

        {
          recipes === null && global
            .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        }

        {/* Cards de receitas */}
        <Container>
          {
            recipes && recipes.length > 1 && (
              (renderRecipes()).map((recipe, index) => {
                const PAGE_LIMIT = 11;
                if (index <= PAGE_LIMIT) {
                  return (
                    <Link
                      key={ recipe[`id${foodDrinkCap}`] }
                      to={ `${(foodDrink === 'meals'
                        ? 'comidas' : 'bebidas')}/${recipe[`id${foodDrinkCap}`]}` }
                    >
                      <Card
                        style={ {
                          backgroundImage: `url(${recipe[`str${foodDrinkCap}Thumb`]})`,
                          backgroundSize: 'contain',
                        } }
                      >
                        <span>{recipe[`str${foodDrinkCap}`]}</span>
                      </Card>
                    </Link>
                  );
                } return null;
              })
            )
          }
        </Container>

        {
          (recipes && recipes.length === 1) && history
            .push(`${path}/${recipes[0][`id${foodDrinkCap}`]}`)
        }
      </main>
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  foodDrink: PropTypes.string,
}.isRequired;

export default Recipes;
