import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';

const RegisterDialog =(props) => {
  const { open, setRegisterOpen } = props;

  const handleRegisterClick = () => {
    setRegisterOpen(false);
    // TODO Add firebase register action
    alert("Register clicked!")

  };

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
          <form>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstname"
                  label="First Name"
                  type="email"
                  fullWidth
                  variant="filled"
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  id="lastname"
                  label="Last Name"
                  type="email"
                  fullWidth
                  variant="filled"
                />
              </Grid>
            </Grid>
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="filled"
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="filled"
            />
          </form>
        <Button 
          onClick={handleRegisterClick}
          variant="contained"
          fullWidth
          sx={{mt: "1em"}}
        >
          Register
        </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegisterDialog;