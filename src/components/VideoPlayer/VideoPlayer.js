import React from "react";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    playerWrapper: {
      position: "relative",
      paddingTop: "56.25%"
    },
    reactPlayer: {
      position: "absolute",
      top: 0,
      left: 0
    }
  };
});

const VideoPlayer = () => {
  const classes = useStyles();
  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        controls={true}
        className={classes.reactPlayer}
        url={"https://www.youtube.com/watch?v=DQ5Y3TXvD9A&feature=youtu.be"}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
