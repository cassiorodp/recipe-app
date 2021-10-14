// Services
import { recipesAPI } from '../../services/apiRequest';

// Action
export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';

// Action async creator
const requestRecipes = () => ({ type: REQUEST_RECIPES });
const requestSuccess = (payload) => ({ type: REQUEST_SUCCESS, payload });
const requestFail = (error) => ({ type: REQUEST_FAIL, error });

export const fetchRecipes = (searchText, searchFilter, foodDrink) => async (dispatch) => {
  try {
    dispatch(requestRecipes());

    const recipes = await recipesAPI(searchText, searchFilter, foodDrink);
    dispatch(requestSuccess(recipes));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
