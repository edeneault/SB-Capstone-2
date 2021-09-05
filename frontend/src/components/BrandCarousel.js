import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listBrandProducts } from "../actions/productActions";
import "../css/ProductCarousel.css";
import Carousel from "react-multi-carousel";
import shuffle from "../utils/shuffle";

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
    paritialVisibilityGutter: 30,
  },
};

const BrandCarousel = ({ brand }) => {
  const dispatch = useDispatch();

  const productBrand = useSelector((state) => state.productBrand);
  const { loading, error, products } = productBrand;
  shuffle(products);

  useEffect(() => {
    dispatch(listBrandProducts(brand));
  }, [dispatch, brand]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2 className='carousel-title m-0 p-3 text-dark fs-1'>
        ~ Brand {brand} ~
      </h2>
      <Carousel
        itemClass='image-item'
        responsive={responsive}
        swipeable
        renderArrowsWhenDisabled
        // infinite
        centerMode
        className='fade-in'
      >
        {products.slice(0, 12).map((product) => {
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
                <p className='p-0 m-0  fs-6'>{product.price}</p>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default BrandCarousel;
