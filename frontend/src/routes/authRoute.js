import React, { Component } from 'react'
import { Route,Switch } from "react-router-dom";
import Register from "../layouts/screens/Register.jsx";
import Login from "../layouts/screens/Login.jsx";
import Activate from "../layouts/screens/Activate.jsx";
import Forget from "../layouts/screens/Forgetpass.jsx";
import Reset from "../layouts/screens/Reset.jsx";

export default class authRoute extends Component {
  render() {
    return (
      <Switch>
        <Route 
          path="/user/singup" 
          exact 
          render={(props) => <Register {...props} />}
        />
        <Route 
          path="/user/singin" 
          exact 
          render={(props) => <Login {...props} />} 
        />
        <Route
          path="/user/activate/:token"
          exact
          render={(props) => <Activate {...props} />}
        />
        <Route
          path="/user/passwordReset/:token"
          exact
          render={(props) => <Reset {...props} />}
        />
        <Route
          path="/user/forget"
          exact
          render={(props) => <Forget {...props} />}
        />
      </Switch>
    ) 
  }
}


      
