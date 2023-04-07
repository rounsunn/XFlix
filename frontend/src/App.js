import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useMatch } from 'react-router-dom';
import axios from "axios";
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';

const mockUrl = "https://40600b30-cbfb-4118-9dc5-c75e3195b64c.mock.pstmn.io";

export const config = {
  endpoint: `${mockUrl}/v1/videos`,
};

const App = () => {
  const [videos, setVideos] = useState();

  useEffect(() => {
    const fetchVideos = async () => {
      const url = config.endpoint;
      try {
        const response = await axios.get(url);
        console.log("Videos fetched: ", response.data);
        if (response.status === 200) {
          setVideos(response.data.videos);
        } else {
          console.error("Failed to fetch videos:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const VideoPageWithMatch = () => {
    const match = useMatch('/video/:id');
    const video = match ? videos.find(videoEl => videoEl._id === match.params.id ) : null;
  
    return <VideoPage video={video} videos={videos} />;
  };

  return (
    <Routes>
      {videos && <Route path="/" element={<HomePage videosData={videos} />} /> }
      {videos && <Route path="/video/:id" element={<VideoPageWithMatch />} /> }
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
