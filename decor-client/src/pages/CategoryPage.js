import React from "react";
import { useParams } from "react-router-dom";
import CategoryNavigationBar from "../components/CategoryNavigationBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";

const CategoryPage = () => {
    const { categoryId } = useParams(); 

    return (
        <div className="category-page">
            <Header />
            <CategoryNavigationBar />
            <ProductGrid categoryId={categoryId} /> 
            <Footer />
        </div>
    );
}

export default CategoryPage;
