import { Button, Divider, Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import Dropzone from "./Dropzone";
import { updateRecipeDBEntry } from "../../firebasefunctions";
import { UserAuth } from "../../Contexts/AuthContext";

const RecipeForm = (props) => {
  const { newRecipeId, setOpenCreate } = props;
  const [name, setName] = useState("New Recipe");
  const [description, setDescription] = useState("");
  const [cooktime, setCooktime] = useState("");
  const [nutritionFacts, setNutritionFacts] = useState([]);
  const [instructions, setInstructions] = useState([{ step: 1, instruction: ""}])
  const [ingredients, setIngredients] = useState([{ amount: 0, measurement: "", name: "", index: 0}])
  const [openDropzone, setOpenDropzone] = useState(false);
  const [recipeImageURL, setRecipeImageURL] = useState([]);
  const [recipePreviewImage, setRecipePreviewImage] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    console.log(recipePreviewImage[0]);
  }, [recipePreviewImage])

  const theme = useTheme();

  const handleDropzoneClickOpen = () => {
    setOpenDropzone(true);
  };

  const handleAddInstructionTextField = () => {
    setInstructions([...instructions, {step: instructions.length + 1, instruction: ""}]);
  }

  const handleAddIngredientField = () => {
    setIngredients([...ingredients, {name: "", amount: 0, measurement: "", index: ingredients.length}]);
  }

  const handleInstructionsChange = (e, index) => {
    // Filter out old instruction the add and sort new one in
    const tempInstructions = instructions.filter((a) => a.step !== index + 1);
    const updatedInstructions = [...tempInstructions, {...instructions[index], instruction: e.target.value.trim()}].sort((a, b) => a.step > b.step ? 1 : -1);
    setInstructions(updatedInstructions);
  }

  const handleIngredientsValueChange = (e, index, value) => {
    // Filter out old ingredient the add and sort new one in
    const tempIngredients = ingredients.filter((a) => a.index !== index);
    const updatedIngredients = [...tempIngredients, {...ingredients[index], [value]: e.target.value.trim()}].sort((a, b) => a.index > b.index ? 1 : -1);
    setIngredients(updatedIngredients);
  }

  console.log(ingredients)
  
  const handleNutritionChange = (factName, e) => {
    // Filter out old nutrition fact then add new one in
    const filteredNutritionFacts = nutritionFacts.filter((a) => a.name !== factName);
    setNutritionFacts([...filteredNutritionFacts, { name: factName, value: e.target.value }]);
  }

  // Takes in boolean indicating if its a draft or not
  const uploadRecipe = async (isDraft) => {
    // Create Recipe Obj
    const recipe = {
      name: name,
      id: newRecipeId,
      description: description,
      cooktime: cooktime,
      nutritionFacts: nutritionFacts,
      instructions: instructions,
      ingredients: ingredients,
      isDraft: isDraft,
      isPublic: !isDraft,
      thumbnail_url: recipeImageURL || "https://bit.ly/3dSiUZK",
      thumbnial_alt_text: name || "New Recipe"
    }

    // Upload to firestore
    try {
      await updateRecipeDBEntry(user, recipe);
    } catch (error) {
      // TODO add snackbar for success and fail
      console.log(error.message);
    }
  }

  const handleSaveDraft = () => {
    uploadRecipe(true);
    setOpenCreate(false);
  }

  const handlePublishRecipe = () => {
    uploadRecipe(false);
    setOpenCreate(false);
  }

  return (
    <Container sx={{mb: "5em"}}>
      <Box
        sx={{
          textAlign: "center"
        }}
      >
        <Typography variant="h4">{name}</Typography>
      </Box>
      <Divider />
      <Grid container spacing={2} sx={{mt: ".5em"}}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            required
            name="name"
            label="Recipe Name"
            variant="outlined"
            onChange={(e) => setName((e.target.value.length > 0) ? (e.target.value) : ("New Recipe"))}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            multiline
            name="name"
            label="Description"
            variant="outlined"
            minRows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            type="number"
            name="cooktime"
            label="Cook Time"
            helperText="Cook time is measured in minutes."
            variant="outlined"
            onChange={(e) => setCooktime(e.target.value)}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: "1em"}}>Recipe photo</Typography>
      <Typography variant="subtitle2" color={theme.palette.text.secondary} sx={{mb: ".5em"}}>Image types accepted include jpeg, jpg, and png.</Typography>
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={12} sm={12} md={12}>
          {(recipePreviewImage[0]?.preview) ? (
              <Box 
                sx={{
                  border: "1px solid black",
                  height:"100%",
                  display:"flex",
                  justifyContent:"center",
                  flexDirection:"column"
                }}
              >
                <Box sx={{mx :"auto", py: "1em"}}>
                  <img src={recipePreviewImage[0].preview} style={{width: "10em"}} alt="Recipe preview" />
                </Box>
                <Typography variant="h5">Recipe Image Preview</Typography>
                <Button 
                  onClick={handleDropzoneClickOpen}
                  variant="outlined"
                  sx= {{
                    maxWidth: "10em",
                    m: "auto",
                    mb: "1em"
                  }}
                >
                  Change Image
                </Button>
                <Dropzone
                  setRecipePreviewImage={setRecipePreviewImage}
                  openDropzone={openDropzone}
                  setOpenDropzone={setOpenDropzone}
                  newRecipeId={newRecipeId}
                  user={user}
                  setRecipeImageURL={setRecipeImageURL}
                />
              </Box>
          ) : (
            <>
              <Box 
                sx={{
                  border: "1px solid black",
                  height:"100%",
                  display:"flex",
                  justifyContent:"center",
                  flexDirection:"column"
                }}
              >
                <Typography variant="h5" sx={{py: "3em"}}>Recipe Image preview</Typography>
              <Button 
                onClick={handleDropzoneClickOpen}
                variant="outlined"
                sx= {{
                  maxWidth: "10em",
                  m: "auto",
                  mb: "1em"
                }}
              >
                Upload Image
              </Button>
              </Box>
              <Dropzone
                setRecipePreviewImage={setRecipePreviewImage}
                openDropzone={openDropzone}
                setOpenDropzone={setOpenDropzone}
                newRecipeId={newRecipeId}
                user={user}
                setRecipeImageURL={setRecipeImageURL}
              />
            </>
          )}
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: "1em"}}>Nutrition Facts</Typography>
      <Typography variant="subtitle2" color={theme.palette.text.secondary}>All Nutrional information, other than calories, is saved in grams.</Typography>
      <Grid container sx={{ mt: ".5em"}}>
        <Grid container item spacing={2} >
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              name="calories"
              type="number"
              label="Calories"
              variant="outlined"
              onChange={(e) => handleNutritionChange("Calories", e)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              name="sugar"
              type="number"
              label="Sugar"
              variant="outlined"
              onChange={(e) => handleNutritionChange("Sugar", e)}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} sx={{mt: ".5em"}}>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              name="carbs"
              type="number"
              label="Carbs"
              variant="outlined"
              onChange={(e) => handleNutritionChange("Carbs", e)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              name="fat"
              type="number"
              label="Fat"
              variant="outlined"
              onChange={(e) => handleNutritionChange("Fat", e)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              fullWidth
              name="protien"
              type="number"
              label="Protien"
              variant="outlined"
              onChange={(e) => handleNutritionChange("Protien", e)}
            />
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" sx={{ mt: "1em"}}>Ingredients</Typography>
            <Typography variant="subtitle2" color={theme.palette.text.secondary}>You can add up to 50 ingredients.</Typography>
            {ingredients.map((ingredient) => 
              <Box key={ingredient.index}>
                <Grid container item xs={12} sm={12} md={12} spacing={1}>
                  <Grid item xs={12} sm={2} md={2}>
                    <FormControl fullWidth sx={{ mt: "1em"}} >
                      <TextField
                        fullWidth
                        type="number"
                        size="small"
                        InputProps={{ inputProps: {min: 0}}}
                        key={ingredient.index}
                        label={"Amount"}
                        variant="outlined"
                        onChange={(e) => handleIngredientsValueChange(e, ingredient.index, "amount")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                    <FormControl fullWidth sx={{ mt: "1em"}} size="small">
                      <InputLabel id="ingredientMeasurement">Measurement</InputLabel>
                      <Select
                        value={ingredient.measurement}
                        label="Measurement"
                        
                        onChange={(e) => handleIngredientsValueChange(e, ingredient.index, "measurement")}
                      >
                        <MenuItem value={"Tablespoon(s)"}>Tablespoon(s)</MenuItem>
                        <MenuItem value={"Teaspoon(s)"}>Teaspoon(s)</MenuItem>
                        <MenuItem value={"Ounce(s)"}>Ounce(s)</MenuItem>
                        <MenuItem value={"Fluid ounce(s)"}>Fluid ounce(s)</MenuItem>
                        <MenuItem value={"Cup(s)"}>Cup(s)</MenuItem>
                        <MenuItem value={"Quart(s)"}>Quart(s)</MenuItem>
                        <MenuItem value={"Pint(s)"}>Pint(s)</MenuItem>
                        <MenuItem value={"Gallon(s)"}>Gallon(s)</MenuItem>
                        <MenuItem value={"Pound(s)"}>Pound(s)</MenuItem>
                        <MenuItem value={"Milliliter(s)"}>Milliliter(s)</MenuItem>
                        <MenuItem value={"Gram(s)"}>Gram(s)</MenuItem>
                        <MenuItem value={"Kilogram(s)"}>Kilogram(s)</MenuItem>
                        <MenuItem value={"Liter(s)"}>Liter(s)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <FormControl fullWidth sx={{ mt: "1em"}}>
                      <TextField
                        fullWidth
                        size="small"
                        key={ingredient.index}
                        label={"Ingredient " + (ingredient.index + 1)}
                        variant="outlined"
                        onChange={(e) => handleIngredientsValueChange(e, ingredient.index, "name")}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
            {(ingredients.length >= 50) ? (null) : (
              <Button
                onClick={handleAddIngredientField}
                variant="outlined"
                sx={{mt: ".5em"}}
              >
                Add another ingredient
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" sx={{ mt: "1em"}}>Instructions</Typography>
            <Typography variant="subtitle2" color={theme.palette.text.secondary}>You can add up to 50 instructions.</Typography>
            {instructions.map((instruction, index) => 
              <TextField
                fullWidth
                multiline
                sx={{mt: "1em"}}
                key={instruction.step}
                label={"Step " + instruction.step}
                variant="outlined"
                onChange={(e) => handleInstructionsChange(e, index)}
              />
            )}
            {(instructions.length >= 50) ? (null) : (
              <Button
                onClick={handleAddInstructionTextField}
                variant="outlined"
                sx={{mt: ".5em"}}
              >
                Add another instruction
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container item sx={{mt: "2em"}}>
          <Grid item xs={12} sm={6} md={6}>
            <Button
              onClick={handleSaveDraft}
              sx={{ minWidth: "10em"}}
              variant="contained"
            >
              Save Draft
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              sx={{display: "flex", justifyContent: "flex-end"}}
            >
              <Button
                onClick={handlePublishRecipe}
                sx={{ minWidth: "10em", ml: {sm: ".5em", md: ".5em"}}}
                variant="contained"
              >
                Publish
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RecipeForm;