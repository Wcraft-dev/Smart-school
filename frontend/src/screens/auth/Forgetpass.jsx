import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { useState } from "react";
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

export default function Forgetpass() {
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const handlerChange = (e) => {
    setEmail(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/forget`, {
          email,
        });
        toast.success(`Please Check your name email (${email})`);
        setEmail("");
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
      return false;
    }
  };
  return (
    <main className={classes.root}>
      <Grid
        container
        component="div"
        style={{ height: "100vh" }}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item component={Paper} elevation={6} className={classes.paper}>
          <form onSubmit={handlerSubmit} autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h4" variant="h4" align="center">
                  Forget password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email address"
                  id="inputPassword1"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handlerChange}
                  value={email}
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
                  type="submit"
                  size="large"
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
