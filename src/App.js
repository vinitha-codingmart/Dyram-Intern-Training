import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Quiz } from "./Components/Quiz";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/quiz" exact component={Quiz} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
