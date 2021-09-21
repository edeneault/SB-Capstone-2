import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import coffee_logo from "../coffee_logo.svg";

import "../css/Navbar.css";

const Header = () => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleToggle = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <header>
      <Container fluid className='fade-in fixed'>
        <Row>
          <Col lg={12} className='m-0 p-0'>
            <Navbar
              variant='dark'
              expand='xxl'
              collapseOnSelect
              className='social py-0 fs-4 bg-gradient'
            >
              <LinkContainer to='/'>
                <Navbar.Brand className='d-flex mx-2 p-0 brand-text fs-3 '>
                  <img
                    src={coffee_logo}
                    width='68'
                    height='68'
                    className='d-inline-block align-center'
                    alt='impresso-espresso-logo'
                  />
                  <Navbar.Text className='m-0 pt-2 ms-1 text-capitalize brand-text text-white'>
                    IMPRESSO ESPRESSO
                  </Navbar.Text>
                </Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle
                onToggle={handleToggle}
                aria-controls='search-navbar-nav'
                className='ms-auto border-0'
              >
                <span className='border-0 text-light'>
                  {collapse ? (
                    <i className='fas fa-chevron-down fa-sm pt-1'></i>
                  ) : (
                    <i className='fas fa-chevron-up fa-sm pt-1'></i>
                  )}
                </span>
                <span className='text-dark fs-6 ms-2'>
                  <i className='fas fa-search text-white pt-1'></i>
                </span>
              </Navbar.Toggle>

              <Navbar.Collapse id='search-navbar-nav'>
                <Nav className='ms-auto pt-1'>
                  <SearchBox name='products' />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className='m-0 p-0'>
            <Navbar
              variant='light'
              expand='lg'
              collapseOnSelect
              className=' py-1 fs-6 bg-custom'
            >
              <Navbar.Toggle aria-controls='basic-navbar-nav' />

              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='m-auto'>
                  <LinkContainer className='m-0 ps-3 pe-5' to='/'>
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='m-0 ps-3 pe-5' to='/allproducts'>
                    <Nav.Link>Products</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title='Categories'
                    id='categoryMenu'
                    className='m-0 ps-3 pe-5'
                  >
                    <LinkContainer to='/categories/espresso'>
                      <NavDropdown.Item>Espresso</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/categories/barista'>
                      <NavDropdown.Item>Barista</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/categories/accessories'>
                      <NavDropdown.Item>Accessories</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <NavDropdown
                    title='Brands'
                    id='brandMenu'
                    className='m-0 ps-3 pe-5'
                  >
                    <LinkContainer to='/brand/Lavazza'>
                      <NavDropdown.Item>Lavazza</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/Bremille'>
                      <NavDropdown.Item>Bremille</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/Hario'>
                      <NavDropdown.Item>Hario</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/illy'>
                      <NavDropdown.Item>Illy</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/LuvMuggs'>
                      <NavDropdown.Item>LuvMuggs</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/Damesi'>
                      <NavDropdown.Item>Damesi</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/BlueMoon'>
                      <NavDropdown.Item>Blue Moon</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/Nesgresso'>
                      <NavDropdown.Item>Nesgresso</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/FancyBarista'>
                      <NavDropdown.Item>Fancy Barista</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/BrightDay'>
                      <NavDropdown.Item>Bright Day</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/brand/ItalianCoffee'>
                      <NavDropdown.Item>Italian Coffee</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <LinkContainer className='m-0 ps-3 pe-5' to='/cart'>
                    <Nav.Link>
                      <i className='fas fa-shopping-cart px-1'></i>Cart
                    </Nav.Link>
                  </LinkContainer>

                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      id='username'
                      className='m-0 ps-3 pe-5'
                    >
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <>
                      <LinkContainer to='/login'>
                        <Nav.Link>
                          <i className='fas fa-sign-in-alt'></i> Sign In
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/register'>
                        <Nav.Link>
                          <i className='fas fa-sign-out-alt'></i> Register
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                      title='Admin'
                      id='adminMenu'
                      className='m-0 px-3'
                    >
                      <LinkContainer to='/admin/userslist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productslist'>
                        <NavDropdown.Item>products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderslist'>
                        <NavDropdown.Item>orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
