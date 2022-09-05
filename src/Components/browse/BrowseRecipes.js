//import { useEffect } from "react";
import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import RecipeCard from "../my-recipes/RecipeCard";
import RecipeCardSkeleton from "../my-recipes/RecipeCardSkeleton";

// API call header details
const options = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${process.env.REACT_APP_TASTY_API_KEY}`,
		'X-RapidAPI-Host': `${process.env.REACT_APP_TASTY_API_HOST}`
	}
}

const BrowseRecipes = () => {
  const [apiRecipes, setApiRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const skeletonCount = 6;
  
  console.log("Api recipes: ", apiRecipes)
  // useEffect(() => {
  //   dispatch(makeRecipeApiCall());
  // }, [dispatch]);

  const sortRecipes = (recipes) => {
    const sortedRecipes = [];
    recipes.forEach(recipe => {
      if (recipe.description.length !== 0) {
        sortedRecipes.push(recipe);
      }
    });
    return sortedRecipes;
  }
  
  const makeRecipeApiCall = () => {
    try {
      fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=100&tags=lunch', options)
        .then(response => response.json())
        .then(jsonifiedReponse => {
          setApiRecipes(sortRecipes(jsonifiedReponse.results))
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
        });
    } catch (error) {
      
      console.log("Api call failed: ", error);
    }
  }
  

  const handleRecipeButtonClick = () => {
    setIsLoading(true);
    makeRecipeApiCall();
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
        {(apiRecipes) ? (
          <Grid container spacing={2}>
            {apiRecipes.map((apiRecipe) =>
              <Grid item xs={12} sm={6} md={4} key={apiRecipe.id}>
                <RecipeCard {...apiRecipe} />
              </Grid>
            )}
          </Grid>
        ) : (null)
        }
      </>
    );
  }
}

export default BrowseRecipes;