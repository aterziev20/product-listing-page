import React from "react";
import "./styles/LoadMore.css";

const LoadMore = ({ visibleProductsCount, totalProducts, handleLoadMore }) => {
  const remainingProducts = totalProducts - visibleProductsCount;
  const canLoadMore = remainingProducts > 0;

  return (
    <div className="load-more-container">
      {canLoadMore && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default LoadMore;
