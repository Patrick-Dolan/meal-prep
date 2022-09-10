import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';
import { UserAuth } from '../../Contexts/AuthContext';
import { updateUserDBEntry } from "../../firebasefunctions"

const RegisterDialog =(props) => {
  const { open, setRegisterOpen, successSnackbar, errorSnackbar, setErrorMessage } = props;
  const { registerUser } = UserAuth();
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterOpen(false);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const userDetails = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value
    }

    try {
      const newUser = await registerUser(email, password)
      await updateUserDBEntry(newUser, userDetails)
      successSnackbar();
    } catch (error) {
      setErrorMessage(error.message);
      errorSnackbar();
    }
  }

  const handleClose = () => {
    setRegisterOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Register</DialogTitle>
        <DialogContent>
          <Typography variant="caption">
            Create your account. It's free and only takes a minute.
          </Typography>
          <form ref={form} onSubmit={handleSubmit}>
            <Grid container justifyContent={"center"} spacing={2}>
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstname"
                  label="First Name"
                  type="text"
                  variant="filled"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  id="lastname"
                  label="Last Name"
                  type="text"
                  variant="filled"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="email"
                  variant="filled"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Button 
              type="submit"
              variant="contained"
              fullWidth
              sx={{mt: "1em"}}
            >
              Register
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegisterDialog;