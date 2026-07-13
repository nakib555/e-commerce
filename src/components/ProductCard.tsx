import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { TYPOGRAPHY_TOKENS } from '../theme';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  key?: React.Key;
}

export function ProductCard({ product, featured = false, onProductClick, onAddToCart }: ProductCardProps) {
  return (
    <div 
      onClick={() => onProductClick?.(product)}
      className="bg-white dark:bg-[#121212] rounded-[1.25rem] overflow-hidden border border-gray-100 dark:border-gray-800/40 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.02)] transition-all duration-500 group relative flex flex-col h-full cursor-pointer hover:-translate-y-1"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 sm:gap-2">
        {product.discount && (
          <span className="bg-brand-orange text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-brand-emerald text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm">
            নতুন
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          // Visual wishlist toggle or simple feedback could be here
        }}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white dark:hover:bg-[#1A1A1A] transition-all duration-300 shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 border border-gray-100/50 dark:border-gray-800/50 hover:scale-110"
      >
        <Heart size={14} className="sm:w-4 sm:h-4" />
      </button>

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50/50 dark:bg-[#1A1A1A]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal"
        />
        
        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300 hidden md:block">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product, 1);
            }}
            className="w-full bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md text-brand-dark dark:text-brand-emerald font-semibold py-2.5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-brand-emerald hover:text-white dark:hover:bg-brand-emerald dark:hover:text-white transition-all duration-300 flex items-center justify-center gap-2 border border-gray-100/50 dark:border-gray-800/50 transform hover:-translate-y-0.5"
          >
            <ShoppingCart size={18} />
            <span>কার্টে যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-1.5 sm:p-4 flex flex-col flex-1">
        <h3 className={`${TYPOGRAPHY_TOKENS.cardTitle} text-[10px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1 hover:text-brand-emerald transition-colors leading-snug`}>
          {product.name}
        </h3>
        
        <div className="mt-auto pt-1 flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className={`${TYPOGRAPHY_TOKENS.price} text-[11px] sm:text-lg text-brand-emerald`}>৳{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice && (
                <span className="text-[8px] sm:text-xs text-gray-400 line-through">৳{product.oldPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star size={8} className="fill-brand-gold text-brand-gold sm:w-3 sm:h-3" />
              <span className={`${TYPOGRAPHY_TOKENS.meta} text-[8px] sm:text-[11px] font-medium text-gray-600`}>{product.rating} <span className="text-gray-400 font-normal">({product.reviews})</span></span>
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product, 1);
            }}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-emerald hover:bg-brand-emerald hover:text-white hover:border-brand-emerald transition-colors shadow-sm shrink-0"
          >
            <ShoppingCart size={10} className="sm:w-3 sm:h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
