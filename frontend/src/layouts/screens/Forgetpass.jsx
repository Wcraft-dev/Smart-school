//import { Redirect,Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class Forgetpass extends Component {
  state = {
    email: "",
  };
  handlerChange = (text) => (e) => {
    this.setState({ [text]: e.target.value });
  };
  handlerSubmit = async (e) => {
    e.preventDefault();
    if (this.state.email) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/forget`, {
          email: this.state.email,
        });
        this.setState({
          email: "",
        });
        toast.success(`Please Check your name email (${this.state.email})`);
      } catch (e) {
        if (e.response) {
          e.response.data.error.map((error) => {
            toast.error(error);
            return false;
          });
        }
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Forget password</h5>
                <form className="form-signup" onSubmit={this.handlerSubmit}>
                  <div className="form-label-group">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="form-control"
                      id="inputPassword1"
                      onChange={this.handlerChange("email")}
                      value={this.state.email}
                    />
                    <label htmlFor="inputPassword1">Email adress</label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
