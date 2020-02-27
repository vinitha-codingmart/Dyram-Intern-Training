import React, { Component } from "react";
import "../styles/navbar.css";

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar-div">
        <a className="title-link" href="/welcome">
          <h1>
            VideoCall<span>°</span>
          </h1>
        </a>
      </div>
    );
  }
}

export default Navbar;
