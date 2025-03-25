import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './newheader.css';

export default function NewHeader() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">GeoSensei    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="#asia">Asia</Nav.Link>
            <Nav.Link href="#africa">Africa</Nav.Link>
            <Nav.Link href="#europe">Europe</Nav.Link>
            <Nav.Link href="#north-america">N. America</Nav.Link>
            <Nav.Link href="#south-america">S. America</Nav.Link>
            <Nav.Link href="#australia">Australia</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
