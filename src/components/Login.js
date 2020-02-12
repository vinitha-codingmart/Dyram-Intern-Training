import React, { Component } from "react";
import Axios from "axios";
import "../assets/styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "./Logo";

export class Login extends Component {
  state = {
    name: "",
    pass: ""
  };

  warnz() {
    toast.error("Invalid user credentials", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
      draggable: false
    });
    this.setState({ name: "", pass: "" });
  }

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
        let obj = this.refs.redirect;
        obj.click();
      } else {
        this.warnz();
        this.setState({ name: "", pass: "" });
      }
    });
  };

  render() {
    return (
      <div className="login-div">
        <div className="login-form">
          <form action="/list" style={{ display: "none" }}>
            <button id="redirect" ref="redirect" type="submit">
              Subs
            </button>
          </form>
          <Logo />
          <br />
          <input
            type="text"
            placeholder="Username"
            value={this.state.name}
            name="name"
            onChange={e => {
              this.change(e);
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={this.state.pass}
            name="pass"
            onChange={e => {
              this.change(e);
            }}
          ></input>
          <br />
          <button
            onClick={e => {
              this.onSubmit(e);
            }}
          >
            Login
          </button>
          <br />
          <span className="form-bottom-text">
            <p>New User?</p>
            <a
              className="navbar-links"
              href="signup"
              style={{ fontSize: "medium" }}
            >
              Sign-up
            </a>
          </span>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;
