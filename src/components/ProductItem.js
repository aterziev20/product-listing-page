import React, { useState, useEffect } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

import "./styles/ProductItem.css";

const ProductItem = ({ product }) => {
  const { id, thumbnail, title, description, price, discountedPrice, rating } =
    product;
  const [isRatingHovered, setIsRatingHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(false);
  const [starPercentage, setStarPercentage] = useState(0);

  useEffect(() => {
    /* Filled according to rating
    const calculateStarPercentage = () => {
      const clampedRating = Math.max(0, Math.min(rating, 5));
      const percentage = (clampedRating / 5) * 100;
      setStarPercentage(`${percentage}%`);
    };
    */

    // Filled according to rating rounded to 0.5
    const calculateStarPercentage = () => {
      const clampedRating = Math.max(0, Math.min(rating, 5));
      const percentage = (clampedRating / 5) * 100;
      setStarPercentage(`${Math.round(percentage / 10) * 10}%`);
    };

    calculateStarPercentage();
  }, [rating]);

  const handleRatingHover = () => {
    setIsRatingHovered(true);
  };

  const handleRatingLeave = () => {
    setIsRatingHovered(false);
  };

  const handleAddToFavourite = () => {
    setIsAddedToFavourite((prev) => !prev);
  };

  const handleAddToCart = () => {
    setIsAddedToCart((prev) => !prev);
  };

  return (
    <div className="product-item">
      <div className="image-container">
        <img src={thumbnail} alt="" className="product-image" />
        <button
          className="add-to-favourite-button"
          onClick={handleAddToFavourite}
        >
          {isAddedToFavourite ? <IoHeart /> : <IoHeartOutline />}
        </button>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="price-wrapper">
        {discountedPrice ? (
          <div className="price-container">
            <div className="price">
              <span className="discounted-price">BGN {discountedPrice}</span>
              <span className="original-price">BGN {price}</span>
            </div>
          </div>
        ) : (
          <div className="price-container">
            <div className="price">
              <span>BGN {price}</span>
            </div>
          </div>
        )}
      </div>
      <div
        className={`stars-outer stars-outer-${id}`}
        onMouseEnter={handleRatingHover}
        onMouseLeave={handleRatingLeave}
      >
        <div
          className={`stars-inner stars-inner-${id}`}
          style={{ width: starPercentage }}
        ></div>
        {isRatingHovered && (
          <div className="rating-popup-container">
            <div className="rating-popup">{rating.toFixed(1)} out of 5</div>
          </div>
        )}
      </div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        {isAddedToCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductItem;
