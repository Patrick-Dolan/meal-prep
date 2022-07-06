import recipesReducer from "../../reducers/recipes-reducer";
import * as constants from "./../../actions/ActionTypes";

describe("recipesReducer", () => {
  let action;
  
  const defaultState = {
    isLoading: false,
    recipes: [],
    error: null
  };

  const loadingState = {
    isLoading: true,
    recipes: [],
    error: null
  }

  test("Should successfully return the default state if no action is passed into it", () => {
    expect(recipesReducer(defaultState, {type: null})).toEqual(
      {
        isLoading: false,
        recipes: [],
        error: null
      }
    );
  });

  test("Requesting recipes should successfully change isLoading from false to true", () => {
    action = {
      type: constants.REQUEST_RECIPES
    };

    expect(recipesReducer(defaultState, action)).toEqual(
      {
        isLoading: true,
        recipes: [],
        error: null
      }
    )
  });

  test('Successfully getting recipes should change isLoading to false and update recipes', () => {
    const recipes = "A recipe";
    action = {
      type: constants.GET_RECIPES_SUCCESS,
      recipes
    };

    expect(recipesReducer(loadingState, action)).toEqual({
        isLoading: false,
        recipes: "A recipe",
        error: null
    });
  });

  test('failing to get recipes should change isLoading to false and add an error message', () => {
    const error = "An error";
    action = {
      type: constants.GET_RECIPES_FAILURE,
      error
    };

    expect(recipesReducer(loadingState, action)).toEqual({
        isLoading: false,
        recipes: [],
        error: "An error"
    });
  });
});