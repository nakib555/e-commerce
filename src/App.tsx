/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryList } from './components/CategoryList';
import { FlashSale } from './components/FlashSale';
import { BestSellers } from './components/BestSellers';
import { Features } from './components/Features';
import { PromoBanners } from './components/PromoBanners';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-light font-sans flex flex-col">
      <Header />
      
      <main className="flex-1 pb-16 md:pb-0">
        <Hero />
        <CategoryList />
        <FlashSale />
        <BestSellers />
        <Features />
        <PromoBanners />
      </main>

      <Newsletter />
      <Footer />
      <MobileNav />
    </div>
  );
}

