import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { useTheme } from "@emotion/react";

const RecipeForm = () => {
  const [name, setName] = useState("New Recipe");
  const [description, setDescription] = useState("");
  const [nutritionFacts, setNutritionFacts] = useState([]);
  const [instructions, setInstructions] = useState([{ step: 1, instruction: ""}])

  const theme = useTheme();

  const handleAddInstructionTextField = () => {
    setInstructions([...instructions, {step: instructions.length + 1, instruction: ""}]);
  }

  const handleInstructionsChange = (e, index) => {
    // Filter out old instruction the add and sort new one in
    const tempInstructions = instructions.filter((a) => a.step !== index + 1);
    const updatedInstructions = [...tempInstructions, {...instructions[index], instruction: e.target.value.trim()}].sort((a, b) => a.step > b.step ? 1 : -1);
    setInstructions(updatedInstructions);
  }

  const handleNutritionChange = (factName, e) => {
    const filteredNutritionFacts = nutritionFacts.filter((a) => a.name !== factName);
    setNutritionFacts([...filteredNutritionFacts, { name: factName, value: e.target.value }]);
  }

  const handleSaveDraft = () => {
    alert("Save clicked")
  }

  const handlePublishRecipe = () => {
    alert("Publish clicked")
  }

  console.log(nutritionFacts)

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
      </Grid>
      <Grid container sx={{ border: "2px dashed grey", mt: "1em"}}>
        <Grid item xs={12} sm={6} md={6}>
          <Box sx={{p: "6em", backgroundColor: "Blue"}}>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box sx={{textAlign: "center", p: "5em"}}>
            <Typography variant="h5">Upload placeholders</Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: "1em"}}>Nutrition Facts</Typography>
      <Typography variant="subtitle2" color={theme.palette.text.secondary}>All Nutrional information is saved in grams.</Typography>
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