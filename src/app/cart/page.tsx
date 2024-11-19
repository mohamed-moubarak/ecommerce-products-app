'use client';

import { useCart } from '../../features/cart/cart-context';
import Link from 'next/link';
import CartItem from '@/features/cart/components/cart-item';

export default function Cart() {
 const {
  cart,
  cartTotal,
  handleIncrement,
  handleDecrement,
  handleRemoveFromCart,
 } = useCart();

 return (
  <div className="p-4 min-h-full bg-gray-100 border border-gray-400 ">
   <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 cursor-default">
    Your Cart
   </h1>

   {Object.keys(cart).length === 0 ? (
    <p className="text-gray-800 cursor-default">Your cart is empty</p>
   ) : (
    <>
     <ul className="flex flex-col gap-4">
      {Object.entries(cart).map(([productId, item]) => (
       <CartItem
        key={productId}
        item={item}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleRemoveFromCart={handleRemoveFromCart}
       />
      ))}
     </ul>

     <div className="mt-6 flex flex-row justify-between items-center">
      <div className="text-lg font-bold text-gray-800">
       Total: ${cartTotal?.price.toFixed(2)}
      </div>

      <button
       className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
       onClick={() => {
        console.log('Checkout');
       }}
      >
       Checkout
      </button>
     </div>
    </>
   )}
   <div className="mt-6 text-center">
    <Link href="/" className="text-blue-500 hover:underline">
     Continue Shopping
    </Link>
   </div>
  </div>
 );
}
