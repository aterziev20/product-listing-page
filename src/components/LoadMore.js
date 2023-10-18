import React from 'react';

const LoadMore = ({ visibleProductsCount, totalProducts, handleLoadMore }) => {
  return (
    visibleProductsCount < totalProducts && (
      <button className="load-more-btn" onClick={handleLoadMore}>
        Load More
      </button>
    )
  );
};

export default LoadMore;
