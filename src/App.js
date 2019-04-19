import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import MainRouter from './router/MainRouter'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route component={MainRouter} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
