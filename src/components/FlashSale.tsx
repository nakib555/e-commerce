import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { flashSaleProducts } from '../data';
import { ProductSkeleton } from './ProductSkeleton';

export function FlashSale() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 md:py-8 xl:py-12">
      {/* Mobile Header */}
      <div className="md:hidden flex flex-col gap-2 mb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-bold flex items-center gap-1.5 text-gray-800">
            ফ্ল্যাশ সেল <Zap className="text-brand-gold fill-brand-gold" size={14} />
          </h2>
          <a href="#" className="text-brand-emerald font-medium flex items-center gap-0.5 text-[12px]">
            সব দেখুন <ArrowRight size={12} />
          </a>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="bg-white border border-gray-200 text-brand-dark rounded px-1.5 py-1 min-w-[30px] text-center shadow-sm">
            <div className="text-xs font-bold leading-none">০২</div>
            <div className="text-[7px] font-medium text-gray-500 mt-1">ঘণ্টা</div>
          </div>
          <span className="text-gray-400 font-bold -mt-2.5">:</span>
          <div className="bg-white border border-gray-200 text-brand-dark rounded px-1.5 py-1 min-w-[30px] text-center shadow-sm">
            <div className="text-xs font-bold leading-none">১৮</div>
            <div className="text-[7px] font-medium text-gray-500 mt-1">মিনিট</div>
          </div>
          <span className="text-gray-400 font-bold -mt-2.5">:</span>
          <div className="bg-white border border-gray-200 text-brand-dark rounded px-1.5 py-1 min-w-[30px] text-center shadow-sm">
            <div className="text-xs font-bold leading-none">৪৫</div>
            <div className="text-[7px] font-medium text-gray-500 mt-1">সেকেন্ড</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 xl:gap-8">
        {/* Desktop Flash Sale Banner / Timer */}
        <div className="hidden lg:flex lg:w-1/4 bg-brand-dark text-white rounded-2xl p-6 xl:p-10 flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-heading font-bold">ফ্ল্যাশ সেল</h2>
              <Zap className="text-brand-gold fill-brand-gold" size={24} />
            </div>
            <p className="text-gray-300 text-sm mb-6">সীমিত সময়ের জন্য বিশেষ অফার</p>
            
            {/* Timer Blocks */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white text-brand-dark rounded-lg p-2 min-w-[60px] text-center">
                <div className="text-xl font-bold">০২</div>
                <div className="text-[10px] uppercase font-medium text-gray-500">ঘণ্টা</div>
              </div>
              <span className="text-brand-gold font-bold text-xl">:</span>
              <div className="bg-white text-brand-dark rounded-lg p-2 min-w-[60px] text-center">
                <div className="text-xl font-bold">১৮</div>
                <div className="text-[10px] uppercase font-medium text-gray-500">মিনিট</div>
              </div>
              <span className="text-brand-gold font-bold text-xl">:</span>
              <div className="bg-white text-brand-dark rounded-lg p-2 min-w-[60px] text-center">
                <div className="text-xl font-bold">৪৫</div>
                <div className="text-[10px] uppercase font-medium text-gray-500">সেকেন্ড</div>
              </div>
            </div>

            <button className="bg-white text-brand-dark px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block">
              সব দেখুন
            </button>
          </div>
        </div>

        {/* Products Carousel Area */}
        <div className="lg:w-3/4 flex flex-col">
          {/* Flash Sale Carousel (Mobile Only) */}
          <div className="md:hidden flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-2.5 pb-3 -mx-4 px-4">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="min-w-[38vw] sm:min-w-[260px] snap-center shrink-0 w-[38vw]">
                  <ProductSkeleton />
                </div>
              ))
            ) : (
              flashSaleProducts.slice(0, 3).map(product => (
                <div key={product.id} className="min-w-[38vw] sm:min-w-[260px] snap-center shrink-0 w-[38vw] flex flex-col">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>

          {/* New Arrivals Section */}
          <div className="mt-4 md:mt-0">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <h3 className="text-[14px] md:text-xl font-bold md:font-heading md:font-bold text-gray-800">নতুন এসেছে</h3>
              <a href="#" className="text-brand-emerald font-medium flex items-center gap-0.5 md:gap-1 hover:text-brand-dark transition-colors text-[12px] md:text-sm">
                সব দেখুন <ArrowRight size={12} className="md:w-4 md:h-4" />
              </a>
            </div>
            
            <div className="flex md:grid overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 xl:gap-6 pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="min-w-[38vw] sm:min-w-[260px] md:min-w-0 snap-center shrink-0 w-[38vw] md:w-auto">
                    <ProductSkeleton />
                  </div>
                ))
              ) : (
                flashSaleProducts.slice(3, 6).map(product => (
                  <div key={product.id} className="min-w-[38vw] sm:min-w-[260px] md:min-w-0 snap-center shrink-0 w-[38vw] md:w-auto flex flex-col">
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
