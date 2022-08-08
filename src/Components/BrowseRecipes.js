//import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeRecipeApiCall } from "../actions/index";
import { Button, Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

const BrowseRecipes = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const isLoaded = useSelector(state => state.isLoaded);
  const recipes = useSelector(state => state.recipes);
  

  //TODO Use useEffect for updating on page load in future
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
        <Typography variant="h3">Tasty Recipes</Typography>
        <Button variant="contained" onClick={handleRecipeButtonClick}>Load Recipes</Button>
        <hr />
        <Grid container spacing={2}>
          {recipes.map((recipe) =>
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard {...recipe} />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

export default BrowseRecipes;