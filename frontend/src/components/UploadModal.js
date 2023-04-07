import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
      await axios.post('/v1/videos', {
        videoLink: embedLink,
        title,
        genre,
        contentRating,
        releaseDate,
        previewImage,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal class="video-upload-modal" show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload a Video</Modal.Title>
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
          />
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Genre"
            variant="outlined"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Content Rating"
            variant="outlined"
            value={contentRating}
            onChange={(e) => setContentRating(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Release Date"
            variant="outlined"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preview Image Link"
            variant="outlined"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#121212' }}>
        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          className={classes.cancelButton}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoUploadModal;
