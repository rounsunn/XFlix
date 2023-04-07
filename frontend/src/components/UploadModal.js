import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { config } from '../App';
import "./UploadModal.css"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    color: '#FFFFFF',
    marginRight: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#5349FF',
    },
  },
  cancelButton: {
    backgroundColor: '#FF4646',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FF2E2E',
    },
  },
}));

const VideoUploadModal = ({ open, onClose }) => {
  const classes = useStyles();
  const [videoLink, setVideoLink] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [contentRating, setContentRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = async () => {
    try {
      const youtubeId = videoLink.split('/').pop();
      const embedLink = `youtube.com/embed/${youtubeId}`;
      const date = new Date(releaseDate);
      const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      await axios.post(`${config.endpoint}`, {
        videoLink: embedLink,
        title,
        genre,
        contentRating,
        releaseDate: formattedDate,
        previewImage,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal className="video-upload-modal" show={open} onHide={onClose} centered>
      <Modal.Header className="p-3" style={{ backgroundColor: '#121212', color: '#FFFFFF' }}>
        <Modal.Title class="modal-title">Upload a Video</Modal.Title>
        <button class="closeIcon" onClick={onClose}>×</button>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#121212', color: '#FFFFFF' }}>
        <Form className={classes.root}>
          <TextField
            label="Video Link"
            variant="outlined"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
            InputProps={{ style: { color: "#FFFFFF" } }}
          />
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
            InputProps={{ style: { color: "#FFFFFF" } }}
          />
          <TextField
            label="Genre"
            variant="outlined"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
            InputProps={{ style: { color: "#FFFFFF" } }}
          />
          <TextField
            label="Content Rating"
            variant="outlined"
            value={contentRating}
            onChange={(e) => setContentRating(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
            InputProps={{ style: { color: "#FFFFFF" } }}
          />
          <TextField
            label="Release Date"
            variant="outlined"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
            InputProps={{ style: { color: "#FFFFFF" } }}
          />
          <TextField
            label="Preview Image Link"
            variant="outlined"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
            InputProps={{ style: { color: "#FFFFFF" } }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#121212' }}>
        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={handleSubmit}
        >
          UPLOAD VIDEO
        </Button>
        <Button
          variant="contained"
          className={classes.cancelButton}
          onClick={onClose}
        >
          CANCEL
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoUploadModal;
