// Cart.js

import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  // Function to increase item quantity
  const increaseQuantity = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, quantity: 1 } });
  };

  // Function to decrease item quantity
  const decreaseQuantity = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {state.cartItems.map((item) => (
          <li key={item.id}>
            <div className="item-info">
              <img src={item.thumbnail} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>Total Quantity: {state.totalQuantity}</p>
        <p>Total Amount: ${state.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
