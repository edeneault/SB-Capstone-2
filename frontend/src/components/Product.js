import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Rating from "./Rating";
import "../css/Product.css";

const Product = ({ product }) => {
  return (
    <Card className='my-3 rounded product-card'>
      <Link to={`/products/${product._id}`}>
        <Card.Img className='p-1 fade-in' src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <ListGroup className='list-group-flush py-2'>
          <ListGroupItem>
            <Link to={`/products/${product._id}`}>
              <Card.Title className='d-block' as='div'>
                <strong> {product.name}</strong>
              </Card.Title>
            </Link>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Text as='div'>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
          </ListGroupItem>

          <ListGroupItem className='price mx-auto'>
            <Card.Text as='h3'>${product.price}</Card.Text>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Product;
