import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { DESIGN_TOKENS, TYPOGRAPHY_TOKENS } from '../theme';
import bannerImg from '../assets/images/eid_lifestyle_banner_1783858438483.jpg';

interface HeroProps {
  currentSeason?: string;
}

export function Hero({ currentSeason = 'default' }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const SLIDES = [
    {
      key: 'default',
      badge: 'নতুন কালেকশন',
      tagline: 'প্রতিদিনের প্রয়োজনীয় প্রিমিয়াম পণ্য সম্ভার',
      accentClass: 'text-brand-emerald dark:text-emerald-400',
      title: (
        <>
          প্রতিদিনের কেনাকাটায়<br/>
          <span className="text-brand-emerald dark:text-emerald-400 font-black">সেরা অফার</span>
        </>
      ),
      background: (
        <div className="w-full h-full bg-gradient-to-br from-emerald-50/60 via-slate-100/10 to-emerald-50/20 dark:from-emerald-950/10 dark:via-slate-900">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-brand-emerald/10 to-brand-gold/5 blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-brand-gold/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-gray-200/20 dark:border-gray-800/30 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full border border-gray-200/10 dark:border-gray-800/10 flex items-center justify-center">
              <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/10" />
            </div>
          </div>
        </div>
      ),
      badgeClass: 'bg-emerald-100/60 dark:bg-emerald-900/40 text-brand-emerald dark:text-emerald-300',
      buttonClass: 'bg-brand-emerald hover:bg-[#0D3F28] dark:hover:bg-[#1A8050]',
      buttonText: 'এখনই কিনুন',
    },
    {
      key: 'eid',
      badge: 'ঈদ কালেকশন ২০২৬',
      tagline: 'ঈদ হোক আনন্দময় ও স্টাইলিশ পোশাক কালেকশন',
      accentClass: 'text-amber-600 dark:text-amber-400',
      title: (
        <>
          ঈদ হোক<br/>
          <span className="text-brand-emerald dark:text-emerald-400 font-black"> can আনন্দময়</span><br/>
          <span className="text-[#9E7A3E] dark:text-amber-400 font-black">ও স্টাইলিশ</span>
        </>
      ),
      background: (
        <>
          <img 
            src={bannerImg} 
            alt="Eid Collection Banner" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center md:object-right transition-transform duration-700 scale-100 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/20 to-transparent md:bg-gradient-to-r md:from-white/45 md:via-white/20 md:to-transparent dark:from-[#121212]/45 dark:via-[#121212]/20" />
        </>
      ),
      badgeClass: 'bg-[#9E7A3E]/10 dark:bg-amber-950/40 text-[#9E7A3E] dark:text-amber-300',
      buttonClass: 'bg-brand-emerald hover:bg-[#0D3F28] dark:hover:bg-[#1A8050]',
      buttonText: 'কালেকশন দেখুন',
    },
    {
      key: 'ramadan',
      badge: 'রমজান স্পেশাল',
      tagline: 'আত্মশুদ্ধি ও সৌভ্রাতৃত্বের মহিমান্বিত স্পিরিট ও পণ্য সামগ্রী',
      accentClass: 'text-teal-600 dark:text-teal-400',
      title: (
        <>
          পবিত্র মাহে রমজান<br/>
          <span className="text-teal-600 dark:text-teal-400 font-black">সৌজন্য ও রহমত</span>
        </>
      ),
      background: (
        <div className="w-full h-full bg-gradient-to-br from-teal-900/50 via-teal-950/20 to-slate-900">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-brand-emerald/10 to-brand-gold/5 blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-brand-gold/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-gray-200/20 dark:border-gray-800/30 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full border border-gray-200/10 dark:border-gray-800/10 flex items-center justify-center">
              <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/10" />
            </div>
          </div>
        </div>
      ),
      badgeClass: 'bg-teal-100/60 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300',
      buttonClass: 'bg-teal-600 hover:bg-teal-700',
      buttonText: 'অফার দেখুন',
    },
    {
      key: 'pohela-boishakh',
      badge: '১৪৩৩ বঙ্গাব্দ স্পেশাল',
      tagline: 'নতুন সাজে নববর্ষের প্রাণোচ্ছল বৈশাখী উৎসব ও পোশাক',
      accentClass: 'text-rose-600 dark:text-rose-400',
      title: (
        <>
          এসো হে বৈশাখ<br/>
          <span className="text-rose-600 dark:text-rose-400 font-black">রঙিন নববর্ষে</span>
        </>
      ),
      background: (
        <div className="w-full h-full bg-gradient-to-br from-red-50/50 via-rose-100/10 to-amber-50/30 dark:from-rose-950/20 dark:via-red-950/10">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-brand-emerald/10 to-brand-gold/5 blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-brand-gold/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-gray-200/20 dark:border-gray-800/30 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full border border-gray-200/10 dark:border-gray-800/10 flex items-center justify-center">
              <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/10" />
            </div>
          </div>
        </div>
      ),
      badgeClass: 'bg-rose-100/60 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300',
      buttonClass: 'bg-rose-600 hover:bg-rose-700',
      buttonText: 'কালেকশন দেখুন',
    },
    {
      key: 'winter',
      badge: 'শীতের ফ্যাশন',
      tagline: 'শীতের আমেজে আধুনিক ও আরামদায়ক ট্রিম ও জ্যাকেট',
      accentClass: 'text-sky-600 dark:text-sky-400',
      title: (
        <>
          শীতের উষ্ণতা<br/>
          <span className="text-sky-600 dark:text-sky-400 font-black">নতুন ট্রেন্ডে</span>
        </>
      ),
      background: (
        <div className="w-full h-full bg-gradient-to-br from-blue-50/60 via-sky-100/20 to-indigo-50/30 dark:from-sky-950/20 dark:via-indigo-950/15">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-brand-emerald/10 to-brand-gold/5 blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-brand-gold/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-gray-200/20 dark:border-gray-800/30 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full border border-gray-200/10 dark:border-gray-800/10 flex items-center justify-center">
              <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/10" />
            </div>
          </div>
        </div>
      ),
      badgeClass: 'bg-sky-100/60 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300',
      buttonClass: 'bg-sky-600 hover:bg-sky-700',
      buttonText: 'এখনই শপ করুন',
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync with currentSeason prop
  useEffect(() => {
    const matchedIndex = SLIDES.findIndex(s => s.key === currentSeason);
    if (matchedIndex !== -1) {
      setCurrentSlideIndex(matchedIndex);
    }
  }, [currentSeason]);

  // Auto slide every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex(prevIndex => (prevIndex + 1) % SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [SLIDES.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex(prev => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="max-w-[1440px] mx-auto md:px-4 lg:px-8 xl:px-12 md:py-4 lg:py-6 xl:py-8">
      <div className="relative md:rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#1A1A1A] h-[340px] md:h-[450px] w-full shadow-sm border border-gray-100 dark:border-gray-800/40 group">
        
        {/* Horizontal Slide Track */}
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translate3d(-${currentSlideIndex * 100}%, 0, 0)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div 
              key={slide.key} 
              className="w-full h-full shrink-0 relative flex flex-col md:flex-row items-center overflow-hidden"
            >
              {/* Background Layer inside each slide */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {slide.background}
              </div>

              {/* Content Container inside each slide */}
              <div className="relative z-10 p-5 pt-8 pb-8 sm:p-8 sm:pt-16 md:p-16 xl:p-24 max-w-2xl xl:max-w-3xl mt-auto md:mt-0 w-full md:w-auto flex-1 flex flex-col justify-center">
                <span 
                  className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 shadow-sm w-max ${slide.badgeClass}`}
                >
                  {slide.badge}
                </span>
                <h1 
                  className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-[#111111] dark:text-white mb-2 sm:mb-3 md:mb-5 drop-shadow-sm line-clamp-2 md:line-clamp-none"
                >
                  {slide.title}
                </h1>
                <p 
                  className="font-sans text-xs sm:text-sm md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 sm:mb-5 md:mb-8 max-w-sm md:max-w-md font-medium line-clamp-2 md:line-clamp-none"
                >
                  {slide.tagline}
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    className={`group px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-xl text-xs sm:text-base font-bold text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${slide.buttonClass}`}
                  >
                    {slide.buttonText}
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button className="bg-white/95 backdrop-blur-sm dark:bg-[#1E1E1E] text-slate-800 dark:text-slate-200 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-xl text-xs sm:text-base font-bold hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                    সব কালেকশন দেখুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-dark shadow-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white hidden md:flex cursor-pointer z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-dark shadow-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white hidden md:flex cursor-pointer z-20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.key}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlideIndex === idx 
                  ? 'bg-brand-emerald w-6' 
                  : 'bg-slate-300/80 dark:bg-slate-650'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

