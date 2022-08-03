import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeRecipeApiCall } from "./../actions/index";

const Recipes = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const isLoaded = useSelector(state => state.isLoaded);
  const recipes = useSelector(state => state.recipes);
  

  //TODO setup a button to load recipes cause useEffect will use up all requests too quickly
  // useEffect(() => {
  //   dispatch(makeRecipeApiCall());
  // }, [dispatch]);

  const handleRecipeButtonClick = () => {
    dispatch(makeRecipeApiCall());
  }

  if (error) {
    return <>Error: {error.message}</>
  } else if (isLoaded) {
    return <>Loading...</>
  } else {
    return(
      <>
        <h3>Tasty Recipes</h3>
        <button onClick={handleRecipeButtonClick}>Load Recipes</button>
        <hr />
        {recipes.map((recipe, index) =>
          <article>
            <p><strong>{recipe.name}</strong></p>
            <p>{recipe.description}</p>
          </article>
        )}
      </>
    );
  }
}

export default Recipes;