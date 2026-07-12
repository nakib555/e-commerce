/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryList } from './components/CategoryList';
import { FlashSale } from './components/FlashSale';
import { BestSellers } from './components/BestSellers';
import { Features } from './components/Features';
import { ComboOffers } from './components/ComboOffers';
import { PromoBanners } from './components/PromoBanners';
import { TrustAndFaq } from './components/TrustAndFaq';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';

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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => handleRequireLogin('প্রোফাইল দেখতে অনুগ্রহ করে লগইন করুন')}
      />
      
      <main className="flex-1 pb-[70px] md:pb-0">
        {activeTab === 'home' ? (
          <div>
            <Hero />
            <CategoryList />
            <FlashSale onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
            <BestSellers onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
            <Features />
            <ComboOffers onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
            <PromoBanners />
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

      {/* Footer and newsletter are only shown on home tab or desktop */}
      <div className={activeTab === 'home' ? 'block' : 'hidden md:block'}>
        <Newsletter />
        <Footer />
      </div>
      
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dynamic Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Mobile Cart Button */}
      <motion.button
        onClick={() => setIsCartOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed bottom-20 right-4 z-40 bg-gradient-to-r from-brand-emerald to-[#6DB33F] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(15,138,95,0.4)] flex items-center justify-center border border-white/20"
        aria-label="Open cart drawer"
      >
        <div className="relative">
          <ShoppingCart size={22} className="drop-shadow-sm" />
          {cartCount > 0 && (
            <span className="absolute -top-2.5 -right-2.5 bg-brand-gold text-brand-dark text-[9px] font-extrabold h-5.5 w-5.5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              {cartCount}
            </span>
          )}
        </div>
      </motion.button>

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
    </div>
  );
}

