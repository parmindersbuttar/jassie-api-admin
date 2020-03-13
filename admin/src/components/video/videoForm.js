import React, { useState, useContext, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { VideoContext } from "../../contexts/VideoContext";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  dialog: {
    minWidth: 600
  }
});

export default function FormDialog(props) {
  const video = useContext(VideoContext);
  const classes = useStyles();
  const { handleClose, open } = props;
  const [videoData, setVideoData] = useState({
    name: "",
    description: "",
    file: "",
    image: "",
    category_ids: [],
    imageUrl: "",
    videoUrl: ""
  });

  const handleChange = e => {
    const { value, name } = e.target;
    setVideoData({
      ...videoData,
      [name]: value
    });
  };

  const onDrop = async (files, type) => {
    const selectedFile = files[0];
    const blobURL = URL.createObjectURL(selectedFile);
    if (type === "video") {
      setVideoData({
        ...videoData,
        file: selectedFile,
        videoUrl: blobURL
      });
    } else {
      setVideoData({
        ...videoData,
        image: selectedFile,
        imageUrl: blobURL
      });
    }
  };

  const addVideo = () => {
    const formData = new FormData();
    formData.append("file", videoData.file);
    formData.append("thumbnail", videoData.image);
    formData.append("name", videoData.name);
    formData.append("description", videoData.description);
    formData.append("category_ids", videoData.category_ids);

    video.addVideo(formData);
    props.handleClose(false);
  };

  const ImageDropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: e => onDrop(e, "image")
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />
        {isDragActive ? (
          <p>Drop the thumbnail file here ...</p>
        ) : (
          <p>Drag 'n' drop thumbnail file here, or click to select thumbnail</p>
        )}
      </div>
    );
  };

  const VideoDropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: e => onDrop(e, "video")
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} accept="video/*" />
        {isDragActive ? (
          <p>Drop the Video files here ...</p>
        ) : (
          <p>Drag 'n' drop Video file here, or click to select Video</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    return () => {
      if (props.open) {
        setVideoData({
          name: "",
          description: "",
          file: "",
          image: "",
          category_ids: [],
          imageUrl: "",
          videoUrl: ""
        });
      }
    };
  }, [props.open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.dialog} id="form-dialog-title">
          Add Video
        </DialogTitle>
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
            rows="2"
            fullWidth
          />

          <ImageDropzone />
          <img width="auto" height="150" src={videoData.imageUrl} />
          <VideoDropzone />
          <video
            width="auto"
            height="150"
            src={videoData.videoUrl}
            controls
          ></video>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addVideo} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
