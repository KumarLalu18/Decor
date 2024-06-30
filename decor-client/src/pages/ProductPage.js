import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductDetails from '../components/ProductDetails';

const ProductPage = () => {
    const { productId } = useParams();

    return (
        <div className="product-page">
            <Header />
            <ProductDetails productId={productId} />
            <Footer />
        </div>
    );
};

export default ProductPage;
