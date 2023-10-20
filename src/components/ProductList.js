import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data/productsData";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  selectSearchResults,
  setSearchResults,
} from "../redux/search/searchSlice";

const ProductList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const searchResults = useSelector(selectSearchResults);

  // New state variable to capture search term after the button is clicked

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const values = searchParams.get("values")?.split(",");

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

    // Dispatch setSearchResults with custom serialization
    if (JSON.stringify(filteredProducts) !== JSON.stringify(searchResults)) {
      dispatch(setSearchResults(filteredProducts));
    }
  }, [searchResults, dispatch, location.search, searchTerm]);

  return (
    <div>
      <h2>Search results for values: {searchTerm}</h2>
      <ul>
        {searchResults.map((product) => (
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
