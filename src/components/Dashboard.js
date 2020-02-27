import React, { Component } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import "../styles/dash.css";

export class Dashboard extends Component {
  state = {
    validity: "",
    percent: 0,
    daysLeft: 0,
    dateString: "",
    planId: ""
  };

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("userToken"));
    Axios.post("http://localhost:3031/getData", { data }).then(res => {
      this.setState({ validity: res.data.validity });
      this.getPercent();
      this.getPlan(data);
    });
  }

  getPlan = data => {
    Axios.post("http://localhost:3031/getPlan", { data }).then(res => {
      this.setState({ planId: res.data.plan });
    });
  };

  getPercent = () => {
    let date2 = new Date(this.state.validity);
    let date = new Date();
    let one_day = 1000 * 60 * 60 * 24;
    var date1_ms = date.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = date2_ms - date1_ms;
    let days = Math.round(difference_ms / one_day);
    let result = Math.floor((days / 7) * 100);
    this.setState({
      percent: result,
      daysLeft: days,
      dateString: date2.toDateString()
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="dash-content">
          <h1>My Dashboard</h1>
          <progress value={this.state.percent} max="100">
            {this.state.percent}
          </progress>
          &nbsp;&nbsp;&nbsp;
          {this.state.percent}%
          <br />
          <p>
            You have {this.state.daysLeft} days left remaining on your
            subscription.
          </p>
          <br />
          <p>
            Your account will be reverted to a <em>NORMAL ACCOUNT</em> on{" "}
          </p>
          <h4>{this.state.dateString}</h4>
          <h2>
            <em>SUBSCRIPTION DETAILS</em>
          </h2>
          <hr />
          You are currently subscribed to Plan {this.state.planId}
          <h4>
            COST :{" "}
            {this.state.planId === 1
              ? "2$"
              : this.state.planId === 2
              ? "3$"
              : "4$"}
          </h4>
          <br />
          <div className="links-div">
            <a href="/plans" className="links">
              View Plans
            </a>
            &nbsp;&nbsp;||&nbsp;&nbsp;
            <a href="/welcome" className="links">
              Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
