import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { bestSellerProducts } from '../data';
import { ProductSkeleton } from './ProductSkeleton';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { TYPOGRAPHY_TOKENS } from '../theme';

const ProductListCard: React.FC<{ 
  product: Product; 
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}> = ({ product, onProductClick, onAddToCart }) => {
  return (
    <div 
      onClick={() => onProductClick?.(product)}
      className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm flex items-center p-1.5 gap-2.5 relative cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Badges */}
      {product.discount && (
        <span className="absolute top-1.5 left-1.5 z-10 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-sm">
          -{product.discount}%
        </span>
      )}
      
      {/* Image */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center p-1">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center py-0.5 pr-2">
        <h3 className={`${TYPOGRAPHY_TOKENS.cardTitle} text-[11px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-0.5 leading-snug`}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span className="text-[12px] font-bold text-brand-emerald">৳{product.price.toLocaleString('en-IN')}</span>
          {product.oldPrice && (
            <span className="text-[9px] text-gray-400 line-through">৳{product.oldPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={8} className="fill-brand-gold text-brand-gold" />
            <span className="text-[9px] font-medium text-gray-600">{product.rating} <span className="text-gray-400 font-normal">({product.reviews})</span></span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product, 1);
            }}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-emerald hover:text-white hover:border-brand-emerald transition-colors shadow-sm"
          >
            <ShoppingCart size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface BestSellersProps {
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function BestSellers({ onProductClick, onAddToCart }: BestSellersProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 sm:py-8 xl:py-12">
      <div className="flex items-center justify-between mb-2 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-brand-emerald rounded-full"></div>
          <h2 className={`${TYPOGRAPHY_TOKENS.sectionTitle} text-[14px] sm:text-2xl flex items-center gap-3 text-gray-800`}>
            ফিচার্ড প্রোডাক্টস
          </h2>
        </div>
        
        <a href="#" className="text-brand-emerald font-medium flex items-center gap-0.5 hover:text-brand-dark transition-colors text-[12px] sm:hidden mt-0.5">
          সব দেখুন <ArrowRight size={12} />
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
            <ProductListCard 
              key={product.id} 
              product={product} 
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
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
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </div>
    </section>
  );
}
