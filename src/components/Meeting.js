import React, { Component } from "react";
import AgoraRTC from "agora-rtc-sdk";
import Axios from "axios";
import Modal from "react-responsive-modal";
import StripeCheckout from "react-stripe-checkout";

import "../styles/canvas.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export class Meeting extends Component {
  constructor(props) {
    super(props);
    this.client = {};
    this.localStream = {};
    this.shareClient = {};
    this.shareStream = {};
    this.state = {
      appId: "fa04cfb20f564d6284e84ccedea717a0",
      channel: "",
      premium: "",
      displayMode: "pip",
      streamList: [],
      readyState: false,
      stats: {},
      openz: false,
      openPremium: false,
      validity: "",
      plan: ""
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      channel: this.props.match.params.channel
      // premium: this.props.location.state.premium
    });
    this.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
    this.client.init(this.state.appId, () => {
      console.log("AgoraRTC client initialized");
      this.subscribeStreamEvents();
      this.client.join(
        this.state.appId,
        this.props.match.params.channel,
        undefined,
        uid => {
          console.log("User " + uid + " join channel successfully");
          console.log("At " + new Date().toLocaleTimeString());

          this.localStream = this.streamInit(uid, "video", "480p_4");
          this.localStream.init(
            () => {
              this.addStream(this.localStream, true);
              this.client.publish(this.localStream, err => {
                console.log("Publish local stream error: " + err);
              });
              this.setState({ readyState: true });
            },
            err => {
              console.log("getUserMedia failed", err);
              this.setState({ readyState: true });
            }
          );
        }
      );
    });
  }

  componentDidMount() {
    /*Timeout */
    let data = JSON.parse(localStorage.getItem("userToken"));
    if (data != null) {
      console.log("P R E M I U M  U S E R");
      this.getUserValidity(data);
      this.getPlan(data);
    } else {
      if (this.state.premium === false) {
        this.setState({ channel: "", premium: "" });
        setTimeout(() => {
          this.setState({ openz: true });
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }, 5000);
      }
    }
    let sub = localStorage.getItem("state");

    /*This is also uncomment for plans 
    if (sub === null) {
      setTimeout(() => {
        this.setState({ openz: true });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }, 5000);
    }
    */
  }

  componentDidUpdate() {
    let canvas = document.querySelector("#ag-canvas");
    let no = this.state.streamList.length;
    if (no > 4) {
      this.setState({ displayMode: "tile" });
      return;
    }
    this.state.streamList.map((item, index) => {
      let id = item.getId();
      let dom = document.querySelector("#ag-item-" + id);
      if (!dom) {
        dom = document.createElement("section");
        dom.setAttribute("id", "ag-item-" + id);
        dom.setAttribute("class", "ag-item");
        canvas.appendChild(dom);
        item.play("ag-item-" + id);
      }
      if (index === no - 1) {
        dom.setAttribute("style", `grid-area: span 12/span 24/13/25`);
      } else {
        dom.setAttribute(
          "style",
          `grid-area: span 3/span 4/${4 + 3 * index}/25;
                    z-index:1;width:calc(100% - 20px);height:100px`
        );
      }

      item.player.resize && item.player.resize();
    });
  }

  componentWillUnmount() {
    this.client && this.client.unpublish(this.localStream);
    this.localStream && this.localStream.close();
    this.client &&
      this.client.leave(
        () => {
          console.log("Client succeed to leave.");
        },
        () => {
          console.log("Client failed to leave.");
        }
      );
  }

  addStream = (stream, push = false) => {
    let repeatition = this.state.streamList.some(item => {
      return item.getId() === stream.getId();
    });
    if (repeatition) {
      return;
    }
    if (push) {
      this.setState({
        streamList: this.state.streamList.concat([stream])
      });
    } else {
      this.setState({
        streamList: [stream].concat(this.state.streamList)
      });
    }
  };

  removeStream = uid => {
    this.state.streamList.map((item, index) => {
      if (item.getId() === uid) {
        item.close();
        let element = document.querySelector("#ag-item-" + uid);
        if (element) {
          element.parentNode.removeChild(element);
        }
        let tempList = [...this.state.streamList];
        tempList.splice(index, 1);
        this.setState({
          streamList: tempList
        });
      }
    });
  };

  streamInit = (uid, attendeeMode, videoProfile) => {
    let defaultConfig = {
      streamID: uid,
      audio: true,
      video: true,
      screen: false
    };
    let stream = AgoraRTC.createStream(defaultConfig);
    stream.setVideoProfile(videoProfile);
    return stream;
  };

  subscribeStreamEvents = () => {
    let rt = this;
    rt.client.on("stream-added", function(evt) {
      let stream = evt.stream;
      console.log("New stream added: " + stream.getId());
      console.log("At " + new Date().toLocaleTimeString());
      console.log("Subscribe ", stream);
      rt.client.subscribe(stream, function(err) {
        console.log("Subscribe stream failed", err);
      });
    });

    rt.client.on("peer-leave", function(evt) {
      console.log("Peer has left: " + evt.uid);
      console.log(new Date().toLocaleTimeString());
      console.log(evt);
      rt.removeStream(evt.uid);
    });

    rt.client.on("stream-subscribed", function(evt) {
      let stream = evt.stream;
      console.log("Got stream-subscribed event");
      console.log(new Date().toLocaleTimeString());
      console.log("Subscribe remote stream successfully: " + stream.getId());
      console.log(evt);
      rt.addStream(stream);
    });

    rt.client.on("stream-removed", function(evt) {
      let stream = evt.stream;
      console.log("Stream removed: " + stream.getId());
      console.log(new Date().toLocaleTimeString());
      console.log(evt);
      rt.removeStream(stream.getId());
    });
  };

  handleCamera = e => {
    e.currentTarget.classList.toggle("off");
    this.localStream.isVideoOn()
      ? this.localStream.disableVideo()
      : this.localStream.enableVideo();
  };

  handleMic = e => {
    if (this.localStream.isAudioOn()) {
      this.localStream.muteAudio();
      alert("Audio Muted");
    } else {
      this.localStream.unmuteAudio();
      alert("Audio Unmuted");
    }
  };

  hideRemote = e => {
    if (
      e.currentTarget.classList.contains("disabled") ||
      this.state.streamList.length <= 1
    ) {
      return;
    }
    let list;
    let id = this.state.streamList[this.state.streamList.length - 1].getId();
    list = Array.from(
      document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
    );
    list.map(item => {
      if (item.style.display !== "none") {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  };

  handleExit = e => {
    if (e.currentTarget.classList.contains("disabled")) {
      return;
    }
    try {
      this.client && this.client.unpublish(this.localStream);
      this.localStream && this.localStream.close();
      this.client &&
        this.client.leave(
          () => {
            console.log("Client succeed to leave.");
          },
          () => {
            console.log("Client failed to leave.");
          }
        );
    } finally {
      this.setState({ readyState: false });
      this.client = null;
      this.localStream = null;
      // redirect to index
      window.location.hash = "";
    }
  };

  endCall = e => {
    Axios.post("http://localhost:3031/storeCall", {
      stats: this.state.stats,
      channel: this.state.channel
    }).then(res => {
      this.setState({ channel: "" });
      console.log("End call");
      window.location.href = "/welcome";
    });
  };

  onOpenModal = () => {
    this.setState({ openz: true });
  };

  onCloseModal = () => {
    this.setState({ openz: false });
  };

  openPremium = () => {
    this.setState({ openPremium: true });
  };

  closePremium = () => {
    this.setState({ openPremium: false });
  };

  handleToken = token => {
    Axios.post("http://localhost:3031/checkout", {
      token
    }).then(res => {
      console.log(res.data);
      if (res.data.status === "done") this.setState({ openPremium: false });
      else window.location.href = "/";
    });
  };

  getUserValidity = data => {
    Axios.post("http://localhost:3031/subValidity", { data }).then(res => {
      this.setState({ validity: res.data.validity });
      this.handlePayment();
    });
  };

  handlePayment = () => {
    let date = new Date();
    if (date.getDate() >= this.state.validity)
      this.setState({ openPremium: true });
  };

  getPlan = data => {
    Axios.post("http://localhost:3031/getPlan", { data }).then(res => {
      this.setState({ plan: res.data.plan }, () => {
        this.setPlan();
      });
    });
  };

  setPlan = () => {
    // if (!this.state.plan) {
    //   setTimeout(() => {
    //     this.setState({ openz: true });
    //     localStorage.removeItem("state");
    //     setTimeout(() => {
    //       window.location.href = "/welcome";
    //     }, 3000);
    //   }, 2000);
    // }
    /*Plans ---- uncomment for plans output*/
    /* 
    if (this.state.plan === 1) {
      setTimeout(() => {
        this.setState({ openz: true });
        localStorage.removeItem("state");
        setTimeout(() => {
          window.location.href = "/welcome";
        }, 3000);
      }, 5000);
    }
    if (this.state.plan === 2) {
      setTimeout(() => {
        this.setState({ openz: true });
        localStorage.removeItem("state");
        setTimeout(() => {
          window.location.href = "/welcome";
        }, 3000);
      }, 10000);
    }
    if (this.state.plan === 3) {
      setTimeout(() => {
        this.setState({ openz: true });
        localStorage.removeItem("state");
        setTimeout(() => {
          window.location.href = "/welcome";
        }, 3000);
      }, 15000);
    }
    */
  };

  render() {
    const style = {
      display: "grid",
      gridGap: "10px",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateRows: "repeat(12, auto)",
      gridTemplateColumns: "repeat(24, auto)"
    };

    return (
      <div>
        <Navbar />
        <div className="meeting-div">
          <div className="meet-header">
            <h1>Hello there !</h1>
            <p>
              Your channel name &nbsp; : &nbsp;{" "}
              <span id="channel-span">{this.state.channel}</span>
            </p>
          </div>
          <div id="ag-canvas" style={style}></div>
          <div id="close-div">
            <button
              onClick={e => {
                this.endCall(e);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                  fill="white"
                />
              </svg>
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              onClick={e => {
                this.handleMic(e);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 9v6h4l5 5V4l-5 5H7z" fill="white" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </button>
          </div>
          <div id="stats-div">
            {setInterval(() => {
              this.client.getSessionStats(stats => {
                this.setState({ stats: stats });
                document.getElementById(
                  "stats-div"
                ).innerHTML = `<h4>CALL - STATS</h4><br/>Current Session Duration: ${stats.Duration}<br/>Current Session UserCount: ${stats.UserCount}<br/>Current Session SendBytes: ${stats.SendBytes}<br/>Current Session RecvBytes: ${stats.RecvBytes}<br/>Current Session SendBitrate: ${stats.SendBitrate}<br/>Current Session RecvBitrate: ${stats.RecvBitrate}`;
              });
            }, 1000)}
          </div>
        </div>

        <Modal open={this.state.openz} onClose={this.onCloseModal} center>
          <h2>Uprade to a premium account</h2>
          <p>Redirecting you to login soon...</p>
        </Modal>

        <Modal
          open={this.state.openPremium}
          onClose={this.onCloseModal}
          center
          showCloseIcon={false}
        >
          <h2>Update your subscription</h2>
          <StripeCheckout
            stripeKey="pk_test_JMmCzYWNWMY4ZIhZbFPs7KIP00qYsrzx2E"
            token={token => this.handleToken(token)}
          />
          &nbsp;&nbsp;&nbsp;
          <Link to="/welcome" className="links">
            Maybe Later
          </Link>
        </Modal>
      </div>
    );
  }
}

export default Meeting;
