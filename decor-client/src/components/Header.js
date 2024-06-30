import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Header = () => {
    const isAuthenticated = AuthService.isLoggedIn();

    const handleLogout = () => {
        AuthService.clearUser();
        window.location.href = '/';
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Decor</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='me-auto'/>
                    <Nav>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            {isAuthenticated ? (
                                <>
                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/cart">Cart</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/orders">Orders</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Signout</NavDropdown.Item>
                                </>
                            ) : (
                                <>
                                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
