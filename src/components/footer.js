import React from "react";
import Container from 'react-bootstrap/Container';
import './footer.css';

export default function AppFooter() {
    return (
        <footer className="footer">
            <Container fluid>
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} GeoSensei. All Rights Reserved.</p>
                    <ul className="footer-links">
                         <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#Innovation">Innovation</a></li>
                        <li><a href="#Beneficiaries">Beneficiaries</a></li>
                        
                    </ul>
                </div>
            </Container>
        </footer>
    );
}
