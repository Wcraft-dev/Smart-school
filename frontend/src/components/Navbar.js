import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from '../routes/'

export default class AdminNavbar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link className="nav-brand" to="/">NavBar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {routes.map(route =>{
              if (!route.hidden) {
                return <Link className="nav-link" to={route.path} key={route.path}>{route.name}</Link>
              }
              return false
            })}
          </div>
        </div>
    </nav>
    );
  }
}
