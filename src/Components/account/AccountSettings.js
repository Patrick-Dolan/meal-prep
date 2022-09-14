import { Button, Divider, Grid, TextField, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const AccountSettings = () => {
  const { user } = UserAuth();
  const [ editEmailAndPassword, setEditEmailAndPassword ] = useState(false);

  const handleEditClick = () => {
    setEditEmailAndPassword(true);
    if (editEmailAndPassword) {setEditEmailAndPassword(false)}
  }

  const handleSubmitAccountChanges = () => {
    alert("Account changes clicked!")
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
    </Paper>
  )
}

export default AccountSettings;