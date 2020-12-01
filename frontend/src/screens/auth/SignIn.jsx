import React, { useState } from "react";
import { useEffect, useContext,useCallback } from "react";
import { authenticate, isAuth } from "../../helpers/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Google from "../../components/buttons/Google";
import Link from "../../components/Link";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../../components/Copyright";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import { LoginContext } from "../../App";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(" + process.env.REACT_APP_BACKGROUND + ")",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();

  const [login, setLogin] = useContext(LoginContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [authenticator, setAuthenticator] = useState(null);
  const state = useCallback((booleanx) => {
    setLogin(booleanx);
  },[setLogin]);

  useEffect(() => {
    async function valid() {
      const x = await isAuth(props.match.path, state);
      if (x[0]) {
        if (x[1]) {
          setAuthenticator(<Redirect to={x[1]} />);
        }
      } else {
        setAuthenticator(false);
      }
    }
    valid();
  }, [props,state]);
  const handlerChange = (text) => (e) => {
    setData({
      ...data,
      [text]: e.target.value,
    });
  };
  const what = (site) => {
    props.history.push(site);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (data.email && data.password) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/singin`,
          {
            email: data.email,
            password: data.password,
          }
        );

        authenticate(res, state, () => {
          toast.success(`Bienvenido ${res.data.user.name}`);
          setData({ email: "", password: "" });
        });
        const place = await isAuth();
        setAuthenticator(<Redirect to={place[1]} />);
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
  return (
    <Grid container component="main" className={classes.root}>
      {authenticator}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handlerSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handlerChange("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlerChange("password")}
              value={data.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {login ? "ok":"Sign In"}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  href="/user/forget"
                  text="Forget your password"
                  manager={props.history}
                />
              </Grid>
              <Grid item>
                <Link
                  href="/user/singup"
                  text="Don't have an account? Sign Up"
                  manager={props.history}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box component="div" mt={3} mb={3}>
                <Divider variant="middle" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Google what={what} update={state} />
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
