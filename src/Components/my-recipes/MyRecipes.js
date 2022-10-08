import { Box, Button, Container,  Divider, Typography, Slide } from "@mui/material";
import { forwardRef, useState, useEffect } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipeListItem from "./RecipeListItem";
import RecipeCreate from "./RecipeCreate";
import { createRecipeDBEntry, getUserRecipes } from "../../firebasefunctions";
import { UserAuth } from "../../Contexts/AuthContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [newRecipeId, setNewRecipeId] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getUserRecipes(user);
      console.log(recipes)
      setUserRecipes(recipes);
    }
    
    getRecipes();
  }, [user, newRecipeId])

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  
  const handleCreateClick = async () => {
    setOpenCreate(true);
    try {
      const newRecipeId = await createRecipeDBEntry(user);
      setNewRecipeId(newRecipeId);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleCreateClose = () => {
    setOpenCreate(false);
  };

  return (
    <Container maxWidth="lg" sx={{my: "2em"}}>
      <Typography variant="h4">My Recipes</Typography>
      <Divider sx={{mb: "1em"}} />
      <Button 
        onClick={handleCreateClick}
        variant="contained"
      >
        Add Custom Recipe
      </Button>
      <Box sx={{mb: ".5em"}}>
        {(userRecipes.length > 0) ? (
          <>
            {userRecipes.map((userRecipe) => 
              <Box sx={{mb: ".5em"}} key={userRecipe.key}>
                <RecipeListItem
                  recipe={userRecipe}
                  setOpen={setOpenEdit}
                  setSelectedRecipe={setSelectedRecipe}
                />
              </Box>
            )}
          </>
        ) : (
          <Typography variant="subtitle2">No recipes available.</Typography>
        )}
      </Box>
      <RecipeDetails
        fullScreen
        open={openEdit}
        setOpen={setOpenEdit}
        onClose={handleEditClose}
        Transition={Transition}
        recipe={selectedRecipe}
      />
      <RecipeCreate
        fullScreen
        open={openCreate}
        setOpenCreate={setOpenCreate}
        onClose={handleCreateClose}
        Transition={Transition}
        newRecipeId={newRecipeId}
        userRecipes={userRecipes}
        setUserRecipes={setUserRecipes}
      />
    </Container>
  )
}

export default MyRecipes;