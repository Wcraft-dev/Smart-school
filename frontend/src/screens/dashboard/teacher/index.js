import React, { useEffect, useState } from "react";
import ValidationAux from "../../../helpers/validationAuth";
import AddClass from "../../../components/TeacherAddClass";
import axios from "axios";
import { getCookie } from "../../../helpers/clientSave";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Modal,
  makeStyles,
  Slide,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
//import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  Modal: {
    display: "block",
    width: "350px",
  },
}));

export default function Teacher(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [authenticator, setAuthenticator] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function continues() {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/class`,
        {
          headers: {
            "x-access-token": getCookie("token"),
          },
        }
      );
      setData(data);
    }
    if (authenticator === true) {
      continues();
    }
  }, [authenticator]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const form = (
    <div className={classes.Modal}>
      <AddClass />
    </div>
  );
  return (
    <Container maxWidth="lg">
      <ValidationAux authAux={setAuthenticator} />
      <Grid container spacing={3}>
        {data.map((item) => {
          return (
            <Grid item md={3} key={item.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Class"
                    height="140"
                    image=""
                    title="The class"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.text}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Homeworks
                  </Button>
                  <Button size="small" color="primary">
                    New Homework
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        <Grid item md={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Class"
                height="140"
                image=""
                title="The class"
                onClick={handleOpen}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Create new class
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add Class
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="modal"
        aria-describedby="modal"
        style={{
          display: "flex",
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          {form}
        </Slide>
      </Modal>
    </Container>
  );
}
