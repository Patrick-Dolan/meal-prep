import { Avatar, Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Divider, Grid, TextField, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import { updateUserDBEntry } from "../../firebasefunctions"
import { deleteField, doc, updateDoc } from "firebase/firestore";

const AccountSettings = () => {
  const { user, setUser } = UserAuth();
  const [open, setOpen] = useState(false);

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

  const handleEditClick = () => {
    alert("Account Edit clicked!");
  }

  return (
    <Paper elevation={5}>
      <Container maxWidth="lg">
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
            <Typography variant="body2">{user?.email}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{pb: "4em"}}>
          <Grid item xs={3} sm={3} md={3}>
            <Typography variant="body2">Password</Typography>
          </Grid>
          <Grid item xs={9} sm={9} md={9}>
            {/* TODO setup system to count password length or figure out how to show number of characters in password */}
            <Typography variant="body2">*********</Typography>
          </Grid>
        </Grid>
        {/* Profile Photo Section */}
        <Grid container direction="row" alignItems={"center"} sx={{mt: "1em"}}>
          <Grid item>
            <Avatar 
              sx={{height: "5em", width: "5em"}} 
              src={user.photoURL}
            />
          </Grid>
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
        </Grid>
        {/* User Data Section */}
        <form>
          <Grid container>
            <Grid item>
              
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                defaultValue={user.email}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                id="favorite-food"
                label="Favorite Food"
                type="text"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                margin="dense"
                id="bio"
                label="Bio"
                type="text"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
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
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleFileDelete}>
            Delete
          </Button>
        </DialogActions>
        </Dialog>
      </Container>
    </Paper>
  )
}

export default AccountSettings;