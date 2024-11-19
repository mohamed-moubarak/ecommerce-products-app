import React from 'react';
import type { Metadata } from 'next';

import Header from './header';
import { CartProvider } from '../features/cart/cart-context';

import './globals.css';
import 'tailwindcss/tailwind.css';

export const metadata: Metadata = {
 title: 'E-commerce products app',
 description: 'An e-commerce products app using dummy api',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" className="bg-gray-900">
   <body>
    <CartProvider>
     <Header />

     {children}
    </CartProvider>
   </body>
  </html>
 );
}
