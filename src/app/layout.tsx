import React from 'react';
import type { Metadata } from 'next';

import Header from '../components/header';
import { CartProvider } from '../components/header/cartContext';

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
