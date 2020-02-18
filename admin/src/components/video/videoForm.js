import React,{ useState, useContext, useEffect, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'

import {VideoContext} from '../../contexts/VideoContext';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  dialog: {
    minWidth: 600
  }
});

export default function FormDialog(props) {
  const video = useContext(VideoContext);
  const classes = useStyles();
  
  
  const [videoData, setVideoData] = useState({
    name: '',
    description: '',
    filename : '',
    category_ids : [] 
  })

  const { handleClose, open } = props;

  const handleChange = (e) => {
    const {value, name} = e.target
    setVideoData({
      ...videoData,
      [name]: value
    })
  }

  const onDrop = acceptedFiles => {
    // Do something with the files
    console.log("videodata :: ",videoData)
    setVideoData({
        ...videoData,
        filename: acceptedFiles
    })
    console.log("accepted files", acceptedFiles)
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const addCtg = () => {
      console.log("@@@ ",videoData)
    // video.addVideo(videoData);
    // props.handleClose(false)
  };

  return (
    <div>
        
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialog} id="form-dialog-title">Add Video</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            value={videoData.name}
            onChange={handleChange}
            margin="dense"
            id="name"
            name="name"
            label="Video Name"
            type="text"
            fullWidth
          />
          <TextField
            value={videoData.description}
            onChange={handleChange}
            margin="dense"
            id="description"
            name="description"
            label="Video Description"
            multiline
            rows="4"
            fullWidth
          />
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCtg} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}