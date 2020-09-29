import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth, authenticate } from "../../helpers/auth";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Redirect } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Activate extends Component {
  state = {
    name: "",
    token: "",
    show: true,
  };
  componentDidMount() {
    if (this.props.match.params.token) {
      let name = jwt.decode(this.props.match.params.token);
      this.setState({
        name: name,
        token: this.props.match.params.token,
      });
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/activation`,
        {
          token: this.state.token,
        }
      );
      this.setState({ show: false });
      toast.success(res.data.message);
       authenticate(res, () => {
        toast.success(`Bienvenido ${res.data.user.name}`);
        if (isAuth().role === "student") {
          this.props.history.push("/student");
        } else {
          this.props.history.push("/docente");
        }
      });
      //this.props.history.push("/login");
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };
  render() {
    return (
      <div>
        {isAuth() ? <Redirect to="/" /> : null}
        <ToastContainer />
        <div className="container-md">
          <h1 className="text-weigth-bold">Welcome, {this.state.name.name}</h1>
          <form onSubmit={this.handleSubmit}>
            <button className="btn btn-secondary">Activate your account</button>
          </form>
        </div>
      </div>
    );
  }
}
/*
const Activate = ({ match, history }) => {
  return (
    <div>
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div className="container-md">
        <h1 className="text-weigth-bold">Welcome, {name.name}</h1>
        <form onSubmit={handleSubmit}>
          <button className="btn btn-secondary">Activate your account</button>
        </form>
      </div>
    </div>
  );
};
export default Activate;*/
