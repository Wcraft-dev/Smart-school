import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Typography,
  Grid,
  Button,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
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
    padding: theme.spacing(5),
  },
}));

export default function Reset(props) {
  const classes = useStyles();
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const {
      match: { params },
    } = props;
    setToken(params.token);
  }, [props]);
  const handlerChange = (text) => (e) => {
    setPasswords({ ...passwords, [text]: e.target.value });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password1 && passwords.password2) {
      if (passwords.password1 === passwords.password2) {
        try {
          console.log(passwords.password1, passwords.token);
          const { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/auth/resetPassword`,
            {
              newPassword: passwords.password1,
              resetPassword: token,
            }
          );
          setPasswords({ password1: "", password2: "" });
          toast.success(data.message);
          setSuccess(true);
          props.history.push("/user/singin");
        } catch (error) {
          toast.error(`Ops!!, ${error.response.data.error}`);
        }
      } else {
        toast.error(`Passwords dont'n matches`);
      }
    } else {
      toast.error(`Please fill all inputs`);
    }
  };
  return (
    <main
      className={classes.root}
      style={success ? { display: "none" } : { display: "block" }}
    >
      <Grid
        container
        component="div"
        style={{ height: "100vh" }}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item component={Paper} elevation={6} className={classes.paper}>
          <form className="form-signup" onSubmit={handlerSubmit} autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h4" variant="h4" align="center">
                  Forget password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="inputPassword1"
                  label="Password"
                  variant="outlined"
                  autoFocus
                  required
                  fullWidth
                  onChange={handlerChange("password1")}
                  value={passwords.password1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  id="inputPassword2"
                  label="Confirm password"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handlerChange("password2")}
                  value={passwords.password2}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </main>
  );
}
