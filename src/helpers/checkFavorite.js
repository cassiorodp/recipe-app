const checkFavorite = (id, setIsFavorite) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes.find((favorite) => favorite.id === id)) setIsFavorite(true);
    else setIsFavorite(false);
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
};

export default checkFavorite;
