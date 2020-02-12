import React, { Component } from "react";
import VideoRecorder from "react-video-recorder";

export class Canvas extends Component {
  render() {
    return (
      <div>
        <VideoRecorder
          onRecordingComplete={videoBlob => {
            // Do something with the video...
            console.log("videoBlob", videoBlob);
          }}
          onStartRecording={data => {
            console.log("live stream", data);
          }}
        />
      </div>
    );
  }
}

export default Canvas;
