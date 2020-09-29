import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuth } from "../../helpers/auth";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "react-google-login";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  handlerChange = (text) => (e) => {
    this.setState({ [text]: e.target.value });
  };
  handlerSubmit = async (e) => {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/singin`, {
          email: this.state.email,
          password: this.state.password,
        });
        authenticate(res, () => {
          toast.success(`Bienvenido ${res.data.user.name}`);
          this.setState({
            email: "",
            password1: "",
          });
          isAuth() && isAuth().role === "student"
            ? this.props.history.push("/student")
            : this.props.history.push("/docente");
          toast.success(`Hey ${res.data.user.name}`);
        });
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
  sendGoogle = async (tokenId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/google`,
        {
          idToken: tokenId,
        }
      );
      authenticate(res, () => {
        toast.success(`Bienvenido ${res.data.user.name}`);
        if (isAuth().role === "student") {
          this.props.history.push("/student");
        } else {
          this.props.history.push("/docente");
        }
      });
    } catch (error) {
      toast.error(`failed sing in with google try again please`);
    }
  };

  responseGoogle = (response) => {
    this.sendGoogle(response.tokenId);
  };
  render() {
    return (
      <div className="container">
        {isAuth() ? <Redirect to="/" /> : null}
        <ToastContainer />
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signup" onSubmit={this.handlerSubmit}>
                  <div className="form-label-group">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Yourname@hotmail.com"
                      onChange={this.handlerChange("email")}
                      value={this.state.email}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      placeholder="password"
                      className="form-control"
                      id="inputPassword1"
                      onChange={this.handlerChange("password")}
                      value={this.state.password}
                    />
                    <label htmlFor="inputPassword1">Password</label>
                  </div>

                  <div className="d-flex justify-content-end  mb-3">
                    <Link to="/user/forget" className="text-muted">
                      Forgoten password?
                    </Link>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <hr className="my-4" />
                  <GoogleLogin
                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    render={(rednerProps) => (
                      <button
                        onClick={rednerProps.onClick}
                        disabled={rednerProps.disabled}
                        className="btn btn-lg btn-google btn-block text-uppercase"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "google"]}
                          className="mr-2"
                        />
                      </button>
                    )}
                  />
               </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
