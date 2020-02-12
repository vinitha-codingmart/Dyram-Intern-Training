import React, { Component } from "react";
import Logo from "./Logo";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Signup extends Component {
  state = {
    name: "",
    pass: "",
    cpass: ""
  };

  notify() {
    toast("User added successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
      draggable: false
    });
  }

  warnz() {
    toast.error("Passwords do not match", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
      draggable: false
    });
    this.setState({ name: "", pass: "", cpass: "" });
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    if (this.state.cpass === this.state.pass) {
      Axios.post("http://localhost:3031/signup", {
        name: this.state.name,
        pass: this.state.pass
      }).then(res => {
        this.notify();
        this.setState({ name: "", pass: "", cpass: "" });
      });
    } else this.warnz();
  };

  render() {
    return (
      <div className="login-div">
        <div className="login-form">
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
          <input
            type="password"
            placeholder="confirm Password"
            value={this.state.cpass}
            name="cpass"
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
            Sign-up
          </button>
          <br />
          <span className="form-bottom-text">
            <p>Already have an account?</p>
            <a
              className="navbar-links"
              href="login"
              style={{ fontSize: "medium" }}
            >
              Login
            </a>
          </span>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Signup;
