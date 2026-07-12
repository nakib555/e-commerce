import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Heart, ShoppingCart, Menu, ChevronDown, Phone, MapPin, X, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
  isLoggedIn?: boolean;
  user?: { name: string; email: string; phone: string; address: string } | null;
  onLoginClick?: () => void;
}

export function Header({ 
  activeTab = 'home', 
  onTabChange, 
  cartCount = 2, 
  onCartClick,
  isLoggedIn = false,
  user = null,
  onLoginClick
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('ঢাকা, বাংলাদেশ');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="w-full bg-white dark:bg-[#121212] flex flex-col z-50 shadow-sm sticky top-0 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-brand-emerald text-white text-xs sm:text-sm py-2 px-4 flex justify-between items-center hidden md:flex">
        <div className="flex items-center gap-6 max-w-[1440px] mx-auto w-full px-4 lg:px-8 xl:px-12">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>সারা বাংলাদেশে ফ্রি ডেলিভারি ৳1499+ অর্ডারে</span>
          </div>
          <div className="flex-1 text-center font-medium">
            <Heart size={14} className="inline mr-1 text-brand-gold fill-brand-gold" />
            ঈদ অফার! ২০% পর্যন্ত ছাড় চলছে
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onTabChange?.('more')} className="hover:text-brand-gold transition-colors flex items-center gap-1 text-xs"><Phone size={14} /> হেল্প সেন্টার</button>
            <button onClick={() => onTabChange?.('orders')} className="hover:text-brand-gold transition-colors text-xs">অর্ডার ট্র্যাক করুন</button>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>বাংলা</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`max-w-[1440px] mx-auto w-full px-4 lg:px-8 xl:px-12 flex items-center justify-between gap-4 md:gap-8 transition-all duration-300 py-3 sm:py-5`}>
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button onClick={() => onTabChange?.('more')} className="md:hidden text-brand-black dark:text-gray-200 p-1 -ml-1">
            <Menu size={24} />
          </button>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onTabChange?.('home'); }}
            className="flex items-center gap-2 text-xl md:text-2xl font-heading font-bold text-brand-dark dark:text-brand-emerald"
          >
            <ShoppingBag className="text-brand-emerald" size={24} />
            <span>Deshi<span className="text-brand-emerald">Mart</span></span>
          </a>
        </div>

        {/* Search Bar - Hidden on small mobile, visible on sm+ */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center relative">
          <input 
            type="text" 
            placeholder="আপনি কী খুঁজছেন?" 
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-[#1E1E1E] dark:text-white rounded-lg pl-4 pr-24 py-2.5 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-shadow"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-brand-dark text-white px-6 rounded-md font-medium hover:bg-brand-emerald transition-colors">
            খুঁজুন
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          <button 
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-300 hover:text-brand-emerald dark:hover:text-brand-emerald transition-colors p-1"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={() => onTabChange?.('categories')} className="md:hidden text-gray-700 dark:text-gray-300 hover:text-brand-emerald dark:hover:text-brand-emerald transition-colors p-1">
            <Search size={22} />
          </button>
          <button 
            onClick={isLoggedIn ? () => onTabChange?.('profile') : onLoginClick} 
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-emerald transition-colors hidden lg:flex"
          >
            <User size={22} className={isLoggedIn ? "text-brand-emerald" : ""} />
            <span className="text-sm font-medium">{isLoggedIn ? (user?.name || 'আমার প্রোফাইল') : 'লগইন করুন'}</span>
          </button>
          <button onClick={() => onTabChange?.('profile')} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-emerald transition-colors md:flex">
            <Heart size={22} />
            <span className="text-sm font-medium hidden md:block">উইশলিস্ট</span>
          </button>
          <button onClick={onCartClick || (() => onTabChange?.('profile'))} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-emerald transition-colors relative p-1 md:p-0">
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-brand-emerald text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white dark:border-[#121212]">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-medium hidden sm:block">কার্ট</span>
          </button>
        </div>
      </div>

      {/* Mobile Search - Visible only on smallest screens */}
      <div 
        className={`px-4 md:hidden flex flex-col transition-all duration-300 bg-white dark:bg-[#121212] ${isScrolled ? 'shadow-sm pb-3 pt-1' : 'pb-2 pt-1'}`}
      >
        <div className="flex items-center relative">
          <input 
            type="text" 
            placeholder="আপনি কী খুঁজছেন?" 
            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1E1E1E] dark:text-white rounded-lg pl-3 pr-12 py-2 focus:outline-none focus:border-brand-emerald text-sm"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-[#08422C] text-white px-3.5 rounded-r-lg flex items-center justify-center">
            <Search size={18} />
          </button>
        </div>
        
        <div 
          onClick={() => setIsLocationModalOpen(true)}
          className={`flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 transition-all duration-300 overflow-hidden cursor-pointer ${isScrolled ? 'max-h-0 opacity-0 pb-0 border-transparent mt-0 mb-0' : 'max-h-[40px] opacity-100 pb-2 border-b mt-3 mb-1'}`}>
          <MapPin size={16} className="text-brand-emerald shrink-0" />
          <span className="text-xs truncate font-medium">ডেলিভারি করুন: {selectedLocation}</span>
          <ChevronDown size={14} className="text-gray-400 shrink-0" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-t border-gray-100 dark:border-gray-800 hidden md:block dark:bg-[#121212]">
        <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-8 xl:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8 xl:gap-12">
            <button onClick={() => onTabChange?.('categories')} className="flex items-center gap-2 text-brand-emerald font-semibold hover:text-brand-dark dark:hover:text-emerald-400 transition-colors">
              <Menu size={20} />
              <span>সকল ক্যাটাগরি</span>
            </button>
            <nav className="flex items-center gap-6 xl:gap-8">
              {[
                { id: 'home', label: 'হোম' },
                { id: 'categories', label: 'ক্যাটাগরি সমূহ' },
                { id: 'orders', label: 'আমার অর্ডার' },
                { id: 'profile', label: 'আমার প্রোফাইল' },
                { id: 'more', label: 'যোগাযোগ ও সাহায্য' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => onTabChange?.(tab.id)}
                    className={`relative font-medium transition-all pb-1.5 pt-1 text-sm lg:text-[15px] ${
                      isActive 
                        ? 'text-brand-emerald font-semibold' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-brand-emerald'
                    }`}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {isActive && (
                      <motion.span 
                        layoutId="desktopActiveIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-emerald rounded-full shadow-[0_1px_6px_rgba(15,138,95,0.4)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
          <button onClick={() => onTabChange?.('home')} className="bg-gradient-to-r from-brand-emerald to-[#6DB33F] text-white px-4 py-1.5 rounded flex items-center gap-2 font-medium shadow-sm hover:shadow-md transition-shadow">
            <span>🔥</span> ফ্ল্যাশ সেল
          </button>
        </div>
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 transition-opacity">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">লোকেশন নির্বাচন করুন</h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto hide-scrollbar">
              {['ঢাকা, বাংলাদেশ', 'চট্টগ্রাম, বাংলাদেশ', 'সিলেট, বাংলাদেশ', 'রাজশাহী, বাংলাদেশ', 'খুলনা, বাংলাদেশ'].map((loc) => (
                <button 
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setIsLocationModalOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${selectedLocation === loc ? 'border-brand-emerald bg-[#E8F5E9] dark:bg-[#0A2E1F] text-brand-emerald shadow-sm' : 'border-gray-200 dark:border-gray-700 hover:border-brand-emerald dark:hover:border-brand-emerald hover:bg-gray-50 dark:hover:bg-[#2A2A2A]'}`}
                >
                  <MapPin size={18} className={selectedLocation === loc ? 'text-brand-emerald' : 'text-gray-400 dark:text-gray-500'} />
                  <span className={`font-medium text-sm ${selectedLocation === loc ? 'text-brand-emerald' : 'text-gray-700 dark:text-gray-300'}`}>{loc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
