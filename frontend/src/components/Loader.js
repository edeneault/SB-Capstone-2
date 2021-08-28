import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner
        animation='grow'
        size='lg'
        variant='info'
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          marginTop: "-50px", //Half of the height of the loading graphic
          marginLeft: "-50px",
        }}
      />
      {/* <Spinner
        animation='border'
        role='status'
        style={{
          display: "block",
          position: "fixed",
          zIndex: "1031",
          top: "15px",
          right: "15px",
        }}
      >
        <span className='sr-only'> Loading...</span>
      </Spinner> */}
    </>
  );
};

export default Loader;
