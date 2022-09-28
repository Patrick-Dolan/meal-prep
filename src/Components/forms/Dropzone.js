import { useDropzone } from 'react-dropzone'
import { Box, Button, Dialog, DialogActions, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import { v4 } from "uuid";

const Dropzone = (props) => {
  const { user, newRecipeId, setRecipeImageURL, setRecipePreviewImage, openDropzone, setOpenDropzone } = props;
  const [files, setFiles] = useState([]);

  const handleUpload = () => {
    setRecipePreviewImage([files[0]]);
    try {
      uploadRecipePicture();
    } catch (error) {
      console.log(error.message);
    }
    setOpenDropzone(false);
    // const newFileName = v4() + files[0].name;
    // console.log(newFileName);
  };

  const handleClose = () => {
    // SetFiles resets dropzone preview on close
    setFiles([]);
    setOpenDropzone(false);
  };

  const uploadRecipePicture = async () => {
    // Delete old pfp if it exists
    // if (user.photoPath != null && user.photoURL != null) {
    //   deleteProfilePicture();
    //   deleteProfilePictureUserFields();
    // }

    const newFileName = v4() + files[0].name;

    // Create filepath for recipe image
    let filePath = `media/users/${user.uid}/recipes/${newRecipeId}/${newFileName}`;

    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);
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
        setRecipeImageURL(downloadURL);
      });
    }
    );
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"]
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      )
    }
  })

  return (
    <Dialog 
      open={openDropzone} 
      onClose={handleClose}
      fullWidth
    >
      <Box
        sx={{
          p: "1em"
        }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Box 
            sx={{
              py: "5em",
              border: "2px dashed grey", 
              textAlign: "center",
              backgroundColor: "#e5e5e5",
            }}
          >
            {(files[0]?.preview) ? (
              <>
                <Box sx={{mx :"auto"}}>
                  <img src={files[0].preview} style={{width: "10em", overflow: "scroll"}} alt="Recipe preview" />
                </Box>
                <Typography variant="body1">Drop a new image file here to change photo</Typography>
              </>
            ) : (
              <Typography variant="body1">Drop image file here to upload</Typography>
            )}
            <CloudUploadIcon fontSize='large' /><br />
            <Button variant="outlined" size="small">or select files</Button>
          </Box>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {(files[0]) ? (
            <Button 
              onClick={handleUpload}
            >
              Upload Image
            </Button>
          ) : (
            <Button 
              disabled
            >
              Upload Image
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default Dropzone;