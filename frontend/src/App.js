import React from "react";

import { Container } from "react-bootstrap";
import Header from "./components/Header2";
import Footer from "./components/Footer";
import Routes from "./components/Routes";

const App = () => {
  return (
    <>
      <Header />
      <main className=''>
        <Container fluid className='p-0 m-0 g-0'>
          <Routes />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
