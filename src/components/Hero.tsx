import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import bannerImg from '../assets/images/eid_lifestyle_banner_1783858438483.jpg';

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto md:px-4 lg:px-8 xl:px-12 md:py-4 lg:py-6 xl:py-8">
      <div className="relative md:rounded-2xl overflow-hidden bg-[#F0EBE3] min-h-[340px] sm:min-h-[400px] lg:h-[450px] lg:min-h-[450px] flex flex-col md:flex-row items-center group w-full shadow-sm">
        {/* Background Image Setup */}
        <div className="absolute inset-0 w-full h-full">
           <img 
            src={bannerImg} 
            alt="Eid Collection Banner" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center md:object-right"
          />
          {/* Subtle gradient overlay for text readability (20-30% opacity) */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent md:bg-gradient-to-r md:from-white/35 md:via-white/15 md:to-transparent dark:from-[#121212]/35 dark:via-[#121212]/15 dark:to-transparent dark:md:from-[#121212]/40 dark:md:via-[#121212]/20"></div>
        </div>

        <div className="relative z-10 p-4 pt-6 pb-6 sm:p-6 sm:pt-24 sm:pb-8 md:p-16 xl:p-24 max-w-2xl xl:max-w-3xl mt-auto md:mt-0 w-full md:w-auto flex-1 flex flex-col justify-center">
          <span 
            className="inline-block px-3 py-1 bg-[#E8F5E9] dark:bg-[#0A2E1F] text-[#125838] dark:text-emerald-300 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm w-max animate-fade-in"
          >
            নতুন ঈদ কালেকশন
          </span>
          <h1 
            className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl font-heading font-extrabold text-[#111111] dark:text-white leading-[1.15] mb-3 sm:mb-4 md:mb-6 tracking-tight drop-shadow-sm"
          >
            ঈদ হোক<br/>
            <span className="text-[#125838] dark:text-emerald-400 font-black">আনন্দময়</span><br/>
            <span className="text-[#9E7A3E] dark:text-amber-400 font-black">ও স্টাইলিশ</span>
          </h1>
          <p 
            className="text-gray-700 dark:text-gray-300 text-xs sm:text-base md:text-lg xl:text-xl mb-6 sm:mb-8 md:mb-10 max-w-[200px] sm:max-w-sm md:max-w-md xl:max-w-lg font-medium leading-relaxed"
          >
            প্রিমিয়াম কোয়ালিটির পাঞ্জাবি,<br/> শাড়ি ও আরও অনেক কিছু
          </p>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button 
              className="group bg-[#125838] dark:bg-brand-emerald text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-xs sm:text-lg font-bold hover:bg-[#0D3F28] dark:hover:bg-[#1A8050] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 animate-fade-in"
            >
              এখনই কিনুন
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="bg-white/95 backdrop-blur-sm dark:bg-[#1E1E1E] text-[#125838] dark:text-emerald-400 px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-xs sm:text-lg font-bold hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hidden sm:flex items-center justify-center gap-2">
              সব কালেকশন দেখুন
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-dark shadow-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white hidden md:flex">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-dark shadow-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white hidden md:flex">
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#125838]"></div>
          <div className="w-2 h-2 rounded-full bg-[#125838]/20 md:bg-white/60"></div>
          <div className="w-2 h-2 rounded-full bg-[#125838]/20 md:bg-white/60"></div>
          <div className="w-2 h-2 rounded-full bg-[#125838]/20 md:bg-white/60"></div>
        </div>
      </div>
    </section>
  );
}
