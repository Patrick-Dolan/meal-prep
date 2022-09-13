import { Avatar, Button, Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { UserAuth } from "../../Contexts/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import { updateUserDBEntry } from "../../firebasefunctions"
import { deleteField, doc, updateDoc } from "firebase/firestore";

// TODO add loading bar for picture upload
// TODO add dialog confirmation for delete and garbage icon

const AccountUpdate = () => {
  const { user, setUser } = UserAuth();

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
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
      console.log("Upload Error: ", error.message)
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
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
  }

  return (
    <Container maxWidth="lg" sx={{mt: "1em"}}>
      <Typography variant="h5">Account Update</Typography>
      <Divider />
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
          <Button sx={{minWidth: "12em", mt: ".5em"}} onClick={handleFileDelete} variant="outlined" color="error">
            Delete
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AccountUpdate;