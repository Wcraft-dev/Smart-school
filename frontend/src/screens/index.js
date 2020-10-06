import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import back from "../assets/image/card_03.png";

const styleCard = {
  width: "18rem",
  background: "#f9f9ff",
  border: "0",
  color: "var(--text)",
};
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
export default class index extends Component {
  render() {
    return (
      <main>
        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
          className="mb-5"
        >
          <div
            style={{
              background: "url('" + back + "')",
              height: "100%",
            }}
          >
            <Flip top duration={2000}>
              <div className="container-md d-flex h-100 align-content-center flex-wrap">
                <h5 className="text-white">Entra a tu clase</h5>
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque quidem et ab reiciendis? Consequuntur dolorum
                  eligendi molestias accusantium asperiores assumenda. Officia,
                  distinctio? Soluta possimus nisi non unde et sunt rerum!
                </p>
                <Link className="btn btn-secondary" to={"/user/class"}>
                  Ingresa Aqui
                </Link>
              </div>
            </Flip>
          </div>
        </div>

        <div className="container-md">
          <section className="mb-5">
            <Bounce left duration={2000}>
              <h1 className="text-center font-weight-bold">Aweosome Feature</h1>
              <h5 className="text-center font-italic text-muted">
                I don't have idea
              </h5>
            </Bounce>
            <div className="row justify-content-center mt-5">
              <Bounce duration={2000}>
                <div className="col-md-3 card m-4 rounded-0" style={styleCard}>
                  <div className="card-body">
                    <FontAwesomeIcon
                      icon={"school"}
                      size={"2x"}
                      className="mb-4"
                    />
                    <h5 className="card-title font-weight-bold">
                      Schoolarship Facility
                    </h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                <div className="col-md-3 card m-4 rounded-0" style={styleCard}>
                  <div className="card-body">
                    <FontAwesomeIcon
                      icon={"book-reader"}
                      size={"2x"}
                      className="mb-4"
                    />
                    <h5 className="card-title font-weight-bold">
                      Schoolarship Facility
                    </h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                <div className="col-md-3 card m-4 rounded-0" style={styleCard}>
                <div className="card-body">
                  <FontAwesomeIcon
                    icon={"globe-americas"}
                    size={"2x"}
                    className="mb-4"
                  />
                  <h5 className="card-title font-weight-bold">
                    Schoolarship Facility
                  </h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
              </Bounce>
            </div>
          </section>
          <section className="mb-5">
            <Fade bottom duration={2000}>
              <h1 className="text-center font-weight-bold">Our Course Popular</h1>
              <h5 className="text-center font-italic text-muted">
                I don't have idea
              </h5>
            </Fade>
            <div
              id="carusel-card"
              className="carousel slide carousel-multi-item mb-5 mt-5"
              data-ride="carousel"
            >
              <div className="controls-top d-flex justify-content-center mb-2 mt-2">
                <a
                  className="btn-floating mr-2"
                  href="#carusel-card"
                  data-slide="prev"
                >
                  <FontAwesomeIcon
                    icon="arrow-left"
                    style={{ color: "#000" }}
                  />
                </a>
                <a
                  className="btn-floating ml-2"
                  href="#carusel-card"
                  data-slide="next"
                >
                  <FontAwesomeIcon
                    icon="arrow-right"
                    style={{ color: "#000" }}
                  />
                </a>
              </div>

              <ol className="carousel-indicators mb-0">
                <li
                  data-target="#carusel-card"
                  data-slide-to="0"
                  className="active"
                  style={{
                    backgroundColor: "#000",
                  }}
                />
                <li
                  data-target="#carusel-card"
                  data-slide-to="1"
                  style={{
                    backgroundColor: "#000",
                  }}
                />
              </ol>

              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  {datosTemp.map((obj) => {
                    return (
                      <div className="col-md-3 float-left" key={obj.id}>
                        <div
                          className="card mb-2 rounded-0"
                          style={{
                            background: "#f9f9ff",
                            border: "0",
                            color: "#002347",
                          }}
                        >
                          <img
                            className="card-img-top rounded-0"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                            alt="Human"
                          />
                          <div className="card-body">
                            <button
                              className="btn btn-primary inicio rounded-0 p-1 mb-4"
                              style={{ width: "100px" }}
                            >
                              Conoce más
                            </button>
                            <h4 className="card-title font-weight-bold">
                              {obj.title}
                            </h4>
                            <p className="card-text">{obj.description}</p>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <div className="mr-auto">
                                <img
                                  src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                                  alt="Linda imagen"
                                  className="rounded-circle"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                />
                                <span className="ml-2">{obj.name}</span>
                              </div>
                              <FontAwesomeIcon icon="user" className="mr-1" />
                              <span className="mr-2">{obj.likes}</span>
                              <FontAwesomeIcon icon="heart" className="mr-1" />
                              <span>{obj.heart}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="carousel-item">
                  {datosTemp.map((obj) => {
                    return (
                      <div className="col-md-3 float-left" key={obj.id}>
                        <div
                          className="card mb-2 rounded-0"
                          style={{
                            background: "#f9f9ff",
                            border: "0",
                            color: "#002347",
                          }}
                        >
                          <img
                            className="card-img-top rounded-0"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                            alt="Human"
                          />
                          <div className="card-body">
                            <button
                              className="btn btn-primary rounded-0 p-1 mb-4"
                              style={{ width: "100px" }}
                            >
                              Conoce más
                            </button>
                            <h4 className="card-title font-weight-bold">
                              {obj.title}
                            </h4>
                            <p className="card-text">{obj.description}</p>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <div className="mr-auto">
                                <img
                                  src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                                  alt="Linda imagen"
                                  className="rounded-circle"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                />
                                <span className="ml-2">{obj.name}</span>
                              </div>
                              <FontAwesomeIcon icon="user" className="mr-1" />
                              <span className="mr-2">{obj.likes}</span>
                              <FontAwesomeIcon icon="heart" className="mr-1" />
                              <span>{obj.heart}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="inicio pt-5 pb-5">
          <div className="container-md">
            <div className="d-flex align-items-center mt-3 mb-3">
              <div className="d-flex flex-column mr-3">
                  <Fade bottom duration={2000}>
                    <h2 className="font-weight-bold text-white">Register Now</h2>
                    <p className="text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatibus, eius nisi, cumque possimus tempore impedit
                      repudiandae aliquid officia, recusandae totam dolores quae
                      porro suscipit quasi quod non voluptatem. Amet, recusandae.
                    </p>
                  </Fade>
              </div>
              <div className="card text-black w-100 ml-3 p-5 rounded-0">
                <h1 className="text-center font-weight-bold">Course Free</h1>
                <h5 className="text-center font-italic text-muted">
                  I don't have idea
                </h5>
                <div className="card-body">
                  <form action="">
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        id="c"
                        className="form-control"
                        placeholder="YourNaem@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        id="c"
                        className="form-control"
                        placeholder="YourNaem@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name=""
                        id="i"
                        className="form-control"
                        placeholder="YourNaem@example.com"
                      />
                    </div>
                    <button className="btn btn-warning btn-block">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-md">
          <section className="mt-5 mb-5">
            <Bounce right duration={2000}>
              <h1 className="text-center font-weight-bold">Our Course Popular</h1>
              <h5 className="text-center font-italic text-muted">
                I don't have idea
              </h5>
            </Bounce>
            <div className="row mt-5">
              <div className="col-md-3">
                <div
                  className="card mb-2 rounded-0"
                  style={{
                    background: "#f9f9ff",
                    border: "0",
                    color: "#002347",
                  }}
                >
                  <img
                    className="card-img-top rounded-0"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Human"
                  />
                  <div className="card-body">
                    <h4 className="card-title font-weight-bold text-center">
                      Nathan Gomez
                    </h4>
                    <h6 className="text-center mb-5">Enginer Sofware</h6>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto distinctio quasi dolore molestias adipisci
                      culpa nam explicabo error quas saepe ea quae natus,
                      laboriosam provident consectetur amet aliquam sunt unde!
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <FontAwesomeIcon icon="user" className="mr-1" />
                      <FontAwesomeIcon icon="heart" className="mr-1" />
                      <span>22</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="card mb-2 rounded-0"
                  style={{
                    background: "#f9f9ff",
                    border: "0",
                    color: "#002347",
                  }}
                >
                  <img
                    className="card-img-top rounded-0"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Human"
                  />
                  <div className="card-body">
                    <h4 className="card-title font-weight-bold text-center">
                      Nathan Gomez
                    </h4>
                    <h6 className="text-center mb-5">Enginer Sofware</h6>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto distinctio quasi dolore molestias adipisci
                      culpa nam explicabo error quas saepe ea quae natus,
                      laboriosam provident consectetur amet aliquam sunt unde!
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <FontAwesomeIcon icon="user" className="mr-1" />
                      <FontAwesomeIcon icon="heart" className="mr-1" />
                      <span>22</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="card mb-2 rounded-0"
                  style={{
                    background: "#f9f9ff",
                    border: "0",
                    color: "#002347",
                  }}
                >
                  <img
                    className="card-img-top rounded-0"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Human"
                  />
                  <div className="card-body">
                    <h4 className="card-title font-weight-bold text-center">
                      Nathan Gomez
                    </h4>
                    <h6 className="text-center mb-5">Enginer Sofware</h6>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto distinctio quasi dolore molestias adipisci
                      culpa nam explicabo error quas saepe ea quae natus,
                      laboriosam provident consectetur amet aliquam sunt unde!
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <FontAwesomeIcon icon="user" className="mr-1" />
                      <FontAwesomeIcon icon="heart" className="mr-1" />
                      <span>22</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="card mb-2 rounded-0"
                  style={{
                    background: "#f9f9ff",
                    border: "0",
                    color: "#002347",
                  }}
                >
                  <img
                    className="card-img-top rounded-0"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Human"
                  />
                  <div className="card-body">
                    <h4 className="card-title font-weight-bold text-center">
                      Nathan Gomez
                    </h4>
                    <h6 className="text-center mb-5">Enginer Sofware</h6>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto distinctio quasi dolore molestias adipisci
                      culpa nam explicabo error quas saepe ea quae natus,
                      laboriosam provident consectetur amet aliquam sunt unde!
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <FontAwesomeIcon icon="user" className="mr-1" />
                      <FontAwesomeIcon icon="heart" className="mr-1" />
                      <span>22</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <footer className="inicio pt-5 pb-5">
          <Fade duration={2000}>
            <div className="container-md text-white">
            <div className="row">
              <div className="col-md-3">
                <h5 className="font-weight-bold mb-4">Top students</h5>
                <div className="d-flex flex-column bd-highlight pl-4">
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Alumno 1</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Alumno 2</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Alumno 3</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Alumno 4</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Alumno 5</h6></Link>
                </div>
              </div>
              <div className="col-md-3">
                <h5 className="font-weight-bold mb-4">Quick link</h5>
                <div className="d-flex flex-column bd-highlight pl-4">
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Dashboard</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Profile</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Help</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Notes</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Report</h6></Link>
                </div>
              </div>
              <div className="col-md-3">
                <h5 className="font-weight-bold mb-4">Quick link</h5>
                <div className="d-flex flex-column bd-highlight pl-4">
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Dashboard</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Profile</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Help</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Notes</h6></Link>
                  <Link to="/" className="text-decoration-none"><h6 className="text-secondary">Report</h6></Link>
                </div>
              </div>
              <div className="col-md-3">
                <h3 className="mb-4">Suggestions</h3>
                <form action="">
                  <div className="input-group">
                    <input type="text" name="" id="" className="form-control" placeholder="Message"/>
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button" id="inputGroupFileAddon04">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>            
            <div className="d-flex justify-content-around mt-5 mb-5">
              <div className="d-flex flex-column">
                <a
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-auto"
                >
                  <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
                </a>
                <span className="text-center mx-auto">Wcraft-dev</span>
              </div>

              <div className="d-flex flex-column">
                <a
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-auto"
                >
                  <FontAwesomeIcon icon={["fab", "facebook-f"]} size="2x" />
                </a>
                <span className="text-center mx-auto">Jhair paris</span>
              </div>
            </div>
            <h6 className="text-white text-center">Copyright <FontAwesomeIcon icon={["far","copyright"]}/>{new Date().getFullYear()} All rights reserved </h6>
          </div>
          </Fade>
        </footer>
      </main>
    );
  }
}
