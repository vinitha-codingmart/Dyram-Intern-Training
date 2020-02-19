import React, { Component } from "react";
import Loader from "react-loader-spinner";

export class Loaders extends Component {
  render() {
    return (
      <div>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
}

export default Loaders;
