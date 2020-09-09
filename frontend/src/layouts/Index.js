import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class index extends Component {
  render() {
    return (
      <main>
        <div
          id="myCarousel"
          className="carousel slide pointer-event"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li/>
            <li className="active"/>
            <li/>
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item">
              <img src={require("../assets/image/card_01.png")} alt="image1"/>
              <div className="container">
                <div className="carousel-caption text-left">
                  <h1>Example headline.</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <button className="btn btn-sm btn-primary">
                      Sign up today
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img src={require("../assets/image/card_02.png")} alt="image2"/>
              <div className="container">
                <div className="carousel-caption">
                  <h1>Another example headline.</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <button className="btn btn-sm btn-primary">
                      Learn more
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={require("../assets/image/card_03.png")} alt="image3"/>
              <div className="container">
                <div className="carousel-caption text-right">
                  <h1>One more for good measure.</h1>
                  <p>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Donec id elit non mi porta gravida at eget metus. Nullam id
                    dolor id nibh ultricies vehicula ut id elit.
                  </p>
                  <p>
                    <button className="btn btn-sm btn-primary">
                      Browse gallery
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev"
          >
            <FontAwesomeIcon icon="arrow-left" size="3x"/>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next"
          >
            <FontAwesomeIcon icon="arrow-right" size="3x"/>
          </a>
        </div>

        <div className="container-md">
          <h3>hola</h3>
          <h3>hola</h3>
        </div>
        <footer className="container">

        </footer>
      </main>
    );
  }
}
