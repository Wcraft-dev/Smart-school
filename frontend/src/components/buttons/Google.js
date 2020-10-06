import React, { Component } from "react";
import axios from "axios";
import { authenticate, isAuth } from "../../helpers/auth";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types'

export default class btnGoogle extends Component {
  static propTypes = {
    what: PropTypes.func.isRequired
  }
  sendGoogle = async (tokenId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/google`,
        {
          idToken: tokenId,
        }
      );
      authenticate(res, () => {
        toast.success(`Bienvenido ${res.data.user.name}`)
      });
      const place = await isAuth()
      this.props.what(place[1])
    } catch (error) {
      toast.error(`failed sing in with google try again please 1`);
    }
  };
  responseGoogle = (response) => {
    this.sendGoogle(response.tokenId);
  };
  render() {
    return (
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
            <FontAwesomeIcon icon={["fab", "google"]} className="mr-2" />
          </button>
        )}
      />
    );
  }
}
