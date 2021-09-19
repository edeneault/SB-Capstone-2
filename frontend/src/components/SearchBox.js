import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../css/SearchBox.css";

const SearchBox = ({ name }) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <Container>
        <Row className='d-flex py-2 px-3'>
          <Col>
            <Form onSubmit={submitHandler} className='d-flex ms-auto mt-1'>
              <Form.Control
                id='search'
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={`search ${name}`}
                className='rounded-start smaller-input'
                size='sm'
              ></Form.Control>

              <Button
                type='submit'
                variant='secondary '
                className='btn rounded-end smaller-button'
              >
                <i className='fas fa-search'></i>
              </Button>
              {/* </InputGroup> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchBox;
