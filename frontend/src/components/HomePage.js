import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import GenrePanel from "./GenrePanel";
import DashboardVideoGrid from "./DashboardVideoGrid";
import Footer from "./Footer";
import { config } from "../App";
import "./HomePage.css";

const HomePage = ( {videosData} ) => {
  const [videos, setVideos] = useState(videosData);


  const fetchVideos = async (genre, contentRating, sortBy) => {
    const url = config.endpoint;
    console.log("fetch called   :", genre, contentRating, sortBy)
    const params = {};
    if (genre && genre.length > 0) {
      params.genres = genre.join(",");
    }
    if (contentRating) {
      params.contentRating = encodeURI(contentRating);
    }
    if (sortBy) {
      params.sortBy = sortBy;
    }
    try {
      const response = await axios.get(url, { params });
      console.log("videos after genre panel changes:", response.data);
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  

  const onSearch = async (text) => {
    // Implement debounced search to fetc mvoies
    console.log("search function called after debounced", text);
    const serachedVideo = videos;
    setVideos(serachedVideo);
  };

  return (
    <div>
      <Header hasSearchAndUploadButton={true} onSearch={onSearch}/>
      <GenrePanel fetchVideos={fetchVideos} />
      {videos && <DashboardVideoGrid videos={videos} /> }
      <Footer />
    </div>
  );
}

export default HomePage;
