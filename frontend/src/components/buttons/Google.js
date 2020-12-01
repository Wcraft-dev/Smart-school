import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "../../helpers/auth";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  linear: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
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

      authenticate(res, props.update,() => {
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
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(rednerProps) => (
          <Button
            onClick={rednerProps.onClick}
            disabled={rednerProps.disabled}
            fullWidth
            className={classes.linear}
          >
            <FontAwesomeIcon icon={["fab", "google"]} className="mr-2" />
          </Button>
        )}
      />
    </>
  );
}
