import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { flashSaleProducts } from '../data';
import { ProductSkeleton } from './ProductSkeleton';
import { Product } from '../types';

interface NewArrivalsProps {
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function NewArrivals({ onProductClick, onAddToCart }: NewArrivalsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const newProducts = flashSaleProducts.filter(p => p.isNew);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 md:py-8 xl:py-12">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-brand-emerald rounded-full"></div>
          <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
            নতুন এসেছে <Sparkles className="text-brand-orange animate-pulse" size={16} />
          </h2>
        </div>
        <a 
          href="#" 
          className="text-brand-emerald font-semibold flex items-center gap-0.5 hover:text-brand-dark transition-colors text-xs sm:text-sm"
        >
          সব দেখুন <ArrowRight size={14} />
        </a>
      </div>

      <div className="flex md:grid overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-5 pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="min-w-[42vw] sm:min-w-[260px] md:min-w-0 snap-center shrink-0 w-[42vw] md:w-auto">
              <ProductSkeleton />
            </div>
          ))
        ) : (
          newProducts.map(product => (
            <div key={product.id} className="min-w-[42vw] sm:min-w-[260px] md:min-w-0 snap-center shrink-0 w-[42vw] md:w-auto flex flex-col">
              <ProductCard 
                product={product} 
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
