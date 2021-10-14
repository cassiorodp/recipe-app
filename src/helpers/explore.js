export const explorePageTitle = ({ foodDrink = '', explore = '' }) => {
  const exploreStr = 'Explorar';
  const explorePT = explore === 'area' ? 'Origem' : 'Ingredientes';
  const foodDrinkPT = foodDrink === 'meals' ? 'Comidas' : 'Bebidas';

  if (explore) return `${exploreStr} ${explorePT}`;
  if (foodDrink) return `${exploreStr} ${foodDrinkPT}`;
  return exploreStr;
};

export const shouldRenderIngrs = (browseByIngr, ingredients, loading) => (
  !!((browseByIngr && ingredients.length && !loading))
);

export const shouldRenderAreas = (browseByArea, loading) => (
  !!((browseByArea && !loading))
);
