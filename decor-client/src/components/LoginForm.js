import React, { useState } from 'react';
import { Form, Button, Modal, Card } from 'react-bootstrap';
import { loginUser } from '../services/UserService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleLogin = async () => {
        try {
            const userData = { email, password };
            await loginUser(userData);
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
            <Card.Title>Login</Card.Title>
            <hr className="my-4" />
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={handleLogin} className="mt-3">
                    Login
                </Button>
            </Form>

            <Modal show={showAlert} onHide={handleCloseAlert}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Failed</Modal.Title>
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

export default LoginForm;
