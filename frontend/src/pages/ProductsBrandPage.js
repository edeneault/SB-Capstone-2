import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import MetaData from "../components/MetaData";

import BrandCarousel from "../components/BrandCarousel";
import { listBrandProducts } from "../actions/productActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ProductsBrandPage = ({ match }) => {
  const brand = match.params.brand;

  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productBrand = useSelector((state) => state.productBrand, shallowEqual);
  const { loading, error, products, page, pages } = productBrand;

  useEffect(() => {
    dispatch(listBrandProducts(brand, pageNumber));
  }, [dispatch, brand, pageNumber]);

  return (
    <>
      <MetaData title={brand + " page"} />
      <BrandCarousel brand={brand} />
      <Container fluid className='px-5 pt-3'>
        {loading ? (
          <Loader />
        ) : error ? (
          toast(`${error}`, { type: "error" })
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} brand={brand ? brand : ""} />
          </>
        )}
      </Container>
    </>
  );
};

export default ProductsBrandPage;
