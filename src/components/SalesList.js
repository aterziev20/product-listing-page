import React, { useState, useEffect } from "react";
import productsData from "../data/productsData";
import ProductItem from "./ProductItem";
import Filters from "./Filters";
import ProductSorting from "./ProductSorting";
import LoadMore from "./LoadMore";
import "./styles/ProductList.css";

const SalesList = ({ category }) => {
  const categoryDescriptions = {
    sportswear: `Elevate your game and style with our cutting-edge men's <i>SPORTSWEAR</i>, where performance meets fashion.`,
    shoes: `Step into victory with our high-performance men's sports <i>SHOES</i>, engineered for your ultimate triumph.`,
    accessories: `Unleash your potential with our dynamic men's sports <i>ACCESSORIES</i>, the perfect companions for every athletic journey.`,
  };

  const productsPerPage = 15;
  const allProducts = productsData;
  const categoryProducts = category
    ? allProducts.filter((product) => product.category === category)
    : allProducts;

  const discountedProducts = categoryProducts.filter(
    (product) => product.discountedPrice !== undefined
  );

  const totalProducts = discountedProducts.length;
  const [visibleProductsCount, setVisibleProductsCount] =
    useState(productsPerPage);
  const [visibleProducts, setVisibleProducts] = useState(
    discountedProducts.slice(0, productsPerPage)
  );
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(discountedProducts);

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

      const newDiscountedProducts = newCategoryProducts.filter(
        (product) => product.discountedPrice !== undefined
      );

      const newVisibleProductsCount = Math.min(
        productsPerPage,
        newDiscountedProducts.length
      );

      setVisibleProductsCount(newVisibleProductsCount);
      setFilteredProducts(newDiscountedProducts);

      const sortedProducts = applySorting(newDiscountedProducts);
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
          {category ? <h2>{category} on Sale</h2> : <h2>Items on Sale</h2>}
          <div className="product-counter">
            {`Showing ${Math.min(
              filteredProducts.length,
              visibleProductsCount
            )} out of ${totalProducts} items`}
          </div>
          <div className="filter">
            <Filters
              products={discountedProducts}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      <div className="category-description">
        <h2
          dangerouslySetInnerHTML={{
            __html: category
              ? categoryDescriptions[category.toLowerCase()]
              : "",
          }}
        ></h2>
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

export default SalesList;
