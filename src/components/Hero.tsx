import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { SEASONAL_THEMES, DESIGN_TOKENS, TYPOGRAPHY_TOKENS } from '../theme';
import bannerImg from '../assets/images/eid_lifestyle_banner_1783858438483.jpg';

interface HeroProps {
  currentSeason?: string;
}

export function Hero({ currentSeason = 'default' }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const season = SEASONAL_THEMES.find(s => s.key === currentSeason) || SEASONAL_THEMES[0];

  return (
    <section className="max-w-[1440px] mx-auto md:px-4 lg:px-8 xl:px-12 md:py-4 lg:py-6 xl:py-8">
      <div className="relative md:rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#1A1A1A] min-h-[340px] sm:min-h-[400px] lg:h-[450px] lg:min-h-[450px] flex flex-col md:flex-row items-center group w-full shadow-sm border border-gray-100 dark:border-gray-800/40">
        
        {/* Background Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {currentSeason === 'eid' ? (
            // Show custom image banner for Eid
            <>
              <img 
                src={bannerImg} 
                alt="Eid Collection Banner" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center md:object-right transition-transform duration-700 scale-100 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/20 to-transparent md:bg-gradient-to-r md:from-white/45 md:via-white/20 md:to-transparent dark:from-[#121212]/45 dark:via-[#121212]/20" />
            </>
          ) : (
            // Show high-end dynamic graphics for other seasons using design tokens
            <div className={`w-full h-full bg-gradient-to-br ${
              currentSeason === 'ramadan' 
                ? 'from-teal-900/50 via-teal-950/20 to-slate-900' 
                : currentSeason === 'pohela-boishakh'
                ? 'from-red-50/50 via-rose-100/10 to-amber-50/30 dark:from-rose-950/20 dark:via-red-950/10'
                : currentSeason === 'winter'
                ? 'from-blue-50/60 via-sky-100/20 to-indigo-50/30 dark:from-sky-950/20 dark:via-indigo-950/15'
                : 'from-emerald-50/60 via-slate-100/10 to-emerald-50/20 dark:from-emerald-950/10 dark:via-slate-900'
            }`}>
              {/* Premium Geometric Art Overlays */}
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-brand-emerald/10 to-brand-gold/5 blur-xl pointer-events-none" />
              <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-brand-gold/10 to-transparent blur-2xl pointer-events-none" />
              
              {/* Abstract luxury circles */}
              <div className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-gray-200/20 dark:border-gray-800/30 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full border border-gray-200/10 dark:border-gray-800/10 flex items-center justify-center">
                  <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/10" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 p-4 pt-6 pb-6 sm:p-6 sm:pt-24 sm:pb-8 md:p-16 xl:p-24 max-w-2xl xl:max-w-3xl mt-auto md:mt-0 w-full md:w-auto flex-1 flex flex-col justify-center">
          <span 
            className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm w-max animate-fade-in ${
              currentSeason === 'ramadan' 
                ? 'bg-teal-100/60 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300' 
                : currentSeason === 'pohela-boishakh'
                ? 'bg-rose-100/60 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300'
                : currentSeason === 'winter'
                ? 'bg-sky-100/60 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300'
                : 'bg-emerald-100/60 dark:bg-emerald-900/40 text-brand-emerald dark:text-emerald-300'
            }`}
          >
            {season.badge}
          </span>
          <h1 
            className={`${TYPOGRAPHY_TOKENS.heroTitle} text-[#111111] dark:text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-sm`}
          >
            {currentSeason === 'default' ? (
              <>
                প্রতিদিনের কেনাকাটায়<br/>
                <span className={season.accentClass}>সেরা অফার</span>
              </>
            ) : currentSeason === 'eid' ? (
              <>
                ঈদ হোক<br/>
                <span className="text-brand-emerald dark:text-emerald-400 font-black">আনন্দময়</span><br/>
                <span className="text-[#9E7A3E] dark:text-amber-400 font-black">ও স্টাইলিশ</span>
              </>
            ) : currentSeason === 'ramadan' ? (
              <>
                পবিত্র মাহে রমজান<br/>
                <span className={season.accentClass}>সৌজন্য ও রহমত</span>
              </>
            ) : currentSeason === 'pohela-boishakh' ? (
              <>
                এসো হে বৈশাখ<br/>
                <span className={season.accentClass}>রঙিন নববর্ষে</span>
              </>
            ) : (
              <>
                শীতের উষ্ণতা<br/>
                <span className={season.accentClass}>নতুন ট্রেন্ডে</span>
              </>
            )}
          </h1>
          <p 
            className={`${TYPOGRAPHY_TOKENS.body} text-gray-700 dark:text-gray-300 sm:text-base md:text-lg xl:text-xl mb-6 sm:mb-8 md:mb-10 max-w-sm`}
          >
            {season.tagline}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button 
              className={`group px-8 py-3.5 sm:px-10 sm:py-4.5 rounded-xl text-sm sm:text-lg font-bold text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                currentSeason === 'ramadan'
                  ? 'bg-teal-600 hover:bg-teal-700'
                  : currentSeason === 'pohela-boishakh'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : currentSeason === 'winter'
                  ? 'bg-sky-600 hover:bg-sky-700'
                  : 'bg-brand-emerald hover:bg-[#0D3F28] dark:hover:bg-[#1A8050]'
              }`}
            >
              এখনই কিনুন
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="bg-white/95 backdrop-blur-sm dark:bg-[#1E1E1E] text-slate-800 dark:text-slate-200 px-8 py-3.5 sm:px-10 sm:py-4.5 rounded-xl text-sm sm:text-lg font-bold hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
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
          <div className={`w-2 h-2 rounded-full ${
            currentSeason === 'ramadan' 
              ? 'bg-teal-600' 
              : currentSeason === 'pohela-boishakh' 
              ? 'bg-rose-600' 
              : currentSeason === 'winter' 
              ? 'bg-sky-600' 
              : 'bg-brand-emerald'
          }`} />
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
    </section>
  );
}
