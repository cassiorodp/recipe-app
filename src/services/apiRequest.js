export const recipesAPI = async (searchText, searchFilter, foodDrinkPT) => {
  const domain = foodDrinkPT === 'comidas' ? 'themealdb' : 'thecocktaildb';

  let url = '';
  if (searchFilter === 'ingredient') {
    url = `https://www.${domain}.com/api/json/v1/1/filter.php?i=${searchText}`;
  } else if (searchFilter === 'name') {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?s=${searchText}`;
  } else if (searchFilter === 'first-letter') {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?f=${searchText}`;
  } else {
    url = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
  }

  const recipes = await (await fetch(url)).json();
  return recipes;
};

export const detailsAPI = async (id, foodDrinkPT) => {
  const domain = foodDrinkPT === 'comidas' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;
  const details = await (await fetch(url)).json();
  return details;
};

export const categoriesAPI = async (foodDrink) => {
  const domain = foodDrink === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
  const categories = await (await fetch(url)).json();
  return categories;
};

export const filterCategoryAPI = async (foodDrink, categoryBtn) => {
  const domain = foodDrink === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/filter.php?c=${categoryBtn}`;
  const categoryItens = await (await fetch(url)).json();
  return categoryItens[foodDrink];
};

export const randomRecipeAPI = async (foodDrink) => {
  const domain = foodDrink === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/random.php`;
  const result = await (await fetch(url)).json();
  return result[foodDrink][0];
};

export const ingredientsAPI = async (foodDrink) => {
  // Fetch
  const domain = foodDrink === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${domain}.com/api/json/v1/1/list.php?i=list`;
  const result = await (await fetch(url)).json();

  // Array de objetos
  const foodDrinkPT = foodDrink === 'meals' ? 'comidas' : 'bebidas';
  const nameKey = foodDrink === 'meals' ? 'strIngredient' : 'strIngredient1';

  const array = result[foodDrink].map((ingr) => {
    const name = ingr[`${nameKey}`];

    return ({
      /* Nome do ingrediente */
      name,

      /* Thumbnail do ingrediente */
      thumb: `https://www.${domain}.com/images/ingredients/${name}-Small.png`,

      /* Tipo ou categoria */
      type: foodDrinkPT,
    });
  });

  const MAX = 12;
  return array.slice(0, MAX);
};

export const areasAPI = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const result = await (await fetch(url)).json();
  const array = result.meals.map(({ strArea }) => strArea);
  return array;
};

export const recipesByAreaAPI = async (area) => {
  let url = '';

  if (area === 'All') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  } else {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  }

  const result = await (await fetch(url)).json();

  const MAX = 12;
  return result.meals.slice(0, MAX);
};
