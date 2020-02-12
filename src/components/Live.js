import React, { Component } from "react";
import Axios from "axios";
import config from "../config/default";
import { Link } from "react-router-dom";
import Socket from "socket.io-client";

/*Recorder.js imports */
import "video.js/dist/video-js.css";
import videojs from "video.js";
import "webrtc-adapter";
import RecordRTC from "recordrtc";
import "videojs-record/dist/css/videojs.record.css";
import Record from "videojs-record/dist/videojs.record.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListNavbar from "./ListNavbar";

export class Live extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    let io = Socket.connect("http://localhost:3031/", {
      transports: ["websocket"]
    });
    this.state = {
      live_streams: [],
      io,
      image: null
    };
  }

  componentDidMount = () => {
    let self = this;
    this.state.io.on("videodata", function(image) {
      console.log(typeof image);
      console.log(this);
      self.setState({
        image: image
      });
    });

    // this.getLiveStreams();

    /*Recorder.js */
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, () => {
      // print version information at startup
      var version_info =
        "Using video.js " +
        videojs.VERSION +
        " with videojs-record " +
        videojs.getPluginVersion("record") +
        " and recordrtc " +
        RecordRTC.version;
      videojs.log(version_info);
    });

    // device is ready
    this.player.on("deviceReady", () => {
      console.log("Device ready");
    });

    // user clicked the record button and started recording
    this.player.on("startRecord", () => {
      console.log("Started recording");
    });

    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.

      console.log("finished recording: ", this.player.recordedData);

      // let socket = Socket();
      this.state.io.emit("stream", this.player.recordedData);

      let fData = new FormData();
      fData.append("file", this.player.recordedData);

      //   Axios.get("http://localhost:3031/liveVideo", fData).then(res => {});
    });

    // error handling
    this.player.on("error", (element, error) => {
      console.warn(error);
    });

    this.player.on("deviceError", () => {
      console.error("device error:", this.player.deviceErrorCode);
    });
  };

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  getLiveStreams() {
    Axios.get(
      "http://127.0.0.1:" + config.rtmp_server.http.port + "/api/streams"
    ).then(res => {
      let streams = res.data;
      if (typeof (streams["live"] !== "undefined")) {
        this.getStreamsInfo(streams["live"]);
      }
    });
  }

  getStreamsInfo(live_streams) {
    Axios.get("/streams/info", {
      params: {
        streams: live_streams
      }
    }).then(res => {
      this.setState(
        {
          live_streams: res.data
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }
  render() {
    let streams = this.state.live_streams.map((stream, index) => {
      return (
        <div
          className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4"
          key={index}
        >
          <span className="live-label">LIVE</span>
          <Link to={"/stream/" + stream.username}>
            <div className="stream-thumbnail">
              <img src={"/thumbnails/" + stream.stream_key + ".png"} />
            </div>
          </Link>

          <span className="username">
            <Link to={"/stream/" + stream.username}>{stream.username}</Link>
          </span>
        </div>
      );
    });

    return (
      <div className="container mt-5">
        <h4>Live Streams</h4>
        <hr className="my-4" />

        <div className="streams row">{streams}</div>

        {/* Recoder.js */}
        <div data-vjs-player>
          <video
            id="myVideo"
            ref={node => (this.videoNode = node)}
            className="video-js vjs-default-skin"
            playsInline
          ></video>
        </div>
        {/* Recorder end */}

        <video controls height="320" width="320">
          <source src="http://localhost:3031/live" type="video/webm"></source>
        </video>

        <video controls height="320" width="320">
          <source src={this.state.image} type="video/webm"></source>
        </video>
      </div>
    );
  }
}

export default Live;
