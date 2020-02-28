import React, { Component } from "react";
import "../Styles/login.css";
import { Link } from "react-router-dom";
import Axios from "axios";

export class Login extends Component {
  state = {
    name: "",
    pass: ""
  };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    Axios.post("http://localhost:3031/login", {
      name: this.state.name,
      pass: this.state.pass
    }).then(res => {
      if (res.data.validity) {
        this.setState({ name: "", pass: "" });
        localStorage.setItem("userToken", JSON.stringify(res.data));
        window.location.href = "/quiz";
      } else {
        alert("Invalid Login Credentials");
        this.setState({ name: "", pass: "" });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="login-form-div">
          <br />
          <h3>LOGIN</h3>
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
            <button className="submit-button" onClick={e => this.onSubmit(e)}>Login</button>
            <br />
            <div className="redirect-div">
              <p>
                <em>New user?</em>
              </p>
              <Link
                to={{
                  pathname: `/signup`
                }}
                className="links"
              >
                Signup now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
