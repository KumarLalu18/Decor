import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission
    };

    return (
        <footer className="py-3 bg-dark text-light mt-5">
            <Container>
                <Row className="mb-4">
                    <Col md={6}>
                        <div className="contact-us">
                            <h5 style={{ fontSize: '3em' }}>Contact Us</h5>
                            <hr className="text-light" />
                            <p style={{ fontSize: '2em' }}>Email: example@example.com</p>
                            <p style={{ fontSize: '2em' }}>Contact Number: +1234567890</p>
                            <p style={{ fontSize: '2em' }}>Address: 123 Street, City, Country</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" placeholder="Enter your phone number" />
                            </Form.Group>
                            <Form.Group controlId="query">
                                <Form.Label>Query</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Enter your query" />
                            </Form.Group>
                            <hr className="text-light" />
                            <Button variant="primary" type="submit">Send Query</Button>
                        </Form>
                    </Col>
                </Row>
                <hr className="text-light" />
                <Row>
                    <Col>
                        <div className="text-center text-muted">
                            <p>Made with <span role="img" aria-label="heart">❤️</span> by Adrita Haldar</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
