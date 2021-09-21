import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-1'>
            <Link to={{ pathname: "https://www.facebook.com" }} target='_blank'>
              <i className='fab fa-facebook px-4 text-dark '></i>
            </Link>
            <Link
              to={{ pathname: "https://www.instagram.com" }}
              target='_blank'
            >
              <i className='fab fa-instagram px-4 text-dark'></i>
            </Link>
            <Link to={{ pathname: "https://www.linkedin.com" }} target='_blank'>
              <i className='fab fa-linkedin-in px-4 text-dark'></i>
            </Link>
            <Link to={{ pathname: "https://www.tiktok.com" }} target='_blank'>
              <i className='fab fa-tiktok px-4 text-dark'></i>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-1'>
            Copyright &copy; Impresso Espresso
          </Col>
        </Row>
        <Row>
          <Col className='text-center disclaimer'>
            Web Application built using MERN stack as a Capstone Project. NOT A
            REAL STORE.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
