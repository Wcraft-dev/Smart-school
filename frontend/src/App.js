import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Login from "./components/login.js";
import Register from "./components/register.js";
import AdminNavbar from "./components/Navbars/AdminNavbar.js";
import Clases from "./components/clases.js"

import './assets/css/App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes,faCheck,faArrowLeft,faArrowRight} from "@fortawesome/free-solid-svg-icons";

import Admin from "./layouts/Admin.js";
import Index from "./layouts/Index.js";



library.add(faTimes,faCheck,faArrowLeft,faArrowRight);
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <AdminNavbar pregunta={this.hola}/>
        <Route path="/" exact component={Index}/>
        <Route path="/user/login" exact component={Login}/>
        <Route path="/user/register" exact component={Register}/>
        <Route path="/user/" exact component={Admin}/>            
        <Route path="/user/class" exact>  
          <div id="horario">
            <Clases/>
          </div>
        </Route>            
      </Router>
    );
  }
}



