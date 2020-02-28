import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export class Signup extends Component {
  state = {
    name: "",
    pass: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    Axios.post("http://localhost:3031/signUp", {
      name: this.state.name,
      pass: this.state.pass
    }).then(res => {
      this.setState({ name: "", pass: "" });
      window.location.href = "/";
    });
  };

  render() {
    return (
      <div>
        <div className="login-form-div">
          <br />
          <h3>SIGNUP</h3>
          <br />
          <div className="form-div">
            <input
              id="name"
              name="name"
              placeholder="username"
              type="text"
              onChange={e => this.change(e)}
            ></input>
            <br />
            <br />
            <input
              id="pass"
              name="pass"
              placeholder="password"
              type="password"
              onChange={e => this.change(e)}
            ></input>
            <br />
            <br />
            <button className="submit-button" onClick={e => this.onSubmit(e)}>
              Submit
            </button>
            <br />
            <div className="redirect-div">
              <p>
                <em>Already have an account?</em>
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
        </div>
      </div>
    );
  }
}

export default Signup;
