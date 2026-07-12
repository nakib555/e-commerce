import React, { useState, useEffect } from 'react';
import { categories } from '../data';
import { Grid, ArrowRight } from 'lucide-react';

export function CategoryList() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 sm:py-6">
      <div className="md:bg-white dark:md:bg-[#1E1E1E] md:rounded-2xl md:p-6 md:shadow-sm md:border md:border-gray-100 dark:md:border-gray-800">
        
        <div className="flex items-center justify-between mb-3 md:hidden">
          <h3 className="text-[14px] font-bold text-gray-800 dark:text-gray-100">ক্যাটাগরি সমূহ</h3>
          <a href="#" className="text-brand-emerald font-medium flex items-center gap-0.5 text-[12px]">
            সব দেখুন <ArrowRight size={12} />
          </a>
        </div>

        {/* Mobile Grid View */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-2 md:hidden">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse shadow-md dark:shadow-none"></div>
                <div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))
          ) : (
            <>
              {categories.map((category) => (
                <a key={category.id} href="#" className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] flex items-center justify-center shadow-md dark:shadow-none">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] text-center font-medium text-gray-700 dark:text-gray-300 leading-tight">
                    {category.name}
                  </span>
                </a>
              ))}
              <a href="#" className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-[#121212] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-md dark:shadow-none">
                  <Grid size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-center font-medium text-gray-700 dark:text-gray-300 leading-tight">
                  সব ক্যাটাগরি
                </span>
              </a>
            </>
          )}
        </div>

        {/* Desktop Horizontal List */}
        <div className="hidden md:flex overflow-x-auto hide-scrollbar gap-4 sm:gap-6 xl:gap-10 pb-2 items-center justify-between md:justify-start xl:justify-between w-full">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px] xl:min-w-[120px]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 xl:w-28 xl:h-28 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))
          ) : (
            <>
              {categories.map((category) => (
                <a key={category.id} href="#" className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px] xl:min-w-[120px] group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 xl:w-28 xl:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-emerald transition-colors p-0.5 bg-gray-50 dark:bg-[#121212] shadow-inner">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-center font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-emerald transition-colors line-clamp-2">
                    {category.name}
                  </span>
                </a>
              ))}
              
              {/* See All Button */}
              <a href="#" className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px] xl:min-w-[120px] group ml-auto md:ml-4 xl:ml-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 xl:w-28 xl:h-28 rounded-full bg-gray-50 dark:bg-[#121212] flex items-center justify-center border-2 border-transparent group-hover:border-brand-emerald transition-colors text-gray-500 dark:text-gray-400 group-hover:text-brand-emerald shadow-inner">
                  <Grid size={24} />
                </div>
                <span className="text-xs sm:text-sm text-center font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-emerald transition-colors">
                  সব ক্যাটাগরি
                </span>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
