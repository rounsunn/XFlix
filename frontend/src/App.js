import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useMatch } from 'react-router-dom';
import axios from "axios";
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';


const videoss = [
  {
    "id": "60211cb602edbc33d4214360",
    "videoLink": "youtube.com/embed/vxxN3_bs6Uo",
    "title": "Crio Fireside chat with Binny Bansal",
    "genre": "Education",
    "contentRating": "7+",
    "releaseDate": "12 Jan 2021",
  "previewImage":"https://i.ytimg.com/vi/vxxN3_bs6Uo/maxresdefault.jpg",
    "votes": {
      "upVotes": "0",
      "downVotes": "0"
    },
    "viewCount": "0"
  },
  {
    "id": "60211cb602edbc33d4214360",
    "videoLink": "youtube.com/embed/vxxN3_bs6Uo",
    "title": "Crio Fireside chat with Binny Bansal",
    "genre": "Education",
    "contentRating": "7+",
    "releaseDate": "12 May 2022",
  "previewImage":"https://i.ytimg.com/vi/vxxN3_bs6Uo/maxresdefault.jpg",
    "votes": {
      "upVotes": "0",
      "downVotes": "0"
    },
    "viewCount": "0"
  },
  {
    "id": "60211cb602edbc33d4214360",
    "videoLink": "youtube.com/embed/vxxN3_bs6Uo",
    "title": "Crio Fireside chat with Binny Bansal",
    "genre": "Education",
    "contentRating": "7+",
    "releaseDate": "12 Jan 2023",
  "previewImage":"https://i.ytimg.com/vi/vxxN3_bs6Uo/maxresdefault.jpg",
    "votes": {
      "upVotes": "0",
      "downVotes": "0"
    },
    "viewCount": "0"
  },
  {
    "votes": {
        "upVotes": 0,
        "downVotes": 0
    },
    "previewImage": "https://i.ytimg.com/vi/CEg30z7cO-s/mqdefault.jpg",
    "viewCount": 0,
    "videoLink": "youtube.com/embed/CEg30z7cO-s",
    "title": "4,000,000 - Q&A",
    "genre": "Comedy",
    "contentRating": "18+",
    "releaseDate": "31 Jan 2021",
    "id": "602f634c9e9156626412ea71"
},
{
"id": "60211cb602edbc33d4214360",
"videoLink": "youtube.com/embed/vxxN3_bs6Uo",
"title": "Crio Fireside chat with Binny Bansal",
"genre": "Education",
"contentRating": "7+",
"releaseDate": "12 Jan 2021",
    "previewImage":  "https://i.ytimg.com/vi/vxxN3_bs6Uo/maxresdefault.jpg",
"votes": {
"upVotes": "0",
"downVotes": "0"
},
"viewCount": "0"
}
];

const App = () => {
  const [videos, setVideos] = useState(videoss);

  const fetchVideos = async () => {
    const url = "http://<ip>:<port>/v1/videos";
    const response = await axios.get(url);
    // if(response) setVideos(response.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const match = useMatch('/video/:id');
  const video = match
  ? videos.find(videoEl => videoEl.id === match.params.id )    
  : null;

  return (
      <Routes>
        <Route path="/" element={<HomePage videosData={videos} />} />
        <Route path="/video/:id" element={<VideoPage video={video} videos={videos} />} />
      </Routes>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
