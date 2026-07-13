import React, { useState } from 'react';
import { categories } from '../../data';
import { ChevronRight, Search, Grid } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';
import { getCategoryTheme } from '../../theme';

interface MobileCategoriesProps {
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function MobileCategories({ onProductClick, onAddToCart }: MobileCategoriesProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen pb-12 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-3xl font-heading font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Grid className="text-brand-emerald" size={24} />
            সকল ক্যাটাগরি
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">দেশি মার্টের সকল প্রিমিয়াম ক্যাটাগরি কালেকশন</p>
        </div>
        
        {/* Search inside categories page */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="ক্যাটাগরি খুঁজুন..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] dark:text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">কোনো ক্যাটাগরি পাওয়া যায়নি</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-3 text-brand-emerald font-semibold text-sm hover:underline"
          >
            সবগুলো আবার দেখান
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredCategories.map((category, index) => {
            const theme = getCategoryTheme(category.id);
            return (
              <motion.a 
                key={category.id} 
                href="#" 
                onClick={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={`group flex flex-col items-center bg-white dark:bg-[#1E1E1E] p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:${theme.borderLight} dark:hover:${theme.borderDark}`}
              >
                <div className={`w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] rounded-[18px] overflow-hidden mb-3 sm:mb-4 bg-gray-50 dark:bg-[#121212] border border-gray-100 dark:border-gray-800 p-1 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] group-hover:${theme.borderLight} dark:group-hover:${theme.borderDark} transition-all duration-300`}>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover rounded-[14px] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className={`text-sm font-semibold text-gray-700 dark:text-gray-200 text-center mb-2 transition-colors line-clamp-1 ${theme.hoverTextLight} ${theme.hoverTextDark}`}>
                  {category.name}
                </span>
                <div className={`flex items-center text-[11px] font-bold ${theme.textLight} ${theme.textDark} group-hover:gap-1.5 transition-all`}>
                  <span>পণ্য দেখুন</span>
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </div>
      )}
    </div>
  );
}
