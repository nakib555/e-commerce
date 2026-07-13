import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  product: string;
}

export function CustomerReviews() {
  const reviews: Review[] = [
    {
      id: '1',
      name: 'হাসান আল মামুন',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
      rating: 5,
      comment: 'এদের পাঞ্জাবিগুলোর কটন কোয়ালিটি আসলেই দারুণ! ঈদের পাঞ্জাবিটা কিনে খুবই সন্তুষ্ট। কাপড় অনেক আরামদায়ক।',
      date: '৩ দিন আগে',
      product: 'প্রিমিয়াম কটন পাঞ্জাবি'
    },
    {
      id: '2',
      name: 'নুসরাত জাহান',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
      rating: 5,
      comment: 'জামদানী শাড়িটা হাতে পেয়েছি। কালারটা ছবিতে যেমন ছিল একদম তেমনই পেয়েছি। অনেক দ্রুত ডেলিভারি দেয়ার জন্য ধন্যবাদ।',
      date: '১ সপ্তাহ আগে',
      product: 'জামদানী শাড়ি'
    },
    {
      id: '3',
      name: 'তাহমিদ আহমেদ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
      rating: 4,
      comment: 'ঘড়িটি খুবই চমৎকার ও দেখতে প্রিমিয়াম লুক দেয়। ঈদের কেনাকাটায় খুব ভালো একটা প্রোডাক্ট পেলাম।',
      date: '২ সপ্তাহ আগে',
      product: 'লাক্সারি মেনস ওয়াচ'
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 md:py-8 xl:py-12">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <div className="w-1.5 h-6 bg-brand-emerald rounded-full"></div>
        <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          গ্রাহকদের মতামত ও রিভিউ <MessageSquareQuote className="text-brand-emerald" size={16} />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="bg-white dark:bg-[#121212] p-5 sm:p-6 rounded-[1.5rem] border border-gray-100/50 dark:border-gray-800/40 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.02)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={`${i < review.rating ? 'text-brand-gold fill-brand-gold drop-shadow-sm' : 'text-gray-200 dark:text-gray-700'}`} 
                  />
                ))}
              </div>
              <p className="text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed font-normal mb-5 italic">
                "{review.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100/50 dark:border-gray-800/50">
              <img 
                src={review.avatar} 
                alt={review.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-[#1A1A1A] shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                  {review.name}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-gray-400 mt-0.5">
                  <span className="truncate max-w-[120px] text-brand-emerald font-semibold">{review.product}</span>
                  <span className="shrink-0">{review.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
