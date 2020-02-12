import React, { Component } from "react";
import "../assets/styles/listNavbar.css";

import { Logo } from "../components/Logo";

export class ListNavbar extends Component {
  state = {
    urls: []
  };
  componentDidMount() {
    this.setState({ urls: this.props.paths });
  }
  clicked = name => {
    if (name === "Logout") {
      localStorage.removeItem("userToken");
    }
  };
  render() {
    return (
      <div className="navbar">
        <Logo />
        <div className="navbar-left-icons-div">
          {this.state.urls.map((links, index) => (
            <div key={index}>
              <a
                className="navbar-links"
                href={links.url}
                onClick={e => this.clicked(links.name)}
              >
                {links.name}
              </a>
              &nbsp;&nbsp;&nbsp;
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListNavbar;
