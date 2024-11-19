'use client';

import React, {
 createContext,
 useContext,
 useState,
 ReactNode,
 useEffect,
} from 'react';

import type { CartItem, CartTotal, Product } from './types';

interface CartContextType {
 cart: { [key: string]: CartItem };
 cartTotal: CartTotal;
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
 const [cartTotal, setCartTotal] = useState<CartTotal>({
  quantity: 0,
  price: 0,
 });

 useEffect(() => {
  const total = Object.values(cart).reduce(
   (acc, { product, quantity }) => {
    return {
     price: acc.price + product.price * quantity,
     quantity: acc.quantity + quantity,
    };
   },
   { price: 0, quantity: 0 }
  );
  setCartTotal(total);
 }, [cart]);

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
    cartTotal,
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
