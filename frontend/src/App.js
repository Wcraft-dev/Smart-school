import React from 'react'
import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
import routes from "./routes/";
import { ToastContainer } from 'react-toastify'
import Navbar from './components/bar'
import { isAuth } from './helpers/auth';
import { useEffect } from 'react';


export default function App() {
  useEffect(() => {
    async function datos (){
      await isAuth(null,true)

    }
    datos()
  }, [])
  return (
      <Router>
        <Navbar login={false}/>
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
  )
}

