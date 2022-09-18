import { Button, Divider, Grid, TextField, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ConfirmAuthDialog from "../dialogs/ConfirmAuthDialog";

const AccountSettings = () => {
  const { user, setUser, updateUserEmail } = UserAuth();
  const [ editEmailAndPassword, setEditEmailAndPassword ] = useState(false);
  const [ authConfirmed, setAuthConfirmed ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ newEmail, setNewEmail ] = useState();
  
  useEffect(() => {
    if (authConfirmed) {
      updateEmail();
      // Set user manually to update component immediately
      setUser(prev => ({...prev, email: newEmail}))
    }
    setAuthConfirmed(false);
    setEditEmailAndPassword(false);
  }, [authConfirmed])

  const handleEditClick = () => {
    setEditEmailAndPassword(true);
    if (editEmailAndPassword) {setEditEmailAndPassword(false)}
  }

  const updateEmail = async () => {
    try {
      await updateUserEmail(newEmail)
      console.log("Updated successfully");
    } catch(e) {
      console.log("Email update error: ", e.message);
    }
  }

  const handleSubmitAccountChanges = async () => {
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
            {/* TODO setup system to count password length or figure out how to show number of characters in password */}
            {(editEmailAndPassword) ? (
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                required
              />
            ) : (
              <Typography variant="body2">*********</Typography>
            )}
          </Grid>
        </Grid>
        {(editEmailAndPassword) ? (
            <Button
              onClick={handleSubmitAccountChanges}
              startIcon={<SaveIcon />}
              variant="contained"
              size="small"
              sx={{mb: "1.5em"}}
            >
              Save changes
            </Button>
          ) : (
            null
          )}
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