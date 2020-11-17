
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Link,
  CardActionArea,
  CardMedia,
  Avatar,
  Paper,
} from "@material-ui/core";
import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import back from "../assets/image/card_03.png";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import IconSend from "@material-ui/icons/Send";
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 0),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  start:{
    height:'850px',
    background: "url('"+back+"')"
  }
}));
const datosTemp = [
  {
    id: "1",
    title: "Este es el titulos 1",
    description:
      "Esta es una lind descripcion sobre una linda persona que a nadie le imporata ajajj",
    name: "Juan",
    likes: 40,
    heart: 10,
  },
  {
    id: "2",
    title: "Este es el titulos 2",
    description:
      "Esta es una lind descripcion sobre una linda persona que a nadie le imporata ajajj",
    name: "Pedro",
    likes: 40,
    heart: 10,
  },
  {
    id: "3",
    title: "Este es el titulos 3",
    description:
      "Esta es una lind descripcion sobre una linda persona que a nadie le imporata ajajj",
    name: "Mateo",
    likes: 40,
    heart: 10,
  },
  {
    id: "4",
    title: "Este es el titulos 4",
    description:
      "Esta es una lind descripcion sobre una linda persona que a nadie le imporata ajajj",
    name: "Luis",
    likes: 40,
    heart: 10,
  },
];
export default function Home() {
  const classes = useStyles();

  return (
     <main className={classes.root}>
      <div className={classes.start}>
        <Flip top duration={2000}>
          <Grid container wrap="nowrap" justify="center" alignItems="center">
            <Paper className={classes.paper}>
              <Grid item xs zeroMinWidth>
                <Typography variant="h5">Entra a tu clase</Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque quidem et ab reiciendis? Consequuntur dolorum
                  eligendi molestias accusantium asperiores assumenda. Officia,
                  distinctio? Soluta possimus nisi non unde et sunt rerum!
                </Typography>
                <Link href="/user/class">Ingresa Aqui</Link>
              </Grid>
            </Paper>
          </Grid>
        </Flip>
      </div>

      <Container maxwidth="md">
        <Bounce left duration={2000}>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h4.fontSize"
              fontWeight="fontWeightBold"
            >
              Awesome Feature
            </Box>
          </Typography>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h6.fontSize"
              fontStyle="italic"
              fontWeight="fontWeightBold"
              color="text.secondary"
            >
              I don't have idea
            </Box>
          </Typography>
        </Bounce>
      </Container>
      <Container maxwidth="md">
        <Grid container spacing={5}>
          <Grid item md>
            <Bounce duration={2000}>
              <Card className={classes.root}>
                <CardContent>
                  <FontAwesomeIcon icon={"school"} size={"2x"} />
                  <Typography variant="h4">
                    <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                      Schoolarship Facility
                    </Box>
                  </Typography>
                  <Typography component="p" variant="inherit">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
          <Grid item md>
            <Bounce duration={2000}>
              <Card className={classes.root}>
                <CardContent>
                  <FontAwesomeIcon icon={"school"} size={"2x"} />
                  <Typography variant="h4">
                    <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                      Schoolarship Facility
                    </Box>
                  </Typography>
                  <Typography component="p" variant="inherit">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
          <Grid item md>
            <Bounce duration={2000}>
              <Card className={classes.root}>
                <CardContent>
                  <FontAwesomeIcon icon={"school"} size={"2x"} />
                  <Typography variant="h4">
                    <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                      Schoolarship Facility
                    </Box>
                  </Typography>
                  <Typography component="p" variant="inherit">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Fade bottom duration={2000}>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h4.fontSize"
              fontWeight="fontWeightBold"
            >
              Awesome Feature
            </Box>
          </Typography>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h6.fontSize"
              fontStyle="italic"
              fontWeight="fontWeightBold"
              color="text.secondary"
            >
              I don't have idea
            </Box>
          </Typography>
        </Fade>
        <Grid container spacing={3}>
          {datosTemp.map((obj) => {
            return (
              <Grid item md key={obj.id}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Human"
                      height="140"
                      image="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                      title="Human"
                    />
                    <Typography component="h4">{obj.title}</Typography>
                    <Typography component="p" color="textPrimary">
                      {obj.description}
                    </Typography>
                  </CardActionArea>
                  <CardActions>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Grid container alignItems="center">
                          <Avatar
                            src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                            alt="Linda imagen"
                          />
                          <Typography component="span">{obj.name}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Button>Conoce más</Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Container maxWidth="md">
        <Typography variant="h4">
          <Box
            textAlign="center"
            fontSize="h4.fontSize"
            fontWeight="fontWeightBold"
          >
            Course Free
          </Box>
        </Typography>
        <Typography variant="h4">
          <Box
            textAlign="center"
            fontSize="h6.fontSize"
            fontStyle="italic"
            fontWeight="fontWeightBold"
            color="text.secondary"
          >
            I don't have idea
          </Box>
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={7}>
            <Fade bottom duration={2000}>
              <Typography variant="h4">
                <Box fontWeight="fontWeightBold" fontSize="h4.fontSize">
                  Register Now
                </Box>
              </Typography>
              <Typography variant="subtitle1" component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, eius nisi, cumque possimus tempore impedit
                repudiandae aliquid officia, recusandae totam dolores quae porro
                suscipit quasi quod non voluptatem. Amet, recusandae.
              </Typography>
            </Fade>
          </Grid>
          <Grid item md={5}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">
                  <Box
                    fontWeight="fontWeightBold"
                    textAlign="center"
                    fontSize="h4.fontSize"
                  >
                    Fiil with your data
                  </Box>
                </Typography>

                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <form className={classes.form} noValidate autoComplete="off">
                    <Grid item>
                      <TextField id="standard-basic" label="Email" />
                    </Grid>
                    <Grid item>
                      <TextField id="standard-basic" label="Passworf" />
                    </Grid>
                    <Grid item>
                      <Button variant="contained">Default</Button>
                    </Grid>
                  </form>
                </Grid>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxwidth="md">
        <Bounce right duration={2000}>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h4.fontSize"
              fontWeight="fontWeightBold"
            >
              Our course popular
            </Box>
          </Typography>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h6.fontSize"
              fontStyle="italic"
              fontWeight="fontWeightBold"
              color="text.secondary"
            >
              I don't have idea
            </Box>
          </Typography>
        </Bounce>
        <Grid container spacing={3}>
          <Grid item md>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Human"
                  height="140"
                  image="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                  title="Human"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Nathan Gomez
                  </Typography>
                  <Typography component="span">Enginer Sofware</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto distinctio quasi dolore molestias adipisci culpa
                    nam explicabo error quas saepe ea quae natus, laboriosam
                    provident consectetur amet aliquam sunt unde!
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container alignItems="center" justify="space-evenly">
                  <Grid item>
                    <Button>
                      <FontAwesomeIcon icon="user" />
                      <Typography component="span">15</Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button>
                      <FontAwesomeIcon icon="heart" className="mr-1" />
                      <Typography component="span">22</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Human"
                  height="140"
                  image="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                  title="Human"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Nathan Gomez
                  </Typography>
                  <Typography component="span">Enginer Sofware</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto distinctio quasi dolore molestias adipisci culpa
                    nam explicabo error quas saepe ea quae natus, laboriosam
                    provident consectetur amet aliquam sunt unde!
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container alignItems="center" justify="space-evenly">
                  <Grid item>
                    <Button>
                      <FontAwesomeIcon icon="user" />
                      <Typography component="span">15</Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button>
                      <FontAwesomeIcon icon="heart" className="mr-1" />
                      <Typography component="span">22</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Human"
                  height="140"
                  image="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                  title="Human"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Nathan Gomez
                  </Typography>
                  <Typography component="span">Enginer Sofware</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto distinctio quasi dolore molestias adipisci culpa
                    nam explicabo error quas saepe ea quae natus, laboriosam
                    provident consectetur amet aliquam sunt unde!
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container alignItems="center" justify="space-evenly">
                  <Grid item>
                    <Button>
                      <FontAwesomeIcon icon="user" />
                      <Typography component="span">15</Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button>
                      <FontAwesomeIcon icon="heart" className="mr-1" />
                      <Typography component="span">22</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <footer>
        <Fade duration={2000}>
          <Container>
            <Grid container spacing={3} alignContent="center">
              <Grid item md>
                <Typography component="h6">
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize="h6.fontSize"
                    color="secondary"
                  >
                    Top Student
                  </Box>
                </Typography>
                <Typography variant="subtitle1">
                  <Grid container justify="flex-start" direction="column">
                    <Link href="/" color="secondary">
                      Student 1
                    </Link>
                    <Link href="/" color="secondary">
                      Student 2
                    </Link>
                    <Link href="/" color="secondary">
                      Student 3
                    </Link>
                    <Link href="/" color="secondary">
                      Student 4
                    </Link>
                    <Link href="/" color="secondary">
                      Student 5
                    </Link>
                  </Grid>
                </Typography>
              </Grid>
              <Grid item md>
                <Typography component="h6">
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize="h6.fontSize"
                    color="secondary"
                  >
                    Quick link
                  </Box>
                </Typography>
                <Typography variant="subtitle1">
                  <Grid container justify="flex-start" direction="column">
                    <Link href="/" color="secondary">
                      Dashboard
                    </Link>
                    <Link href="/" color="secondary">
                      Profile
                    </Link>
                    <Link href="/" color="secondary">
                      Help
                    </Link>
                    <Link href="/" color="secondary">
                      Notes
                    </Link>
                    <Link href="/" color="secondary">
                      Report
                    </Link>
                  </Grid>
                </Typography>
              </Grid>
              <Grid item md>
                <Typography component="h6">
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize="h6.fontSize"
                    color="secondary"
                  >
                    More Things
                  </Box>
                </Typography>
                <Typography variant="subtitle1">
                  <Grid container justify="flex-start" direction="column">
                    <Link href="/" color="secondary">
                      Dashboard
                    </Link>
                    <Link href="/" color="secondary">
                      Profile
                    </Link>
                    <Link href="/" color="secondary">
                      Help
                    </Link>
                    <Link href="/" color="secondary">
                      Notes
                    </Link>
                    <Link href="/" color="secondary">
                      Report
                    </Link>
                  </Grid>
                </Typography>
              </Grid>
              <Grid item md>
                <Grid
                  container
                  direction="column"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography component="h3">
                      <Box
                        textAlign="center"
                        fontWeight="fontWeightBold"
                        fontSize="h6.fontSize"
                      >
                        Suggestions
                      </Box>
                    </Typography>
                  </Grid>
                  <form action="">
                    <Grid item>
                      <TextField
                        id="suggestion"
                        variant="outlined"
                        label="Your comment"
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<IconSend />}
                      >
                        Send
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="space-around">
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <IconButton color="secondary" size="small" href="#">
                    <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
                  </IconButton>
                  <Typography component="h4">Wcraft-dev</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <IconButton color="secondary" size="small" href="#">
                    <FontAwesomeIcon icon={["fab", "facebook-f"]} size="2x" />{" "}
                  </IconButton>
                  <Typography component="h4">Jhair paris</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center">
             <Copyright/> 
            </Grid>
          </Container>
        </Fade>
      </footer>
    </main>
  );
}
