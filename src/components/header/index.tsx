'use client';

import React, { useState } from 'react';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';

import { useCart } from './cartContext';
import Counter from '../counter';

const Header: React.FC = () => {
 const { cart, handleIncrement, handleDecrement, handleRemoveFromCart } =
  useCart();
 const [isCartOpen, setIsCartOpen] = useState(false);

 const totalItems = Object.values(cart).reduce(
  (acc, item) => acc + item.quantity,
  0
 );

 return (
  <header className="flex justify-between items-center p-4 bg-gray-900 text-white sticky top-0">
   <h1 className="text-2xl">E-commerce App</h1>

   <div className="relative">
    <div className="relative">
     <ShoppingCartOutlined
      className="h-8 w-8 cursor-pointer"
      onClick={() => setIsCartOpen(!isCartOpen)}
     />

     {totalItems > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
       {totalItems}
      </span>
     )}
    </div>

    {isCartOpen && (
     <div className="absolute right-0 mt-2 w-[28rem] bg-white text-black shadow-lg rounded-md p-4">
      <h2 className="text-lg font-bold mb-2">Cart</h2>

      {Object.keys(cart).length === 0 ? (
       <p>Your cart is empty</p>
      ) : (
       <ul className="flex flex-col gap-2">
        {Object.entries(cart).map(([productId, cartItem]) => (
         <li
          key={productId}
          className="flex justify-between items-start gap-2 min-h-16"
         >
          <div className="flex items-center gap-2">
           <Image
            src={cartItem.product.thumbnail}
            alt={cartItem.product.title}
            width={50}
            height={50}
            className="w-12 h-12 object-cover rounded"
           />

           <div className="flex flex-col gap-1">
            <span className="text-xs/4 font-semibold">
             {cartItem.product.title}
            </span>

            <p className="text-xs/3 text-gray-600">
             Unit Price: ${cartItem.product.price}
            </p>

            <p className="text-xs/3 text-gray-600">
             Total: ${cartItem.product.price * cartItem.quantity}
            </p>
           </div>
          </div>

          <div className="flex items-center min-h-full">
           <Counter
            onIncrement={() => handleIncrement(productId)}
            onDecrement={() => handleDecrement(productId)}
            value={cartItem.quantity}
           />

           <button
            onClick={() => handleRemoveFromCart(productId)}
            className="bg-gray-500 text-white w-6 h-6 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center ml-2"
           >
            <CloseOutlined />
           </button>
          </div>
         </li>
        ))}
       </ul>
      )}
     </div>
    )}
   </div>
  </header>
 );
};

export default Header;
