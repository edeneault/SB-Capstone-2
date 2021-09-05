import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/TopProductsCarousel";
import HomepageCarousel from "../components/HomepageCarousel";
import CategoryCarousel from "../components/CategoryCarousel";
import BrandCarousel from "../components/BrandCarousel";
import MetaData from "../components/MetaData";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <MetaData />
      {!keyword ? (
        <HomepageCarousel />
      ) : (
        <Link to='/' className='btn btn-light mx-5'>
          Go Back
        </Link>
      )}
      {!keyword && (
        <>
          <ProductCarousel className='fade-in' />
        </>
      )}
      {/* <AllProductsCarousel /> */}

      {!keyword && (
        <>
          <CategoryCarousel category='espresso' />
        </>
      )}

      {!keyword && (
        <>
          <BrandCarousel brand='Bremille' />
        </>
      )}

      <Container fluid className='px-5'>
        <hr className='fade-in' />
        <h2 className='carousel-title m-0 p-3 text-dark fs-1'>
          {" "}
          ~ All Products ~
        </h2>
        {loading ? (
          <Loader />
        ) : error ? (
          toast(`${error}`, { type: "error" })
        ) : (
          <>
            <Row className='fade-in'>
              {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
