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
      <Navbar className='social py-2 px-3 fs-4'>
        <LinkContainer to='/'>
          <Navbar.Brand className='d-flex mx-2'>
            <img
              src='/images/carabiner.svg'
              width='100'
              height='50'
              className='d-inline-block align-center'
              alt='Acrogear'
            />{" "}
            <Navbar.Text className='text-dark fs-4 mt-1 text-capitalize '>
              CARAB <small>Rigging Specialists</small>
            </Navbar.Text>
          </Navbar.Brand>
        </LinkContainer>
        <Nav className='ms-auto px-3'>
          <Link to={{ pathname: "https://www.facebook.com" }} target='_blank'>
            <i className='fab fa-facebook px-3 '></i>
          </Link>
          <Link to={{ pathname: "https://www.instagram.com" }} target='_blank'>
            <i className='fab fa-instagram px-3 '></i>
          </Link>
          <Link to={{ pathname: "https://www.linkedin.com" }} target='_blank'>
            <i className='fab fa-linkedin-in px-3 '></i>
          </Link>
          <Link to={{ pathname: "https://www.tiktok.com" }} target='_blank'>
            <i className='fab fa-tiktok px-3 '></i>
          </Link>
        </Nav>
      </Navbar>

      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='bg-gradient py-1 fs-6'
      >
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            <LinkContainer className='px-5' to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer className='px-5' to='/products'>
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer className='px-5' to='/categories'>
              <Nav.Link>Categories</Nav.Link>
            </LinkContainer>
            <LinkContainer className='px-5' to='/brands'>
              <Nav.Link>Brands</Nav.Link>
            </LinkContainer>
            <LinkContainer className='px-5' to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart px-1'></i>Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id='username'
                className='m-0 px-3'
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
          expand='xxl'
          onToggle={handleToggle}
          collapseOnSelect={true}
          className='p-1'
        >
          <Navbar.Toggle
            onToggle={handleToggle}
            aria-controls='search-navbar-nav'
            className='ms-auto border-0'
          >
            <span className='border-0'>
              {collapse ? (
                <i className='fas fa-chevron-down fa-sm'></i>
              ) : (
                <i className='fas fa-chevron-up fa-sm'></i>
              )}
            </span>
          </Navbar.Toggle>
          <span className='text-secondary fs-6 ms-2'>Search Tools</span>
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
