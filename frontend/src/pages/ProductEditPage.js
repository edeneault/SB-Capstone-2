import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewSource, setPreviewSource] = useState();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      uploadImage(reader.result);
    };
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productslist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      setUploading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ data: base64EncodedImage });
      await axios
        .post("/api/upload", body, config)
        .then((res) => {
          const secure_url = res.data.secure_url;
          setUploading(false);
          setImage(secure_url);
        })
        .catch((err) => new Error(err));
    } catch (err) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }),
    );
    dispatch(listProductDetails(productId));
  };

  return (
    <>
      <Container fluid className='px-5'>
        <Button className='btn btn-light my-3' onClick={() => history.goBack()}>
          Go Back
        </Button>
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && toast(`${errorUpdate}`, { type: "error" })}
          {loading ? (
            <Loader />
          ) : error ? (
            toast(`${error}`, { type: "error" })
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  type='file'
                  label='choose file'
                  onChange={handleFileInputChange}
                  className='btn text-dark'
                ></Form.Control>
                {uploading && <Loader />}
              </Form.Group>

              {previewSource && (
                <img
                  src={previewSource}
                  alt='chosen'
                  style={{ height: "200px" }}
                />
              )}

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter count-in-stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='my-2'>
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default ProductEditPage;
