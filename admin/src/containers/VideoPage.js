import React from 'react';
import VideoProvider from '../contexts/VideoContext';
import Video from '../components/video';

const VideoPage = () => {
  return (
    <VideoProvider>
        <Video/>
    </VideoProvider>
  )
}

export default VideoPage;