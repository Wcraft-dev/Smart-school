import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Login from "./components/login.js";
import Register from "./components/register.js";
import AdminNavbar from "./components/Navbars/AdminNavbar.js";
import Clases from "./components/clases.js"

import './assets/css/App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes,faCheck,faArrowLeft,faArrowRight,faSchool,faBookReader,faGlobeAmericas,faHeart,faUser} from "@fortawesome/free-solid-svg-icons";
import { far,faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faFacebookF} from "@fortawesome/free-brands-svg-icons"
import { fab } from '@fortawesome/free-brands-svg-icons'
import Admin from "./layouts/Admin.js";
import Index from "./layouts/Index.js";



library.add(fab,far,faTimes,faCheck,faArrowLeft,faArrowRight,faSchool,faBookReader,faGlobeAmericas,faHeart,faUser,faGithub,faFacebookF,faCopyright);
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



