// src/context/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if item already exists (optional: by ID)
      const existingIndex = prevCart.findIndex(
        (i) => i.service.id === item.service.id && i.date === item.date
      );
      if (existingIndex >= 0) {
        // If item exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity =
          (updatedCart[existingIndex].quantity || 1) + 1;
        return updatedCart;
      } else {
        // Add new item with quantity = 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Update item quantity
  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return; // optional: prevent less than 1
    setCart((prevCart) =>
      prevCart.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
