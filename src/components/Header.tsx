import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Heart, ShoppingCart, Menu, ChevronDown, Phone, MapPin, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('ঢাকা, বাংলাদেশ');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full bg-white flex flex-col z-50 shadow-sm sticky top-0 transition-all duration-300">
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
            <a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-1"><Phone size={14} /> হেল্প সেন্টার</a>
            <a href="#" className="hover:text-brand-gold transition-colors">অর্ডার ট্র্যাক করুন</a>
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
          <button className="md:hidden text-brand-black p-1 -ml-1">
            <Menu size={24} />
          </button>
          <a href="/" className="flex items-center gap-2 text-xl md:text-2xl font-heading font-bold text-brand-dark">
            <ShoppingBag className="text-brand-emerald" size={24} />
            <span>Deshi<span className="text-brand-emerald">Mart</span></span>
          </a>
        </div>

        {/* Search Bar - Hidden on small mobile, visible on sm+ */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center relative">
          <input 
            type="text" 
            placeholder="আপনি কী খুঁজছেন?" 
            className="w-full border border-gray-300 rounded-lg pl-4 pr-24 py-2.5 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-shadow"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-brand-dark text-white px-6 rounded-md font-medium hover:bg-brand-emerald transition-colors">
            খুঁজুন
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <button className="md:hidden text-gray-700 hover:text-brand-emerald transition-colors p-1">
            <Search size={22} />
          </button>
          <button className="flex items-center gap-2 hover:text-brand-emerald transition-colors hidden lg:flex">
            <User size={22} className="text-gray-600" />
            <span className="text-sm font-medium">লগইন / রেজিস্টার</span>
          </button>
          <button className="flex items-center gap-2 hover:text-brand-emerald transition-colors md:flex">
            <Heart size={22} className="text-gray-600" />
            <span className="text-sm font-medium hidden md:block">উইশলিস্ট</span>
          </button>
          <button className="flex items-center gap-2 hover:text-brand-emerald transition-colors relative p-1 md:p-0">
            <div className="relative">
              <ShoppingCart size={24} className="text-gray-800" />
              <span className="absolute -top-1 -right-1 bg-brand-emerald text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                2
              </span>
            </div>
            <span className="text-sm font-medium hidden sm:block">কার্ট</span>
          </button>
        </div>
      </div>

      {/* Mobile Search - Visible only on smallest screens */}
      <div className={`px-4 md:hidden flex flex-col transition-all duration-300 bg-white ${isScrolled ? 'shadow-sm pb-3 pt-1' : 'pb-2 pt-1'}`}>
        <div className="flex items-center relative">
          <input 
            type="text" 
            placeholder="আপনি কী খুঁজছেন?" 
            className="w-full border border-gray-300 bg-gray-50 rounded-lg pl-3 pr-12 py-2 focus:outline-none focus:border-brand-emerald text-sm"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-[#08422C] text-white px-3.5 rounded-r-lg flex items-center justify-center">
            <Search size={18} />
          </button>
        </div>
        
        <div 
          onClick={() => setIsLocationModalOpen(true)}
          className={`flex items-center gap-1.5 text-sm text-gray-600 border-gray-100 transition-all duration-300 overflow-hidden cursor-pointer ${isScrolled ? 'max-h-0 opacity-0 pb-0 border-transparent mt-0 mb-0' : 'max-h-[40px] opacity-100 pb-2 border-b mt-3 mb-1'}`}>
          <MapPin size={16} className="text-brand-emerald shrink-0" />
          <span className="text-xs truncate font-medium">ডেলিভারি করুন: {selectedLocation}</span>
          <ChevronDown size={14} className="text-gray-400 shrink-0" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-t border-gray-100 hidden md:block">
        <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-8 xl:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8 xl:gap-12">
            <button className="flex items-center gap-2 text-brand-emerald font-semibold hover:text-brand-dark transition-colors">
              <Menu size={20} />
              <span>সকল ক্যাটাগরি</span>
            </button>
            <nav className="flex items-center gap-6 xl:gap-8">
              <a href="#" className="font-medium text-brand-emerald border-b-2 border-brand-emerald pb-1">হোম</a>
              <a href="#" className="font-medium text-gray-700 hover:text-brand-emerald transition-colors pb-1">নতুন এসেছে</a>
              <a href="#" className="font-medium text-gray-700 hover:text-brand-emerald transition-colors pb-1">ঈদ কালেকশন</a>
              <a href="#" className="font-medium text-gray-700 hover:text-brand-emerald transition-colors pb-1">সেরা বিক্রিত</a>
              <a href="#" className="font-medium text-gray-700 hover:text-brand-emerald transition-colors pb-1">ব্লগ</a>
              <a href="#" className="font-medium text-gray-700 hover:text-brand-emerald transition-colors pb-1">অফার</a>
            </nav>
          </div>
          <button className="bg-gradient-to-r from-brand-emerald to-[#6DB33F] text-white px-4 py-1.5 rounded flex items-center gap-2 font-medium shadow-sm hover:shadow-md transition-shadow">
            <span>🔥</span> ফ্ল্যাশ সেল
          </button>
        </div>
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 transition-opacity">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg">লোকেশন নির্বাচন করুন</h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100">
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
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${selectedLocation === loc ? 'border-brand-emerald bg-[#E8F5E9] text-brand-emerald shadow-sm' : 'border-gray-200 hover:border-brand-emerald hover:bg-gray-50'}`}
                >
                  <MapPin size={18} className={selectedLocation === loc ? 'text-brand-emerald' : 'text-gray-400'} />
                  <span className={`font-medium text-sm ${selectedLocation === loc ? 'text-brand-emerald' : 'text-gray-700'}`}>{loc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
