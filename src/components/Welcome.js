import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/welcome.css";
import Navbar from "./Navbar";

export class Welcome extends Component {
  state = {
    channel: "",
    premium: "",
    logoutDisplay: true
  };

  componentDidMount() {
    if (this.props.location.state)
      this.setState({ premium: this.props.location.state.premium });
    let data = JSON.parse(localStorage.getItem("userToken"));
    if (data === null) {
      this.setState({ logoutDisplay: false });
    }
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  logOut = e => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  render() {
    return (
      <div className="welcome-div">
        <Navbar />
        <div
          className="logout-div"
          style={{ display: this.state.logoutDisplay ? "block" : "none" }}
        >
          <button className="logout-button" onClick={e => this.logOut(e)}>
            Logout
          </button>
        </div>
        <div className="header-div">
          <h1>Welcome to VIDEOCALL™</h1>
          <p>
            Enter a channel name and click on START CALL to begin your free
            VIDEOCALL™
          </p>
        </div>
        <div className="input-form">
          <input
            id="channel"
            name="channel"
            placeholder="enter a channel name"
            onChange={e => this.change(e)}
          ></input>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            to={{
              pathname: `/meeting`,
              state: {
                channel: this.state.channel,
                premium: this.state.premium
              }
            }}
            className="links"
          >
            Start Call
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
