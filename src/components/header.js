import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'; // Import the CSS file
import Button from 'react-bootstrap/Button';


export default function Appheader() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" className="navbar-brand">GeoSensei</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav"> 
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#Innovation">Innovation</Nav.Link>
                        <Nav.Link href="#Beneficiaries">Beneficiaries</Nav.Link>
                    </Nav>
                    <Link to="/newpage">
                        <Button className="custom-button">Let's Go!</Button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
