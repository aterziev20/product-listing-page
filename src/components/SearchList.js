import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data/productsData";
import ProductItem from "./ProductItem";
import Sorting from "./Sorting";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import "./styles/ProductList.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  selectSearchResults,
  setSearchResults,
} from "../redux/search/searchSlice";

const SearchList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const searchResults = useSelector(selectSearchResults);
  
  const [visibleProductsCount, setVisibleProductsCount] = useState(15);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const sortOption = useSelector((state) => state.sorting.sortOption);

  const applySorting = (products) => {
    let sortedProducts = [...products];

    switch (sortOption) {
      case "az":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "priceAsc":
        sortedProducts.sort(
          (a, b) =>
            (a.discountedPrice !== undefined ? a.discountedPrice : a.price) -
            (b.discountedPrice !== undefined ? b.discountedPrice : b.price)
        );
        break;
      case "priceDesc":
        sortedProducts.sort(
          (a, b) =>
            (b.discountedPrice !== undefined ? b.discountedPrice : b.price) -
            (a.discountedPrice !== undefined ? a.discountedPrice : a.price)
        );
        break;
      default:
        break;
    }

    return sortedProducts;
  };

  useEffect(() => {
    if (searchTerm) {
      const searchParams = new URLSearchParams(location.search);
      const values = searchParams.get("values")?.split(",");

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

      const sortedProducts = applySorting(filteredProducts);
      setFilteredProducts(sortedProducts);

      // Dispatch search results to Redux
      if (JSON.stringify(sortedProducts) !== JSON.stringify(searchResults)) {
        dispatch(setSearchResults(sortedProducts));
      }

      setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
    }
  }, [
    dispatch,
    location.search,
    searchResults,
    searchTerm,
    visibleProductsCount,
    productsData,
  ]);

  const updateVisibleProducts = () => {
    const sortedProducts = applySorting(searchResults);
    setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
  };

  useEffect(() => {
    updateVisibleProducts();
  }, [sortOption, searchResults, visibleProductsCount]);

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
    const sortedProducts = applySorting(filteredProducts);
    setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
  };

  const handleLoadMore = () => {
    const nextVisibleProductsCount = Math.min(
      visibleProductsCount + 15,
      filteredProducts.length
    );
    setVisibleProductsCount(nextVisibleProductsCount);
    const sortedProducts = applySorting(filteredProducts);
    setVisibleProducts(sortedProducts.slice(0, nextVisibleProductsCount));
  };

  return (
    <div className="product-list">
      <div className="fixed-container" id="top">
        <div className="counter-filter">
          <h2 className="search-results-container">
            Search results for <br />
            <span className="search-results">
              {searchTerm} (
              {Math.min(filteredProducts.length, visibleProductsCount)} out of{" "}
              {searchResults.length})
            </span>
          </h2>
          <div className="filter">
            <Filters
              products={searchResults}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      <div className="fixed-sort">
        <div className="sorting">
          <Sorting />
        </div>
      </div>

      <div className="product-list-container">
        {visibleProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="load-more">
        <LoadMore
          visibleProductsCount={visibleProductsCount}
          totalProducts={filteredProducts.length}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
};

export default SearchList;
