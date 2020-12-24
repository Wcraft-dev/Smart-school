import React from "react";
import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import back from "../assets/image/card_03.png";
import clsx from "clsx";
import {
  makeStyles,
  Link,
  CardActionArea,
  CardMedia,
  Avatar,
  Paper,
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
  InputAdornment,
} from "@material-ui/core";
import {
  Send,
  School,
  Person,
  Favorite,
  Facebook,
  GitHub,
  Twitter,
  LinkedIn,
} from "@material-ui/icons";
import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 0),
  },
  background: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  paper: {
    maxWidth: 400,
    marginTop: "calc(100vh - 70vh)",
    padding: theme.spacing(2),
  },
  start: {
    height: "100vh",
    minHeight: "300px",
    background: "url('" + back + "')",
  },
  spacing: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  noBorder: {
    borderRadius: "0 !important",
  },
  IconButtonColor: { color: theme.palette.text.secondary },
}));
const datosTemp = [
  {
    id: "1",
    title: "Computer Enginnering",
    description:
      "Esta es una lind descripcion sobre una linda persona que a nadie le imporata ajajj",
    name: "Juan",
    likes: 40,
    heart: 10,
  },
  {
    id: "2",
    title: "Social Media Network",
    description:
      "Esta es una lind descripcion sobre una linda persona que a nadie le imporata ajajj",
    name: "Pedro",
    likes: 40,
    heart: 10,
  },
  {
    id: "3",
    title: "Custom Product Desing",
    description:
      "Esta es una lind descripcion sobre una linda persona que a nadie le imporata ajajj",
    name: "Mateo",
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
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Paper
                className={clsx(
                  classes.paper,
                  classes.noBorder,
                  classes.background
                )}
              >
                <Typography variant="h5">Sing Up</Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit
                  Doloremque quidem et ab reiciendis? Consequuntur dolorum
                </Typography>
                <Link href="/user/singup">Here</Link>
              </Paper>
            </Grid>
          </Grid>
        </Flip>
      </div>

      <Container maxwidth="md" className={classes.spacing}>
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

      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item sm={4}>
            <Bounce duration={2000}>
              <Card className={classes.noBorder}>
                <CardContent className={classes.background}>
                  <School style={{ fontSize: "45px" }} color="primary" />
                  <Typography variant="h4">
                    <Box
                      pt={2}
                      pb={1}
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                    >
                      Schoolarship Facility
                    </Box>
                  </Typography>
                  <Typography component="p" color="textSecondary">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
          <Grid item sm={4}>
            <Bounce duration={2000}>
              <Card className={classes.noBorder}>
                <CardContent className={classes.background}>
                  <School style={{ fontSize: "45px" }} color="primary" />
                  <Typography variant="h4">
                    <Box
                      pt={2}
                      pb={1}
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                    >
                      Schoolarship Facility
                    </Box>
                  </Typography>
                  <Typography component="p" color="textSecondary">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
          <Grid item sm={4}>
            <Bounce duration={2000}>
              <Card className={classes.noBorder}>
                <CardContent className={classes.background}>
                  <School style={{ fontSize: "45px" }} color="primary" />
                  <Typography variant="h4">
                    <Box
                      pt={2}
                      pb={1}
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                    >
                      Schoolarship Facility
                    </Box>
                  </Typography>
                  <Typography component="p" color="textSecondary">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" className={classes.spacing}>
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
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={3} justify="center">
          {datosTemp.map((obj) => {
            return (
              <Grid item sm={3} key={obj.id}>
                <Card className={classes.noBorder}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Human"
                      height="212"
                      image="https://image.freepik.com/foto-gratis/estudiantes-sonrientes-mochilas_1098-1220.jpg"
                      title="Human"
                    />
                  </CardActionArea>
                  <Box className={classes.background}>
                    <Box p={3} pb={0}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.noBorder}
                      >
                        Show more
                      </Button>
                    </Box>
                    <Box p={3} pb={2}>
                      <Typography component="h4" color="primary">
                        <Box fontWeight={900}>{obj.title}</Box>
                      </Typography>
                    </Box>
                    <Box pl={3} pr={3}>
                      <Typography component="p" color="textSecondary">
                        {obj.description}
                      </Typography>
                    </Box>
                  </Box>
                  <CardActions className={classes.background}>
                    <Box p={2}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Grid item>
                          <Grid container alignItems="center">
                            <Avatar
                              src="https://thispersondoesnotexist.com/image"
                              alt="Linda imagen"
                            />
                            <Box pl={2}>
                              <Typography component="span" color="primary">
                                {obj.name}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Box pl={1}>
                            <Button
                              color="primary"
                              size="small"
                              startIcon={<Person />}
                            >
                              12
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Button
                            color="primary"
                            size="small"
                            startIcon={<Favorite />}
                          >
                            12
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Container maxWidth="md" className={classes.spacing}>
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

      <Container maxWidth="xl" className={classes.background}>
        <Box pt={10} pb={10}>
          <Container maxWidth="md">
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
                    repudiandae aliquid officia, recusandae totam dolores quae
                    porro suscipit quasi quod non voluptatem. Amet, recusandae.
                  </Typography>
                </Fade>
                <Box pt={8}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  150
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Days
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  23
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Hours
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  47
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Mins
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  59
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Secs
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item md={5}>
                <Card className={classes.noBorder}>
                  <CardContent>
                    <Box pt={4}>
                      <Typography variant="h6" color="secondary">
                        <Box
                          fontWeight="fontWeightBold"
                          textAlign="center"
                          fontSize="h5.fontSize"
                        >
                          Course for Free
                        </Box>
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        color="textSecondary"
                      >
                        <Box textAlign="center" fontSize={15}>
                          it is high time for learning
                        </Box>
                      </Typography>
                      <Box p={5} pt={3} pb={0}>
                        <Grid container direction="column">
                          <form
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                          >
                            <Grid item>
                              <TextField
                                variant="outlined"
                                label="Your Name"
                                fullWidth
                                margin="normal"
                                type="text"
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                label="Your Phone Number"
                                id="adornment"
                                margin="normal"
                                type="text"
                                variant="outlined"
                                className={classes.inputNumber}
                                InputProps={{
                                  inputProps: { min: 0 },
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      +57
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                variant="outlined"
                                label="Your Email Address"
                                fullWidth
                                type="email"
                                margin="normal"
                              />
                            </Grid>
                            <Grid item>
                              <Box mt={3} mb={3}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.noBorder}
                                  fullWidth
                                >
                                  Submit
                                </Button>
                              </Box>
                            </Grid>
                          </form>
                        </Grid>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>

      <Container maxWidth="md" className={classes.spacing}>
        <Bounce right duration={2000}>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h4.fontSize"
              fontWeight="fontWeightBold"
            >
              Our Experts Trainers
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
              Replenish man have thing gathering lights yielding shall you
            </Box>
          </Typography>
        </Bounce>
      </Container>

      <Container maxWidth="md" className={classes.spacing}>
        <Grid container spacing={3}>
          <Grid item md>
            <Card className={clsx(classes.noBorder, classes.background)}>
              <CardActionArea href="https://google.com">
                <CardMedia
                  component="img"
                  alt="Human"
                  height="240"
                  image="https://thispersondoesnotexist.com/image"
                  title="Human"
                />
                <CardContent>
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h5" component="span" color="secondary">
                      <Box fontWeight={700}>Nathan Gomez</Box>
                    </Typography>
                    <Typography component="span">Enginer Sofware</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <Box textAlign="center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto distinctio quasi dolore molestias adipisci
                      culpa
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container alignItems="center" justify="space-evenly">
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Facebook />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <GitHub />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Twitter />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <LinkedIn />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md>
            <Card className={clsx(classes.noBorder, classes.background)}>
              <CardActionArea href="https://google.com">
                <CardMedia
                  component="img"
                  alt="Human"
                  height="240"
                  image="https://thispersondoesnotexist.com/image"
                  title="Human"
                />
                <CardContent>
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h5" component="span" color="secondary">
                      <Box fontWeight={700}>Nathan Gomez</Box>
                    </Typography>
                    <Typography component="span">Enginer Sofware</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <Box textAlign="center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto distinctio quasi dolore molestias adipisci
                      culpa
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container alignItems="center" justify="space-evenly">
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Facebook />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <GitHub />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Twitter />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <LinkedIn />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md>
            <Card className={clsx(classes.noBorder, classes.background)}>
              <CardActionArea href="https://google.com">
                <CardMedia
                  component="img"
                  alt="Human"
                  height="240"
                  image="https://thispersondoesnotexist.com/image"
                  title="Human"
                />
                <CardContent>
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h5" component="span" color="secondary">
                      <Box fontWeight={700}>Nathan Gomez</Box>
                    </Typography>
                    <Typography component="span">Enginer Sofware</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <Box textAlign="center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto distinctio quasi dolore molestias adipisci
                      culpa
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container alignItems="center" justify="space-evenly">
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Facebook />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <GitHub />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Twitter />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <LinkedIn />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <footer className={classes.background}>
        <Box p={10}>
          <Fade duration={2000}>
            <Container>
              <Grid container spacing={3} alignContent="center">
                <Grid item md>
                  <Typography component="h6">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                      color="secondary"
                      pb={4}
                    >
                      Top Student
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary">
                    <Grid container justify="flex-start" direction="column">
                      <Link href="/">Student 1</Link>
                      <Link href="/">Student 2</Link>
                      <Link href="/">Student 3</Link>
                      <Link href="/">Student 4</Link>
                      <Link href="/">Student 5</Link>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography component="h6">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                      color="secondary"
                      pb={4}
                    >
                      Quick link
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <Grid container justify="flex-start" direction="column">
                      <Link href="/">Dashboard</Link>
                      <Link href="/">Profile</Link>
                      <Link href="/">Help</Link>
                      <Link href="/">Notes</Link>
                      <Link href="/">Report</Link>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography component="h6">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                      color="secondary"
                      pb={4}
                    >
                      More Things
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary">
                    <Grid container justify="flex-start" direction="column">
                      <Link href="/">Dashboard</Link>
                      <Link href="/">Profile</Link>
                      <Link href="/">Help</Link>
                      <Link href="/">Notes</Link>
                      <Link href="/">Report</Link>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item md>
                  <Grid container direction="column" justify="space-around">
                    <Grid item>
                      <Typography component="h3">
                        <Box
                          fontWeight="fontWeightBold"
                          fontSize="h6.fontSize"
                          pb={4}
                        >
                          Suggestions
                        </Box>
                      </Typography>
                    </Grid>
                    <form action="">
                      <Grid item>
                        <TextField
                          variant="outlined"
                          label="Your comment"
                          fullWidth
                        />
                        <Box pt={2}>
                          <Button
                            className={classes.noBorder}
                            variant="contained"
                            fullWidth
                            color="secondary"
                            endIcon={<Send />}
                          >
                            Send
                          </Button>
                        </Box>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
              <Box pt={4} pb={4}>
                <Grid container direction="row" justify="space-around">
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <IconButton color="secondary" size="medium" href="#">
                        <GitHub />
                      </IconButton>
                      <Typography component="h4">Wcraft-dev</Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <IconButton color="secondary" size="medium" href="#">
                        <Facebook />
                      </IconButton>
                      <Typography component="h4">Jhair paris</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Grid container justify="center">
                <Copyright />
              </Grid>
            </Container>
          </Fade>
        </Box>
      </footer>
    </main>
  );
}
