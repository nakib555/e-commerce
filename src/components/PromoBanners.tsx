import React, { useState, useEffect } from 'react';

export function PromoBanners() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-8 xl:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        
        {/* Banner 1 */}
        {isLoading ? (
          <div className="relative rounded-[1.5rem] overflow-hidden h-44 sm:h-64 xl:h-80 bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="absolute inset-0 p-4 sm:p-8 xl:p-12 flex flex-col justify-center max-w-[60%] z-10 gap-3">
              <div className="h-3 sm:h-4 shimmer rounded w-1/2"></div>
              <div className="h-6 sm:h-10 shimmer rounded w-3/4"></div>
              <div className="h-3 sm:h-4 shimmer rounded w-2/3"></div>
              <div className="h-8 sm:h-10 shimmer rounded w-24 sm:w-32 mt-2"></div>
            </div>
          </div>
        ) : (
          <div className="relative rounded-[1.5rem] overflow-hidden h-44 sm:h-64 xl:h-80 group bg-[#E8F5E9] dark:bg-emerald-950/25 border border-emerald-100/20">
            <div className="absolute inset-0 p-4 sm:p-8 xl:p-12 flex flex-col justify-center max-w-[60%] z-10">
              <span className="text-brand-emerald text-[10px] sm:text-sm font-bold mb-1 sm:mb-2 uppercase tracking-wider">নতুন ব্যবহারকারীদের জন্য</span>
              <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-brand-dark dark:text-white mb-1 sm:mb-2">১০% ছাড়!</h3>
              <p className="text-gray-700 dark:text-gray-300 text-[10px] sm:text-sm mb-3 sm:mb-4 font-semibold">প্রথম অর্ডারে বিশেষ প্রোমো ছাড়</p>
              <button className="bg-brand-dark dark:bg-brand-emerald text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-bold hover:bg-brand-emerald transition-colors w-max shadow-md">
                এখনই শপ করুন
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-3 sm:pr-8">
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=400" 
                alt="Gift" 
                className="w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
              />
            </div>
          </div>
        )}

        {/* Banner 2 */}
        {isLoading ? (
          <div className="relative rounded-[1.5rem] overflow-hidden h-44 sm:h-64 xl:h-80 bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="absolute inset-0 p-4 sm:p-8 xl:p-12 flex flex-col justify-center max-w-[60%] z-10 gap-3">
              <div className="h-3 sm:h-4 shimmer rounded w-1/2"></div>
              <div className="h-6 sm:h-10 shimmer rounded w-3/4"></div>
              <div className="h-3 sm:h-4 shimmer rounded w-2/3"></div>
              <div className="h-8 sm:h-10 shimmer rounded w-24 sm:w-32 mt-2"></div>
            </div>
          </div>
        ) : (
          <div className="relative rounded-[1.5rem] overflow-hidden h-44 sm:h-64 xl:h-80 group bg-[#FFF8E1] dark:bg-amber-950/15 border border-amber-100/20">
            <div className="absolute inset-0 p-4 sm:p-8 xl:p-12 flex flex-col justify-center max-w-[60%] z-10">
              <span className="text-amber-800 dark:text-amber-400 text-[10px] sm:text-sm font-bold mb-1 sm:mb-2 uppercase tracking-wider">ঈদের কেনাকাটায়</span>
              <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-brand-dark dark:text-amber-100 mb-1 sm:mb-2">এক্সক্লুসিভ অফার</h3>
              <p className="text-gray-700 dark:text-gray-300 text-[10px] sm:text-sm mb-3 sm:mb-4 font-semibold">নির্বাচিত পণ্যে বিশেষ ডিল ছাড়</p>
              <button className="bg-amber-800 dark:bg-amber-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-bold hover:bg-amber-700 transition-colors w-max shadow-md">
                অফার দেখুন
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-3 sm:pr-8">
              <img 
                src="https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=400&h=400" 
                alt="Lantern" 
                className="w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
