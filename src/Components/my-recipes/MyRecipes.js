import { Box, Button, Container,  Divider, Typography, Slide } from "@mui/material";
import { forwardRef, useState, useEffect } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipeListItem from "./RecipeListItem";
import RecipeCreate from "./RecipeCreate";
import { createRecipeDBEntry, getUserRecipes } from "../../firebasefunctions";
import { UserAuth } from "../../Contexts/AuthContext";

const placeholderRecipe = {
  name: "Chicken Teriyaki Bowl",
  description: "This easy Chicken Teriyaki bowl is loaded with juicy morsels of chicken glazed in a simple three-ingredient teriyaki sauce. Served over a bowl of rice and veggies, it's a quick weekday meal that comes together in about fifteen minutes.",
  cooktime: 10,
  thumbnail_url: "https://norecipes.com/wp-content/uploads/2021/07/chicken-teriyaki-bowl-004-1200x1799.jpg",
  thumbnial_alt_text: "Chicken teriyaki bowl",
  isPublic: true,
  isDraft: false,
  nutritionFacts: [
  {
    name: "Calories",
    value: 812
  },
  {
    name: "Carbs",
    value: 60
  },
  {
    name: "Fat",
    value: 39
  },
  {
    name: "Protien",
    value: 50
  },
  {
    name: "Sugar",
    value: 19
  },
  ],
  instructions: [
    {
      step: 1,
      instruction: "Bring a pot of salted water to a boil and cook the carrots for 7-10 minutes or until they’re tender. When the carrots are tender, add the broccoli. When the water returns to a full boil, drain the vegetables."
    },
    {
      step: 2,
      instruction: "While the carrots cook, place the pieces of chicken skin-side down in a cold non-stick frying pan. Turn the heat on to medium-low and let the fat slowly render out of the skin."
    },
    {
      step: 3,
      instruction: "When the chicken is cooked 2/3 of the way through, flip the pieces over and let them fry until the chicken is just barely cooked through."
    },
    {
      step: 4,
      instruction: "Remove the chicken from the pan and use paper towels to wipe out the pan."
    },
    {
      step: 5,
      instruction: "Add the sake, soy sauce, and sugar to the clean pan and turn up the heat to boil the teriyaki sauce until thick and syrupy."
    },
    {
      step: 6,
      instruction: "Return the chicken to the pan and toss to glaze each piece of chicken evenly with the sauce."
    },
    {
      step: 7,
      instruction: "To assemble the chicken teriyaki bowl, split two servings of rice between two bowls and then top half of the rice in each bowl with the chicken. Next, add the vegetables to the other half and then drizzle the chicken and veggies with the remaining teriyaki sauce."
    },
  ],
  ingredients: [
  {
    amount: 1,
    unit: "small head",
    name: "Broccoli"
  },
  {
    amount: 1,
    unit: "small",
    name: "Carrot"
  },
  {
    amount: 450,
    unit: "grams",
    name: "Skin-on boneless chicken thighs"
  },
  {
    amount: .25,
    unit: "cup",
    name: "Sake"
  },
  {
    amount: 2,
    unit: "tablespoons",
    name: "Soy Sauce"
  },
  {
    amount: 2,
    unit: "tablespoons",
    name: "Sugar"
  },
  {
    amount: 2,
    unit: "servings",
    name: "Cooked Rice"
  },
  {
    amount: 1,
    unit: "teaspoon",
    name: "Black Sesame Seeds"
  }
  ]
}

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

  // TODO fix useEffect to re-render recipes when a new one is added
  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getUserRecipes(user);
      console.log(recipes)
      setUserRecipes(recipes);
    }
    
    getRecipes();
  }, [user, user.recipes])

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
        {(userRecipes) ? (
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
        <RecipeListItem 
          setOpen={setOpenEdit}
          setSelectedRecipe={setSelectedRecipe}
          recipe={placeholderRecipe} 
        />
      </Box>
      <Box sx={{mb: ".5em"}}>
        <RecipeListItem recipe={placeholderRecipe} />
      </Box>
      <Box sx={{mb: ".5em"}}>
        <RecipeListItem recipe={placeholderRecipe} />
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
      />
    </Container>
  )
}

export default MyRecipes;