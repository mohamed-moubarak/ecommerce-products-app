'use client';

import React from 'react';
import Link from 'next/link';

import HeaderCart from '@/features/cart/components/header-cart';

export default function Header() {
 return (
  <header className="flex justify-between items-center p-4 bg-gray-900 text-white sticky top-0">
   <Link href="/">
    <h1 className="text-2xl">E-commerce App</h1>
   </Link>

   <HeaderCart />
  </header>
 );
}
