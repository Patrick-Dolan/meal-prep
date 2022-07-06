import * as constants from './ActionTypes';

const options = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${process.env.REACT_APP_TASTY_API_KEY}`,
		'X-RapidAPI-Host': `${process.env.REACT_APP_TASTY_API_HOST}`
	}
}

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

export const makeRecipeApiCall = () => {
  return dispatch => {
    dispatch(requestRecipes);
    return fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20', options)
      .then(response => response.json())
      .then(jsonifiedReponse => {
        dispatch(getRecipesSuccess(jsonifiedReponse.results))
      })
      .catch(error => {
        dispatch(getRecipesFailure(error));
      });
  }
}