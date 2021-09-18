import React from "react";
import { Nav, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Row>
      <Col xs={12}>
        <Nav className='justify-content-md-center mb-4'>
          <Nav.Item className='mx-1 px-1'>
            {step1 ? (
              <LinkContainer to='/login'>
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Sign In</Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className='mx-1 px-1'>
            {step2 ? (
              <LinkContainer to='/shipping'>
                <Nav.Link>Shipping</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Shipping</Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className='mx-1 px-1'>
            {step3 ? (
              <LinkContainer to='/payment'>
                <Nav.Link>Payment</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Payment</Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className='mx-1 px-1'>
            {step4 ? (
              <LinkContainer to='/placeorder'>
                <Nav.Link>Place Order</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Place Order</Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
