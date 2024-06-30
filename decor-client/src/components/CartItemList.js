import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Image } from 'react-bootstrap';
import { getProductById } from '../services/ProductService';
import { addOrUpdateCart, getUserCart, clearCart } from '../services/CartService';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';

const CartItemList = () => {
    const [cartId, setCartId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const userId = AuthService.getUser().id;

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            // Fetch user's cart items
            const userCart = await getUserCart(userId);
            setCartId(userCart.id);
            setCartItems(userCart.cartItems);
            calculateCartTotalPrice(userCart.cartItems);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateCartTotalPrice = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.quantity * item.product.price;
        });
        setCartTotalPrice(total);
    };

    const handleAddToCart = async (productId) => {
        try {
            await addOrUpdateCartItem(productId, 1);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleDecreaseQuantity = async (productId) => {
        try {
            await addOrUpdateCartItem(productId, -1);
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const itemIndex = cartItems.findIndex(item => item.product.id === productId);
            const quantityChange = -cartItems[itemIndex].quantity;
            await addOrUpdateCartItem(productId, quantityChange);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const addOrUpdateCartItem = async (productId, quantityChange) => {
        try {
            const product = await getProductById(productId);
            // Find the index of the item in the cart items list
            const itemIndex = cartItems.findIndex(item => item.product.id === productId);
            const updatedQuantity = cartItems[itemIndex].quantity + quantityChange;
            await addOrUpdateCart({
                cartId: cartId,
                product: {
                    id: productId
                },
                quantity: updatedQuantity
            });
            fetchCartItems();
        } catch (error) {
            throw error;
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart(userId);
            fetchCartItems();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <Container>
            <h2 className="mt-4">Cart Items</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cartItems.map(cartItem => (
                        <Card key={cartItem.product.id} className="mb-3">
                            <Card.Body>
                                <Row>
                                    <Col xs={2} md={1}>
                                        <Image src={cartItem.product.imageUrl}
                                        alt={cartItem.product.name}
                                        fluid
                                    />
                                    </Col>
                                    <Col xs={10} md={3}>
                                        <Card.Title>{cartItem.product.name}</Card.Title>
                                        <Card.Text>Unit Price: ${cartItem.product.price}</Card.Text>
                                    </Col>
                                    <Col xs={12} md={4} className="d-flex justify-content-end align-items-center">
                                        <Button
                                            variant="outline-primary"
                                            className="me-3"
                                            onClick={() => handleDecreaseQuantity(cartItem.product.id)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-3">{cartItem.quantity}</span>
                                        <Button
                                            variant="outline-primary"
                                            className="me-3"
                                            onClick={() => handleAddToCart(cartItem.product.id)}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => handleRemoveFromCart(cartItem.product.id)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                    <Col className="d-flex justify-content-end align-items-center">
                                        <span className="mx-3">Item Price: ${cartItem.quantity * cartItem.product.price}</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                    <div className="text-end mt-3">
                        <Button variant="danger" onClick={handleClearCart}>Clear Cart</Button>
                        <Link to="/checkout">
                            <Button variant="primary" className="ms-3">Proceed To Checkout</Button>
                        </Link>
                    </div>
                    <div className="text-end mt-3">
                        <h5>Total Price: ${cartTotalPrice}</h5>
                    </div>
                </>
            )}
        </Container>
    );
};

export default CartItemList;