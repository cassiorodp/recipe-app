// React
import React from 'react';

// Helpers
import capitalize from './capitalizeStr';

const renderRecs = async (foodDrinkPT) => {
  /* Fazer fetch do domínio oposto ao dos detalhes da comida/bebida */
  const domain = foodDrinkPT === 'comidas' ? 'thecocktaildb' : 'themealdb';

  /* A chave dos resultados, oposto ao dos detalhes da comida/bebida */
  const resultKey = foodDrinkPT === 'comidas' ? 'drinks' : 'meals';

  /* A chave dos resultados, em letra maíuscula */
  const resultKeyCap = capitalize(resultKey).slice(0, resultKey.length - 1);

  /* A url do fetch */
  const url = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;

  /* Receitas recomendadas, resultados do fetch */
  const recs = await (await fetch(url)).json();

  return recs[resultKey].map((recipe, i) => {
    const MAX_LIMIT = 5;
    if (i <= MAX_LIMIT) {
      return (
        <div
          className="carousel-card"
          key={ i }
          data-testid={ `${i}-recomendation-card` }
        >
          <img
            alt={ recipe[`str${resultKeyCap}`] }
            src={ recipe[`str${resultKeyCap}Thumb`] }
            className="card-thumb"
          />

          <span className="card-cat">
            {resultKey === 'drinks' ? recipe.strAlcoholic : recipe.strCategory}
          </span>

          <h1 className="card-title" data-testid={ `${i}-recomendation-title` }>
            { recipe[`str${resultKeyCap}`] }
          </h1>
        </div>
      );
    }
    return null;
  });
};

export default renderRecs;
