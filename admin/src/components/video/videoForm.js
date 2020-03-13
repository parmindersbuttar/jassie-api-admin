import React, { useState, useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import { VideoContext } from "../../contexts/VideoContext";

const useStyles = makeStyles({
  dialog: {
    minWidth: 600
  },
  uploadInput: {
    padding: 10,
    border: "1px solid #ccc",
    boxShadow: "2px 2px 5px 2px hsla(0, 0%, 0%, 0.15)",
    outline: "none"
  },
  dropInside: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  dragDrop: {
    height: 200,
    textAlign: "center",
    border: "2px dashed #837979"
  },
  iconUpload: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  uploadTextField: {
    padding: "20px 0px 10px"
  },
  uploadText: {
    fontSize: "1rem",
    color: "rgba(0, 0, 0, 0.54)"
  }
});

export default function FormDialog(props) {
  const video = useContext(VideoContext);
  const classes = useStyles();
  const { handleClose, open } = props;
  const [videoData, setVideoData] = useState({
    name: "",
    description: "",
    filename: "",
    thumbnailUrl: "",
    category_ids: [],
    imageURI: "",
    videoURI: ""
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
        filename: selectedFile,
        videoURI: blobURL
      });
    } else {
      setVideoData({
        ...videoData,
        thumbnailUrl: selectedFile,
        imageURI: blobURL
      });
    }
  };

  const addVideo = () => {
    const formData = new FormData();
    formData.append("filename", videoData.filename);
    formData.append("thumbnailUrl", videoData.thumbnailUrl);
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
      <div {...getRootProps()} className={classes.uploadInput}>
        <input {...getInputProps()} accept="image/*" />
        {isDragActive ? (
          <div className={classes.dragDrop}>
            <div className={classes.dropInside}>
              <span>Drop files here</span>
              <span className={classes.iconUpload}>
                <CloudUploadOutlined />
              </span>
            </div>
          </div>
        ) : (
          <div className={classes.dragDrop}>
            {videoData.imageURI != "" ? (
              <div className={classes.dropInside}>
                <span className={classes.iconUpload}>
                  <img height="170" src={videoData.imageURI} />{" "}
                </span>
              </div>
            ) : (
              <div className={classes.dropInside}>
                <span>Drag 'n' drop a file here, or click to select</span>
                <span className={classes.iconUpload}>
                  <CloudUploadOutlined />
                </span>
              </div>
            )}
            :
          </div>
        )}
      </div>
    );
  };

  const VideoDropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: e => onDrop(e, "video")
    });

    return (
      <div {...getRootProps()} className={classes.uploadInput}>
        <input {...getInputProps()} accept="video/*" />
        {isDragActive ? (
          <div className={classes.dragDrop}>
            <div className={classes.dropInside}>
              <span>Drop files here</span>
              <span className={classes.iconUpload}>
                <CloudUploadOutlined />
              </span>
            </div>
          </div>
        ) : (
          <div className={classes.dragDrop}>
            {videoData.videoURI != "" ? (
              <div className={classes.dropInside}>
                <span className={classes.iconUpload}>
                  <video
                    height="170"
                    src={videoData.videoURI}
                    style={{ outline: "none" }}
                    controls
                    muted
                  ></video>
                </span>
              </div>
            ) : (
              <div className={classes.dropInside}>
                <span>Drag 'n' drop a file here, or click to select</span>
                <span className={classes.iconUpload}>
                  <CloudUploadOutlined />
                </span>
              </div>
            )}
            :
          </div>
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
          filename: "",
          thumbnailUrl: "",
          category_ids: [],
          imageURI: "",
          videoURI: ""
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
          <div className={classes.uploadTextField}>
            <label className={classes.uploadText}>Select Thumbnail File</label>
          </div>
          <ImageDropzone />

          <div className={classes.uploadTextField}>
            <label className={classes.uploadText}>Select Video File</label>
          </div>
          <VideoDropzone />
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
