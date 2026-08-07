import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopsphere_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem('shopsphere_coupon');
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('shopsphere_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('shopsphere_coupon');
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const validCoupons = {
      'SAVE10': 0.10,
      'SAVE20': 0.20
    };

    if (validCoupons[code.toUpperCase()]) {
      setCoupon({ code: code.toUpperCase(), discount: validCoupons[code.toUpperCase()] });
      return { success: true, message: `Coupon applied: ${validCoupons[code.toUpperCase()] * 100}% off` };
    }
    return { success: false, message: 'Invalid coupon code' };
  };

  const removeCoupon = () => setCoupon(null);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = coupon ? subtotal * coupon.discount : 0;
  const shipping = cart.length > 0 ? (subtotal > 100 ? 0 : 15) : 0; // Free shipping over $100
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + shipping + tax;
  
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      subtotal, discountAmount, shipping, tax, total, cartCount,
      coupon, applyCoupon, removeCoupon 
    }}>
      {children}
    </CartContext.Provider>
  );
};
