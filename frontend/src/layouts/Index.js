import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import back from "../assets/image/card_01.png";
import { Link } from "react-router-dom";

const styleCard = {
  width: "18rem",
  background: "#f9f9ff",
  border: "0",
  color: "#002347",
};

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
          </div>
        </div>

        <div className="container-md">
          <section className="mb-5">
            <h1 className="text-center font-weight-bold">Aweosome Feature</h1>
            <h5 className="text-center font-italic text-muted">
              I don't have idea
            </h5>
            <div className="row justify-content-center mt-5">
              <div class="col-md-3 card m-4 rounded-0" style={styleCard}>
                <div class="card-body">
                  <FontAwesomeIcon
                    icon={"school"}
                    size={"2x"}
                    className="mb-4"
                  />
                  <h5 class="card-title font-weight-bold">
                    Schoolarship Facility
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
              <div class="col-md-3 card m-4 rounded-0" style={styleCard}>
                <div class="card-body">
                  <FontAwesomeIcon
                    icon={"book-reader"}
                    size={"2x"}
                    className="mb-4"
                  />
                  <h5 class="card-title font-weight-bold">
                    Schoolarship Facility
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
              <div class="col-md-3 card m-4 rounded-0" style={styleCard}>
                <div class="card-body">
                  <FontAwesomeIcon
                    icon={"globe-americas"}
                    size={"2x"}
                    className="mb-4"
                  />
                  <h5 class="card-title font-weight-bold">
                    Schoolarship Facility
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-5">
            <h1 className="text-center font-weight-bold">Our Course Popular</h1>
            <h5 className="text-center font-italic text-muted">
              I don't have idea
            </h5>

            <div
              id="multi-item-example"
              class="carousel slide carousel-multi-item"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <li
                  data-target="#multi-item-example"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li data-target="#multi-item-example" data-slide-to="1"></li>
              </ol>

              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                  <div class="col-md-4 float-left">

                    <div class="card mb-2 rounded-0" style={{height:"500px"}}>
                      <img
                        class="card-img-top rounded-0"
                        src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                        alt="Card image cap"
                      />
                      <div class="card-body d-flex align-items-start flex-column bd-highlight">
                        <a class="btn btn-primary mb-auto bd-highlight">Button</a>
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                      </div>
                    </div>


                  </div>
                </div>
                <div class="carousel-item">
                  <div class="col-md-3 float-left">
                      <div class="card mb-2">
                        <img
                          class="card-img-top"
                          src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <p class="card-text">
                            Some quick example text to build on the card title and
                            make up the bulk of the card's content.
                          </p>
                          <a class="btn btn-primary">Button</a>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              
              <a
                class="carousel-control-prev"
                href="#multi-item-example"
                data-slide="prev"
              >
                <FontAwesomeIcon icon="arrow-left" />
              </a>
              <a
                class="carousel-control-next"
                href="#multi-item-example"
                data-slide="next"
              >
                <FontAwesomeIcon icon="arrow-right" />
              </a>
            </div>
          </section>
        </div>
        <footer className="container"></footer>
      </main>
    );
  }
}
