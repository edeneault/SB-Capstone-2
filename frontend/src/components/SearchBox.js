import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import "../css/SearchBox.css";

const SearchBox = () => {
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
    <Form onSubmit={submitHandler} className='d-flex ms-auto mt-1'>
      <InputGroup>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='search products'
          className='rounded-start smaller-input'
          size='sm'
        ></Form.Control>

        <Button
          type='submit'
          variant='outline-secondary btn-sm'
          className='d-inline rounded-end smaller-button'
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
