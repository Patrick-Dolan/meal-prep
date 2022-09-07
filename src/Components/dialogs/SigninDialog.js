import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UserAuth } from '../../Contexts/AuthContext';
import { useRef } from "react";

const SigninDialog =(props) => {
  const { open, setSigninOpen } = props;
  const { signIn } = UserAuth();
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigninOpen(false);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    setSigninOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Sign-in</DialogTitle>
        <DialogContent>
          <form ref={form} onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="filled"
            />
            <TextField
              autoFocus
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
              Sign in
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SigninDialog;