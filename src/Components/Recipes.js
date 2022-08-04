//import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeRecipeApiCall } from "./../actions/index";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const Recipes = () => {
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
        <h2>Tasty Recipes</h2>
        <Button variant="contained" onClick={handleRecipeButtonClick}>Load Recipes</Button>
        <hr />
        <Grid container spacing={2}>
          {recipes.map((recipe, index) =>
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Box>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h4">{recipe.name}</Typography>
                    <CardMedia component="img" height="194" src={`${recipe.thumbnail_url}`} alt={recipe.thumbnail_alt_text} />
                    <Typography variant="body2">{recipe.description}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

export default Recipes;