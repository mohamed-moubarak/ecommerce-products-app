'use client';

import React, { useRef, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useOnClickOutside } from 'usehooks-ts';

import { useCart } from '../cart-context';
import CartItem from './cart-item';

export default function HeaderCart() {
 const {
  cart,
  cartTotal,
  handleIncrement,
  handleDecrement,
  handleRemoveFromCart,
 } = useCart();
 const [isCartOpen, setIsCartOpen] = useState(false);

 const cartContainerRef = useRef<HTMLDivElement>(null);

 useOnClickOutside(cartContainerRef, () => {
  if (isCartOpen) setIsCartOpen(false);
 });

 return (
  <div ref={cartContainerRef} className="relative">
   <div className="relative">
    <ShoppingCartOutlined
     className="h-8 w-8 cursor-pointer"
     onClick={() => setIsCartOpen(!isCartOpen)}
    />

    {cartTotal?.quantity > 0 && (
     <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
      {cartTotal.quantity}
     </span>
    )}
   </div>

   {isCartOpen && (
    <div className="absolute right-0 mt-2 w-[28rem] bg-white text-black shadow-lg rounded-md p-4">
     <h2 className="text-lg font-bold mb-2">Cart</h2>

     {Object.keys(cart).length === 0 ? (
      <p>Your cart is empty</p>
     ) : (
      <>
       <ul className="flex flex-col gap-2 max-h-[32rem] overflow-auto pr-4">
        {Object.entries(cart).map(([productId, cartItem]) => (
         <CartItem
          key={`header-cart-${productId}`}
          item={cartItem}
          handleIncrement={() => handleIncrement(productId)}
          handleDecrement={() => handleDecrement(productId)}
          handleRemoveFromCart={() => handleRemoveFromCart(productId)}
          onClick={() => setIsCartOpen(false)}
         />
        ))}
       </ul>

       <div className="flex flex-row justify-between items-center mt-4">
        <p className="text-lg font-bold">
         Total: ${cartTotal.price.toFixed(2)}
        </p>

        <Link
         href="/cart"
         onClick={() => setIsCartOpen(false)}
         className="text-sm inline-block bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
         View Cart
        </Link>
       </div>
      </>
     )}
    </div>
   )}
  </div>
 );
}
