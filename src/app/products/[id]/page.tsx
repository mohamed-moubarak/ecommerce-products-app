'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import { useCart } from '@/features/cart/cart-context';
import { Product } from '@/features/cart/types';
import Counter from '../../../components/counter/index';

const ProductDetails: React.FC = () => {
 const [product, setProduct] = useState<Product | null>(null);
 const { cart, handleAddToCart, handleIncrement, handleDecrement } = useCart();
 const params = useParams();
 const { id } = params;

 useEffect(() => {
  if (id) {
   fetch(`https://dummyjson.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
     setProduct(data);
    });
  }
 }, [id]);

 if (!product) {
  return <p>Loading...</p>;
 }

 return (
  <div className="p-4">
   <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-sm">
    <div className="flex-shrink-0">
     <Image
      src={product.thumbnail}
      alt={product.title}
      width={500}
      height={500}
      className="w-full h-auto object-cover rounded"
     />
    </div>

    <div className="flex-grow">
     <h1 className="text-xl font-bold text-gray-800 mb-4">{product.title}</h1>

     <p className="text-lg text-gray-700 mb-4">{product.description}</p>

     <p className="text-lg font-bold mb-4 text-gray-800">${product.price}</p>

     <div className="flex items-center ">
      {cart[product.id] ? (
       <Counter
        value={cart[product.id].quantity}
        onIncrement={() => {
         handleIncrement(product.id);
        }}
        onDecrement={() => {
         handleDecrement(product.id);
        }}
       />
      ) : (
       <button
        onClick={() => {
         handleAddToCart(product);
        }}
        className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
       >
        Add to cart
       </button>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default ProductDetails;
