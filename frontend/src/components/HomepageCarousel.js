import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import "../css/HomepageCarousel.css";

const HomepageCarousel = () => {
  return (
    <Carousel fade className='mt-3 fade-in'>
      <Carousel.Item>
        <Image
          className='img'
          src='https://res.cloudinary.com/edeneault-cloudinary/image/upload/c_fill,h_400,w_2000/v1630186070/eShop/homepage-carousel/homepage-carousel-coffee-2_e6ue2v.jpg'
          alt='First slide'
        />
        <Carousel.Caption>
          <h3 className='text-light fs-md-5 slide-title'>
            Curated Coffee Selection
          </h3>
          <Link
            className='btn btn-secondary rounded slide-btn '
            to='/categories/espresso'
          >
            <span className='slide-in'>SHOP COFFEE</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='img'
          src='https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630862474/eShop/homepage-carousel/Carousel-barista_uyypfe.jpg'
          alt='Second slide'
        />

        <Carousel.Caption>
          <h3 className='text-light fs-md-5 slide-title'>
            Barista and Coffee Machines
          </h3>
          <Link
            className='btn btn-secondary rounded slide-btn'
            to='/categories/barista'
          >
            <span className='slide-in'>SHOP MACHINE</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='img'
          src='https://res.cloudinary.com/edeneault-cloudinary/image/upload/c_fill,h_400,w_2000/v1630862737/eShop/Depositphotos_187848480_sm-2015_ihw3l3.jpg'
          alt='Third slide'
        />

        <Carousel.Caption>
          <h3 className='text-light fs-md-5 slide-title'>
            ACCESSORIES AND MERCHANDISE
          </h3>
          <Link
            className='btn btn-secondary rounded slide-btn'
            to='/categories/accessories'
          >
            <span className='slide-in'>SHOP ACCESSORIES</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomepageCarousel;
