import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./Carousel.css"

function CarouselFadeExample() {
  return (
    <Carousel fade interval={null} pause={null} wrap={null} className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./entry.jpg"
          alt="First slide"
          style={{ maxHeight: '700px' }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./Interior1.jpg"
          alt="Second slide"
          style={{ maxHeight: '700px' }}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./Interior2.jpg"
          alt="Third slide"
          style={{ maxHeight: '700px' }}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./Interior3.jpg"
          alt="Second slide"
          style={{ maxHeight: '700px'}}
        />

        <Carousel.Caption>
          <h3>4rth slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const Carousel_imp = () => {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-xs-12">
          <CarouselFadeExample />
        </div>
      </div>
    </div>
  );
};

export default Carousel_imp;

