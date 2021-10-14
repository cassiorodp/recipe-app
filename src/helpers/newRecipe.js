const newRecipe = (details, foodDrink, foodDrinkPT, foodDrinkCap) => ({
  id: details[`id${foodDrinkCap}`],
  type: foodDrinkPT.slice(0, foodDrinkPT.length - 1),
  area: foodDrink === 'meals' ? details.strArea : '',
  category: details.strCategory,
  alcoholicOrNot: foodDrink === 'drinks' ? details.strAlcoholic : '',
  name: details[`str${foodDrinkCap}`],
  image: details[`str${foodDrinkCap}Thumb`],
});

export default newRecipe;
