import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import GenrePanel from "./GenrePanel";
import DashboardVideoGrid from "./DashboardVideoGrid";
import Footer from "./Footer";
import "./HomePage.css";

const HomePage = ( {videosData} ) => {
  const [videos, setVideos] = useState(videosData);


  const fetchVideos = async (genre, contentRating, sortBy) => {
    const url = "http://<ip>:<port>/v1/videos";
    const params = {};
    if (genre !== "All") {
      params.genres = genre;
    }
    if (contentRating) {
      params.contentRating = contentRating;
    }
    if (sortBy) {
      params.sortBy = sortBy;
    }
    const response = await axios.get(url, { params });
    setVideos(response.data);
  };

  const onSearch = async (text) => {
    // Implement debounced search to fetc mvoies
    console.log("search function called after debounced");
    const serachedVideo = videos;
    setVideos(serachedVideo);
  };

  return (
    <div>
      <Header hasSearchAndUploadButton={true} onSearch={onSearch}/>
      <GenrePanel fetchVideos={fetchVideos} />
      <DashboardVideoGrid videos={videosData} />
      <Footer />
    </div>
  );
}

export default HomePage;
