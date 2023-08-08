import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import productsData from "./data/productsData";
import ProductList from "./components/ProductList";
import SalesList from "./components/SalesList";
import Footer from "./components/Footer";
import "./styles.css";

const categories = ["Sportswear", "Shoes", "Accessories"];

const App = () => {
  const storedCategory = localStorage.getItem("currentCategory");
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategoryChange = (category) => {
    const newCategory = currentCategory === category ? null : category;
    setCurrentCategory(newCategory);
    localStorage.setItem("currentCategory", newCategory);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
        <Header
          categories={categories}
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
        />
        <Routes>
          <Route
            path="/home"
            element={<ProductList category={null} loadAllProducts={true} />}
          ></Route>
          <Route
            path="/sale"
            element={
              <SalesList category={null} loadDiscountedProducts={true} />
            }
          ></Route>
          <Route
            path={`/home/:category?`}
            element={
              <ProductList products={productsData} category={storedCategory} />
            }
          />
          <Route
            path={`/sale/:category?`}
            element={
              <SalesList products={productsData} category={storedCategory} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
