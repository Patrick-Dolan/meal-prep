import { useState } from 'react';
import {useDropzone} from 'react-dropzone'
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTheme } from '@mui/material/styles';

const Dropzone = (props) => {
  const { files, setFiles } = props;

  const theme = useTheme();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"]
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      )
    }
  })

  return (
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
        <Typography variant="body1">Drop image file here to upload</Typography>
        <CloudUploadIcon fontSize='large' /><br />
        <Button variant="outlined">or select files</Button>
      </Box>
    </div>
  )
}

export default Dropzone;