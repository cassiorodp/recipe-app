// React
import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// Children
import Details from '../pages/Details';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Variables
// const RECIPE_PHOTO = 'recipe-photo';
// const RECIPE_TITLE = 'recipe-title';
// const SHARE_BTN = 'share-btn';
// const FAVORITE_BTN = 'favorite-btn';
// const RECIPE_CATEGORY = 'recipe-category';
// const INGR_ITEM = '0-ingredient-name-and-measure';
// const INSTRUCTIONS = 'instructions';
// const VIDEO = 'video';
// const REC_ITEM = '0-recomendation-card';
// const START_RECIPE_BTN = 'start-recipe-btn';

describe('Testa a página de login', () => {
  beforeEach(() => {
    renderWithReduxAndRouter(<Details />);
  });

  // it('33 - Implemente os elementos da tela de detalhes de uma receita...', async () => {
  //   const recipePhoto = await screen.findByTestId(RECIPE_PHOTO);
  //   const recipeTitle = await screen.findByTestId(RECIPE_TITLE);
  //   const shareBtn = await screen.findByTestId(SHARE_BTN);
  //   const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
  //   const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY);
  //   const instructions = await screen.findByTestId(INSTRUCTIONS);
  //   const video = await screen.findByTestId(VIDEO);
  //   const startRecipeBtn = await screen.findByTestId(START_RECIPE_BTN);

  //   const all = [recipePhoto, recipeTitle, shareBtn, favoriteBtn, recipeCategory,
  //     instructions, video, startRecipeBtn];

  //   all.forEach((el) => expect(el).toBeInTheDocument());
  // });
});
