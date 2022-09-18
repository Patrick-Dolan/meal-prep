import { Button, Divider, Grid, TextField, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ConfirmAuthDialog from "../dialogs/ConfirmAuthDialog";

const AccountSettings = () => {
  const { user, setUser, updateUserEmail, updateUserPassword } = UserAuth();
  const [ editEmailAndPassword, setEditEmailAndPassword ] = useState(false);
  const [ authConfirmed, setAuthConfirmed ] = useState(false);
  const [ changeUserEmail, setChangeUserEmail ] = useState(false);
  const [ changeUserPassword, setChangeUserPassword ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ newEmail, setNewEmail ] = useState(user.email);
  const [ newPassword, setNewPassword ] = useState("");

  const handleEditClick = () => {
    setEditEmailAndPassword(true);
    if (editEmailAndPassword) {setEditEmailAndPassword(false)}
  }

  // TODO add snackbars to signify success and show errors
  const handlePasswordUpdate = useCallback(() => {
    const updatePassword = async () => {
      try {
        if (newPassword?.length > 0) {
          await updateUserPassword(newPassword.trim());
          console.log("Password updated successfully");
        } else {
          console.log("Password update unnecessary");
        }
      } catch(e) {
        console.log("Password update error: ", e.message);
      }
    }
    // Run password update and clean up state for any other changes
    if (authConfirmed && changeUserPassword) {
      updatePassword();
      setAuthConfirmed(prev => prev = false);
      setEditEmailAndPassword(prev => prev = false)
    }
  }, [authConfirmed, newPassword, updateUserPassword, changeUserPassword])

  const handleEmailUpdate = useCallback(() => {
    const updateEmail = async () => {
      try {
        if (user.email !== newEmail) {
          await updateUserEmail(newEmail)
          setUser(prev => ({...prev, email: newEmail.trim()}));
          console.log("Email updated successfully");
        } else {
          console.log("Email update unnecessary");
        }
      } catch(e) {
        console.log("Email update error: ", e.message);
      }
    }
    // Run password update and clean up state for any other changes
    if (authConfirmed && changeUserEmail) {
      updateEmail();
      setAuthConfirmed(prev => prev = false);
      setEditEmailAndPassword(prev => prev = false)
    }
  }, [authConfirmed, newEmail, setUser, updateUserEmail, user.email, changeUserEmail])

  useEffect(() => {
    handleEmailUpdate();
    handlePasswordUpdate();
  }, [authConfirmed, handleEmailUpdate, handlePasswordUpdate])

  const handleEditEmailChange = () => {
    setChangeUserEmail(true);
    setOpen(true);
  }

  const handleEditPasswordChange = () => {
    setChangeUserPassword(true);
    setOpen(true);
  }

  return (
    <Paper elevation={5}>
      <Container maxWidth="lg">
      <Divider sx={{pt: "1em"}}><Typography variant="h5" fontWeight="500">Account Settings</Typography></Divider>
        <Grid container justifyContent={"space-between"} alignItems="center">
          <Grid item>
            <Typography variant="h6" sx={{pt: ".5em"}}>Settings</Typography>
          </Grid>
          <Grid item>
            <Button 
              startIcon={<EditIcon />} 
              onClick={handleEditClick}
              variant="outlined" 
              size="small"
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <Grid container sx={{pb: "4em", mt: "1em"}}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography variant="body2">Email</Typography>
          </Grid>
          <Grid item xs={9} sm={9} md={9}>
            {(editEmailAndPassword) ? (
              <>
                <TextField
                  onChange={(e) => setNewEmail(e.target.value)}
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  defaultValue={user.email}
                  fullWidth
                  required
                />
                <Button
                  onClick={handleEditEmailChange}
                  startIcon={<SaveIcon />}
                  variant="contained"
                  size="small"
                  sx={{mb: "1.5em"}}
                >
                  Update Email
                </Button>
              </>
            ) : (
              <Typography variant="body2">{user?.email}</Typography>
            )}
          </Grid>
        </Grid>
        <Grid container sx={{pb: "4em"}}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography variant="body2">Password</Typography>
          </Grid>
          <Grid item xs={9} sm={9} md={9}>
            {(editEmailAndPassword) ? (
              <>
                <TextField
                  onChange={(e) => setNewPassword(e.target.value)}
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
                <Button
                  onClick={handleEditPasswordChange}
                  startIcon={<SaveIcon />}
                  variant="contained"
                  size="small"
                  sx={{mb: "1.5em"}}
                >
                  Update Password
                </Button>
              </>
            ) : (
              <Typography variant="body2">*********</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
      <ConfirmAuthDialog
        open={open}
        setOpen={setOpen}
        setAuthConfirmed={setAuthConfirmed}
      />
    </Paper>
  )
}

export default AccountSettings;