import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllProducts, getProductsByCategory } from '../services/ProductService';

const ProductGrid = ({ categoryId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (categoryId) {
            fetchProductsByCategory(categoryId);
        } else {
            fetchAllProducts();
        }
    }, [categoryId]);

    const fetchProductsByCategory = async (categoryId) => {
        try {
            const data = await getProductsByCategory(categoryId);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };

    const fetchAllProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
    };

    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map(product => (
                    <Col key={product.id}>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card>
                                <Card.Img variant="top" src={product.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductGrid;
