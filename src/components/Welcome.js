import React, { Component } from "react";
import "../assets/styles/welcome.css";
import Navbar from "./Navbar";

export class Welcome extends Component {
  render() {
    return (
      <div className="welcome-div">
        <Navbar />
        <div className="landing-div">
          <img src={require("../assets/images/vid.png")} alt="logo" />
          <div className="landing-content">
            <hr />
            <h1>Welcome</h1>
            <hr />
            <p>
              Stitch allows you to record your videos and show the world what
              you're capabale of.
              <br />
              <br />
              Our goal is to help not just these few streamers, but show the
              thousands at home how to turn their passions into a career.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
