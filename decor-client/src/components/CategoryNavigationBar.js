import React, { useState, useEffect } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { getAllCategories } from '../services/CategoryService';

const CategoryNavigationBar = () => {
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getCategoryKey = () => {
        const categoryId = location.pathname.split('/').pop();
        return categoryId === 'all' ? 'home' : categoryId;
    };

    return (
        <Tab.Container id="category-nav" defaultActiveKey="home">
            <Nav variant="tabs" fill justify>
                <Nav.Item>
                    <Nav.Link eventKey="home" as={Link} to="/">All</Nav.Link>
                </Nav.Item>
                {categories.map(category => (
                    <Nav.Item key={category.id}>
                        <Nav.Link eventKey={category.id} as={Link} to={`/category/${category.id}`}>{category.name}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </Tab.Container>
    );
};

export default CategoryNavigationBar;
