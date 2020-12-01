import React, { useEffect, useState } from "react";
import ValidationAux from "../../../helpers/validationAuth";
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
} from "@material-ui/core";
//import { toast } from "react-toastify";

export default function Teacher(props) {
  const [data, setData] = useState([]);
  const [authenticator, setAuthenticator] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const continues = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/class`,
          {
            headers: {
              "x-access-token": dataUser(),
            },
          }
        );
        setData(data);
      };
      if (authenticator === true) {
        continues();
      }
    }
    fetchData();
  }, [authenticator]);
  const dataUser = (bool) => {
    if (bool) {
      return localStorage.getItem("user");
    }
    return getCookie("token");
  };
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
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Create new class
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small">jajajja</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
