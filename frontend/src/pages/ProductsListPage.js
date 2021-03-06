import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ProductsListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productList, shallowEqual);
  const { loading, error, products, page, pages } = productsList;

  const productDelete = useSelector(
    (state) => state.productDelete,
    shallowEqual,
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Container fluid className=' px-5 pt-3'>
        <Row className='align-items-top mb-0 pb-0'>
          <Col sm={4}>
            <h1 className='page-title slide-in mb-0 pb-0'>My Products</h1>
          </Col>
        </Row>
        <Row className='align-items-top mb-0 pb-0'>
          <Col md={12} className=' text-start'>
            <Button className='my-1 rounded' onClick={createProductHandler}>
              <i className='fas fa-plus '></i> Create Product
            </Button>
          </Col>
        </Row>
        {loadingCreate && <Loader />}
        {errorCreate && toast(`${errorCreate}`, { type: "error" })}
        {loadingDelete && <Loader />}
        {errorDelete && toast(`${errorDelete}`, { type: "error" })}
        {loading ? (
          <Loader />
        ) : error ? (
          toast(`${error}`, { type: "error" })
        ) : (
          <>
            <Table bordered hover responsive className='table-sm'>
              <thead>
                <tr className='bg-black text-light'>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className='align-middle'>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm edit m-1'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm trash m-1'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductsListPage;
