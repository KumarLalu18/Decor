import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import { Container } from 'react-bootstrap';

const LoginPage = () => {
    return (
        <div>
            <Header />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
                <LoginForm />
            </Container>
            <Footer />
        </div>
    );
};

export default LoginPage;
