import React, { useState } from 'react';
import { Form, Button, Modal, Card } from 'react-bootstrap';
import { registerUser } from '../services/UserService';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleRegister = async () => {
        try {
            const userData = { name, email, address, phoneNumber, password };
            await registerUser(userData);
            window.location.href = '/';
        } catch (error) {
            setAlertMessage(error.message);
            setShowAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <Card className="p-4">
            <Card.Title>Register</Card.Title>
            <hr className="my-4" />
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={handleRegister} className="mt-3">
                    Register
                </Button>
            </Form>

            <Modal show={showAlert} onHide={handleCloseAlert}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>{alertMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAlert}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default RegisterForm;
