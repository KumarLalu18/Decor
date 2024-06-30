import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersByUser } from '../services/OrderService';
import { Card, Table } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const OrderDetails = () => {
    const userId = AuthService.getUser().id;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const userOrders = await getOrdersByUser(userId);
            // Sort orders by order date in descending order (most recent first)
            const sortedOrders = userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };

    // Function to format the order date in a human-readable format
    const formatOrderDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container">
            <h2 className="mt-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <Card key={order.id} className="my-4">
                        <Card.Body>
                            <h4>Order ID: #{order.id}</h4>
                            <p><strong>Shipping Address:</strong> {order.shippingAddress || 'Not provided'}</p>
                            <p><strong>Payment Method:</strong> {order.paymentMethod || 'Not provided'}</p>
                            <p><strong>Order Status:</strong> {order.orderStatus}</p>
                            <p><strong>Order Date:</strong> {formatOrderDate(order.orderDate)}</p>
                            <h5>Order Items:</h5>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Item Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map(orderItem => (
                                        <tr key={orderItem.id}>
                                            <td>
                                                <Link to={`/product/${orderItem.product.id}`} className="text-decoration-none text-dark">{orderItem.product.name}</Link>
                                            </td>
                                            <td>${orderItem.product.price}</td>
                                            <td>{orderItem.quantity}</td>
                                            <td>${orderItem.orderItemPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <p><strong>Order Total Price:</strong> ${order.orderTotalPrice}</p>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export default OrderDetails;
