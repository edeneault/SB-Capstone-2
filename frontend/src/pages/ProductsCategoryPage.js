import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import CategoryCarousel from "../components/CategoryCarousel";
import { listCategoryProducts } from "../actions/productActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ProductsCategoryPage = ({ match }) => {
  const category = match.params.category;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products, page, pages } = productCategory;

  useEffect(() => {
    dispatch(listCategoryProducts(category, pageNumber));
  }, [dispatch, category, pageNumber]);

  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <>
      <CategoryCarousel category={category} />
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
            <Paginate
              pages={pages}
              page={page}
              category={category ? category : ""}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default ProductsCategoryPage;
