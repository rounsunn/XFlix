import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import { formatDistanceStrict } from 'date-fns';
import Header from "./Header";
import DashboardVideoGrid from "./DashboardVideoGrid";
import Footer from "./Footer";
import "./VideoPage.css"


const VideoFrame = ({ videoData }) => {
  console.log("logging video data", videoData);
  const [voteStatus, setVoteStatus] = useState("");

  const handleVote = async (vote) => {
    const response = await fetch(`/v1/videos/${videoData.id}/votes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote: vote,
        change: "increase",
      }),
    });

    if (response.ok) {
      setVoteStatus(`You ${vote}d this video.`);
    } else {
      setVoteStatus("Something went wrong. Please try again later.");
    }
  };

  const handleViewCount = async () => {
    const response = await fetch(`/v1/videos/${videoData.id}/views`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        change: "increase",
      }),
    });

    if (!response.ok) {
      console.log("Something went wrong. Please try again later.");
    }
  };


const useStyles = makeStyles({
  button: {
    background: '#4CA3FC',
    color: 'white',
    margin: '8px',
    width: '75px',
    height: '30px',
    borderRadius: '16px',
    '&:hover': {
      background: 'blue',
    },
  },
  icon: {
    fontSize: '20px',
    marginRight: '20px'
  },
});

const RenderVideoDetails = () => {
  const classes = useStyles();
  const releaseDate = new Date(videoData.releaseDate);
  const formattedReleaseDate = formatDistanceStrict(releaseDate, new Date(), { addSuffix: true });

  return (
    <div>
      <h2 className="videoData-title my-0 py-0">{videoData.title}</h2>
      <div className="mt-0 mb-3 pt-0" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <div className="videoData-data m-0" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}> 
            <p className="mr-2 my-0">+{videoData.viewCount}</p>
            <div class="circle"></div>
            <p className="ml-2 my-0">{formattedReleaseDate}</p> 
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Button className={`btn ${classes.button} mt-0`} onClick={() => handleVote("upVote")}>
                <ThumbUpAltIcon className={classes.icon}/> {videoData.votes.upVotes}
            </Button>
            <Button className={`btn ${classes.button} mt-0 mr-0`} onClick={() => handleVote("downVote")}>
                <ThumbDownAltIcon className={classes.icon} /> {videoData.votes.downVotes}
            </Button>
            {voteStatus && <p>{voteStatus}</p>}
        </div>
      </div>
    </div>
  );
};


  const renderVideoFrame = () => {
  
    return (
      <iframe
        title="videoFrame"
        src={`https://www.${videoData.videoLink}`}
        width="100%"
        height="500px"
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        style={{ borderRadius: '10px' }}
        onLoad={handleViewCount}
      />
    );
  };

  return (
    <div className="video-frame">
      {Object.keys(videoData).length !== 0 && (
        <>
          {renderVideoFrame()}
          {RenderVideoDetails()}
        </>
      )}
    <hr style={{ border: 'none', borderTop: '1px solid rgba(216, 216, 216, 0.5)', margin: '0', padding: '0' }} />
    </div>
  );
};

function VideoPage({video, videos}) { 
  console.log("logging video afsgdfffffffffffffffdata", video);

  return (
    <div className="App">
      <Header />
      <VideoFrame videoData={video} />
      <DashboardVideoGrid videos={videos} />
      <Footer />
    </div>
  );
}

export default VideoPage;
