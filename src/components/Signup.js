import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Axios from "axios";
import StripeCheckout from "react-stripe-checkout";

export class Signup extends Component {
  state = {
    name: "",
    pass: "",
    email: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    let date = new Date();
    let date1 = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 7
    );
    Axios.post("http://localhost:3031/signUp", {
      name: this.state.name,
      pass: this.state.pass,
      validity: date1,
      email: this.state.email
    }).then(res => {
      this.setState({ name: "", pass: "" });
      window.location.href = "/";
    });
  };

  handleToken = token => {
    Axios.post("http://localhost:3031/checkoutSign", {
      token
    }).then(res => {
      console.log(res.data);
      if (res.data.status === "done") this.onSubmit("ok");
      else alert("Something went wrong");
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <div className="login-form-div">
          <input
            id="name"
            name="name"
            placeholder="username"
            type="text"
            onChange={e => this.change(e)}
          ></input>
          <br />
          <input
            id="pass"
            name="pass"
            placeholder="password"
            type="password"
            onChange={e => this.change(e)}
          ></input>
          <br />
          <input
            id="email"
            name="email"
            placeholder="email"
            type="email"
            onChange={e => this.change(e)}
          ></input>
          <br />
          <br />
          <StripeCheckout
            stripeKey="pk_test_JMmCzYWNWMY4ZIhZbFPs7KIP00qYsrzx2E"
            token={token => this.handleToken(token)}
          />
          <br />
          <div className="redirect-div">
            <p>
              <em>New user?</em>
            </p>
            <Link
              to={{
                pathname: `/`
              }}
              className="links"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="free-trial-div">
          <Link
            to={{
              pathname: `/welcome`,
              state: {
                premium: false
              }
            }}
            className="links"
          >
            Start a free trial
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
