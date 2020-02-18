import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Meeting from "./components/Meeting";
import Welcome from "./components/Welcome";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/meeting" exact component={Meeting} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
