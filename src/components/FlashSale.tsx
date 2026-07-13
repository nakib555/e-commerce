import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { flashSaleProducts } from '../data';
import { ProductSkeleton } from './ProductSkeleton';
import { Product } from '../types';
import { TYPOGRAPHY_TOKENS } from '../theme';

interface FlashSaleProps {
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function FlashSale({ onProductClick, onAddToCart }: FlashSaleProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="flash-sale" className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 md:py-8 xl:py-12">
      {/* Mobile Header */}
      <div className="md:hidden flex flex-col gap-2 mb-3">
        <div className="flex items-center justify-between">
          <h2 className={`${TYPOGRAPHY_TOKENS.sectionTitle} text-[14px] flex items-center gap-1.5 text-gray-800`}>
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
        <div className="hidden lg:flex lg:w-1/4 bg-brand-emerald text-white rounded-[1.5rem] p-6 xl:p-10 flex-col justify-center relative overflow-hidden shadow-[0_8px_30px_rgba(13,92,62,0.15)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-gold/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <h2 className={`${TYPOGRAPHY_TOKENS.sectionTitle} text-white text-3xl font-heading font-medium tracking-tight`}>ফ্ল্যাশ সেল</h2>
              <Zap className="text-brand-gold fill-brand-gold drop-shadow-md" size={28} />
            </div>
            <p className="text-white/80 text-sm mb-8 font-medium">সীমিত সময়ের জন্য বিশেষ অফার</p>
            
            {/* Timer Blocks */}
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-xl p-3 min-w-[65px] text-center shadow-inner">
                <div className="text-2xl font-bold tracking-tight">০২</div>
                <div className="text-[10px] uppercase font-bold text-white/70 mt-1 tracking-wider">ঘণ্টা</div>
              </div>
              <span className="text-brand-gold/60 font-bold text-xl">:</span>
              <div className="bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-xl p-3 min-w-[65px] text-center shadow-inner">
                <div className="text-2xl font-bold tracking-tight">১৮</div>
                <div className="text-[10px] uppercase font-bold text-white/70 mt-1 tracking-wider">মিনিট</div>
              </div>
              <span className="text-brand-gold/60 font-bold text-xl">:</span>
              <div className="bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-xl p-3 min-w-[65px] text-center shadow-inner">
                <div className="text-2xl font-bold tracking-tight">৪৫</div>
                <div className="text-[10px] uppercase font-bold text-white/70 mt-1 tracking-wider">সেকেন্ড</div>
              </div>
            </div>

            <button className="bg-white text-brand-emerald px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              সব দেখুন <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Products Carousel Area */}
        <div className="lg:w-3/4 flex flex-col">
          {/* Flash Sale Carousel */}
          <div className="flex md:grid overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none md:grid-cols-3 gap-2.5 md:gap-4 xl:gap-6 pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="min-w-[38vw] sm:min-w-[260px] md:min-w-0 snap-center shrink-0 w-[38vw] md:w-auto">
                  <ProductSkeleton />
                </div>
              ))
            ) : (
              flashSaleProducts.slice(0, 3).map(product => (
                <div key={product.id} className="min-w-[38vw] sm:min-w-[260px] md:min-w-0 snap-center shrink-0 w-[38vw] md:w-auto flex flex-col">
                  <ProductCard 
                    product={product} 
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
