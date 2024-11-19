'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '@/features/cart/cart-context';
import Counter from '@/components/counter';

import { type Product } from '../../cart/types';
import { type Category } from '../types';

const ProductsList: React.FC = () => {
 const { cart, handleAddToCart, handleIncrement, handleDecrement } = useCart();

 const [products, setProducts] = useState<Product[]>([]);
 const [categories, setCategories] = useState<Category[]>([]);
 const [selectedCategory, setSelectedCategory] = useState<string>('all');

 useEffect(() => {
  fetch('https://dummyjson.com/products')
   .then((response) => response.json())
   .then((data) => setProducts(data.products));

  fetch('https://dummyjson.com/products/categories')
   .then((response) => response.json())
   .then((data) => {
    setCategories([{ slug: 'all', name: 'All' }, ...data]);
   });
 }, []);

 useEffect(() => {
  if (selectedCategory === 'all') {
   fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data) => setProducts(data.products));
  } else {
   fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
    .then((response) => response.json())
    .then((data) => setProducts(data.products));
  }
 }, [selectedCategory]);

 if (!products) {
  return <p>Loading...</p>;
 }

 return (
  <div className="p-4">
   <div className="mb-6 ">
    <label htmlFor="category" className="mr-2 text-md">
     Filter by category:
    </label>

    {/* todo: export select to a UI component */}
    <select
     id="category"
     value={selectedCategory}
     onChange={(e) => setSelectedCategory(e.target.value)}
     className="p-1 border border-gray-300 rounded text-gray-800 text-md outline-none cursor-pointer"
    >
     {categories.map((category) => (
      <option key={category.slug} value={category.slug} className="text-black">
       {category.name}
      </option>
     ))}
    </select>
   </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
     //  todo: export card to a dedicated UI component
     <Link key={`product-${product.id}`} href={`/products/${product.id}`}>
      <div className="flex flex-col justify-between p-4 gap-2 h-full cursor-pointer bg-gray-100 border border-gray-400 rounded-md overflow-hidden shadow-md hover:shadow-md transition-shadow duration-300">
       <div>
        <Image
         src={product.thumbnail}
         alt={product.title}
         width={300}
         height={300}
         className="w-full h-48 object-cover"
        />

        <h3 className="text-xl font-semibold  text-black">{product.title}</h3>
       </div>

       <div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">
         {product.description}
        </p>

        <div className="flex justify-between items-center h-7">
         <p className="text-md font-bold text-gray-800">
          Price: ${product.price}
         </p>

         {cart[product.id] ? (
          <Counter
           value={cart[product.id].quantity}
           onIncrement={(e) => {
            e.preventDefault();
            handleIncrement(product.id);
           }}
           onDecrement={(e) => {
            e.preventDefault();
            handleDecrement(product.id);
           }}
          />
         ) : (
          <button
           onClick={(e) => {
            e.preventDefault();
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
     </Link>
    ))}
   </div>
  </div>
 );
};

export default ProductsList;
