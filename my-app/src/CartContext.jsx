// CartContext.js

import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state for the cart
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Create the context
const CartContext = createContext();

// Create a reducer to manage cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item is already in the cart
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity
        state.cartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // If it's a new item, add it to the cart
        state.cartItems.push(action.payload);
      }

      // Update total quantity and amount
      state.totalQuantity += action.payload.quantity;
      state.totalAmount += action.payload.price * action.payload.quantity;

      return { ...state };

    case 'REMOVE_FROM_CART':
      // Find the item index in the cart
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        // Update total quantity and amount
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.totalAmount -=
          state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;

        // Remove the item from the cart
        state.cartItems.splice(itemIndex, 1);
      }

      return { ...state };

    default:
      return state;
  }
};

// Create a CartProvider component to wrap your app with the context
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};
