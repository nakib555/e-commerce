/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

// Import new mobile pages
import { MobileCategories } from './components/mobile/MobileCategories';
import { MobileOrders } from './components/mobile/MobileOrders';
import { MobileProfile } from './components/mobile/MobileProfile';
import { MobileMore } from './components/mobile/MobileMore';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-brand-light font-sans flex flex-col dark:bg-[#121212] dark:text-gray-100">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 pb-[70px] md:pb-0">
        {activeTab === 'home' ? (
          <div>
            <Hero />
            <CategoryList />
            <FlashSale />
            <BestSellers />
            <Features />
            <PromoBanners />
          </div>
        ) : (
          <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-8 xl:px-12 py-6 sm:py-10">
            {activeTab === 'categories' && <MobileCategories />}
            {activeTab === 'orders' && <MobileOrders />}
            {activeTab === 'profile' && <MobileProfile />}
            {activeTab === 'more' && <MobileMore />}
          </div>
        )}
      </main>

      {/* Footer and newsletter are only shown on home tab or desktop */}
      <div className={activeTab === 'home' ? 'block' : 'hidden md:block'}>
        <Newsletter />
        <Footer />
      </div>
      
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

