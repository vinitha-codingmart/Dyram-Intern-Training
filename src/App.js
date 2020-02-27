import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Meeting from "./components/Meeting";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Plans from "./components/Plans";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/meeting/:channel" exact component={Meeting} />
          <Route path="/plans" exact component={Plans} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
