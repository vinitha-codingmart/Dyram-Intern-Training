/* eslint-disable */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./App.css";

/*COMPONENTS */
import Recorder from "./components/Recorder";
import Welcome from "./components/Welcome";
import List from "./components/List";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Live from "./components/Live";
import Canvas from "./components/Canvas";

const videoJsOptions = {
  controls: true,
  width: 320,
  height: 240,
  fluid: false,
  plugins: {
    /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            src: 'live',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true
        },
        */
    record: {
      audio: true,
      video: true,
      maxLength: 10,
      debug: true
    }
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={() => <Welcome />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route path="/signup" exact component={() => <Signup />} />
            <Route
              path="/record"
              exact
              component={() => <Recorder {...videoJsOptions} />}
            />
            <Route crossorigin path="/list" exact component={() => <List />} />
            <Route
              crossorigin
              path="/live"
              exact
              component={() => <Live {...videoJsOptions} />}
            />
            <Route
              crossorigin
              path="/canvas"
              exact
              component={() => <Canvas {...videoJsOptions} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
