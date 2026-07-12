import React from 'react';
import { categories } from '../data';
import { Grid, ArrowRight } from 'lucide-react';

export function CategoryList() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 sm:py-6">
      <div className="md:bg-white md:rounded-2xl md:p-6 md:shadow-sm md:border md:border-gray-100">
        
        <div className="flex items-center justify-between mb-3 md:hidden">
          <h3 className="text-[14px] font-bold text-gray-800">ক্যাটাগরি সমূহ</h3>
          <a href="#" className="text-brand-emerald font-medium flex items-center gap-0.5 text-[12px]">
            সব দেখুন <ArrowRight size={12} />
          </a>
        </div>

        {/* Mobile Grid View */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-2 md:hidden">
          {categories.map((category) => (
            <a key={category.id} href="#" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center shadow-md">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[10px] text-center font-medium text-gray-700 leading-tight">
                {category.name}
              </span>
            </a>
          ))}
          <a href="#" className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 shadow-md">
              <Grid size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[11px] text-center font-medium text-gray-700 leading-tight">
              সব ক্যাটাগরি
            </span>
          </a>
        </div>

        {/* Desktop Horizontal List */}
        <div className="hidden md:flex overflow-x-auto hide-scrollbar gap-4 sm:gap-6 xl:gap-10 pb-2 items-center justify-between md:justify-start xl:justify-between w-full">
          {categories.map((category) => (
            <a key={category.id} href="#" className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px] xl:min-w-[120px] group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 xl:w-28 xl:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-emerald transition-colors p-0.5 bg-gray-50 shadow-inner">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-sm text-center font-medium text-gray-700 group-hover:text-brand-emerald transition-colors line-clamp-2">
                {category.name}
              </span>
            </a>
          ))}
          
          {/* See All Button */}
          <a href="#" className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px] xl:min-w-[120px] group ml-auto md:ml-4 xl:ml-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 xl:w-28 xl:h-28 rounded-full bg-gray-50 flex items-center justify-center border-2 border-transparent group-hover:border-brand-emerald transition-colors text-gray-500 group-hover:text-brand-emerald shadow-inner">
              <Grid size={24} />
            </div>
            <span className="text-xs sm:text-sm text-center font-medium text-gray-700 group-hover:text-brand-emerald transition-colors">
              সব ক্যাটাগরি
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
