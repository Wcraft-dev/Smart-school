import React, { Component } from "react";
//import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Reset extends Component {
  state = {
    password1: "",
    password2: "",
    token: "",
    success: false
  };
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
    if (this.state.password1 === this.state.password2 && this.state.password2 && this.state.password1) {
      try {
        console.log(this.state.password1,this.state.token)
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/resetPassword`,
          {
            newPassword: this.state.password1,
            resetPassword: this.state.token,
          }
        );
        this.setState({ password1: "", password2: "" });
        toast.success(res.data.message);
        this.setState({success:true})
        this.props.history.push("/login");
      } catch (error) {
        toast.error(`Ops!!, ${error.response.data.error}`);
      }
    } else {
      toast.error(`Passwords dont'n matches`);
    }
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
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

/*
const Reset = ({ match,history }) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    token: "",
  });
  const { password1, password2, token } = formData;
  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({...formData, token});
    }
  },[]);
  const handlerChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (password1 === password2 && password2 && password1) {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/resetPassword`, {
          newPassword: password1,
          resetPassword: token,
        });
        setFormData({ ...formData, password1: "", password2: "" });
        toast.success(res.data.message);
        history.push('/login')
      } catch (error) {
        toast.error(
          `Ops!!, ${error.response.data.error}`
          );
          setInterval(() => {
            history.push('/user/forget')
          }, 2000);
      }
    } else {
      toast.error(`Passwords dont'n matches`);
    }
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Forget password</h5>
              <form className="form-signup" onSubmit={handlerSubmit}>
                <div className="form-label-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="inputPassword1"
                    onChange={handlerChange("password1")}
                    value={password1}
                  />
                  <label htmlFor="inputPassword1">Password</label>
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="inputPassword2"
                    onChange={handlerChange("password2")}
                    value={password2}
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
};
export default Reset;
*/