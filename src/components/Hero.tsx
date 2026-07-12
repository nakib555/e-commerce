import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export function Hero() {
  return (
    <section className="max-w-[1440px] mx-auto md:px-4 lg:px-8 xl:px-12 md:py-4 lg:py-6 xl:py-8">
      <div className="relative md:rounded-2xl overflow-hidden bg-[#F0EBE3] min-h-[340px] sm:min-h-[400px] lg:h-[450px] lg:min-h-[450px] flex flex-col md:flex-row items-center group w-full">
        {/* Background Image Setup */}
        <div className="absolute inset-0 w-full h-full">
           <img 
            src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=1600&h=600" 
            alt="Eid Collection Banner" 
            className="w-full h-full object-cover object-center md:object-right opacity-90"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent dark:from-[#121212]/95 dark:via-[#121212]/80 dark:md:from-[#121212]/95 dark:md:via-[#121212]/70"></div>
        </div>

        <div className="relative z-10 p-4 pt-6 pb-6 sm:p-6 sm:pt-24 sm:pb-8 md:p-16 xl:p-24 max-w-2xl xl:max-w-3xl mt-auto md:mt-0 w-full md:w-auto flex-1 flex flex-col justify-center">
          <span 
            className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-[#E8F5E9] dark:bg-[#0A2E1F] text-brand-emerald rounded-md text-[9px] sm:text-xs md:text-sm font-semibold mb-3 sm:mb-3 md:mb-4 xl:mb-6 shadow-sm w-max"
            style={{ fontSize: '11px', fontFamily: 'Verdana', height: '24.5px', width: '130.188px', marginBottom: '12px', paddingBottom: '0px' }}
          >
            ঈদ কালেকশন ২০২৩
          </span>
          <h1 
            className="text-2xl sm:text-3xl md:text-6xl xl:text-7xl font-heading font-bold text-brand-dark dark:text-emerald-400 leading-[1.1] mb-2 sm:mb-3 md:mb-4 xl:mb-6 tracking-tight"
            style={{ fontSize: '23px', fontFamily: 'Times New Roman' }}
          >
            ঈদ হোক<br/>
            <span className="text-[#888888] dark:text-gray-300">আনন্দময়</span><br/>
            <span className="text-[#888888] dark:text-gray-300">ও স্টাইলিশ</span>
          </h1>
          <p 
            className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-sm md:text-lg xl:text-xl mb-4 sm:mb-6 md:mb-8 xl:mb-10 max-w-[180px] sm:max-w-xs md:max-w-md xl:max-w-lg font-medium leading-snug"
            style={{ fontSize: '12px' }}
          >
            প্রিমিয়াম কোয়ালিটির পাঞ্জাবি,<br/> শাড়ি ও আরও অনেক কিছু
          </p>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <button 
              className="bg-[#125838] dark:bg-brand-emerald text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3.5 rounded text-[10px] sm:text-sm md:text-base font-medium hover:bg-brand-dark dark:hover:bg-[#125838] transition-colors"
              style={{ fontSize: '15px', lineHeight: '15px', height: '33px', width: '119.9375px', borderRadius: '8px' }}
            >
              এখনই কিনুন
            </button>
            <button className="bg-white dark:bg-[#1E1E1E] text-brand-dark dark:text-emerald-400 px-3 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3.5 rounded text-[10px] sm:text-sm md:text-base font-medium hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors shadow-md border border-gray-200 dark:border-gray-700 hidden sm:block">
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
