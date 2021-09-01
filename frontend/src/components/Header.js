import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

import "../css/Header.css";

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
      <Navbar className='social py-0 px-3 fs-4'>
        <LinkContainer to='/'>
          <Navbar.Brand className='d-flex mx-2'>
            <Navbar.Text className='fs-2 mt-1 text-capitalize brand-text text-white'>
              Impresso Espresso
            </Navbar.Text>
          </Navbar.Brand>
        </LinkContainer>
        <Nav className='d-none d-md-block ms-auto px-3'>
          <Link to={{ pathname: "https://www.facebook.com" }} target='_blank'>
            <i className='fab fa-facebook ps-4 text-white '></i>
          </Link>
          <Link to={{ pathname: "https://www.instagram.com" }} target='_blank'>
            <i className='fab fa-instagram ps-4 text-white'></i>
          </Link>
          <Link to={{ pathname: "https://www.linkedin.com" }} target='_blank'>
            <i className='fab fa-linkedin-in ps-4 text-white'></i>
          </Link>
          <Link to={{ pathname: "https://www.tiktok.com" }} target='_blank'>
            <i className='fab fa-tiktok ps-4 text-white'></i>
          </Link>
        </Nav>
      </Navbar>

      <Navbar
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='bg-gradient py-1 fs-6 main-nav'
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
              <LinkContainer to='/brand/Breville'>
                <NavDropdown.Item>Breville</NavDropdown.Item>
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
              <NavDropdown title='Admin' id='adminMenu' className='m-0 px-3'>
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
      <Container className='search px-3 m-0 text-end text-white' fluid>
        <Navbar
          expand='false'
          onToggle={handleToggle}
          collapseOnSelect={true}
          className='p-1'
        >
          <Navbar.Toggle
            onToggle={handleToggle}
            aria-controls='search-navbar-nav'
            className='ms-auto border-0'
          >
            <span className='border-0 text-light'>
              {collapse ? (
                <i className='fas fa-chevron-down fa-sm'></i>
              ) : (
                <i className='fas fa-chevron-up fa-sm'></i>
              )}
            </span>
          </Navbar.Toggle>
          <span className='text-light fs-6 ms-2'>
            <i className='fas fa-search'></i>
          </span>
          <Navbar.Collapse id='search-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox name='products' />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
