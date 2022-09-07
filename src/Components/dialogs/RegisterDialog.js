import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { UserAuth } from '../../Contexts/AuthContext';

const RegisterDialog =(props) => {
  const { open, setRegisterOpen } = props;
  const { registerUser } = UserAuth();
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterOpen(false);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await registerUser(email, password)
    } catch (error) {
      // TODO Add snackbar for error and maybe success?
      console.log(error.message);
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