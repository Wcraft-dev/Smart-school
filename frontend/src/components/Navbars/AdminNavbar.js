import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            <Link className="nav-link active" to="/">Home</Link>
            <Link className="nav-link disable" to="/user/login">Sign up</Link>
            <Link className="nav-link disable" to="/user/register">Sign in</Link>
            <Link className="nav-link" to="/user/class">Class</Link>
          </div>
        </div>
    </nav>
    );
  }
}
