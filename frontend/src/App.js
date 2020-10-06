import React, { Component } from "react";
import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
import routes from "./routes/";
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar/>
        <ToastContainer/>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={true}
              permiss={route.private}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}
