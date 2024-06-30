import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Image } from 'react-bootstrap';
import { getUserCart } from '../services/CartService';
import { placeOrder } from '../services/OrderService';
import AuthService from '../services/AuthService';

const CheckoutForm = () => {
    const [cartId, setCartId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const userId = AuthService.getUser().id;

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const userCart = await getUserCart(userId);
            setCartId(userCart.id);
            setCartItems(userCart.cartItems);
            setCartTotalPrice(userCart.cartTotalPrice);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                cart: {
                    id: cartId,
                    userId: userId,
                },
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod
            };

            await placeOrder(orderData);
            window.location.href = '/orders';
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Container>
            <h2 className="mt-4">Checkout</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cartItems.map(cartItem => (
                        <Card key={cartItem.product.id} className="mb-3">
                            <Card.Body>
                                <Row>
                                    <Col xs={2} md={1}>
                                        <Image src={cartItem.product.imageUrl} alt={cartItem.product.name} fluid />
                                    </Col>
                                    <Col xs={10} md={3}>
                                        <Card.Title>{cartItem.product.name}</Card.Title>
                                        <Card.Text>Unit Price: ${cartItem.product.price}</Card.Text>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <span>Quantity: {cartItem.quantity}</span>
                                    </Col>
                                    <Col className="d-flex justify-content-end align-items-center">
                                        <span>Item Price: ${cartItem.cartItemPrice}</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                    <Row className="mt-3">
                        <Col>
                            <label htmlFor="shippingAddress">Shipping Address:</label>
                            <input
                                type="text"
                                id="shippingAddress"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <label htmlFor="paymentMethod">Payment Method:</label>
                            <input
                                type="text"
                                id="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Button variant="primary" onClick={handlePlaceOrder}>Place Order</Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <h5>Total Price: ${cartTotalPrice}</h5>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default CheckoutForm;
