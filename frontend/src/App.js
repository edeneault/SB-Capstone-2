import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container fluid className='mt-5 pt-5 g-0'>
          <Routes />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
