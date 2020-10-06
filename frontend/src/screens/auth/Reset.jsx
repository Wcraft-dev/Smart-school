import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default class Reset extends Component {
  constructor(props){
    super(props)
    this.state ={
      password1: "",
      password2: "",
      token: "",
      success: false

    }
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.setState({
      token: params.token,
    });
  }
  handlerChange = (text) => (e) => {
    this.setState({ [text]: e.target.value });
  };
  handlerSubmit = async (e) => {
    e.preventDefault();
    if(this.state.password1 && this.state.password2){
      if (this.state.password1 === this.state.password2) {
        try {
          console.log(this.state.password1,this.state.token)
          const res = await axios.put(
            `${process.env.REACT_APP_API_URL}/auth/resetPassword`,
            {
              newPassword: this.state.password1,
              resetPassword: this.state.token,
            }
          );
          this.setState({ password1: "", password2: "" });
          toast.success(res.data.message);
          this.setState({success:true})
          this.props.history.push("/user/singin");
        } catch (error) {
          toast.error(`Ops!!, ${error.response.data.error}`);
        }
      } else {
        toast.error(`Passwords dont'n matches`);
      }
    }else{
      toast.error(`Please fill all inputs`)
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body" style={this.state.success ? {display: 'none'}:{display: 'block'}}>
                <h5 className="card-title text-center">Forget password</h5>
                <form className="form-signup" onSubmit={this.handlerSubmit}>
                  <div className="form-label-group">
                    <input
                      type="password"
                      placeholder="Password"
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
                      placeholder="Password"
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
