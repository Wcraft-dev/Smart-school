import React, { Component } from "react";
import App from "../App.js";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "./authRoute.js";
import DashboardRoute from "./dashboardRoute.js";

export default class routes extends Component {
  render() {
    return (
      <>
        <Route path="/" exact component={App}/>
        <DashboardRoute/>
        <AuthRoute/>
        {/*
        <Route
          path="/user/class"
          exact
          render={(props) => (
            <div id="horario">
              <Clases {...props} />
            </div>
          )}
          />*/}
      </>
    );
  }
}
