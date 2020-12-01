import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes/";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

const LoginContext = React.createContext();
export default function App() {
  const [login, setLogin] = useState(false);

  return (
    <Router>
      <LoginContext.Provider value={[login, setLogin]}>
        <Navbar login={login} />
        <ToastContainer />
        <Switch>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={true}
                component={route.component}
                permiss={route.private}
             />
            );
          })}
        </Switch>
      </LoginContext.Provider>
    </Router>
  );
}
export { LoginContext };
