import * as actions from './../../actions';
import * as constants from './../../actions/ActionTypes';

describe('headline reducer actions', () => {
  it('requestRecipes should create REQUEST_RECIPES action', () => {
    expect(actions.requestRecipes()).toEqual({
      type: constants.REQUEST_RECIPES
    });
  });

  it('getRecipesSuccess should create GET_RECIPES_SUCCESS action', () => {
    const recipes = "A recipe";
    expect(actions.getRecipesSuccess(recipes)).toEqual({
      type: constants.GET_RECIPES_SUCCESS,
      recipes
    });
  });

  it('getRecipesFailure should create GET_RECIPES_FAILURE action', () => {
    const error = "An error";
    expect(actions.getRecipesFailure(error)).toEqual({
      type: constants.GET_RECIPES_FAILURE,
      error
    });
  });
});