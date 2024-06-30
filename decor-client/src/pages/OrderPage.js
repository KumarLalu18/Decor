import React from 'react';
import OrderDetails from '../components/OrderDetails';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderPage = () => {
    return (
        <div className='orders-page'>
            <Header />
            <OrderDetails />
            <Footer />
        </div>
    );
};

export default OrderPage;
