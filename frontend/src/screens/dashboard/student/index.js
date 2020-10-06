import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuth } from "../../../helpers/auth";
import axios from "axios";
import Horario from "../../../components/schedule";
import { getCookie } from "../../../helpers/auth";
import { toast } from "react-toastify";
import Flip from "react-reveal/Flip.js";
import Shake from "react-reveal/Shake.js";
import ButtonSend from "../../../components/buttons/Button.send";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inWait: false,
      eventos: null,
      scheduleDeleteEventId: "",
      tex_title: "Agregar nueva clase",
      tempdate: "",
      temphour: "",
      tempdate_: "",
      temphour_: "",
      text: "",
      author: null ,
      modify: false,
      eventId: "",
      authenticator: null,
    }
  }
  dataUser = (bool) => {
    if (bool) {
      return localStorage.getItem("user");
    }
    return getCookie("token");
  };  
  componentDidMount() {
    (async () => {
      try {
        const x = await isAuth(this.props.match.path);
        console.log(x)
        if(x[0]){
          this.startLoad();
          this.setState({
            author:JSON.parse(this.dataUser(true)).name,
            authenticator: true
          })
        }else{
          toast.error('Unathorized')
          this.setState({
            authenticator: <Redirect to={x[1]}/>
          })
        }
      } catch (error) {
        this.setState({
          authenticator: <Redirect to="/user/singin"/>
        })
      }
    })();
  }

  startLoad = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/class`,
        {
          headers: {
            "x-access-token": this.dataUser(),
          },
        }
      );
      this.setState({
        eventos: data,
      });
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
          toast.error(err.response.data.message);
          loading_events.innerHTML = "";
          loading_events.innerHTML =
            '<div class="p-3 mb-2 rounded-lg bg-warning text-dark">No se pudo cargar el calendario <kbd>400</kbd></div>';
          break;
      }
    }
  };


  validacionHoras = (str) => {
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
  validacionFecha = (str) => {
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

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      inWait: true,
    });
    if (this.state.modify) {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}/class/${this.state.eventId}`,
          {
            author: this.state.author,
            text: this.state.text,
            start_date: this.state.tempdate + " " + this.state.temphour,
            end_date: this.state.tempdate_ + " " + this.state.temphour_,
          },
          {
            headers: {
              "x-access-token": this.dataUser(),
            },
          }
        );
        this.setState({
          modify: false,
        });
        this.setState({
          text: "",
          tempdate: "",
          temphour: "",
          temphour_: "",
          tempdate_: "",
          tex_title: "Agregar nueva clase",
        });
        toast.success(data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/class`,
          {
            author: this.state.author,
            text: this.state.text,
            start_date: this.state.tempdate + " " + this.state.temphour,
            end_date: this.state.tempdate_ + " " + this.state.temphour_,
          },
          {
            headers: {
              "x-access-token": this.dataUser(),
            },
          }
        );
        this.setState({
          inWait: false,
        });
        toast.success(data.message);
        this.setState({
          text: "",
          tempdate: "",
          temphour: "",
          temphour_: "",
          tempdate_: "",
          tex_title: "Agregar nueva clase",
        });
      } catch (err) {
        this.setState({
          inWait: false,
        });
        toast.error(err.response.data.message);
      }
    }
    this.startLoad();
  };

  onCancel = () => {
    this.setState({
      text: "",
      tempdate: "",
      temphour: "",
      tempdate_: "",
      temphour_: "",
      modify: false,
      eventId: "",
      tex_title: "Agregar nueva clase",
    });
  };
  onClickScheduleEvent = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/class/${id}`,
        {
          headers: {
            "x-access-token": this.dataUser(),
          },
        }
      );
      this.setState({
        tex_title: "Editar Clase",
        modify: true,
      });

      const h = data.start_date.split(" "),
        g = data.end_date.split(" ");

      this.setState({
        text: data.text,
        tempdate: this.validacionFecha(h[0]),
        temphour: this.validacionHoras(h[1]),
        tempdate_: this.validacionFecha(g[0]),
        temphour_: this.validacionHoras(g[1]),
        eventId: id,
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  ondelete = async (e) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/class/${this.state.eventId}`,
        {
          headers: {
            "x-access-token": this.dataUser(),
          },
        }
      );
      toast.success(data.message);
      this.setState({
        scheduleDeleteEventId: this.state.eventId,
        modify: false,
      });
    } catch (err) {
      toast.error(err.data.message);
    }
    this.setState({
      text: "",
      tempdate: "",
      temphour: "",
      tempdate_: "",
      temphour_: "",
      eventId: "",
      tex_title: "Agregar nueva clase",
    });
  };
  handlderChange = (text) => (e) => {
    this.setState({
      [text]: e.target.value,
    });
  };
  render() {
    let templete = (
      <div className="col-md-5">
        {this.state.authenticator}
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">{this.state.tex_title}</h3>
            <form onSubmit={this.onSubmit} id="form">
              <div className="form-group">
                <label htmlFor="title">Titulo</label>
                <input
                  type="text"
                  onChange={this.handlderChange("text")}
                  value={this.state.text}
                  className="form-control"
                  id="title"
                  placeholder="Matematicas"
                  required
                />
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="start-date">Fecha de inicio:</label>
                  <input
                    type="date"
                    onChange={this.handlderChange("tempdate")}
                    value={this.state.tempdate}
                    id="start-date"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="start-hour">Hora de comienzo:</label>
                  <input
                    type="time"
                    onChange={this.handlderChange("temphour")}
                    value={this.state.temphour}
                    id="start-hour"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <label htmlFor="end-date">Fecha de Terminacion:</label>
                  <input
                    type="date"
                    onChange={this.handlderChange("tempdate_")}
                    value={this.state.tempdate_}
                    id="end-date"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="end-hour">Hora de Finalizacion:</label>
                  <input
                    type="time"
                    onChange={this.handlderChange("temphour_")}
                    value={this.state.temphour_}
                    id="end-hour"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="repeticion">Repetir</label>
                <select className="form-control" id="repeticion" disabled>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <div
                className={
                  this.state.tex_title === "Editar Clase"
                    ? "form-group btn-group"
                    : "form-group"
                }
              >
                <ButtonSend
                  textDefault={this.state.modify ? "Modify" : "Save"}
                  inWait={this.state.inWait}
                />

                {this.state.tex_title === "Editar Clase" ? (
                  <button
                    type="reset"
                    className="btn btn-warning"
                    onClick={this.onCancel}
                  >
                    Cancelar
                  </button>
                ) : (
                  ""
                )}
                {this.state.tex_title === "Editar Clase" ? (
                  <button
                    type="reset"
                    className="btn btn-danger"
                    id="delete"
                    onClick={this.ondelete}
                  >
                    Eliminar
                  </button>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    if (this.state.eventos) {
      return (
        <div className="row mt-5">
          <Shake>{templete}</Shake>
          <div className="col-md-7 mt-4">
            <Flip top>
              <Horario
                updata={this.state.up}
                onClicking={this.onClickScheduleEvent}
                events={this.state.eventos}
                deleteEvent={this.state.scheduleDeleteEventId}
              />
            </Flip>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row mt-5">
            <Shake>{templete}</Shake>
            <div className="col-md-7 mt-4" id="loading_events">
              <div className="d-flex align-items-center p-3 mb-2 rounded-lg bg-warning text-dark ">
                <strong className="text-primary">Cargando...</strong>
                <div
                  className="spinner-border text-primary ml-auto"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
