import React from "react";
import CategoryNavigationBar from "../components/CategoryNavigationBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";

const HomePage = () => {
    return (
        <div className="home">
            <Header />
            <CategoryNavigationBar/>
            <ProductGrid/>
            <Footer />
        </div>
    );
}

export default HomePage;