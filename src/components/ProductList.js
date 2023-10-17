import React, { useState, useEffect } from "react";
import productsData from "../data/productsData";
import ProductItem from "./ProductItem";
import Filters from "./Filters";
import ProductSorting from "./ProductSorting";
import LoadMore from "./LoadMore";
import "./styles/ProductList.css";

const ProductList = ({ category }) => {

  const productsPerPage = 15;
  const allProducts = productsData;
  const categoryProducts = category
    ? allProducts.filter((product) => product.category === category)
    : allProducts;

  const totalProducts = categoryProducts.length;
  const [visibleProductsCount, setVisibleProductsCount] =
    useState(productsPerPage);
  const [visibleProducts, setVisibleProducts] = useState(
    categoryProducts.slice(0, productsPerPage)
  );
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);

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
    const updateVisibleProducts = (newCategory) => {
      const newCategoryProducts = newCategory
        ? allProducts.filter((product) => product.category === newCategory)
        : allProducts;

      const newVisibleProductsCount = Math.min(
        productsPerPage,
        newCategoryProducts.length
      );

      setVisibleProductsCount(newVisibleProductsCount);
      setFilteredProducts(newCategoryProducts);

      const sortedProducts = applySorting(newCategoryProducts);
      setVisibleProducts(sortedProducts.slice(0, newVisibleProductsCount));
    };
    updateVisibleProducts(category);
  }, [category, allProducts, productsPerPage]);

  useEffect(() => {
    const sortedProducts = applySorting(filteredProducts);
    setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
  }, [sortOption, filteredProducts, visibleProductsCount]);

  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
    const sortedProducts = applySorting(filteredProducts);
    setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
  };

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
    const sortedProducts = applySorting(filteredProducts);
    setVisibleProducts(sortedProducts.slice(0, visibleProductsCount));
  };

  const handleLoadMore = () => {
    const nextVisibleProductsCount = Math.min(
      visibleProductsCount + productsPerPage,
      totalProducts
    );
    setVisibleProductsCount(nextVisibleProductsCount);
    const sortedProducts = applySorting(filteredProducts);
    setVisibleProducts(sortedProducts.slice(0, nextVisibleProductsCount));
  };

  return (
    <div className="product-list">
      <div className="fixed-container">
        <div className="counter-filter">
          {category ? <h2>{category}</h2> : <h2>New & Featured</h2>}
          <div className="product-counter">
            {`Showing ${Math.min(
              filteredProducts.length,
              visibleProductsCount
            )} out of ${totalProducts} items`}
          </div>
          <div className="filter">
            <Filters
              products={categoryProducts}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      <div className="fixed-sort">
        <div className="sorting">
          <ProductSorting
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />
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
            totalProducts={totalProducts}
            handleLoadMore={handleLoadMore}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
