import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner
        animation='grow'
        size='lg'
        variant='dark'
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          marginTop: "-50px", //Half of the height of the loading graphic
          marginLeft: "-50px",
        }}
      >
        <span className='sr-only'> Loading...</span>
      </Spinner>
    </>
  );
};

export default Loader;
