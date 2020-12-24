import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "../../helpers/auth";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  linear: {
    display: "flex !important",
    justifyContent: "center",
    width: "100%",
    height: 48,
  },
}));
export default function Google(props) {
  const classes = useStyles();
  const sendGoogle = async (tokenId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/google`,
        {
          idToken: tokenId,
        }
      );

      authenticate(res, props.update, () => {
        toast.success(`Bienvenido ${res.data.user.name}`);
      });
      const place = await isAuth();
      props.what(place[1]);
    } catch (error) {
      toast.error(`failed sing in with google try again please 1`);
      console.log(error);
    }
  };
  const responseGoogle = (response) => {
    sendGoogle(response.tokenId);
  };
  return (
    <>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
        buttonText=""
        className={classes.linear}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}
