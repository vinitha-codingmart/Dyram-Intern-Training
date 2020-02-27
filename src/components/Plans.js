import React, { Component } from "react";
import Navbar from "./Navbar";
import "../styles/plans.css";
import Axios from "axios";

export class Plans extends Component {
  state = {
    planId: "",
    subText: "Subscribe",
    sub: false,
    planSubbed: "",
    validity: "",
    daysLeft: ""
  };

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("userToken"));
    if (data != null) {
      this.getSubs(data);
      this.getPlans(data);
      this.getValidity(data);
    }
  }

  getValidity = data => {
    Axios.post("http://localhost:3031/getData", { data }).then(res => {
      this.setState({ validity: res.data.validity });
      this.getDifference();
    });
  };

  getDifference = () => {
    let date2 = new Date(this.state.validity);
    let date = new Date();
    let one_day = 1000 * 60 * 60 * 24;
    var date1_ms = date.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = date2_ms - date1_ms;
    let days = Math.round(difference_ms / one_day);
    this.setState({ daysLeft: days });
  };

  subPlan = planId => {
    let data = JSON.parse(localStorage.getItem("userToken"));
    Axios.post("http://localhost:3031/planSub", {
      planId,
      data
    }).then(res => {
      console.log(res.data);
      this.subscribe();
      if (this.state.sub === false) window.location.href = "/welcome";
    });
  };

  getPlans = data => {
    Axios.post("http://localhost:3031/getPlan", { data }).then(res => {
      this.setState({ planSubbed: res.data.plan });
    });
  };

  subscribe = e => {
    let data = JSON.parse(localStorage.getItem("userToken"));
    let date = new Date();
    let date1 = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 7
    );
    if (this.state.sub === false) {
      // if (this.state.daysLeft > 0) {
      Axios.post("http://localhost:3031/subscribe", {
        data,
        validity: date1
      }).then(async res => {
        console.log("Subscribed");
        await this.setState({ sub: true, subText: "Unsubscribe" });
        localStorage.setItem("state", "done");
        this.getSubs();
      });
      // } else {
      //   alert(
      //     "You have to wait "+
      //     this.state.daysLeft+
      //     " before subscribing to a new plan"
      //   );
      // }
    } else {
      Axios.post("http://localhost:3031/unsubscribe", {
        data
      }).then(async res => {
        alert(
          "Unsubscribed from current plan you can subscribe to another plan"
        );
        console.log(res);
        console.log("UnSubscribed");
        await this.setState({ sub: false, subText: "Subscribe" });
        localStorage.removeItem("state");
        this.getSubs();
        window.location.href = "/welcome";
      });
    }
  };

  getSubs = data => {
    Axios.post("http://localhost:3031/getSubs", { data }).then(res => {
      console.log(res.data.UserId);
      if (!res.data.UserId) this.setState({ sub: false, subText: "Subscribe" });
      else this.setState({ sub: true, subText: "Unsubscribe" });
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <h1>Plans</h1>
        <p>You are currently subscribed to Plan {this.state.planSubbed}</p>
        <div className="links-div">
          <a href="/dashboard" className="links">
            View Dashboard
          </a>
          &nbsp;&nbsp;||&nbsp;&nbsp;
          <a href="/welcome" className="links">
            Home
          </a>
        </div>
        <div className="plan-grid">
          <div
            className="plan-card-div"
            style={
              this.state.planSubbed === 1
                ? { display: "none" }
                : { display: "block" }
            }
          >
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
              {/* {this.state.subText} */}
              Subscribe
            </button>
            <br />
            <br />
          </div>
          <div
            className="plan-card-div"
            style={
              this.state.planSubbed === 2
                ? { display: "none" }
                : { display: "block" }
            }
          >
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
              {/* {this.state.subText} */}
              Subscribe
            </button>
            <br />
            <br />
          </div>
          <div
            className="plan-card-div"
            style={
              this.state.planSubbed === 3
                ? { display: "none" }
                : { display: "block" }
            }
          >
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
              {/* {this.state.subText} */}
              Subscribe
            </button>
            <br />
            <br />
          </div>
        </div>
        <button
          className="unsub-button"
          onClick={e => {
            this.subPlan(this.state.planSubbed);
          }}
        >
          Unsubscribe
        </button>
      </div>
    );
  }
}

export default Plans;
