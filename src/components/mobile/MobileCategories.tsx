import React from 'react';
import { categories } from '../../data';
import { ChevronRight } from 'lucide-react';

export function MobileCategories() {
  return (
    <div className="p-4 bg-gray-50 dark:bg-[#121212] min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">সকল ক্যাটাগরি</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <a key={category.id} href="#" className="flex flex-col items-center bg-white dark:bg-[#1E1E1E] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-2">
              {category.name}
            </span>
            <div className="flex items-center text-[10px] text-brand-emerald">
              <span>দেখুন</span>
              <ChevronRight size={12} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
