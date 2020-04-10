import React from "react"

export const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className="video">
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      height="500"
      width="500"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
