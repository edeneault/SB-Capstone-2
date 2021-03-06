import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import StripeCheckout from "react-stripe-checkout";

import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  listMyOrders,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

// From Stripe:  "Publishable API keys are meant solely to identify your account with Stripe, they aren't secret.
// In other words, you can safely publish them in places like your Stripe.js JavaScript code...""
const REACT_APP_PUBLISHABLE_KEY =
  "pk_test_51JRqp7KjZGClM1n1fLCwC3ildAT2NuKicEImgX4XtkgXATvYhkiR9oyz5Pply1joDuFth4wkVYDJk3WzAPxqfoo600i4HL6sCE";

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paymentMethod = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : [];

  if (!loading) {
    // Convert to 2 decimal points //
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    // Calculate itemsPrice //
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.pushState("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
      dispatch(listMyOrders());
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  const handleToken = async (token, addresses) => {
    const { data } = await axios.post(`/api/config/stripecheckout`, {
      token,
      order,
    });
    const { status } = data;

    const { id } = data;
    const { email } = data;

    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
      let paymentResult = {
        id: id,
        status: status,
        email_address: email,
      };
      dispatch(payOrder(orderId, paymentResult));
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    toast("Something went wrong", { type: "error" })
  ) : (
    <>
      <Container fluid className='px-5 pt-3'>
        <h1>Order: {orderId} </h1>{" "}
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    {" "}
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {paymentMethod}
                  {}
                </p>
                {order.isPaid ? (
                  <Message variant='success'> Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/products/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className='rounded'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && paymentMethod === "PayPal" ? (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    )}
                  </ListGroup.Item>
                ) : null}
                {!order.isPaid && paymentMethod === "Stripe" ? (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    <Col className='d-grid'>
                      <StripeCheckout
                        stripeKey={REACT_APP_PUBLISHABLE_KEY}
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        amount={order.totalPrice * 100}
                        name={order.user.name}
                      />
                    </Col>
                  </ListGroup.Item>
                ) : null}

                <ListGroup.Item>
                  <Link to={`/paymentmethod`} className=''>
                    Change Payment Method
                  </Link>
                </ListGroup.Item>

                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Col className='d-grid'>
                        <Button
                          type='button'
                          className='btn btn-small btn-dark'
                          onClick={deliverHandler}
                        >
                          Mark as Delivered
                        </Button>
                      </Col>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderPage;
