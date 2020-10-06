import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faSchool,
  faBookReader,
  faGlobeAmericas,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { far, faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  fab,
  faGithub,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  fab,
  far,
  faTimes,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faSchool,
  faBookReader,
  faGlobeAmericas,
  faHeart,
  faUser,
  faGithub,
  faFacebookF,
  faCopyright,
  faGoogle
);
require("dotenv").config();

ReactDOM.render(
  <App/>,
  document.getElementById("root")
  );
  
  //<Route component={PageNotFound}/>