import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Image, Row, Alert, Modal } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import { getProductById } from '../services/ProductService';
import { addOrUpdateCart, getUserCart } from '../services/CartService';
import { getCategoryById } from '../services/CategoryService';

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [userCart, setUserCart] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getProductById(productId);
                const categoryData = await getCategoryById(productData.categoryId);
                setProduct(productData);
                setCategory(categoryData);
                if (isLoggedIn) {
                    const user = AuthService.getUser();
                    const userId = user.id;
                    const cart = await getUserCart(userId);
                    setUserCart(cart);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();
    }, [productId, isLoggedIn]);

    const updateUserCart = async () => {
        const user = AuthService.getUser();
        const cart = await getUserCart(user.id);
        setUserCart(cart);
    }

    const handleAddToCart = async () => {
        if (quantity > product.stockQuantity) {
            setShowAlert(true);
            return;
        }

        try {
            const cartItemData = {
                product: { id: product.id },
                cartId: userCart.id,
                quantity: quantity
            };
            await addOrUpdateCart(cartItemData);
            updateUserCart();
            setQuantity(1);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleDecreaseCartItem = async () => {
        try {
            const updatedQuantity = quantity - 1;
            if (updatedQuantity === 0) {
                setShowAlert(false); // Reset alert state
                setQuantity(1);
                // Remove the item from the cart by setting quantity to zero
                const cartItemData = {
                    product: { id: product.id },
                    cartId: userCart.id,
                    quantity: 0
                };
                await addOrUpdateCart(cartItemData);
                // Update the user cart after removing the item
                updateUserCart();
                return;
            }
            setQuantity(updatedQuantity);
            const cartItemData = {
                product: { id: product.id },
                cartId: userCart.id,
                cartItemPrice: product.price,
                quantity: updatedQuantity
            };
            await addOrUpdateCart(cartItemData);
            updateUserCart();
        } catch (error) {
            console.error('Error decreasing cart item:', error);
        }
    };

    const handleIncreaseCartItem = async () => {
        try {
            const updatedQuantity = quantity + 1;
            if (updatedQuantity > product.stockQuantity) {
                setShowAlert(true);
                showModalMessage("Insufficient Quantity");
                return;
            }
            setQuantity(updatedQuantity);
            const cartItemData = {
                product: { id: product.id },
                cartId: userCart.id,
                cartItemPrice: product.price,
                quantity: updatedQuantity
            };
            await addOrUpdateCart(cartItemData);
            updateUserCart();
        } catch (error) {
            console.error('Error increasing cart item:', error);
        }
    };

    const showModalMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center mt-5">
            <Card style={{ width: '100%' }}>
                <Row>
                    <Col xs={12} md={6}>
                        <Image src={product?.imageUrl} alt={product?.name} fluid />
                    </Col>
                    <Col xs={12} md={6}>
                        <Card.Body>
                            <Card.Title>{product?.name}</Card.Title>
                            <Card.Text>Description: {product?.description}</Card.Text>
                            <Card.Text>Product ID: {product?.id}</Card.Text>
                            <Card.Text>Category: {category?.name}</Card.Text>
                            <Card.Text>
                                <strong>Price:</strong> ${product?.price}
                            </Card.Text>
                            {isLoggedIn && (
                                <>
                                    {userCart &&
                                        (userCart.cartItems.find(item => item.product.id === product.id) ? (
                                            <div className="d-flex align-items-center">
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={handleDecreaseCartItem}
                                                >
                                                    -
                                                </Button>
                                                <span className="mx-3">
                                                    {userCart.cartItems.find(item => item.product.id === product.id)
                                                        ?.quantity}
                                                </span>
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={handleIncreaseCartItem}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button variant="primary" onClick={handleAddToCart}>
                                                Add To Cart
                                            </Button>
                                        ))}
                                </>
                            )}
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductDetails;
