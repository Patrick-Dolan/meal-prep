import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import MealPrepWithCircle from "../../assets/MealPrepWithCircle";

const Homepage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container textAlign={"center"} justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <MealPrepWithCircle width="300" height="300" />
          <Typography variant="h4">Meal Prep</Typography>
          <Typography variant="h6">Your guide to better eating</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          
        </Grid>
      </Grid>
    </Container>
  )
}

export default Homepage;