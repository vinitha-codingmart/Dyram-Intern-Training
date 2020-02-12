import React, { Component } from "react";
import "../assets/styles/navbar.css";
import Logo from "./Logo";

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar-div">
        <div className="navbar">
          <Logo />
          <div className="navbar-left-icons">
            <a className="navbar-links" href="record">
              Record
            </a>
            &nbsp;&nbsp;&nbsp;
            <a className="navbar-links" href="login">
              Login / Signup
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
