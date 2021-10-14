import React, { useEffect } from 'react';

/* custom hooks */
import useIngredients from '../hooks/useIngredients';

function RenderCheckbox({ data, id, foodDrink, setDoneRecipe }) {
/* configurar chave para o localStorage */
  const key = foodDrink === 'meals' ? 'meals' : 'cocktails';

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

  /* lista de ingredientes */
  const INITIAL_STATE = {
    cocktails: {},
    meals: {},
  };
  const [ingredients,
    setIngredients] = useIngredients('inProgressRecipes', INITIAL_STATE);

  /* ids do local storage */
  const ids = ingredients[key];
  /* lista no local storage */
  const list = ingredients[key][id] ? ingredients[key][id] : [];

  const pushIngredient = (ingredient, checked) => {
    if (checked) {
      setIngredients({ ...ingredients, [key]: { ...ids, [id]: [...list, ingredient] } });
    } else {
      const filteredList = list.filter((item) => item !== ingredient);
      setIngredients({ ...ingredients, [key]: { ...ids, [id]: filteredList } });
    }
  };

  useEffect(() => {
    if (combined.length === list.length) setDoneRecipe(false);
  }, [combined.length, list.length, setDoneRecipe]);

  /* Retornar lista de checkbox */
  return combined.map((item, i) => {
    const checked = list.includes(item[0]);
    return (
      <li key={ i }>
        <label htmlFor={ i }>
          <input
            type="checkbox"
            defaultChecked={ checked }
            id={ i }
            value={ item }
            onClick={ (e) => pushIngredient(e.target.value, e.target.checked) }
          />
          <span>{item}</span>
        </label>
      </li>
    );
  });
}

export default RenderCheckbox;
