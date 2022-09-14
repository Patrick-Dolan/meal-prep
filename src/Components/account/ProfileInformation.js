import { Container } from "@mui/system";
import { Button, Divider, Grid, Typography, Paper, TextField } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";
import { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';

const ProfileInformation = () => {
  const { user } = UserAuth();
  const [ editProfile, setEditProfile ] = useState(false);
  // const theme = useTheme();

  const handleEditClick = () => {
    setEditProfile(true);
    if (editProfile) {setEditProfile(false)}
  }

  const labelStyles = {
    color: "#6C6C6C"
  }

  // TODO setup profile information form, submission, and firestore update
  return (
      <Paper elevation={5}>
        <Container maxWidth="lg">
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Typography variant="h6" sx={{pt: ".5em"}}>Profile Information</Typography>
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
              <Typography variant="body2" sx={labelStyles}>First Name</Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              {(editProfile) ? (
                <TextField
                  margin="dense"
                  id="firstname"
                  label="First Name"
                  type="text"
                  variant="outlined"
                  size="small"
                  defaultValue={user.firstName}
                  fullWidth
                  required
                />
                ) : (
                  <Typography variant="body2">{user?.firstName}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{pb: "4em"}}>
            <Grid item xs={3} sm={3} md={3}>
              <Typography variant="body2"  sx={labelStyles}>Last Name</Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              {(editProfile) ? (
                <TextField
                  margin="dense"
                  id="lastname"
                  label="Last Name"
                  type="text"
                  variant="outlined"
                  size="small"
                  defaultValue={user.lastName}
                  fullWidth
                  required
                />
                ) : (
                  <Typography variant="body2">{user?.lastName}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{pb: "4em"}}>
            <Grid item xs={3} sm={3} md={3}>
              <Typography variant="body2"  sx={labelStyles}>Favorite Foods</Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              {(editProfile) ? (
                <TextField
                  margin="dense"
                  id="favoriteFoods"
                  label="Favorite Foods"
                  type="text"
                  variant="outlined"
                  size="small"
                  defaultValue={user?.favoriteFoods}
                  fullWidth
                />
              ) : (
                <Typography variant="body2">{(user?.favoriteFoods) ? (user?.favoriteFoods) : ("Share your favorite foods here.")}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{pb: "4em"}}>
            <Grid item xs={3} sm={3} md={3}>
              <Typography variant="body2"  sx={labelStyles}>Food Allergies</Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              {(editProfile) ? (
                <TextField
                  margin="dense"
                  id="foodAllergies"
                  label="Food Allergies"
                  type="text"
                  variant="outlined"
                  size="small"
                  defaultValue={user?.foodAllergies}
                  fullWidth
                />
              ) : (
                <Typography variant="body2">{(user?.foodAllergies) ? (user?.foodAllergies) : ("Share any food allergies you have here.")}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{pb: "4em"}}>
            <Grid item xs={3} sm={3} md={3}>
              <Typography variant="body2"  sx={labelStyles}>Bio</Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              {(editProfile) ? (
                <TextField
                  margin="dense"
                  id="bio"
                  label="Bio"
                  type="text"
                  variant="outlined"
                  size="small"
                  defaultValue={user?.bio}
                  fullWidth
                />
              ) : (
                <Typography variant="body2">{(user?.bio) ? (user?.bio) : ("Tell us about yourself!")}</Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Paper>
  )
}

export default ProfileInformation;