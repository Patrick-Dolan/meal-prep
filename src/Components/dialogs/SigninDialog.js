import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const SigninDialog =(props) => {
  const { open, setSigninOpen } = props;

  const handleSigninClick = () => {
    setSigninOpen(false);
    // TODO Add firebase sign in code here
    alert("Sign-in clicked!")
  };

  const handleClose = () => {
    setSigninOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Sign-in</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </form>
        <Button 
          onClick={handleSigninClick}
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

export default SigninDialog;