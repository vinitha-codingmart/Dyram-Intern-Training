import React, { Component } from "react";
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
