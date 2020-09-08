import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './assets/css/App.css';
import Admin from "./layouts/Admin.js";
import Index from "./layouts/Index.js";
import Login from "./components/login.js";
import Register from "./components/register.js";
import AdminNavbar from "./components/Navbars/AdminNavbar.js";
import Clases from "./components/clases.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes,faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes,faCheck);

export default class App extends React.Component {
  state = {
    active: false
  }
  hola = (a)=>{
    this.setState({active: !a})
  }
  render() {
    return (
      <Router>
        <AdminNavbar pregunta={this.hola}/>
        <div className={this.state.active ? "container p-4 toggled" : "container p-4"}>
            <div className="app-content">
              <Route path="/" exact component={Index}/>
              <Route path="/user/login" exact component={Login}/>
              <Route path="/user/register" exact component={Register}/>
              <Route path="/user/" exact component={Admin}/>            
              <Route path="/user/class" exact>  
                <div id="horario">
                  <Clases/>

                </div>
              </Route>            
            </div>
          </div>
      </Router>
    );
  }
}



