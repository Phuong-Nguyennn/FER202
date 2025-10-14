import React from "react";
import { Navbar, Nav, Container, Form, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiUserCircle, BiLogIn, BiHeart } from "react-icons/bi";

export default function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🎬 MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {/* Dropdown: Accounts */}
            <NavDropdown title={<span><BiUserCircle /> Accounts</span>} id="accounts-dropdown">
              <NavDropdown.Item href="#">Manage Your Profiles</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/account">
                Build Your Account
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Change Password</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Form & Icons */}
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Quick search..." className="me-2" />
            <Button variant="outline-info">Search</Button>
          </Form>

          <div className="ms-3 d-flex align-items-center gap-3">
            <BiHeart size={22} title="Favourites" />
            <BiLogIn size={22} title="Login" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
