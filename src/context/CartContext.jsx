// src/context/CartContext.jsx
import React, { createContext, useState } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
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

 const removeFromCart = async (cartItemId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Cart/DeleteCartItem/${cartItemId}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Failed to delete cart item");

    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  } catch (error) {
    console.error("Failed to delete cart item:", error);
  }
};


  
  // const removeFromCart = (index) => {
  //   setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  // };

  // Update item quantity
  const updateQuantity = async (index, quantity) => {
    if (quantity < 1) return; // optional: prevent less than 1
      const currentItem = cart[index];
      console.log("index :"+index);
      console.log(currentItem);
    setCart((prevCart) =>
      prevCart.map((item, i) => (i === index ? { ...item, quantity } : item))
    );

   try {
    // Check all required fields are present
    const payload = {
      CartItemId: currentItem.cartItemId || 0,
      CartId: currentItem.cartId || 0,
      UserId: currentItem.userId || 0,
      ServiceId: currentItem.service?.id || 0,
      ServiceName: currentItem.service?.name || "",
      Quantity: quantity,
      AddressId: currentItem.addressId || 0,
      AddressName: currentItem.addressName || "",
      ServiceDate: currentItem.serviceDate || new Date().toISOString(),
      Price: currentItem.price || 0,
      Location: currentItem.location || "",
      AddedAt: currentItem.addedAt || new Date().toISOString()
    };

    await axios.put(`${API_BASE_URL}/Cart/updateCartItemQty`, payload);
  } catch (error) {
    console.error("API failed, consider rollback", error.response?.data || error.message);
  }
  };

  return (
    <CartContext.Provider
      value={{ cart,setCart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
