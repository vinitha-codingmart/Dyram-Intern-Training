import React, { Component } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import ProgressBar from "react-animated-progress-bar";

export class Dashboard extends Component {
  state = {
    validity: 0,
    percent: "64"
  };
  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("userToken"));
    Axios.post("http://localhost:3031/getData", { data }).then(res => {
      this.setState({ validity: res.data.validity });
      this.getPercent();
    });
  }

  getPercent = () => {
    let date2 = new Date();
    console.log(date2.toDateString(this.state.validity));
    let date = new Date();
    console.log(date.toDateString());
  };

  render() {
    return (
      <div>
        <Navbar />
        <h1>Dashboard</h1>
        <ProgressBar
          width="400px"
          height="10px"
          rect
          fontColor="gray"
          percentage={this.state.percent}
          rectPadding="1px"
          rectBorderRadius="20px"
          trackPathColor="transparent"
          bgColor="#333333"
          trackBorderColor="grey"
        />
      </div>
    );
  }
}

export default Dashboard;
