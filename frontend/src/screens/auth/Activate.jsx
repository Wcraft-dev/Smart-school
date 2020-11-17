import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { isAuth, authenticate } from "../../helpers/auth";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Typography, Grid, Button, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundImage: "url("+process.env.REACT_APP_BACKGROUND+")",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    padding: theme.spacing(5),
  },
}));

export default function Activate(props) {
  const classes = useStyles();
  const [name, setName] = useState({});
  const [token, setToken] = useState(null);
  const [authenticator, setAuthenticator] = useState(null);

  useEffect(() => {
    if (props.match.params.token) {
      let dataName = jwt.decode(props.match.params.token);
      setName(dataName);
      setToken(props.match.params.token);
    }
  }, [props, setName, setToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/activation`,
        {
          token: token,
        }
      );
      toast.success(res.data.message);
      authenticate(res, () => {
        toast.success(`Bienvenido ${res.data.user.name}`);
      });
      const place = await isAuth();
      setAuthenticator(<Redirect to={place[1]} />);
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };
  return (
    <main className={classes.root}>
      {authenticator}
      <Grid
        container
        component="div"
        style={{ height: "100vh" }}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item component={Paper} elevation={6} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h4" variant="h4" align="center">
                Welcome, {name.name || "new user"}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <form onSubmit={handleSubmit}>
                <Button variant="contained" color="secondary" type="submit">
                  Activate your account
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
