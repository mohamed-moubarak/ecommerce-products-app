'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
 id: string;
 title: string;
 description: string;
 price: number;
 thumbnail: string;
}

interface CartItem {
 product: Product;
 quantity: number;
}

interface CartContextType {
 cart: { [key: string]: CartItem };
 handleAddToCart: (product: Product) => void;
 handleIncrement: (productId: string) => void;
 handleDecrement: (productId: string) => void;
 handleRemoveFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
 children,
}) => {
 const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

 const handleAddToCart = (product: Product) => {
  setCart((prevCart) => ({
   ...prevCart,
   [product.id]: {
    product,
    quantity: (prevCart[product.id]?.quantity || 0) + 1,
   },
  }));
 };

 const handleIncrement = (productId: string) => {
  setCart((prevCart) => ({
   ...prevCart,
   [productId]: {
    ...prevCart[productId],
    quantity: prevCart[productId].quantity + 1,
   },
  }));
 };

 const handleDecrement = (productId: string) => {
  setCart((prevCart) => {
   const newCart = { ...prevCart };
   if (newCart[productId].quantity > 1) {
    newCart[productId].quantity -= 1;
   } else {
    delete newCart[productId];
   }
   return newCart;
  });
 };

 const handleRemoveFromCart = (productId: string) => {
  setCart((prevCart) => {
   const newCart = { ...prevCart };
   delete newCart[productId];
   return newCart;
  });
 };

 return (
  <CartContext.Provider
   value={{
    cart,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleRemoveFromCart,
   }}
  >
   {children}
  </CartContext.Provider>
 );
};

export const useCart = (): CartContextType => {
 const context = useContext(CartContext);

 if (!context) {
  throw new Error('useCart must be used within a CartProvider');
 }
 return context;
};
