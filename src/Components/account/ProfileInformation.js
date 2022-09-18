import { Container } from "@mui/system";
import { Button, Divider, Grid, Typography, Paper, TextField, Avatar, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Link } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { updateUserDBEntry } from "../../firebasefunctions"
import { db, storage } from "../../firebase";
import { useState, useRef } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const ProfileInformation = () => {
  const { user, setUser } = UserAuth();
  const [ editProfileInformation, setEditProfileInformation ] = useState(false);
  const [ editProfilePhoto, setEditProfilePhoto ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const form = useRef();

  const handleEditProfileInformationClick = () => {
    setEditProfileInformation(true);
    if (editProfileInformation) {setEditProfileInformation(false)}
  }

  const handleEditProfileClick = () => {
    setEditProfilePhoto(true);
    if (editProfilePhoto) {setEditProfilePhoto(false)}
  }

  const handleSubmitProfileChanges = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: e.target.firstName.value.trim(),
      lastName: e.target.lastName.value.trim(),
      favoriteFoods: e.target.favoriteFoods.value.trim(),
      foodAllergies: e.target.foodAllergies.value.trim(),
      bio: e.target.bio.value.trim()
    }

    try {
      await updateUserDBEntry(user, payload);
      setUser({
        ...user,
        ...payload
      });
    } catch (error) {
      console.log("Profile Information error: ", e.message);
    }

    setEditProfileInformation(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadProfilePicture = async (file) => {
    // Delete old pfp if it exists
    if (user.photoPath != null && user.photoURL != null) {
      deleteProfilePicture();
      deleteProfilePictureUserFields();
    }

    // Create filepath for new profile picture
    let filePath = `media/users/${user.uid}/profilepicture/${file[0].name}`;

    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          console.log("Error");
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
      console.log("Upload Error: ", error.message)
    }, 
    () => {
      // Handle successful uploads on complete
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        try {
          // Setup updated user db record and update it
          let payload = {
            photoURL: downloadURL, 
            photoPath: filePath
          }
          updateUserDBEntry(user, payload)
          // Set state so site will rerender immediately
          setUser({...user, ...payload})
        } catch (e) {
          console.log("Update Error: ", e.message)
        }
      });
    }
    );
  }

  const deleteProfilePictureUserFields = async () => {
    try {
      const userDbEntry = doc(db, "users", user.uid);
  
      await updateDoc(userDbEntry, {
        photoPath: deleteField(),
        photoURL: deleteField()
      })

      const updatedUser = {
        ...user,
        photoPath: null,
        photoURL: null
      }
      setUser({...updatedUser});
    } catch (error) {
      console.log("Database entry deletion error: ", error.message);
    }
  }

  const deleteProfilePicture = async () => {
    try {
      const storageRef = ref(storage, user.photoPath);

      // Delete the file
      deleteObject(storageRef).then(() => {
        // TODO add success snackbar
        console.log("Picture deletion successful")
      }).catch((error) => {
        // TODO add success snackbar
        console.log("Picture deletion failed: ", error.message)
      });
    } catch (error) {
      console.log("Delete file error: ", error.message);
    }
  }

  const handleFileUpload = (e) => {
    if (user.uid) {
      uploadProfilePicture(e.target.files);
    }
  }

  const handleFileDelete = () => {
    deleteProfilePicture();
    deleteProfilePictureUserFields();
    handleClose();
  }

  const labelStyles = {
    color: "#6C6C6C"
  }

  return (
      <Paper elevation={5} sx={{mb: "1em"}}>
        <Container maxWidth="lg">
          <Divider sx={{pt: "1em"}}><Typography variant="h5" fontWeight="500">Profile</Typography></Divider>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Typography variant="h6" sx={{pt: ".5em"}}>Profile Picture</Typography>
            </Grid>
            <Grid item>
              <Button 
                startIcon={<EditIcon />} 
                onClick={handleEditProfileClick}
                variant="outlined" 
                size="small"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Divider />
          {/* Profile Photo Section */}
          <Grid container direction="row" alignItems={"center"} sx={{mt: "1em"}}>
            <Grid item>
              <Avatar 
                sx={{height: "5em", width: "5em"}} 
                alt={user?.firstName}
                src={user.photoURL}
              />
            </Grid>
            {(editProfilePhoto) ? (
              <Grid item sx={{ml: "1em"}}>
                <Button sx={{minWidth: "12em"}} variant="contained" component="label">
                  Change Photo
                  <input hidden accept="image/*" type="file" onChange={handleFileUpload}/>
                </Button>
                <br />
                <Button sx={{minWidth: "12em", mt: ".5em"}} onClick={handleClickOpen} variant="outlined" color="error">
                  Delete Photo
                </Button>
              </Grid>
            ) : (
              null
            )}
          </Grid>
          <Typography variant="body2" sx={{mt: ".5em", mb: "2em"}}>
            Click <Link onClick={handleEditProfileClick} sx={{textDecoration: "none", fontWeight: "bold"}}>HERE</Link> to change your profile picture.</Typography>
          {/* Profile Information Section */}
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Typography variant="h6" sx={{pt: ".5em"}}>Profile Information</Typography>
            </Grid>
            <Grid item>
              <Button 
                startIcon={<EditIcon />} 
                onClick={handleEditProfileInformationClick}
                variant="outlined" 
                size="small"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <form ref={form} onSubmit={handleSubmitProfileChanges}>
            <Grid container sx={{pb: "4em", mt: "1em"}}>
              <Grid item xs={3} sm={3} md={3}>
                <Typography variant="body2" sx={labelStyles}>First Name</Typography>
              </Grid>
              <Grid item xs={9} sm={9} md={9}>
                {(editProfileInformation) ? (
                  <TextField
                    margin="dense"
                    id="firstname"
                    name="firstName"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    defaultValue={user.firstName}
                    inputProps={{maxLength: 25}}
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
                {(editProfileInformation) ? (
                  <TextField
                    margin="dense"
                    id="lastname"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    defaultValue={user.lastName}
                    inputProps={{maxLength: 25}}
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
                {(editProfileInformation) ? (
                  <TextField
                    margin="dense"
                    id="favoriteFoods"
                    name="favoriteFoods"
                    label="Favorite Foods"
                    type="text"
                    variant="outlined"
                    size="small"
                    defaultValue={user?.favoriteFoods}
                    inputProps={{maxLength: 250}}
                    fullWidth
                    multiline
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
                {(editProfileInformation) ? (
                  <TextField
                    margin="dense"
                    id="foodAllergies"
                    name="foodAllergies"
                    label="Food Allergies"
                    type="text"
                    variant="outlined"
                    size="small"
                    defaultValue={user?.foodAllergies}
                    inputProps={{maxLength: 250}}
                    fullWidth
                    multiline
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
                {(editProfileInformation) ? (
                  <TextField
                    margin="dense"
                    id="bio"
                    name="bio"
                    label="Bio"
                    type="text"
                    variant="outlined"
                    size="small"
                    defaultValue={user?.bio}
                    inputProps={{maxLength: 250}}
                    rows={3}
                    fullWidth
                    multiline
                  />
                ) : (
                  <Typography variant="body2">{(user?.bio) ? (user?.bio) : ("Tell us about yourself!")}</Typography>
                )}
              </Grid>
            </Grid>
            {(editProfileInformation) ? (
              <Button
                type="submit"
                startIcon={<SaveIcon />}
                variant="contained"
                size="small"
                sx={{mb: "1.5em"}}
              >
                Update profile
              </Button>
            ) : (
              null
            )}
          </form>
        </Container>
        {/* DELETE PROFILE PICTURE DIALOG */}
        <Dialog
        open={open}
        onClose={handleClose}
        >
          <DialogTitle>
            {"Delete user profile photo?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you delete your profile photo you won't be able to use the same photo unless you re-upload it.
              Are you sure you wish to delete your profile photo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleFileDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
  )
}

export default ProfileInformation;