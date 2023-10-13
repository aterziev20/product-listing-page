import React from "react";

import "./styles/VideoPlayer.css";
import footballVideo from "../assets/videos/football10.mp4";

function VideoPlayer() {
  return (
    <div>
      <video autoPlay loop muted className="video-player">
        <source src={footballVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
