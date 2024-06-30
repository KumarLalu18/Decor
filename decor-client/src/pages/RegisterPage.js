import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';
import { Container } from 'react-bootstrap';

const RegisterPage = () => {
    return (
        <div>
            <Header />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)' }}>
                <RegisterForm />
            </Container>
            <Footer />
        </div>
    );
};

export default RegisterPage;
