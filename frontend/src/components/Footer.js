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
              <i className='fab fa-facebook ps-4 text-dark '></i>
            </Link>
            <Link
              to={{ pathname: "https://www.instagram.com" }}
              target='_blank'
            >
              <i className='fab fa-instagram ps-4 text-dark'></i>
            </Link>
            <Link to={{ pathname: "https://www.linkedin.com" }} target='_blank'>
              <i className='fab fa-linkedin-in ps-4 text-dark'></i>
            </Link>
            <Link to={{ pathname: "https://www.tiktok.com" }} target='_blank'>
              <i className='fab fa-tiktok ps-4 text-dark'></i>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Impresso Espresso
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
