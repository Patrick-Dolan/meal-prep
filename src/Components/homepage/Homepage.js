import { Alert, Snackbar, Grid, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { UserAuth } from '../../Contexts/AuthContext';
import MealPrepWithCircle from "../../assets/MealPrepWithCircle";
import RegisterDialog from "../dialogs/RegisterDialog";
import SigninDialog from "../dialogs/SigninDialog";

const Homepage = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = UserAuth();

  const handleUserRegisterClick = () => {
    setRegisterOpen(true);
  };

  const handleUserSigninClick = () => {
    setSigninOpen(true);
  };

  const handleSuccessSnackbar = () => {
    setSuccessSnackbarOpen(true);
  }

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackbarOpen(false);
  }

  const handleErrorSnackbar = () => {
    setErrorSnackbarOpen(true);
  }

  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorSnackbarOpen(false);
  }

  return (
    <Container maxWidth="xl">
      <Grid container textAlign={"center"} justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <MealPrepWithCircle width="300" height="300" />
          <Typography variant="h4">Meal Prep</Typography>
          <Typography variant="h6">Your guide to better eating</Typography>
          {(user.uid) ? (null) : (
            <>
              <Button
                onClick={handleUserRegisterClick}
              >
                Register
              </Button>
              <Button
                onClick={handleUserSigninClick}
              >
                Sign-on
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          
        </Grid>
      </Grid>
      <RegisterDialog 
          open={registerOpen} 
          setRegisterOpen={setRegisterOpen} 
          successSnackbar={handleSuccessSnackbar}
          errorSnackbar={handleErrorSnackbar}
          setErrorMessage={setErrorMessage}
        />
        <SigninDialog 
          open={signinOpen} 
          setSigninOpen={setSigninOpen} 
        />
      <Snackbar 
        autoHideDuration={4000}
        message="You're registered. Welcome to Meal Prep!"
        open={successSnackbarOpen}
        onClose={handleSuccessSnackbarClose}
      >
        {/* // TODO change alert styling */}
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{backgroundColor: "green", color: "white"}}>
          You're registered. Welcome to Meal Prep!
        </Alert>
      </Snackbar>
      <Snackbar 
        autoHideDuration={4000}
        message={`Registration failed. Error: ${errorMessage}`} 
        open={errorSnackbarOpen}
        onClose={handleErrorSnackbarClose}
      >
        {/* // TODO change alert styling */}
        <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{backgroundColor: "red", color: "white"}}>
        {`Registration failed. Error: ${errorMessage}`} 
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Homepage;