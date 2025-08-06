// src/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product (or increase quantity)
  const addToCart = (product, qty = 1) => {
    if (!product || !product.id) {
      console.warn('[Cart] addToCart called with invalid product', product);
      return;
    }
    setCartItems(prev => {
      const found = prev.find(i => i.id === product.id);
      let next;
      if (found) {
        next = prev.map(i => i.id === product.id ? { ...i, quantity: (i.quantity || 1) + qty } : i);
      } else {
        next = [...prev, { ...product, quantity: qty }];
      }
      console.log('[Cart] addToCart ->', next);
      return next;
    });
  };

  // Decrease quantity by qty (remove if quantity becomes 0)
  const decrementFromCart = (productId, qty = 1) => {
    if (!productId) return;
    setCartItems(prev => {
      const found = prev.find(i => i.id === productId);
      if (!found) return prev;
      if ((found.quantity || 1) <= qty) {
        const next = prev.filter(i => i.id !== productId);
        console.log('[Cart] decrementFromCart -> removed', productId, next);
        return next;
      } else {
        const next = prev.map(i => i.id === productId ? { ...i, quantity: (i.quantity || 1) - qty } : i);
        console.log('[Cart] decrementFromCart ->', next);
        return next;
      }
    });
  };

  // Remove item entirely
  const removeFromCart = (productId) => {
    if (!productId) return;
    setCartItems(prev => {
      const next = prev.filter(i => i.id !== productId);
      console.log('[Cart] removeFromCart ->', next);
      return next;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    console.log('[Cart] clearCart');
  };

  // Helpers
  const getTotalCount = () => cartItems.reduce((s, i) => s + (i.quantity || 0), 0);
  const getTotalPrice = () => cartItems.reduce((s, i) => s + (Number(i.price || 0) * (i.quantity || 0)), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      decrementFromCart,
      removeFromCart,
      clearCart,
      getTotalCount,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
