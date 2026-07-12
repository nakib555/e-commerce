import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  key?: React.Key;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 sm:gap-2">
        {product.discount && (
          <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#125838] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm">
            নতুন
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 border border-gray-100">
        <Heart size={14} className="sm:w-4 sm:h-4" />
      </button>

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        />
        
        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 hidden md:block">
          <button className="w-full bg-white/95 backdrop-blur-md text-brand-dark font-semibold py-2.5 rounded-lg shadow-lg hover:bg-brand-dark hover:text-white transition-colors flex items-center justify-center gap-2 border border-gray-100">
            <ShoppingCart size={18} />
            <span>কার্টে যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4 flex flex-col flex-1">
        <h3 className="text-[11px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1 hover:text-brand-emerald transition-colors cursor-pointer">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-1 flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="text-xs sm:text-lg font-bold text-[#125838]">৳{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice && (
                <span className="text-[9px] sm:text-xs text-gray-400 line-through">৳{product.oldPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-brand-gold text-brand-gold" />
              <span className="text-[10px] sm:text-xs font-medium text-gray-600">{product.rating} <span className="text-gray-400 font-normal">({product.reviews})</span></span>
            </div>
          </div>
          
          <button className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-emerald hover:bg-brand-emerald hover:text-white hover:border-brand-emerald transition-colors shadow-sm shrink-0">
            <ShoppingCart size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
