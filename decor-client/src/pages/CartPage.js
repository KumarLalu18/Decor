import React from 'react';
import { Container } from 'react-bootstrap';
import CartItemList from '../components/CartItemList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartPage = () => {
    return (
        <div className='cart-page'>
            <Header />
            <Container className="mt-5">
                <CartItemList />
            </Container>
            <Footer />
        </div>
    );
};

export default CartPage;
