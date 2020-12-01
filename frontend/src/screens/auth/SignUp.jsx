import React, { useEffect, useState, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Google from "../../components/buttons/Google";
import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Typography,
  Grid,
  TextField,
  Divider,
  Box,
  Button,
  Paper,
} from "@material-ui/core";
import Link from "../../components/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "../../components/Copyright";
import { handlerErrorsAuth } from "../../helpers/handlerErrors";
import { LoginContext } from "../../App";

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

export default function Register(props) {
  const classes = useStyles();
  const [login, setLogin] = useContext(LoginContext);
  const state = useCallback(
    (booleanx) => {
      setLogin(booleanx);
    },
    [setLogin]
  );

  const [data, setData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [authenticator, setAuthenticator] = useState(null);

  useEffect(() => {
    async function auth() {
      const x = await isAuth(props.match.path, state);
      if (x[0]) {
        if (x[1]) {
          setAuthenticator(<Redirect to={x[1]} />);
        }
      } else {
        setAuthenticator(false);
      }
    }
    auth();
  }, [props, state]);

  const handlerChange = (text) => (e) => {
    setData({ ...data, [text]: e.target.value });
  };
  const what = (site) => {
    props.history.push(site);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (data.name && data.email && data.password1) {
      if (data.password1 && data.password2) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/singup`,
            {
              name: data.name,
              email: data.email,
              password: data.password1,
            }
          );
          setData({
            ...data,
            name: "",
            email: "",
            password1: "",
            password2: "",
          });
          toast.success(res.data.message);
        } catch (e) {
          handlerErrorsAuth(e);
        }
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      {authenticator}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography componet="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            className={classes.form}
            notvalidate="true"
            onSubmit={handlerSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handlerChange("name")}
                  value={data.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handlerChange("email")}
                  value={data.email}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlerChange("password1")}
                  value={data.password1}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Confirm password"
                  label="Confirm Password"
                  type="password"
                  id="Confirm password"
                  autoComplete="current-password"
                  onChange={handlerChange("password2")}
                  value={data.password2}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {login ? "ok" : "Sign Up"}
            </Button>

            <Link
              href="/user/singin"
              text="Already have an account? Sign in"
              manager={props.history}
            />

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
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
