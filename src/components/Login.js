import React, { Component } from "react";
import Navbar from "./Navbar";
import "../styles/login.css";
import { Link } from "react-router-dom";
import Axios from "axios";

export class Login extends Component {
  state = {
    name: "",
    pass: "",
    premium: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    Axios.post("http://localhost:3031/login", {
      name: this.state.name,
      pass: this.state.pass
    }).then(res => {
      if (res.data.validity) {
        localStorage.setItem("userToken", JSON.stringify(res.data));
        window.location.href = "/welcome";
      } else {
        alert("Invalid Login");
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="welcome-header">
          <h3>Welcome to VIDEOCALL™</h3>
          <p>
            VIDEOCALL™ is the premium video calling service for you and your
            family. Login with your premium acount to enjoy unlimited video
            calls with your family and friends.
          </p>
        </div>
        <div className="login-form-div">
          <br />
          <h3>LOGIN</h3>
          <br />
          <input
            id="name"
            name="name"
            placeholder="username"
            type="text"
            onChange={e => this.change(e)}
          ></input>
          <br />
          <input
            id="pass"
            name="pass"
            placeholder="password"
            type="password"
            onChange={e => this.change(e)}
          ></input>
          <br />
          <br />
          <button onClick={e => this.onSubmit(e)}>Login</button>
          <br />
          <div className="redirect-div">
            <p>
              <em>New user?</em>
            </p>
            <Link
              to={{
                pathname: `/signup`
              }}
              className="links"
            >
              Signup for a premium account now
            </Link>
          </div>
        </div>
        <div className="free-trial-div">
          <Link
            to={{
              pathname: `/welcome`,
              state: {
                premium: false
              }
            }}
            className="links"
          >
            Start a free trial
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
