import React, { useState, useEffect } from "react";
import validationAux from "../../../helpers/validationAuth";
import { getCookie } from "../../../helpers/auth";
import axios from "axios";
import { toast } from "react-toastify";
import Horario from "../../../components/schedule";
import Bounce from "react-reveal/Bounce";
import Shake from "react-reveal/Shake.js";
import ButtonSend from "../../../components/buttons/Button.send";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
/*import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  select: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));*/
export default function Asdhxhi(props) {
  //const classes = useStyles();
  const [inWait, setInWait] = useState(false);
  const [events, setEvents] = useState(null);
  const [scheduleDeleteEventId, setScheduleDeleteEventId] = useState("");
  const [textTitle, setTextTitle] = useState("Agregar nueva clase");
  const [dataForm, setDataForm] = useState({
    tempDate: "",
    tempHour: "",
    tempDate_: "",
    tempHour_: "",
    text: "",
    repeat: 1,
  });
  const [author, setAuthor] = useState(null);
  const [modify, setModify] = useState(false);
  const [eventId, setEventId] = useState("");
  const [authenticator, setAuthenticator] = useState(null);
  const [getDataSchedule, setGetDataSchedule] = useState(true);

  const path = props.match.path;
  useEffect(() => {
    const continues = async () => {
      if (getDataSchedule) {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/class`,
            {
              headers: {
                "x-access-token": dataUser(),
              },
            }
          );
          setEvents(data);
        } catch (err) {
          let loading_events = document.getElementById("loading_events");
          switch (err.message) {
            case "Network Error":
              loading_events.innerHTML = "";
              loading_events.innerHTML =
                '<div class="p-3 mb-2 rounded-lg bg-warning text-dark">No se pudo cargar el calendario <kbd>Network OFF</kbd></div>';
              break;
            case "Request failed with status code 400":
              loading_events.innerHTML = "";
              loading_events.innerHTML =
                '<div class="p-3 mb-2 rounded-lg bg-warning text-dark">No se pudo cargar el calendario <kbd>400</kbd></div>';
              break;

            default:
              //toast.error(err.response.data.message);
              console.log(err);
              //loading_events.innerHTML = "";
              //loading_events.innerHTML =
              //'<div class="p-3 mb-2 rounded-lg bg-warning text-dark">No se pudo cargar el calendario <kbd>400</kbd></div>';
              break;
          }
        }
      }
      setAuthor(JSON.parse(dataUser(true)).name);
      setAuthenticator(true);
      setGetDataSchedule(false);
    };
    async function auth() {
      await validationAux(path,setAuthenticator,continues)
    }
    auth();
  }, [path, getDataSchedule]);
  const dataUser = (bool) => {
    if (bool) {
      return localStorage.getItem("user");
    }
    return getCookie("token");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setInWait(true);
    if (modify) {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}/class/${eventId}`,
          {
            author: author,
            text: dataForm.text,
            start_date: dataForm.tempDate + " " + dataForm.tempHour,
            end_date: dataForm.tempDate_ + " " + dataForm.tempHour_,
          },
          {
            headers: {
              "x-access-token": dataUser(),
            },
          }
        );
        setModify(false);
        setInWait(false);
        setDataForm({
          text: "",
          tempDate: "",
          tempHour: "",
          tempHour_: "",
          tempDate_: "",
        });
        setTextTitle("Agregar nueva clase");
        toast.success(data.message);
      } catch (err) {
        console.log(`${err}+este es el error`);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/class`,
          {
            author: author,
            text: dataForm.text,
            start_date: dataForm.tempDate + " " + dataForm.tempHour,
            end_date: dataForm.tempDate_ + " " + dataForm.tempHour_,
          },
          {
            headers: {
              "x-access-token": dataUser(),
            },
          }
        );
        setInWait(false);

        toast.success(data.message);
        setDataForm({
          text: "",
          tempDate: "",
          tempHour: "",
          tempHour_: "",
          tempDate_: "",
        });
        setTextTitle("Agregar nueva clase");
      } catch (err) {
        setInWait(false);
        toast.error(err.response.data.message);
      }
    }
    setGetDataSchedule(true);
  };

  const validacionHoras = (str) => {
    if (!/^[0]/.test(str)) {
      if (/^[1]/.test(str)) {
        return str;
      } else {
        return "0" + str;
      }
    } else {
      return str;
    }
  };
  const validacionFecha = (str) => {
    if (/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(str)) {
      return str;
    } else {
      let c = str.split("-");
      if (!/^[0-9]{2}/.test(c[2])) {
        c[2] = "0" + c[2];
        return c.join("-");
      }
    }
  };

  const onCancel = () => {
    setDataForm({
      text: "",
      tempDate: "",
      tempHour: "",
      tempDate_: "",
      tempHour_: "",
    });
    setTextTitle("Agregar nueva clase");
    setModify(false);
    setEventId("");
  };
  const onClickScheduleEvent = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/class/${id}`,
        {
          headers: {
            "x-access-token": dataUser(),
          },
        }
      );
      setTextTitle("Editar Clase");
      setModify(true);

      const h = data.start_date.split(" "),
        g = data.end_date.split(" ");

      setDataForm({
        text: data.text,
        tempDate: validacionFecha(h[0]),
        tempHour: validacionHoras(h[1]),
        tempDate_: validacionFecha(g[0]),
        tempHour_: validacionHoras(g[1]),
      });
      setEventId(id);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const ondelete = async (e) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/class/${eventId}`,
        {
          headers: {
            "x-access-token": dataUser(),
          },
        }
      );
      toast.success(data.message);
      setScheduleDeleteEventId(eventId);
      setModify(false);
    } catch (err) {
      toast.error(err.data.message);
    }
    setDataForm({
      text: "",
      tempDate: "",
      tempHour: "",
      tempDate_: "",
      tempHour_: "",
    });
    setEventId("");
    setTextTitle("Agregar nueva clase");
  };
  const handlderChange = (text) => (e) => {
    setDataForm({ ...dataForm, [text]: e.target.value });
  };

  return (
    <>
      {authenticator}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <Shake>
              <Card>
                <form onSubmit={onSubmit} noValidate={false} autoComplete="off">
                  <CardContent>
                    <Typography component="h4" variant="h4">
                      <Box fontWeight="fontWeightBold" textAlign="center">
                        {textTitle}
                      </Box>
                    </Typography>
                    <TextField
                      variant="outlined"
                      type="text"
                      value={dataForm.text}
                      fullWidth
                      id="Title"
                      name="Title"
                      margin="normal"
                      label="Title"
                      onChange={handlderChange("text")}
                      required
                    />
                    <Grid container spacing={3}>
                      <Grid item lg={6} xl={6} md={6} sm={6} xs={12}>
                        <TextField
                          variant="outlined"
                          type="date"
                          value={dataForm.tempDate}
                          fullWidth
                          id="start-date"
                          name="start-date"
                          margin="normal"
                          label="Start Date"
                          onChange={handlderChange("tempDate")}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          variant="outlined"
                          type="time"
                          value={dataForm.tempHour}
                          fullWidth
                          id="start-hour"
                          name="start-hour"
                          margin="normal"
                          label="Start Hour"
                          onChange={handlderChange("tempHour")}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item lg={6} xl={6} md={6} sm={6} xs={12}>
                        <TextField
                          variant="outlined"
                          type="date"
                          value={dataForm.tempDate_}
                          fullWidth
                          id="end-date"
                          name="end-date"
                          margin="normal"
                          label="End Date"
                          onChange={handlderChange("tempDate_")}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          variant="outlined"
                          type="time"
                          value={dataForm.tempHour_}
                          fullWidth
                          id="end-hour"
                          name="end-hour"
                          margin="normal"
                          label="End Hour"
                          onChange={handlderChange("tempHour_")}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>

                    <FormControl variant="outlined" margin="normal" fullWidth>
                      <InputLabel id="repeat">Repeat</InputLabel>
                      <Select
                        labelId="repeat"
                        id="repeat"
                        value={1}
                        disabled
                        onChange={handlderChange("repeat")}
                        label="Repeat"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>One</MenuItem>
                        <MenuItem value={2}>two</MenuItem>
                        <MenuItem value={3}>three</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>
                  <CardActions>
                    <ButtonSend
                      textDefault={modify ? "Modify" : "Save"}
                      inWait={inWait}
                    />
                    {textTitle === "Editar Clase" ? (
                      <Button
                        type="reset"
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={onCancel}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      " "
                    )}
                    {textTitle === "Editar Clase" ? (
                      <Button
                        type="reset"
                        id="delete"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={ondelete}
                      >
                        Eliminar
                      </Button>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </form>
              </Card>
            </Shake>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            {events ? (
              <Bounce top>
                <Horario
                  onClicking={onClickScheduleEvent}
                  events={events}
                  deleteEvent={scheduleDeleteEventId}
                />
              </Bounce>
            ) : (
              <Bounce>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item md>
                    <CircularProgress color="secondary" />
                  </Grid>
                  <Grid item md>
                    <Typography variant="h6">Loading Data ...</Typography>
                  </Grid>
                </Grid>
              </Bounce>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
