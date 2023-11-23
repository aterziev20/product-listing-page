// Cart.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
} from "../redux/cart/cartSlice";
import { addToFavorites } from "../redux/favorites/favoritesSlice";
// Adjust the path according to your actual folder structure

import "./styles/CartList.css";

const CartList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveFromCart = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(removeFromCart({ id: productId }));
    }
  };

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
  };

  const calculateDiscountPercentage = (discountedPrice, originalPrice) => {
    if (discountedPrice && originalPrice) {
      const discountValue = originalPrice - discountedPrice;
      const discountPercentage = Math.round(
        (discountValue / originalPrice) * 100
      );
      return discountPercentage;
    }
    return 0;
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt="" className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  Single Price:{" "}
                  {item.discountedPrice ? (
                    <div>
                      <span className="cart-discounted-price">
                        BGN {item.discountedPrice}
                      </span>
                      <div>
                        <span className="cart-original-price">
                          BGN {item.price}
                        </span>
                        <span className="cart-discount-percentage">
                          ({" "}
                          {calculateDiscountPercentage(
                            item.discountedPrice,
                            item.price
                          )}
                          % )
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="cart-single-price">BGN {item.price}</span>
                  )}
                </p>
                <div className="cart-quantity-controls">
                  <button
                    onClick={() => handleRemoveFromCart(item.id, item.quantity)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addToCart(item))}>+</button>
                </div>
                <p>
                  Final Price:{" "}
                  {item.discountedPrice ? (
                    <div>
                      <span className="cart-discounted-price">
                        BGN {(item.discountedPrice * item.quantity).toFixed(2)}
                      </span>
                      <div>
                        <span className="cart-original-price">
                          BGN {(item.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="cart-discount-percentage">
                          ({" "}
                          {calculateDiscountPercentage(
                            item.discountedPrice,
                            item.price
                          )}
                          % )
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="cart-single-price">
                      BGN {(item.price * item.quantity).toFixed(2)}
                    </span>
                  )}
                </p>
                <button onClick={() => handleAddToFavorites(item.id)}>
                  Add to Favorites
                </button>
                <button onClick={() => handleDeleteFromCart(item.id)}>
                  Remove Product
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleClearCart}>Empty Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartList;
