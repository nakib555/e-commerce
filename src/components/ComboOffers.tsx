import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingCart, Star, Check, Gift } from 'lucide-react';
import { Product } from '../types';

interface ComboOffersProps {
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export const comboProducts: Product[] = [
  {
    id: 'combo1',
    name: 'উৎসবের খুশি পাঞ্জাবি ও আতর কম্বো',
    price: 1890,
    oldPrice: 2450,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400&h=500',
    rating: 4.9,
    reviews: 142
  },
  {
    id: 'combo2',
    name: 'ঐতিহ্যবাহী জামদানী শাড়ি ও চুড়ি কম্বো',
    price: 3450,
    oldPrice: 4200,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=400&h=500',
    rating: 4.8,
    reviews: 98
  },
  {
    id: 'combo3',
    name: 'প্রিমিয়াম সুন্দরবনের মধু ও খাঁটি ঘি কম্বো',
    price: 1650,
    oldPrice: 1990,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=500',
    rating: 4.7,
    reviews: 74
  }
];

const comboDetails: Record<string, string[]> = {
  combo1: ['প্রিমিয়াম কটন পাঞ্জাবি', 'প্রাকৃতিক খাস আতর', 'উপহার বক্স'],
  combo2: ['আদি তাঁতের জামদানী শাড়ি', 'রেশমি কাঁচের চুড়ি সেট', 'ম্যাচিং ব্লাউজ পিস'],
  combo3: ['সুন্দরবনের খাঁটি মধু ৫০০ গ্রাম', 'গাওয়া খাঁটি ঘি ৫০০ গ্রাম', 'ঐতিহ্যবাহী মাটির পাত্র']
};

export function ComboOffers({ onProductClick, onAddToCart }: ComboOffersProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCartAction = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, 1);
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-8 xl:py-12 bg-gradient-to-b from-white to-gray-50/50 dark:from-[#121212] dark:to-[#161616]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold mb-3 border border-amber-100 dark:border-amber-900/30">
            <Sparkles size={13} className="animate-spin" />
            <span>ঈদ স্পেশাল উৎসব অফার</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-gray-800 dark:text-gray-100 tracking-tight flex items-center gap-2">
            <Gift className="text-brand-emerald" size={24} />
            স্পেশাল কম্বো প্যাকসমূহ
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5">একত্রে কিনুন, অতিরিক্ত সাশ্রয় করুন আকর্ষণীয় ঈদ উপহার বক্সের সাথে</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
        {isLoading ? (
          Array(3).fill(0).map((_, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm animate-pulse flex flex-col gap-4">
              <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full mt-auto" />
            </div>
          ))
        ) : (
          comboProducts.map((product) => {
            const details = comboDetails[product.id] || [];
            const isAdded = addedItems[product.id];

            return (
              <div
                key={product.id}
                onClick={() => onProductClick?.(product)}
                className="group bg-white dark:bg-[#1E1E1E] rounded-3xl border border-gray-100/80 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(15,138,95,0.06)] hover:border-brand-emerald/20 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-[#151515]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-[#D32F2F] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                      {product.discount}% ছাড়
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{product.rating}</span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-snug group-hover:text-brand-emerald transition-colors line-clamp-1 mb-2">
                    {product.name}
                  </h3>

                  {/* Combo Included Items */}
                  <div className="bg-gray-50/70 dark:bg-[#161616]/40 rounded-2xl p-3 mb-4 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold block mb-1.5">প্যাকের ভেতরে যা থাকছে:</span>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-1.5">
                          <Check size={12} className="text-brand-emerald shrink-0" strokeWidth={3} />
                          <span className="truncate">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div>
                      <div className="text-[10px] text-gray-400 font-semibold line-through">
                        ৳{product.oldPrice}
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-brand-emerald">
                        ৳{product.price}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleCartAction(e, product)}
                      className={`h-10 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-brand-emerald text-white'
                          : 'bg-brand-emerald/10 text-brand-emerald hover:bg-brand-emerald hover:text-white dark:bg-brand-emerald/20'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} strokeWidth={3} />
                          <span>যুক্ত হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={14} />
                          <span>কার্টে যোগ করুন</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
