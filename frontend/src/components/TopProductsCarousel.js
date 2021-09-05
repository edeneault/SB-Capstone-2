import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { listTopProducts } from "../actions/productActions";
import "../css/ProductCarousel.css";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 20,
  },
};

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  const images = products.map((product) => product);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2 className='carousel-title m-0 p-3 text-dark fs-1'>
        ~ Top Rated Products ~
      </h2>
      <Carousel
        itemClass='image-item'
        responsive={responsive}
        swipeable
        renderArrowsWhenDisabled
        infinite
        centerMode
        className='fade-in'
      >
        {images.slice(0, 8).map((product) => {
          return (
            <div key={product.name} className=''>
              <Image
                fluid
                className='img-carousel'
                draggable={false}
                src={product.image}
              />
              <Link to={`/products/${product._id}`} className='text-dark'>
                <p className='p-0 m-0  fs-6 '>{product.name}</p>
              </Link>
              <p className='p-0 m-0  fs-6'>${product.price}</p>
              <Rating
                value={product.rating}
                text={`${product.numReviews}  reviews`}
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
