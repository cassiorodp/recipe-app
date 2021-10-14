// React
import React from 'react';

function RenderIngredients({ data }) {
  const detailsArr = Object.entries(data);

  /* Pegar ingredientes */
  const ingrValues = detailsArr.filter((entry) => (
    entry[0].includes('strIngredient') && entry[1]
  )).map((e) => e[1]);

  /* Pegar medidas */
  const measureValues = detailsArr.filter((entry) => (
    entry[0].includes('strMeasure') && entry[1]
  )).map((e) => e[1]);

  /* Mergiar arrays */
  const combined = ingrValues.map((value, i) => [`${value} - ${measureValues[i]}`]);

  return combined.map((item, i) => (
    <li
      key={ item }
      data-testid={ `${i}-ingredient-name-and-measure` }
    >
      { item }
    </li>
  ));
}

export default RenderIngredients;
