import * as constants from "./../actions/ActionTypes";

const defaultState = {
  isLoading: false,
  recipes: [],
  error: null
}


const recipeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.REQUEST_RECIPES:
      return Object.assign({}, state, {
        isLoading: true
      });
    case constants.GET_RECIPES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        recipes: action.recipes
      });
    case constants.GET_RECIPES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
};

export default recipeReducer;