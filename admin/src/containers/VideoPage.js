import React from "react";
import VideoProvider from "../contexts/VideoContext";
import CategoryProvider from "../contexts/CategoryContext";
import Video from "../components/video";

const VideoPage = () => {
  return (
    <VideoProvider>
      <CategoryProvider>
        <Video />
      </CategoryProvider>
    </VideoProvider>
  );
};

export default VideoPage;
