import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/welcome.css";
import Navbar from "./Navbar";
import Axios from "axios";

export class Welcome extends Component {
  state = {
    channel: "",
    premium: "",
    logoutDisplay: true,
    sub: false,
    subText: "Subscribe"
  };

  componentDidMount() {
    if (this.props.location.state)
      this.setState({ premium: this.props.location.state.premium });
    let data = JSON.parse(localStorage.getItem("userToken"));
    if (data === null) {
      this.setState({ logoutDisplay: false });
    }
    if (data != null) {
      this.getSubs();
    }
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  logOut = e => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  subscribe = e => {
    let data = JSON.parse(localStorage.getItem("userToken"));
    let date = new Date();
    if (this.state.sub === false) {
      Axios.post("http://localhost:3031/subscribe", {
        data,
        validity: date.setDate(date.getDate() + 7)
      }).then(async res => {
        await this.setState({ sub: true, subText: "Unsubscribe" });
        localStorage.setItem("state", "done");
        this.getSubs();
      });
    } else {
      Axios.post("http://localhost:3031/unsubscribe", {
        data
      }).then(async res => {
        console.log(res);
        await this.setState({ sub: false, subText: "Subscribe" });
        localStorage.removeItem("state");
        this.getSubs();
      });
    }
  };

  getSubs = () => {
    let data = JSON.parse(localStorage.getItem("userToken"));
    Axios.post("http://localhost:3031/getSubs", { data }).then(res => {
      console.log(res.data.UserId);
      if (!res.data.UserId) this.setState({ sub: false, subText: "Subscribe" });
      else this.setState({ sub: true, subText: "Unsubscribe" });
    });
  };

  dashboard = e => {
    window.location.href = "/dashboard";
  };

  plans = e => {
    window.location.href = "/plans";
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
          <button className="logout-button" onClick={e => this.subscribe(e)}>
            {this.state.subText}
          </button>
          <button className="logout-button" onClick={e => this.dashboard(e)}>
            Dashboard
          </button>
          <button className="logout-button" onClick={e => this.plans(e)}>
            Plans
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
