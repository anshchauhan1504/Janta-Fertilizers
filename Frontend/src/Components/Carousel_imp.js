import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./Carousel.css"
import { colors } from '@material-ui/core';

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
          <h3>Welcome to Our Fertilizer Shop</h3>
          <p>Explore a wide range of premium fertilizers for your plants.</p>
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
          <h3>High-Quality Fertilizers</h3>
          <p>Find top-notch fertilizers to nourish your plants to perfection.</p>
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
          <h3>Expert Advice</h3>
          <p>
          Get expert advice and guidance from our experienced team.
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
          <h3>Wide Selection</h3>
          <p>Choose from a wide selection of fertilizers tailored to your needs.</p>
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

