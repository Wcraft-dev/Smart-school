import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes/";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

const LoginContext = React.createContext();
const NotificationsContext = React.createContext();
export default function App() {
  const [login, setLogin] = useState(false);
  let [notification, setNotification] = useState(null);
  return (
    <Router>
      <LoginContext.Provider value={[login, setLogin]}>
        <NotificationsContext.Provider value={[notification, setNotification]}>
          <Navbar />
        </NotificationsContext.Provider>
        <ToastContainer />
        <Switch>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={true}
                render={(routeProps) => <route.component {...routeProps} />}
                permiss={route.private}
              />
            );
          })}
        </Switch>
      </LoginContext.Provider>
    </Router>
  );
}
export { LoginContext, NotificationsContext };
