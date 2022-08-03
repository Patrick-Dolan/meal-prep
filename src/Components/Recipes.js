//import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeRecipeApiCall } from "./../actions/index";
// MUI Imports
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

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
        <Button variant="contained" onClick={handleRecipeButtonClick}>Load Recipes</Button>
        <hr />
        <Grid container spacing={2}>
          {recipes.map((recipe, index) =>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Card key={recipe.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h4">{recipe.name}</Typography>
                    <CardMedia component="img" height="194" src={`${recipe.thumbnail_url}`} alt={recipe.name} />
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