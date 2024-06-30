import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage = () => {

    return (
        <div className='checkout-page'>
            <Header />
            <CheckoutForm />
            <Footer />
        </div>
    );
};

export default CheckoutPage;
