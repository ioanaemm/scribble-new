import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import HomeContainer from "./HomeContainer";
import * as ApiConnector from "./api/Api";
import { Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
