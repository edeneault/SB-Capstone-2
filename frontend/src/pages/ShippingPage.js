import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <Container fluid className='px-5 pt-3 fade-in'>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='Address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='City'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='PostalCode'>
            <Form.Label>PostalCode</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter PostalCode'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className=' rounded my-2'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ShippingPage;
