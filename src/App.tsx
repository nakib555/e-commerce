/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryList } from './components/CategoryList';
import { FlashSale } from './components/FlashSale';
import { BestSellers } from './components/BestSellers';
import { NewArrivals } from './components/NewArrivals';
import { Brands } from './components/Brands';
import { CustomerReviews } from './components/CustomerReviews';
import { Features } from './components/Features';
import { ComboOffers } from './components/ComboOffers';
import { PromoBanners } from './components/PromoBanners';
import { TrustAndFaq } from './components/TrustAndFaq';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Import new mobile pages
import { MobileCategories } from './components/mobile/MobileCategories';
import { MobileOrders } from './components/mobile/MobileOrders';
import { MobileProfile } from './components/mobile/MobileProfile';
import { MobileMore } from './components/mobile/MobileMore';

// Import Product detail modal & types
import { ProductDetailModal } from './components/ProductDetailModal';
import { Product } from './types';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { flashSaleProducts } from './data';
import { MobileLayout } from './components/MobileLayout';
import { SEASONAL_THEMES } from './theme';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle PWA App Shortcuts routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shortcut = params.get('shortcut');
    if (shortcut) {
      if (shortcut === 'categories') {
        setActiveTab('categories');
      } else if (shortcut === 'cart') {
        setIsCartOpen(true);
      } else if (shortcut === 'profile') {
        setActiveTab('profile');
      } else if (shortcut === 'orders') {
        setActiveTab('orders');
      } else if (shortcut === 'flash-sale') {
        setActiveTab('home');
        // Let's scroll to the flash sale section after a small timeout
        setTimeout(() => {
          const el = document.getElementById('flash-sale');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 600);
      }
      
      // Clean query parameter so that refreshes don't keep firing it
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);
  
  // Seasonal state matching design system specification
  const [currentSeason, setCurrentSeason] = useState<string>(() => {
    return localStorage.getItem('dm_current_season') || 'default';
  });

  const handleSeasonChange = (seasonKey: string) => {
    setCurrentSeason(seasonKey);
    localStorage.setItem('dm_current_season', seasonKey);
  };
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; phone: string; address: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectReason, setAuthRedirectReason] = useState('');

  const handleRequireLogin = (reason: string) => {
    setAuthRedirectReason(reason);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (userData: { name: string; email: string; phone: string; address: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAuthModalOpen(false);
    setAuthRedirectReason('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('home');
  };
  
  // Real cart state initialized with 2 products matching initial user count of 2
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([
    { product: flashSaleProducts[0], quantity: 1 },
    { product: flashSaleProducts[1], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Open the cart drawer automatically when item is added to make the UX seamless and beautiful!
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans flex flex-col dark:bg-[#121212] dark:text-gray-100">
      {/* MOBILE LAYOUT */}
      <MobileLayout 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        currentSeason={currentSeason}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      >
        {activeTab === 'categories' && <MobileCategories onProductClick={handleProductClick} onAddToCart={handleAddToCart} />}
        {activeTab === 'orders' && <MobileOrders isLoggedIn={isLoggedIn} onLoginClick={() => handleRequireLogin('অর্ডার দেখতে অনুগ্রহ করে লগইন করুন')} />}
        {activeTab === 'profile' && <MobileProfile isLoggedIn={isLoggedIn} user={user} onLoginClick={() => handleRequireLogin('প্রোফাইল দেখতে অনুগ্রহ করে লগইন করুন')} onLogout={handleLogout} />}
        {activeTab === 'more' && <MobileMore />}
      </MobileLayout>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex flex-col flex-1">
        <Header 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          cartCount={cartCount} 
          onCartClick={() => setIsCartOpen(true)} 
          isLoggedIn={isLoggedIn}
          user={user}
          onLoginClick={() => handleRequireLogin('প্রোফাইল দেখতে অনুগ্রহ করে লগইন করুন')}
          currentSeason={currentSeason}
          onSeasonChange={handleSeasonChange}
        />
        
        <main className="flex-1 pb-[70px] md:pb-0">
          {activeTab === 'home' ? (
            <div>
              <Hero currentSeason={currentSeason} />
              <CategoryList />
              <FlashSale onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
              <BestSellers onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
              <Features />
              <ComboOffers onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
              <NewArrivals onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
              <PromoBanners />
              <Brands />
              <CustomerReviews />
              <TrustAndFaq />
            </div>
          ) : (
            <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-8 xl:px-12 py-6 sm:py-10">
              {activeTab === 'categories' && <MobileCategories onProductClick={handleProductClick} onAddToCart={handleAddToCart} />}
              {activeTab === 'orders' && <MobileOrders isLoggedIn={isLoggedIn} onLoginClick={() => handleRequireLogin('অর্ডার দেখতে অনুগ্রহ করে লগইন করুন')} />}
              {activeTab === 'profile' && <MobileProfile isLoggedIn={isLoggedIn} user={user} onLoginClick={() => handleRequireLogin('প্রোফাইল দেখতে অনুগ্রহ করে লগইন করুন')} onLogout={handleLogout} />}
              {activeTab === 'more' && <MobileMore />}
            </div>
          )}
        </main>

        <Newsletter />
        <Footer />
      </div>

      {/* Dynamic Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        isLoggedIn={isLoggedIn}
        user={user}
        onRequireLogin={handleRequireLogin}
      />

      {/* Beautiful Reusable Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        redirectReason={authRedirectReason}
      />

      {/* Globally Active PWA Installation and Shortcut Prompter */}
      <PWAInstallPrompt />
    </div>
  );
}

