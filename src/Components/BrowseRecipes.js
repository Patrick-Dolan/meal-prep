//import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeRecipeApiCall } from "../actions/index";
import { Button, Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

const BrowseRecipes = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const isLoading = useSelector(state => state.isLoading);
  const recipes = useSelector(state => state.recipes);

  const skeletonCount = 6;
  
  // useEffect(() => {
  //   dispatch(makeRecipeApiCall());
  // }, [dispatch]);

  const handleRecipeButtonClick = () => {
    dispatch(makeRecipeApiCall());
  }

  if (error) {
    return <>Error: {error.message}</>
  } else if (isLoading) {
    return (
    <>
      <Typography variant="h3">Tasty Recipes</Typography>
      <hr />
      <Grid container spacing={2}>
        {[...Array(skeletonCount)].map((skeleton, key) => 
          <Grid item xs={12} sm={6} md={4} key={key}>
            <RecipeCardSkeleton skeleton={skeleton}  />
          </Grid>
        )}
      </Grid>
    </>
    )
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