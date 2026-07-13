import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Sparkles, Zap, ShoppingCart, LayoutGrid, User, Share2, PlusSquare, ArrowRight, Smartphone, Laptop } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'shortcuts'>('install');

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => console.log('PWA Service Worker registered successfully:', reg.scope))
          .catch((err) => console.error('PWA Service Worker registration failed:', err));
      });
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Detect if already installed (standalone mode)
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    setIsStandalone(isStandaloneMode);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show if not dismissed in the last 3 days
      const lastDismissed = localStorage.getItem('dm_pwa_dismissed');
      const now = Date.now();
      const threeDays = 3 * 24 * 60 * 60 * 1000;
      
      if (!lastDismissed || (now - parseInt(lastDismissed)) > threeDays) {
        if (!isStandaloneMode) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Support trigger event from other components (e.g., More page)
    const handleForceShow = () => {
      setIsVisible(true);
    };

    window.addEventListener('show-pwa-install', handleForceShow);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('show-pwa-install', handleForceShow);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the native browser installation prompt
    await deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User installation outcome: ${outcome}`);

    // Clear the deferred prompt variable
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Persist dismiss for 3 days to avoid user fatigue
    localStorage.setItem('dm_pwa_dismissed', Date.now().toString());
  };

  // If already standalone and we're not forced to show, return null
  if (isStandalone && !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay for Mobile only to ensure high focus */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 md:hidden"
            onClick={handleDismiss}
          />

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 md:bottom-6 right-0 md:right-6 left-0 md:left-auto w-full md:w-[420px] max-w-full bg-white dark:bg-[#1A1A1A] md:rounded-2xl shadow-2xl border-t md:border border-slate-100 dark:border-gray-800/80 z-[100] overflow-hidden rounded-t-3xl pb-safe"
            id="pwa-install-dialog"
          >
            {/* Header / Accent Bar */}
            <div className="bg-gradient-to-r from-brand-emerald to-emerald-600 px-5 py-4 text-white relative flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-white/15 p-1.5 rounded-lg">
                  <Sparkles size={18} className="text-brand-gold animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-[15px] tracking-tight">দেশিমার্ট অ্যাপ ডাউনলোড করুন</h3>
                  <p className="text-[10px] text-white/80 font-medium">সহজ ও দ্রুত কেনাকাটার অনন্য অভিজ্ঞতা</p>
                </div>
              </div>
              <button 
                onClick={handleDismiss}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Toggle Tabs */}
            <div className="flex border-b border-slate-150 dark:border-gray-800/80 text-xs font-semibold">
              <button 
                onClick={() => setActiveTab('install')}
                className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'install' 
                    ? 'border-brand-emerald text-brand-emerald dark:text-brand-emerald bg-brand-emerald/5' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-900/30'
                }`}
              >
                <Smartphone size={14} /> ইনস্টলেশন গাইড
              </button>
              <button 
                onClick={() => setActiveTab('shortcuts')}
                className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'shortcuts' 
                    ? 'border-brand-emerald text-brand-emerald dark:text-brand-emerald bg-brand-emerald/5' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-900/30'
                }`}
              >
                <Zap size={14} className="text-brand-gold fill-brand-gold/20" /> হোম স্ক্রিন শর্টকাট
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 max-h-[350px] md:max-h-[400px] overflow-y-auto scrollbar-thin">
              {activeTab === 'install' ? (
                <div className="space-y-4">
                  {/* App Brand Row */}
                  <div className="flex gap-4 items-center bg-slate-50 dark:bg-[#222] p-3 rounded-xl border border-slate-100 dark:border-gray-800/40">
                    <img 
                      src="/favicon.svg" 
                      alt="DeshiMart Logo" 
                      className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-gray-100 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-white">DeshiMart Web App</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">সাইজ: ~১.৫ মেগাবাইট • নোটিফিকেশন যুক্ত</p>
                      <div className="flex gap-1.5 mt-1">
                        <span className="text-[9px] bg-brand-emerald/10 text-brand-emerald font-bold px-1.5 py-0.5 rounded">দ্রুত লোডিং</span>
                        <span className="text-[9px] bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-bold px-1.5 py-0.5 rounded">ডাটা সাশ্রয়ী</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic OS Guide */}
                  {isIOS ? (
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                        আপনার আইফোনে দেশিমার্ট সহজে যুক্ত করতে Safari ব্রাউজারের নিচের দেওয়া পদ্ধতি অনুসরণ করুন:
                      </p>
                      <div className="space-y-2.5 text-[11px] text-gray-500 dark:text-gray-400 font-medium bg-amber-50/50 dark:bg-amber-950/10 p-3.5 rounded-xl border border-amber-100/60 dark:border-amber-950/20">
                        <div className="flex items-start gap-2.5">
                          <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">১</span>
                          <p className="leading-normal flex items-center gap-1.5 flex-wrap">
                            Safari ব্রাউজারের নিচে থাকা <span className="inline-flex items-center gap-1 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-semibold"><Share2 size={11} className="text-sky-500" /> Share</span> বাটনে ক্লিক করুন।
                          </p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">২</span>
                          <p className="leading-normal flex items-center gap-1.5 flex-wrap">
                            নিচের মেনু স্ক্রোল করে <span className="inline-flex items-center gap-1 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-semibold"><PlusSquare size={11} /> Add to Home Screen</span> অপশনটি বেছে নিন।
                          </p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">৩</span>
                          <p className="leading-normal">
                            ডানদিকের কোণায় থাকা <span className="font-bold text-brand-emerald">Add / যোগ করুন</span> বাটনে ক্লিক করলেই হোম স্ক্রিনে যুক্ত হয়ে যাবে।
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : deferredPrompt ? (
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                        মোবাইলে সরাসরি দেশিমার্ট ইনস্টল করে নিন। কোনো প্লে-স্টোর ছাড়াই আপনার ফোনে একটি নিখুঁত অ্যাপের মতো চলবে।
                      </p>
                      
                      <button
                        onClick={handleInstallClick}
                        className="w-full bg-brand-emerald hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-emerald/20 transition-all hover:scale-[1.01]"
                      >
                        <Download size={16} /> এখনই ইনস্টল করুন (Install Now)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                        আপনার ডিভাইস বা ব্রাউজারটিতে সরাসরি ইনস্টলেশন সাপোর্ট নেই অথবা আপনি ইতিমধ্যে ইনস্টল করে ফেলেছেন।
                      </p>
                      <div className="p-3 bg-slate-50 dark:bg-[#222] rounded-xl border border-slate-100 dark:border-gray-800/40 text-[11px] text-gray-500 dark:text-gray-400">
                        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">💡 পিসিতে বা ক্রোম ব্রাউজারে ইনস্টল করতে:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>ব্রাউজারের অ্যাড্রেস বারের ডান কোণে থাকা ইনস্টল আইকনটিতে ক্লিক করুন</li>
                          <li>অথবা ব্রাউজার মেনুর ৩-ডট থেকে "Install DeshiMart" সিলেক্ট করুন।</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Features Bullet Grid */}
                  <div className="pt-2 border-t border-slate-100 dark:border-gray-800/60">
                    <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">অ্যাপরূপী অনন্য সুবিধা</h5>
                    <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="text-brand-emerald font-bold">✓</span> নোটিফিকেশন সাপোর্ট
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-brand-emerald font-bold">✓</span> অফলাইন ব্রাউজিং
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-brand-emerald font-bold">✓</span> ইনস্ট্যান্ট অ্যাক্সেস
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-brand-emerald font-bold">✓</span> মসৃণ এনিমেশন
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                    অ্যাপটি ইনস্টল করার পর আপনার ফোনের হোম স্ক্রিনে থাকা <b>দেশিমার্ট আইকনে ২ সেকেন্ড চাপ দিয়ে ধরে রাখুন (Long Press)</b>। নিচের দুর্দান্ত শর্টকাটগুলো সরাসরি পাবেন:
                  </p>

                  {/* Shortcuts List */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#222] p-2.5 rounded-xl border border-slate-100 dark:border-gray-800/40">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                        <Zap size={16} className="fill-amber-500/15" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5 justify-between">
                          <span>ফ্ল্যাশ সেল (Flash Sale)</span>
                          <span className="text-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-1 rounded">মৌসুমী ডিল</span>
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">১ ক্লিকে লিমিটেড স্টক অফার ও মূল্যছাড় উপভোগ করুন।</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#222] p-2.5 rounded-xl border border-slate-100 dark:border-gray-800/40">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-brand-emerald flex items-center justify-center shrink-0">
                        <ShoppingCart size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5 justify-between">
                          <span>আমার ব্যাগ (Cart)</span>
                          <span className="text-[8px] bg-emerald-500/10 text-brand-emerald font-bold px-1 rounded">ব্যাগ</span>
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">সরাসরি আপনার সিলেক্ট করা পণ্য এবং কার্ট ড্রয়ার দেখুন।</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#222] p-2.5 rounded-xl border border-slate-100 dark:border-gray-800/40">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        <LayoutGrid size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5 justify-between">
                          <span>সব ক্যাটাগরি (Categories)</span>
                          <span className="text-[8px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold px-1 rounded">বিভাগ</span>
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">সব ক্যাটাগরি ও অর্গানিক পণ্যের তালিকা সহজে এক্সপ্লোর করুন।</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#222] p-2.5 rounded-xl border border-slate-100 dark:border-gray-800/40">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                        <User size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5 justify-between">
                          <span>আমার প্রোফাইল (Profile)</span>
                          <span className="text-[8px] bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold px-1 rounded">অ্যাকাউন্ট</span>
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">অর্ডার ট্র্যাক এবং অ্যাকাউন্ট প্রোফাইল সেটিংস দেখুন তাৎক্ষণিক।</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center font-medium mt-2">
                    💡 শর্টকাটগুলো অ্যান্ড্রয়েড ৮+ এবং আইওএস ১৭+ ডিভাইসে দারুণভাবে কার্যকর।
                  </p>
                </div>
              )}
            </div>

            {/* Bottom action panel / banner spacer */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-[#1E1E1E] border-t border-slate-100 dark:border-gray-800/80 flex justify-between items-center text-[11px] font-semibold text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Laptop size={12} /> মোবাইল ও ডেস্কটপ সমর্থিত
              </span>
              <button 
                onClick={handleDismiss}
                className="text-brand-emerald hover:underline text-xs"
              >
                পরে মনে করাবেন
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
