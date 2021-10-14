export const getDate = () => {
  const date = new Date();
  // formatar a data para ser = DD/MM/YYYY - 01/05/2055
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // adiciona número 0 a esquerda
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// strTags: "tag1, tag2, ... , tagN"
export const getTags = ({ strTags }) => {
  const RECIPE_HAS_NO_TAGS = [];
  const strToArray = (array) => array.split(',');

  return (strTags ? strToArray(strTags) : RECIPE_HAS_NO_TAGS);
};

// para remover o (s) de bebida(s) e comida(s)
export const getType = (foodDrinkPT) => foodDrinkPT.slice(0, foodDrinkPT.length - 1);
