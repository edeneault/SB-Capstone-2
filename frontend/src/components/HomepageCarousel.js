import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import "../css/HomepageCarousel.css";

const HomepageCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image
          className='img'
          src='https://res.cloudinary.com/edeneault-cloudinary/image/upload/c_fill,h_400,w_2000/v1630186070/eShop/homepage-carousel/homepage-carousel-coffee-2_e6ue2v.jpg'
          alt='First slide'
        />
        <Carousel.Caption>
          <h3 className='text-light fs-1 fs-md-5 slide-title'>
            Curated Coffee Selection
          </h3>
          <p className='text-white fs-3 carousel-text-shadow'>
            Because life is better with coffee!
          </p>
          <Link className='btn btn-secondary rounded' to='/categories/espresso'>
            SHOP COFFEE
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='img'
          src='https://res.cloudinary.com/edeneault-cloudinary/image/upload/c_fill,h_400,w_2000/v1630200059/eShop/homepage-carousel/homepage-carousel-coffee-4_rciqlk.jpg'
          alt='Second slide'
        />

        <Carousel.Caption>
          <h3 className='text-light fs-1 fs-md-5 slide-title'>
            Barista and Coffee Machines
          </h3>
          <p className='text-white fs-3 carousel-text-shadow'>
            Only the highest quality and best rated.
          </p>
          <Link className='btn btn-secondary rounded' to='/categories/barista'>
            SHOP MACHINE
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='img'
          src='https://res.cloudinary.com/edeneault-cloudinary/image/upload/c_fill,h_400,w_2000/v1630208757/eShop/homepage-carousel/homepage-carousel-coffee-5_jsvuvs.jpg'
          alt='Third slide'
        />

        <Carousel.Caption>
          <h3 className='text-light fs-1 fs-md-5 slide-title'>
            ACCESSORIES AND MERCHANDISE
          </h3>
          <p className='text-white fs-3 carousel-text-shadow'>
            Coffee mugs, single pour products, filters and much more.
          </p>
          <Link
            className='btn btn-secondary rounded'
            to='/categories/accessories'
          >
            SHOP ACCESSORIES
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomepageCarousel;
