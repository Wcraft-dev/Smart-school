import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Google from "../../components/buttons/Google"
import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password1: "",
    password2: "",
    authenticator: null,
  }
  handlerChange = (text) => (e) => {
    this.setState({[text]: e.target.value });
  };
  what = (site)=>{
    this.props.history.push(site)
  }
  handlerSubmit = async (e) => {
    e.preventDefault();
    if (this.state.name && this.state.email && this.state.password1) {
      if (this.state.password1 && this.state.password2) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/singup`,
            {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password1,
            }
          );
          this.setState({
            name: "",
            email: "",
            password1: "",
            password2: "",
          });
          toast.success(res.data.message);
        } catch (e) {
          e.response.data.error.map((error)=>{
            toast.error(error)
            return false;
          })
        }
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  componentDidMount() {
    (async () => {
      const x = await isAuth();
      if (!x[0]) {
        if (x[1]) {
          this.setState({
            authenticator: <Redirect to={x[1]} />,
          });
        }
      } else {
        this.setState({
          authenticator: true,
        });
      }
    })();
  }
  render() {
    return (
      <div className="container">
        {this.state.authenticator}
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signup" onSubmit={this.handlerSubmit}>
                  <div className="form-label-group">
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      id="name"
                      onChange={this.handlerChange("name")}
                      value={this.state.name}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
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
                      onChange={this.handlerChange("password1")}
                      value={this.state.password1}
                    />
                    <label htmlFor="inputPassword1">Password</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      placeholder="confirm password"
                      className="form-control"
                      id="inputPassword2"
                      onChange={this.handlerChange("password2")}
                      value={this.state.password2}
                    />
                    <label htmlFor="inputPassword2">Confirm password</label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign up
                  </button>
                  <hr className="my-4" />
                  <Google what={this.what}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
