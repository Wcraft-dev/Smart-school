import React from "react";
import { useEffect } from "react";
import { signout } from "../../helpers/auth";
import { toast } from "react-toastify";
import {
  Typography,
  Grid,
  Paper,
  makeStyles,
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

export default function Signout(props) {
  const classes = useStyles();

  useEffect(() => {
    try {
      signout();
      props.history.push("/");
      toast.success("Good Bye, see you later");
    } catch (error) {
      toast.error("something went wrong , try again");
      console.log(error)
    }
  });
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
              >
                Wait a minute
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
