import { Box, Typography, Toolbar, AppBar, IconButton, Dialog, Divider, CardMedia, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Container } from "@mui/system";
import IngredientsTable from "../recipes/IngedientsTable";
import NutritionTable from "../recipes/NutritionTable";
import { useTheme } from "@mui/material/styles";

const RecipeDetails = (props) => {
  const { setOpen, Transition, open, recipe } = props;
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const circle = {
    borderRadius: "50%",
    width: "1.25em",
    height: "1.25em",
    padding: ".75em",
    background: theme.palette.primary.main,
    color: "#fff",
    textAlign: "center",
    my: ".5em",
  }

  return (
    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "sticky" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {recipe?.name} Details
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{mt: "1em"}}>
          <Box
            sx={{
              float: {xs: "none", sm:"left", md: "left"}
            }}
          >
            <CardMedia 
              src={recipe?.thumbnail_url} 
              component="img" 
              sx={{
                width: "75%", 
                height: "250px", 
                margin: "auto", 
                py: "1em", 
                px: "3em" 
              }}
            />
          </Box>
          <Box>
            <Typography variant="h4">{recipe?.name}</Typography>
            <Divider />
            <Typography variant="subtitle2" component="div">
              {(recipe?.description) ? (recipe.description) : ("No description available.")}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{mt: "1em"}}>
            <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5">Ingredients</Typography>
            <Divider />
              {(recipe?.ingredients && recipe?.ingredients[0].name.length !== 0) ? (
                <IngredientsTable
                  ingredients={recipe.ingredients}
                />
              ) : (
                <Typography variant="subtitle2">No ingredients Available.</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5">Nutrition Facts</Typography>
            <Divider />
              {(recipe?.nutritionFacts && recipe?.nutritionFacts.length > 0) ? (
                <NutritionTable
                  nutrition={recipe.nutritionFacts}
                />
              ) : (
                <Typography variant="subtitle2">No nutrition information Available.</Typography>
              )}
            </Grid>
          </Grid>
          <Box
            sx={{
              my: "2em"
            }}
          >
            <Typography variant="h5">Instructions</Typography>
            <Divider />
            {(recipe?.instructions && recipe?.instructions[0].instruction.length !== 0) ? (
              recipe?.instructions?.map((instruction) => 
                <Grid 
                  container 
                  key={instruction.step}  
                  direction="row"
                >
                  <Grid item xs={2} sm={2} md={1} sx={{my: "2em"}}>
                    <Box sx={circle}>
                      <Typography variant="subtitle2">{instruction.step}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={9} sm={10} md={10} sx={{my: "2em"}}>
                    <Typography variant="body1">{instruction.instruction}</Typography>
                  </Grid>
                </Grid>
                )
            ) : (
              <Typography variant="subtitle2">No instructions available.</Typography>
            )}
          </Box>
        </Container>
      </Dialog>
  )
}

export default RecipeDetails;