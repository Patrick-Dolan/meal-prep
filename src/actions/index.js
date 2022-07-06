import * as constants from './ActionTypes';

export const requestRecipes = () => ({
  type: constants.REQUEST_RECIPES
});

export const getRecipesSuccess = (recipes) => ({
  type: constants.GET_RECIPES_SUCCESS,
  recipes
});

export const getRecipesFailure = (error) => ({
  type: constants.GET_RECIPES_FAILURE,
  error
});