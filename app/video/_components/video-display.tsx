import React from 'react'

const VideoDisplay = ({videoUrl}: {videoUrl: string}) => {
  return (
    <video id="condensed-video-player" controls className='h-full w-full rounded-3xl'>
      <source src={videoUrl} type="video/mp4" />
    </video>
  )
}

export default VideoDisplay