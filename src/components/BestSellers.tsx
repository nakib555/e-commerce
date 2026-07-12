import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { bestSellerProducts } from '../data';
import { ProductSkeleton } from './ProductSkeleton';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

const ProductListCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex items-center p-2 gap-3 relative">
      {/* Badges */}
      {product.discount && (
        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
          -{product.discount}%
        </span>
      )}
      
      {/* Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-1">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center py-1 pr-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="text-[13px] font-bold text-[#125838]">৳{product.price.toLocaleString('en-IN')}</span>
          {product.oldPrice && (
            <span className="text-[10px] text-gray-400 line-through">৳{product.oldPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <Star size={10} className="fill-brand-gold text-brand-gold" />
            <span className="text-[10px] font-medium text-gray-600">{product.rating} <span className="text-gray-400 font-normal">({product.reviews})</span></span>
          </div>
          
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-emerald hover:text-white hover:border-brand-emerald transition-colors shadow-sm">
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BestSellers() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 sm:py-8 xl:py-12">
      <div className="flex items-center justify-between mb-3 sm:mb-6">
        <h2 className="text-[15px] sm:text-2xl font-bold text-gray-800 flex items-center gap-3">
          বেস্ট সেলার
        </h2>
        
        <a href="#" className="text-brand-emerald font-medium flex items-center gap-0.5 hover:text-brand-dark transition-colors text-[13px] sm:hidden mt-0.5">
          সব দেখুন <ArrowRight size={14} />
        </a>

        <div className="hidden sm:flex items-center gap-4">
           <a href="#" className="text-brand-emerald font-medium flex items-center gap-1 hover:text-brand-dark transition-colors text-sm mt-1">
            সব দেখুন <ArrowRight size={16} />
          </a>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-emerald hover:text-brand-emerald transition-colors bg-white shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-emerald hover:text-brand-emerald transition-colors bg-white shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile List View */}
      <div className="flex flex-col gap-3 md:hidden">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-xl border border-gray-100 animate-pulse flex items-center p-2 gap-3">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : (
          bestSellerProducts.slice(0, 4).map(product => (
            <ProductListCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <React.Fragment key={i}>
              <ProductSkeleton />
            </React.Fragment>
          ))
        ) : (
          bestSellerProducts.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
