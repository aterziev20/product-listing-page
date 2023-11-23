// Cart.js
import React from "react";
import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from "../redux/cart/cartSlice";
import { addToFavorites } from "../redux/favorites/favoritesSlice";

//styles
import "./styles/CartList.css";
import {
  IoAddCircle,
  IoRemoveCircle,
  IoTrashBin,
  IoHeartOutline,
} from "react-icons/io5";

const CartList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

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

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item.discountedPrice
        ? item.price * item.quantity
        : item.price * item.quantity),
    0
  );
  const totalSavings = cartItems.reduce(
    (total, item) =>
      total +
      (item.discountedPrice
        ? (item.price - item.discountedPrice) * item.quantity
        : 0),
    0
  );
  const finalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item.discountedPrice
        ? item.discountedPrice * item.quantity
        : item.price * item.quantity),
    0
  );

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2 className="cart-tile">
          Shopping Cart{" "}
          <span className="cart-product-counter">({totalItems})</span>
        </h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th className="cart-table-headers">Single Price</th>
                <th className="cart-table-headers">Quantity</th>
                <th className="cart-table-headers">Final Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="cart-item-container">
                  <td>
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="cart-item-image"
                    />
                  </td>
                  <td className="cart-item-title">
                    <h3>{item.title}</h3>
                  </td>
                  <td className="cart-item-price">
                    {item.discountedPrice ? (
                      <div>
                        <span className="cart-discounted-price">
                          BGN {item.discountedPrice.toFixed(2)}
                        </span>
                        <div>
                          <span className="cart-original-price">
                            BGN {item.price.toFixed(2)}
                          </span>
                          <span className="cart-discount-percentage">
                            (-
                            {calculateDiscountPercentage(
                              item.discountedPrice,
                              item.price
                            )}
                            %)
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="cart-single-price">
                        BGN {item.price.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="cart-quantity-controls">
                    <div className="quantity-button-container">
                      <span
                        onClick={() =>
                          handleRemoveFromCart(item.id, item.quantity)
                        }
                        className={`quantity-button ${
                          item.quantity === 1 ? "disabled" : ""
                        }`}
                      >
                        <IoRemoveCircle />
                      </span>
                      <span>{item.quantity}</span>
                      <span
                        onClick={() => dispatch(addToCart(item))}
                        className="quantity-button"
                      >
                        <IoAddCircle />
                      </span>
                    </div>
                  </td>
                  <td className="cart-item-price">
                    {item.discountedPrice ? (
                      <div>
                        <span className="cart-discounted-price">
                          BGN{" "}
                          {(item.discountedPrice * item.quantity).toFixed(2)}
                        </span>
                        <div>
                          <span className="cart-original-price">
                            BGN {(item.price * item.quantity).toFixed(2)}
                          </span>
                          <span className="cart-discount-percentage">
                            (-
                            {calculateDiscountPercentage(
                              item.discountedPrice,
                              item.price
                            )}
                            %)
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="cart-single-price">
                        BGN {(item.price * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="cart-actions-container">
                      <span
                        onClick={() => handleAddToFavorites(item.id)}
                        className="cart-actions"
                      >
                        <IoHeartOutline />
                      </span>
                      <span
                        onClick={() => handleDeleteFromCart(item.id)}
                        className="cart-actions"
                      >
                        <IoTrashBin />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="order-summary-item">
            <span>
              Products{" "}
              <span className="cart-product-counter">({totalItems})</span>:
            </span>
            <span className="prices-right">BGN {totalPrice.toFixed(2)}</span>
          </div>
          <div className="order-summary-item">
            <span>Discount:</span>
            <span className="discount-total">
              BGN {totalSavings.toFixed(2)}
            </span>
          </div>
          <div className="order-total-title">
            <span>Order total:</span>
            <span className="order-total">BGN {finalPrice.toFixed(2)}</span>
          </div>
          <div className="chekout-button">Proceed to Checkout</div>
          <p className="terms-conditions">
            By placing your order, you agree to LuamSport's{" "}
            <Link to={""}>privacy notice</Link> and{" "}
            <Link to={""}>conditions of use</Link>.
          </p>
          <p className="terms-conditions">
            You also agree to LuamSport's{" "}
            <Link to={""}>terms and conditions</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartList;
