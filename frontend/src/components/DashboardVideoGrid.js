import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { formatDistanceStrict } from 'date-fns';
import "./DashboardVideoGrid.css"

const VideoTile = ({ video }) => {
  const releaseDate = new Date(video.releaseDate);
  const formattedReleaseDate = formatDistanceStrict(releaseDate, new Date(), { addSuffix: true });
  return (
    <Card className="video-tile">
      <CardMedia
        className="video-tile-image"
        image={video.previewImage}
        title={video.title}
        component="img"
      />
      <CardContent>
        <Typography className="video-title" gutterBottom variant="h5" component="h2">
          {video.title}
        </Typography>
        <Typography className="video-upload-date" variant="body2" component="p">
          {formattedReleaseDate}
        </Typography>
      </CardContent>
    </Card>
  );
};


const DashboardVideoGrid = ({ videos }) => {
  return (
    <Grid container className="video-grid">
      {videos.map((video) => (
        <Grid className="p-1" item xs={12} sm={6} md={4} lg={3} key={video.id}>
          <Link to={`/video/${video._id}`}>
            <VideoTile video={video} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardVideoGrid;
