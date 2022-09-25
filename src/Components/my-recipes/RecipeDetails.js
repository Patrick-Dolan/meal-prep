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
          <Grid 
            container 
            justifyContent="center"
            alignItems={"center"}
          >
            <Grid item xs={12} sm={6} md={6} >
              <CardMedia 
                src={recipe?.thumbnail_url} 
                component="img" 
                sx={{ width: "75%", height: "250px", margin: "auto", py: "1em" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h4">{recipe?.name}</Typography>
              <Divider />
              <Typography variant="subtitle1" component="div">
                {recipe?.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{mt: "1em"}}>
            <Grid item xs={12} sm={6} md={6}>
              <IngredientsTable
                ingredients={recipe?.ingredients}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <NutritionTable
                nutrition={recipe?.nutrition}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              my: "2em"
            }}
          >
            <Typography variant="h5">Instructions</Typography>
            <Divider />
            {recipe?.instructions.map((instruction) => 
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
            )}
          </Box>
        </Container>
      </Dialog>
  )
}

export default RecipeDetails;