import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AdminNavbar extends Component {
  state = {
    active: false
  }
  menux = ()=>{
    this.setState({active: !this.state.active})
    this.props.pregunta(this.state.active)
  }
  render() {
    return (
      <div>
        <header>
          <Link className={this.state.active ? "target-burger toggled" : "target-burger"} to ="#" onClick={this.menux}>
            <ul className="buns">
              <li className="bun"></li>
              <li className="bun"></li>
            </ul>
          </Link>
        </header>
        <nav className={this.state.active ? "main-nav toggled" : "main-nav"} role="navigation">
          <ul>
            <li>
              <Link to="/">
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/user/login">
                <span>Ingresar</span>
              </Link>
            </li>
            <li>
              <Link to="/user/register">
                <span>Registrarse</span>
              </Link>
            </li>
            <li>
              <Link to="/user/class">
                <span>Clases</span>
              </Link>
            </li>
          </ul>
        </nav>
        
      </div>
    );
  }
}
