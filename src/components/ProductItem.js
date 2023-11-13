import React, { useState, useEffect } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

import "./styles/ProductItem.css";

const ProductItem = ({ product }) => {
  const { id, thumbnail, title, description, price, discountedPrice, rating } =
    product;
  const [isRatingHovered, setIsRatingHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(false);

  useEffect(() => {
    const starPercentage = (rating / 5) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    const starsInner = document.querySelector(`.stars-inner-${id}`);
    starsInner.style.width = starPercentageRounded;
  }, [rating, id]);

  const handleRatingHover = () => {
    setIsRatingHovered(true);
  };

  const handleRatingLeave = () => {
    setIsRatingHovered(false);
  };

  const handleAddToFavourite = () => {
    if (isAddedToFavourite) {
      setIsAddedToFavourite(false);
    } else {
      setIsAddedToFavourite(true);
    }
  };

  const handleAddToCart = () => {
    if (isAddedToCart) {
      setIsAddedToCart(false);
    } else {
      setIsAddedToCart(true);
    }
  };

  //Discount Percentage calculation
  const discountValue = price - discountedPrice;
  const discountPercentage = Math.round((discountValue / price) * 100);

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
            <div className="discount-percentage">
              <span >
                {discountPercentage}% off
              </span>
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
        <div className={`stars-inner stars-inner-${id}`}></div>
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
