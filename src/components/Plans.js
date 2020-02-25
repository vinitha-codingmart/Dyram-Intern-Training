import React, { Component } from "react";
import Navbar from "./Navbar";
import "../styles/plans.css";
import Axios from "axios";

export class Plans extends Component {
  state = {
    planId: ""
  };

  subPlan = planId => {
    let data = JSON.parse(localStorage.getItem("userToken"));
    Axios.post("http://localhost:3031/planSub", {
      planId,
      data
    }).then(res => {
      console.log(res.data);
      window.location.href = "/welcome";
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <h1>Plans</h1>
        <div className="plan-grid">
          <div className="plan-card-div">
            <h4>Plan 1</h4>
            <h2>2$</h2>
            <p>
              <em>for one hour</em>
            </p>
            <button
              onClick={e => {
                this.subPlan(1);
              }}
              className="plan-button"
            >
              subscribe
            </button>
            <br />
            <br />
          </div>
          <div className="plan-card-div">
            <h4>Plan 2</h4>
            <h2>3$</h2>
            <p>
              <em>for two hours</em>
            </p>
            <button
              onClick={e => {
                this.subPlan(2);
              }}
              className="plan-button"
            >
              subscribe
            </button>
            <br />
            <br />
          </div>
          <div className="plan-card-div">
            <h4>Plan 3</h4>
            <h2>4$</h2>
            <p>
              <em>for 3 hours</em>
            </p>
            <button
              onClick={e => {
                this.subPlan(3);
              }}
              className="plan-button"
            >
              subscribe
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Plans;
