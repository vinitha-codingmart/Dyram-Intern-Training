import React, { Component } from "react";
import Link from "react-router-dom";
import "../styles/navbar.css";

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar-div">
        <h1>
          VideoCall<span>°</span>
        </h1>
      </div>
    );
  }
}

export default Navbar;
