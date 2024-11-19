'use client';

import React from 'react';
import Image from 'next/image';

import { type CartItem as CartItemType } from '../types';
import Counter from '@/components/counter';
import { CloseOutlined } from '@ant-design/icons';

interface CartItemProps {
 item: CartItemType;
 handleIncrement: (id: string) => void;
 handleDecrement: (id: string) => void;
 handleRemoveFromCart: (id: string) => void;
}

export default function CartItem({
 item,
 handleIncrement,
 handleDecrement,
 handleRemoveFromCart,
}: CartItemProps) {
 return (
  <li className="flex justify-between items-start gap-2 min-h-16 border-b border-gray-100 pb-2">
   <div className="flex items-center gap-2">
    <Image
     src={item.product.thumbnail}
     alt={item.product.title}
     width={50}
     height={50}
     className="w-12 h-12 object-cover rounded"
    />

    <div className="flex flex-col gap-1">
     <span className="text-xs/4 font-semibold text-gray-800">
      {item.product.title}
     </span>

     <p className="text-xs/3 text-gray-600">
      Unit Price: ${item.product.price}
     </p>

     <p className="text-xs/3 text-gray-600">
      Total: ${item.product.price * item.quantity}
     </p>
    </div>
   </div>

   <div className="flex items-center min-h-full">
    <Counter
     onIncrement={() => handleIncrement(item.product.id)}
     onDecrement={() => handleDecrement(item.product.id)}
     value={item.quantity}
    />

    <button
     onClick={() => handleRemoveFromCart(item.product.id)}
     className="bg-gray-500 text-white w-6 h-6 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center ml-2"
    >
     <CloseOutlined />
    </button>
   </div>
  </li>
 );
}
