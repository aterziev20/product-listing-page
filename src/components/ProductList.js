// ProductList.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data/productsData";

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const values = searchParams.get("values").split(",");
  const searchTerm = searchParams.get("search");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Filter products based on colors, descriptions, groups, and sports
    const filteredProducts = productsData.filter((product) =>
      values.some(
        (value) =>
          product.category.toLowerCase() === value.toLowerCase() ||
          product.color.toLowerCase() === value.toLowerCase() ||
          product.description.toLowerCase() === value.toLowerCase() ||
          product.group.toLowerCase() === value.toLowerCase() ||
          product.sport.toLowerCase() === value.toLowerCase()
      )
    );

    setProducts(filteredProducts);
  }, [values]);

  return (
    <div>
      <h2>Search results for values: {searchTerm}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.title}</p>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add more product details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
