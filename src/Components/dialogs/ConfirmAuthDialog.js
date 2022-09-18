import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UserAuth } from '../../Contexts/AuthContext';
import { useRef } from "react";
import { EmailAuthProvider } from 'firebase/auth';

const ConfirmAuthDialog =(props) => {
  const { open, setOpen, setAuthConfirmed } = props;
  const { user, confirmAuth } = UserAuth();
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

    const password = e.target.password.value;

    const credentials = EmailAuthProvider.credential(
      user.email,
      password
    )

    try {
      await confirmAuth(credentials);
      setAuthConfirmed(true);
      console.log("Successfully confirmed authentication");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Confirm Password</DialogTitle>
        <DialogContent>
          <form ref={form} onSubmit={handleSubmit}>
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
              Confirm
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConfirmAuthDialog;