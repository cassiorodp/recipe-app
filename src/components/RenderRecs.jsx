// React
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


// Helpers
import capitalize from '../helpers/capitalizeStr';

const RenderRecs = ({foodDrinkPT}) => {
  /* Usar o history para navegar entre receitas */
  const history = useHistory();
  /* armazenar o retorno do fetch */
  const [recs, setRecs] = useState()
  /* Fazer fetch do domínio oposto ao dos detalhes da comida/bebida */
  const domain = foodDrinkPT === 'comidas' ? 'thecocktaildb' : 'themealdb';

  /* A chave dos resultados, oposto ao dos detalhes da comida/bebida */
  const resultKey = foodDrinkPT === 'comidas' ? 'drinks' : 'meals';
  const resultKeyPT = foodDrinkPT === 'comidas' ? 'bebidas' : 'comidas';

  /* A chave dos resultados, em letra maíuscula */
  const resultKeyCap = capitalize(resultKey).slice(0, resultKey.length - 1);
  /* A url do fetch */
  const url = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
  useEffect(() => {
    const fetchResults = async () => {
      const result = await (await fetch(url)).json();
      setRecs(result);
    }
    fetchResults();
  }, [url])
  /* Receitas recomendadas, resultados do fetch */
  return (
    <>
      { recs && (
        recs[resultKey].map((recipe, i) => {
          const MAX_LIMIT = 5;
          if (i <= MAX_LIMIT) {
            return (
              <div
                className="carousel-card"
                data-testid={`${i}-recomendation-card`}
                key={i}
                onClick={() => {
                  history.push(`/${resultKeyPT}/${recipe[`id${resultKeyCap}`]}`)
                  setRecs(null)
                } }
              >
                <img
                  alt={recipe[`str${resultKeyCap}`]}
                  src={recipe[`str${resultKeyCap}Thumb`]}
                  className="card-thumb"
                />
      
                <span className="card-cat">
                  {resultKey === 'drinks' ? recipe.strAlcoholic : recipe.strCategory}
                </span>
      
                <h1 className="card-title" data-testid={`${i}-recomendation-title`}>
                  {recipe[`str${resultKeyCap}`]}
                </h1>
              </div>
            );
          }
          return null;
        })
      )}
    </>
  )
};

export default RenderRecs;
