import React from 'react';

export function PromoBanners() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-8 xl:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        
        {/* Banner 1 */}
        <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 xl:h-80 group bg-[#E8F5E9]">
          <div className="absolute inset-0 p-8 xl:p-12 flex flex-col justify-center max-w-[60%] z-10">
            <span className="text-brand-dark text-sm font-semibold mb-2">নতুন ব্যবহারকারীদের জন্য</span>
            <h3 className="text-3xl font-heading font-bold text-brand-dark mb-2">১০% ছাড়!</h3>
            <p className="text-gray-700 text-sm mb-4 font-medium">প্রথম অর্ডারে বিশেষ ছাড়</p>
            <button className="bg-brand-dark text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-emerald transition-colors w-max shadow-md">
              এখনই শপ করুন
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-4 sm:pr-8">
            <img 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Gift" 
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
            />
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 xl:h-80 group bg-[#FFF8E1]">
          <div className="absolute inset-0 p-8 xl:p-12 flex flex-col justify-center max-w-[60%] z-10">
            <span className="text-brand-gold text-sm font-semibold mb-2">ঈদের কেনাকাটায়</span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark mb-2">এক্সক্লুসিভ অফার</h3>
            <p className="text-gray-700 text-sm mb-4 font-medium">নির্বাচিত পণ্যে বিশেষ ছাড়</p>
            <button className="bg-brand-gold text-brand-dark px-5 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors w-max shadow-md">
              অফার দেখুন
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-4 sm:pr-8">
            <img 
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Lantern" 
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
