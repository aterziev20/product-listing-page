import React, { useState, useEffect } from "react";
import productsData from "../data/productsData";
import ProductItem from "./ProductItem";
import Filters from "./Filters";
import Sorting from "./Sorting";
import LoadMore from "./LoadMore";
import "./styles/ProductList.css";

import { useSelector } from "react-redux";

const TennisProducts = () => {
  const productsPerPage = 15;
  const allProducts = productsData;

  const [visibleProductsCount, setVisibleProductsCount] =
    useState(productsPerPage);
  const [visibleProducts, setVisibleProducts] = useState(
    allProducts.slice(0, productsPerPage)
  );
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const tennisProducts = allProducts.filter(
    (product) => product.sport.toLowerCase() === "tennis"
  );

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
    const sortedProducts = applySorting(tennisProducts);
    setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
  }, [sortOption, visibleProductsCount]);

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
    const sortedProducts = applySorting(filteredProducts);
    setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
  };

  const handleLoadMore = () => {
    const nextVisibleProductsCount = Math.min(
      visibleProductsCount + productsPerPage,
      tennisProducts.length
    );
    setVisibleProductsCount(nextVisibleProductsCount);
    const sortedProducts = applySorting(tennisProducts);
    setVisibleProducts(sortedProducts.slice(0, nextVisibleProductsCount));
  };

  return (
    <div className="product-list">
      <div className="fixed-container">
        <div className="counter-filter">
          <h2>
            Tennis Items
            <br />({Math.min(filteredProducts.length, visibleProductsCount)} out
            of {tennisProducts.length})
          </h2>
          <div className="filter">
            <Filters
              products={tennisProducts}
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
        {filteredProducts.length > visibleProductsCount && (
          <LoadMore
            visibleProductsCount={visibleProductsCount}
            totalProducts={tennisProducts.length}
            handleLoadMore={handleLoadMore}
          />
        )}
      </div>
    </div>
  );
};

export default TennisProducts;
