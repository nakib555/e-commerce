import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Hero } from './Hero';
import { CategoryList } from './CategoryList';
import { FlashSale } from './FlashSale';
import { BestSellers } from './BestSellers';
import { NewArrivals } from './NewArrivals';
import { Brands } from './Brands';
import { CustomerReviews } from './CustomerReviews';
import { Features } from './Features';
import { TrustAndFaq } from './TrustAndFaq';
import { Newsletter } from './Newsletter';
import { Footer } from './Footer';
import { groceryCategories, groceryProducts, groceryBrands } from '../data';

const ProductSkeleton = () => (
  <div className="border border-slate-100 dark:border-gray-800/60 rounded-[1.25rem] overflow-hidden relative p-2.5 bg-white dark:bg-[#1A1A1A] shadow-sm">
    <div className="w-full h-24 shimmer rounded-xl mb-3"></div>
    <div className="h-3 shimmer rounded w-3/4 mb-2"></div>
    <div className="h-4 shimmer rounded w-1/2 mb-3"></div>
    <div className="flex justify-between items-center mt-auto">
      <div className="h-3 shimmer rounded w-1/3"></div>
      <div className="w-7 h-7 shimmer rounded-full"></div>
    </div>
  </div>
);

const GrocerySkeleton = () => (
  <div className="min-w-[140px] border border-slate-100 dark:border-gray-800/60 rounded-[1.5rem] bg-white dark:bg-[#1A1A1A] p-2.5 relative flex flex-col shadow-sm">
    <div className="h-28 w-full shimmer rounded-[1.25rem] mb-3"></div>
    <div className="h-3 shimmer rounded w-3/4 mb-1.5"></div>
    <div className="h-2 shimmer rounded w-1/3 mb-3"></div>
    <div className="mt-auto flex items-end justify-between">
      <div className="h-4 shimmer rounded w-1/2"></div>
      <div className="w-7 h-7 shimmer rounded-xl"></div>
    </div>
  </div>
);

const ListItemSkeleton = () => (
  <div className="flex items-center justify-between p-2 -mx-2 rounded-[1.25rem] bg-white dark:bg-[#1A1A1A] mb-2 border border-slate-50 dark:border-gray-800/40 shadow-sm">
    <div className="flex items-center gap-4 w-full">
      <div className="w-[85px] h-[85px] shimmer rounded-xl flex-shrink-0"></div>
      <div className="flex flex-col w-full">
        <div className="h-3.5 shimmer rounded w-2/3 mb-2"></div>
        <div className="h-4 shimmer rounded w-1/3 mb-2"></div>
        <div className="h-3 shimmer rounded w-1/4"></div>
      </div>
    </div>
    <div className="w-11 h-11 rounded-full shimmer flex-shrink-0 ml-2"></div>
  </div>
);

interface MobileLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onCartClick: () => void;
  children?: React.ReactNode;
  currentSeason?: string;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function MobileLayout({
  activeTab,
  onTabChange,
  cartCount,
  onCartClick,
  children,
  currentSeason = 'default',
  onProductClick,
  onAddToCart
}: MobileLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoriesSubmenuOpen, setIsCategoriesSubmenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'fashion' | 'grocery'>('fashion');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [groceryActiveSlide, setGroceryActiveSlide] = useState(0);

  const GROCERY_SLIDES = [
    {
      badge: "New Collection",
      title: "Premium Quality Everyday Essentials",
      tagline: "Discover the best products for you and your family",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bgClass: "bg-amber-50/60 border-amber-100/30 text-slate-900",
      badgeTextClass: "text-primary",
      btnClass: "bg-primary hover:bg-brand-dark",
      badgeIconClass: "ph-fill ph-leaf text-brand-emerald animate-pulse",
    },
    {
      badge: "Farm Fresh",
      title: "Fresh Organic Fruits & Veggies",
      tagline: "Direct from farms to your dining table within 24 hours",
      image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bgClass: "bg-emerald-50/60 border-emerald-100/30 text-emerald-950",
      badgeTextClass: "text-emerald-700",
      btnClass: "bg-emerald-600 hover:bg-emerald-700",
      badgeIconClass: "ph-fill ph-carrot text-emerald-600 animate-bounce",
    },
    {
      badge: "Pure Quality",
      title: "Pure & Premium Grocery Items",
      tagline: "Assured quality and 100% authenticity on daily needs",
      image: "https://images.unsplash.com/photo-1543083503-0c40dac3eb30?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bgClass: "bg-cyan-50/60 border-cyan-100/30 text-cyan-950",
      badgeTextClass: "text-cyan-700",
      btnClass: "bg-cyan-600 hover:bg-cyan-700",
      badgeIconClass: "ph-fill ph-shield-check text-cyan-600 animate-pulse",
    },
    {
      badge: "Mega Discount",
      title: "Super Saving Family Combos",
      tagline: "Huge discounts and special family grocery bundles",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      bgClass: "bg-rose-50/60 border-rose-100/30 text-rose-950",
      badgeTextClass: "text-rose-700",
      btnClass: "bg-rose-600 hover:bg-rose-700",
      badgeIconClass: "ph-fill ph-gift text-rose-600 animate-bounce",
    }
  ];

  // Auto-slide grocery banner every 2s
  useEffect(() => {
    const timer = setInterval(() => {
      setGroceryActiveSlide(prev => (prev + 1) % GROCERY_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [GROCERY_SLIDES.length]);
  
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Delivery Location state management
  const [deliveryLocation, setDeliveryLocation] = useState<string>(() => {
    try {
      return localStorage.getItem('deliveryLocation') || 'ঢাকা, বাংলাদেশ';
    } catch (e) {
      return 'ঢাকা, বাংলাদেশ';
    }
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [manualLocationInput, setManualLocationInput] = useState('');
  const [locationError, setLocationError] = useState<string | null>(null);

  const popularCities = [
    { name: 'ঢাকা', en: 'Dhaka' },
    { name: 'চট্টগ্রাম', en: 'Chittagong' },
    { name: 'সিলেট', en: 'Sylhet' },
    { name: 'রাজশাহী', en: 'Rajshahi' },
    { name: 'খুলনা', en: 'Khulna' },
    { name: 'বরিশাল', en: 'Barishal' },
    { name: 'রংপুর', en: 'Rangpur' },
    { name: 'ময়মনসিংহ', en: 'Mymensingh' }
  ];

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('আপনার ব্রাউজারটি জিপিএস লোকেশন সমর্থন করে না।');
      return;
    }

    setIsDetectingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Real reverse geocoding with Nominatim API (OpenStreetMap)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`
          );
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          if (data && data.address) {
            const address = data.address;
            const road = address.road || '';
            const villageOrSuburb = address.village || address.suburb || address.neighbourhood || address.residential || '';
            const city = address.city || address.town || address.state_district || address.state || '';
            
            let formattedAddress = '';
            if (road) {
              formattedAddress += road + ', ';
            }
            if (villageOrSuburb) {
              formattedAddress += villageOrSuburb + ', ';
            }
            if (city) {
              formattedAddress += city;
            }

            // Fallback to display_name slice if we got an empty string
            if (!formattedAddress.trim()) {
              formattedAddress = data.display_name.split(',').slice(0, 3).join(',').trim();
            }

            // Remove trailing commas
            formattedAddress = formattedAddress.replace(/,\s*$/, "");

            if (formattedAddress) {
              setDeliveryLocation(formattedAddress);
              localStorage.setItem('deliveryLocation', formattedAddress);
              setIsLocationModalOpen(false);
            } else {
              const fallbackStr = `জিপিএস পজিশন (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
              setDeliveryLocation(fallbackStr);
              localStorage.setItem('deliveryLocation', fallbackStr);
              setIsLocationModalOpen(false);
            }
          } else {
            const fallbackStr = `জিপিএস পজিশন (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
            setDeliveryLocation(fallbackStr);
            localStorage.setItem('deliveryLocation', fallbackStr);
            setIsLocationModalOpen(false);
          }
        } catch (err) {
          console.error(err);
          // Fallback if API fails or blocks
          const fallbackStr = `ঢাকা (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
          setDeliveryLocation(fallbackStr);
          localStorage.setItem('deliveryLocation', fallbackStr);
          setIsLocationModalOpen(false);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('লোকেশনের অনুমতি দেওয়া হয়নি। অনুগ্রহ করে ব্রাউজারে অনুমতি দিন।');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('লোকেশন তথ্য পাওয়া যায়নি।');
            break;
          case error.TIMEOUT:
            setLocationError('লোকেশন রিকোয়েস্টের সময় শেষ হয়ে গেছে।');
            break;
          default:
            setLocationError('লোকেশন নির্ধারণে সমস্যা হয়েছে।');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocationInput.trim()) {
      setDeliveryLocation(manualLocationInput.trim());
      localStorage.setItem('deliveryLocation', manualLocationInput.trim());
      setIsLocationModalOpen(false);
      setManualLocationInput('');
    }
  };

  const selectPopularCity = (cityName: string) => {
    setDeliveryLocation(cityName);
    localStorage.setItem('deliveryLocation', cityName);
    setIsLocationModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const switchCategoryView = (category: 'fashion' | 'grocery') => {
    setActiveView(category);
    onTabChange('home');
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-slate-800 antialiased bg-[#f1f5f9] md:hidden font-bengali">
      {/* OVERLAY FOR SIDEBAR */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 z-[60] transition-opacity duration-300 cursor-pointer backdrop-blur-sm ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'}`}
        onClick={closeSidebar}
      />

      {/* MAIN SIDEBAR (DRAWER) */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col font-sans rounded-r-2xl overflow-hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Top Deep Green Profile Section */}
        <div className="bg-primary pt-12 pb-[72px] px-6 relative shrink-0 rounded-b-[28px] shadow-md">
          {/* Close Button */}
          <button onClick={closeSidebar} className="absolute top-5 right-5 text-white/90 hover:text-white transition p-1.5 rounded-full hover:bg-white/10 flex items-center justify-center">
            <i className="ph ph-x text-[22px] font-semibold"></i>
          </button>
          
          {/* Profile Info */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-white/10 border border-white/20 p-[2px] shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border border-white/30 shadow-inner" 
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-[18px] leading-tight tracking-wide">Tahmina Islam</h3>
              <p className="text-emerald-100/90 text-[11px] mt-0.5 tracking-wide font-medium">tahmina.islam@email.com</p>
            </div>
          </div>

          {/* Overlapping Store Selector Card */}
          <div className="absolute -bottom-8 left-5 right-5 bg-white rounded-[1.5rem] p-3 flex items-center justify-between shadow-[0_12px_28px_rgba(0,0,0,0.06)] z-10 cursor-pointer border border-slate-100/70 group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[1.25rem] bg-[#E6F7F0] border border-[#CCEFE0] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition duration-300">
                <i className="ph ph-shopping-bag-open text-[22px]"></i>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-[13px] font-bold text-slate-800 leading-tight">Rahmaniya Mart</h4>
                <span className="text-[9px] font-bold text-primary bg-[#E6F7F0] border border-[#CCEFE0] px-1.5 py-0.5 rounded flex items-center gap-1 w-fit tracking-wide mt-0.5">
                  <i className="ph-fill ph-crown text-amber-500 text-[10px]"></i> Premium Member
                </span>
              </div>
            </div>
            <i className="ph ph-caret-right text-slate-400 group-hover:translate-x-1 transition-transform mr-1 text-base"></i>
          </div>
        </div>

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white pt-12 pb-8 px-4 relative z-0">
          
          {/* Become Premium Promo Banner */}
          <div className="bg-slate-50 rounded-[18px] p-5 flex items-center justify-between mb-5 border border-slate-100/80 shadow-[0_4px_18px_rgba(0,0,0,0.02)]">
            <div className="w-[65%]">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Become Premium</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-3.5">Free delivery, extra discounts and more benefits</p>
              <button className="bg-primary hover:bg-brand-dark transition-all duration-300 text-white text-[11px] font-bold px-4 py-2.5 rounded-[1.25rem] flex items-center gap-2 w-fit shadow-md shadow-emerald-500/10">
                Upgrade Now <i className="ph ph-arrow-right text-sm"></i>
              </button>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/4213/4213958.png" className="w-18 h-18 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" alt="Gift" />
          </div>

          {/* Menu List */}
          <nav className="flex flex-col gap-1 mt-2">
            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-house text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Home</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            {/* All Categories */}
            <div className="flex flex-col">
              <button 
                onClick={() => setIsCategoriesSubmenuOpen(!isCategoriesSubmenuOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <i className="ph ph-squares-four text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                  <span className="text-[13px] font-semibold">All Categories</span>
                </div>
                <i className={`ph ph-caret-right text-sm transition-transform duration-300 ${isCategoriesSubmenuOpen ? 'rotate-90 text-primary' : 'text-slate-400 group-hover:text-primary'}`}></i>
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ml-[23px] ${isCategoriesSubmenuOpen ? 'grid-rows-[1fr] opacity-100 mt-1 py-1' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 flex flex-col pl-6 pr-1 gap-0.5 border-l-2 border-slate-100 overflow-hidden">
                  <button 
                    onClick={() => switchCategoryView('fashion')}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-[1.25rem] transition-colors ${activeView === 'fashion' ? 'bg-activeGreenBg text-primary -ml-3' : 'hover:bg-slate-50 text-slate-700 hover:text-primary'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <i className={`ph ph-coat-hanger text-base ${activeView === 'fashion' ? 'text-primary animate-pulse' : ''}`}></i>
                      <span className={`text-[12px] font-bold ${activeView === 'fashion' ? '' : 'font-semibold'}`}>Fashion & Apparel</span>
                    </div>
                    {activeView === 'fashion' ? <i className="ph ph-caret-right text-[10px] text-primary"></i> : <i className="ph ph-caret-right text-[10px] text-slate-400"></i>}
                  </button>

                  <button 
                    onClick={() => switchCategoryView('grocery')}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-[1.25rem] transition-colors ${activeView === 'grocery' ? 'bg-activeGreenBg text-primary -ml-3' : 'hover:bg-slate-50 text-slate-700 hover:text-primary'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <i className={`ph ph-carrot text-base ${activeView === 'grocery' ? 'text-primary animate-pulse' : 'text-emerald-500'}`}></i>
                      <span className={`text-[12px] font-bold ${activeView === 'grocery' ? '' : 'font-semibold'}`}>Grocery & Food</span>
                    </div>
                    {activeView === 'grocery' ? <i className="ph ph-caret-right text-[10px] text-primary"></i> : <i className="ph ph-caret-right text-[10px] text-slate-400"></i>}
                  </button>

                  <a href="#" className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700 hover:text-primary transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <i className="ph ph-baby text-base text-rose-500"></i>
                      <span>Baby & Kids</span>
                    </div>
                    <i className="ph ph-caret-right text-[10px] text-slate-400"></i>
                  </a>
                  <a href="#" className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700 hover:text-primary transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <i className="ph ph-pencil-line text-base text-blue-500"></i>
                      <span>Books & Stationery</span>
                    </div>
                    <i className="ph ph-caret-right text-[10px] text-slate-400"></i>
                  </a>
                  <a href="#" className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700 hover:text-primary transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <i className="ph ph-paw-print text-base text-amber-500"></i>
                      <span>Pet Supplies</span>
                    </div>
                    <i className="ph ph-caret-right text-[10px] text-slate-400"></i>
                  </a>
                  <a href="#" className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-slate-50 text-[12px] font-bold text-slate-700 hover:text-primary transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <i className="ph ph-devices text-base text-indigo-500"></i>
                      <span>Digital Products</span>
                    </div>
                    <i className="ph ph-caret-right text-[10px] text-slate-400"></i>
                  </a>
                </div>
              </div>
            </div>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-lightning text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold flex items-center gap-2">Flash Sale <span className="bg-[#ff4626] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wide">Hot</span></span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-tag text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">New Arrivals</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-star text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Best Selling</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-shield-check text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Top Brands</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-seal-percent text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Offers</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <div className="h-[1px] bg-gray-100 my-2 mx-2"></div>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-package text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">My Orders</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-heart text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Wishlist</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">4</span>
              </div>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <div className="w-[22px] h-[22px] flex items-center justify-center text-slate-600 group-hover:text-primary transition-colors">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 15c0-1.2 1-2 2-2s2 .8 2 2-1 2-2 2H6M8 12.5V7C8 6 7.5 5.5 7 5.5" />
                    <path d="M12 9h5M17 9l-3-3M15 16h-5M10 16l3 3" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold">Compare</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-truck text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Track Order</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <div className="h-[1px] bg-gray-100 my-2 mx-2"></div>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-map-pin text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Addresses</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-credit-card text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Payment Methods</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-gear text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Account Settings</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-bell text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">3</span>
              </div>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-headphones text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">Help & Support</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-[1.25rem] hover:bg-slate-50 text-slate-700 hover:text-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <i className="ph ph-info text-[22px] text-slate-600 group-hover:text-primary transition-colors"></i>
                <span className="text-[13px] font-semibold">About Us</span>
              </div>
              <i className="ph ph-caret-right text-sm text-slate-400 group-hover:text-primary transition"></i>
            </a>
          </nav>

          <div className="bg-[#f3f4f6] rounded-[14px] p-4 flex items-center gap-4 mt-6 border border-slate-200/50 shadow-sm relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-14 h-auto rounded-[10px] border-[3px] border-slate-800 shadow-md group-hover:scale-105 transition duration-300 z-10" alt="App" />
            <div className="z-10 w-full">
              <h4 className="text-[13px] font-bold text-slate-800 leading-tight mb-1">Download Our App</h4>
              <p className="text-[9px] text-slate-500 font-medium leading-snug mb-3 w-[90%]">Get extra 10% OFF on your first app order</p>
              <button className="w-full bg-primary hover:bg-brand-dark transition-colors text-white text-[10px] font-semibold py-2 rounded-md shadow flex justify-center items-center gap-1.5">
                Download Now <i className="ph ph-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="w-full max-w-full sm:max-w-[480px] mx-auto bg-white min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.08)] ">
        
        {activeTab !== 'home' ? (
          <div className="font-bengali pb-24">
            {/* Elegant compact mobile header for non-home tab pages */}
            <header className="px-4 py-3 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-slate-100 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button onClick={openSidebar} className="p-1.5 hover:bg-slate-50 rounded-xl transition -ml-1 cursor-pointer">
                    <i className="ph ph-list text-[26px] text-slate-800 hover:text-emerald-700 transition-colors"></i>
                  </button>
                  <div className="flex items-center text-emerald-800 font-bold text-xl tracking-tight cursor-pointer">
                    <i className="ph-fill ph-tote mr-1.5 text-2xl text-emerald-600"></i> DeshiMart
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-[24px] cursor-pointer">
                  <button onClick={onCartClick} className="relative p-1 hover:text-emerald-600 transition outline-none">
                    <i className="ph ph-shopping-cart"></i>
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white">{cartCount}</span>
                    )}
                  </button>
                </div>
              </div>
              
              <div 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center text-[12px] text-slate-500 mt-2.5 gap-1.5 cursor-pointer w-fit group"
              >
                <i className="ph-fill ph-map-pin text-cyan-600 text-sm animate-bounce"></i>
                <span className="group-hover:text-cyan-700 transition font-semibold">ডেলিভারি: {deliveryLocation}</span>
                <i className="ph ph-caret-down ml-0.5 text-[10px] text-slate-400 group-hover:text-cyan-700 transition"></i>
              </div>
            </header>

            <div className="px-4">
              {children}
            </div>
          </div>
        ) : (
          <>
            {/* ========================================== */}
            {/* VIEW 1: FASHION & APPAREL                  */}
            {/* ========================================== */}
            <div className={`font-bengali pb-24 ${activeView === 'fashion' ? '' : 'hidden'}`}>
          
          <header className="px-4 pb-3 pt-4 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-slate-100">
            <div className="flex justify-between items-center pb-2">
              <div className="flex items-center gap-3">
                <button onClick={openSidebar} className="p-1.5 hover:bg-slate-50 rounded-xl transition -ml-1">
                  <i className="ph ph-list text-[26px] text-slate-800 hover:text-emerald-700 transition-colors"></i>
                </button>
                <div className="flex items-center text-emerald-800 font-bold text-xl tracking-tight cursor-pointer">
                  <i className="ph-fill ph-tote mr-1.5 text-2xl text-emerald-600"></i> DeshiMart
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-700 text-[24px] cursor-pointer">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 outline-none"><i className="ph ph-magnifying-glass hover:text-emerald-500 transition"></i></button>
                <i className="ph ph-heart hover:text-rose-500 transition p-1"></i>
                <button onClick={onCartClick} className="relative p-1 hover:text-emerald-600 transition outline-none">
                  <i className="ph ph-shopping-cart"></i>
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white">{cartCount}</span>
                  )}
                </button>
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-[60px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
              <div className="flex rounded-[1.25rem] overflow-hidden border border-slate-200 bg-slate-50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all shadow-sm">
                <input type="text" placeholder="আপনি কী খুঁজছেন?" className="w-full bg-transparent px-4 py-2.5 text-[14px] outline-none font-medium" />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 transition-colors flex items-center justify-center"><i className="ph ph-magnifying-glass text-lg"></i></button>
              </div>
            </div>

            <div 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center text-[13px] text-slate-600 mt-3.5 gap-1.5 cursor-pointer w-fit group"
            >
              <i className="ph-fill ph-map-pin text-cyan-600 text-base animate-bounce"></i>
              <span className="group-hover:text-cyan-700 transition font-semibold">ডেলিভারি করুন: {deliveryLocation}</span>
              <i className="ph ph-caret-down ml-0.5 text-xs text-slate-400 group-hover:text-cyan-700 transition"></i>
            </div>
          </header>

          <div className="space-y-4">
            <Hero currentSeason={currentSeason} />
            <CategoryList />
            <FlashSale onProductClick={onProductClick} onAddToCart={onAddToCart} />
            <Features />
            <div className="px-5 py-2">
              <div className="bg-amber-50 rounded-[1.5rem] p-6 flex items-center justify-between relative overflow-hidden shadow-sm border border-amber-100">
                <div className="z-10 w-2/3">
                  <p className="text-[11px] text-amber-800 font-semibold mb-1">নতুন ব্যবহারকারীদের জন্য</p>
                  <h3 className="text-3xl font-black text-amber-950 leading-none tracking-tight">১০% ছাড়!</h3>
                  <p className="text-[13px] text-amber-900 font-bold mt-2 mb-3.5">প্রথম অর্ডারে বিশেষ ছাড়</p>
                  <span className="bg-primary text-white text-[10px] font-bold px-3 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-md">
                    <i className="ph-fill ph-ticket text-sm text-amber-200"></i> কুপন দিন: NEW10
                  </span>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/4213/4213958.png" className="w-24 h-24 object-contain z-10 drop-shadow-md" alt="gift" />
                <div className="absolute w-8 h-8 bg-amber-200 rounded-full top-3 right-6 opacity-40 blur-[2px]"></div>
                <div className="absolute w-4 h-4 bg-primary/10 rounded-full bottom-6 left-1/2 opacity-50 blur-[1px]"></div>
              </div>
            </div>
            <NewArrivals onProductClick={onProductClick} onAddToCart={onAddToCart} />
            <BestSellers onProductClick={onProductClick} onAddToCart={onAddToCart} />
            <Brands />
            <CustomerReviews />
          </div>

          <TrustAndFaq />
            <Newsletter />
            <Footer />
        </div>

        {/* ============================================== */}
        {/* VIEW 2: GROCERY & FOOD                         */}
        {/* ============================================== */}
        <div className={`font-sans bg-white pb-24 ${activeView === 'grocery' ? '' : 'hidden'}`}>
          <header className="px-5 pb-3 pt-5 bg-white/95 backdrop-blur-md sticky top-0 z-40">
            <div className="flex justify-between items-center pb-4">
              <div className="flex items-center gap-4">
                <button onClick={openSidebar} className="hover:bg-slate-50 rounded transition">
                  <i className="ph ph-list text-[28px] text-slate-800"></i>
                </button>
                <div className="flex items-center text-slate-900 font-bold text-[22px] tracking-tight cursor-pointer">
                  <i className="ph-fill ph-shopping-bag mr-2 text-[26px] text-primary"></i> DeshiMart
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-800 text-[26px] cursor-pointer">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 outline-none hover:text-primary transition"><i className="ph ph-magnifying-glass"></i></button>
                <div className="relative hover:text-primary transition">
                  <i className="ph ph-bell"></i>
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full border border-white">3</span>
                </div>
                <button onClick={onCartClick} className="relative hover:text-primary transition outline-none">
                  <i className="ph ph-shopping-cart-simple"></i>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full border border-white">{cartCount}</span>
                  )}
                </button>
              </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-[60px] opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0 mt-0 mb-0'}`}>
              <div className="flex gap-2">
                <div className="flex-1 rounded-full overflow-hidden border border-slate-200 bg-slate-50/80 focus-within:border-primary/50 focus-within:bg-white transition-all shadow-sm flex items-center px-4">
                  <i className="ph ph-magnifying-glass text-xl text-slate-400"></i>
                  <input type="text" placeholder="Search for products..." className="w-full bg-transparent px-3 py-3 text-[14px] outline-none text-slate-700 font-medium" />
                </div>
                <button className="bg-primary hover:bg-brand-dark text-white w-12 rounded-full transition-colors flex items-center justify-center shadow-md">
                  <i className="ph ph-faders text-xl"></i>
                </button>
              </div>
            </div>

            <div 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center text-[13px] text-slate-600 mt-3 gap-1.5 cursor-pointer w-fit group"
            >
              <i className="ph-fill ph-map-pin text-primary text-base animate-bounce"></i>
              <span className="group-hover:text-primary transition font-semibold">Deliver to: {deliveryLocation}</span>
              <i className="ph ph-caret-down ml-0.5 text-xs text-slate-400 group-hover:text-primary transition"></i>
            </div>
          </header>

          <section className="px-5 mt-2">
            <div className={`w-full border rounded-[1.5rem] p-5 relative overflow-hidden h-[180px] shadow-sm flex items-center transition-all duration-500 ${GROCERY_SLIDES[groceryActiveSlide].bgClass}`}>
              <div className="relative z-10 w-[60%]">
                <span className={`text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider mb-2 ${GROCERY_SLIDES[groceryActiveSlide].badgeTextClass}`}>
                  <i className={GROCERY_SLIDES[groceryActiveSlide].badgeIconClass}></i> {GROCERY_SLIDES[groceryActiveSlide].badge}
                </span>
                <h2 className="text-[20px] font-extrabold leading-[1.2] mb-1.5 font-serif line-clamp-2">{GROCERY_SLIDES[groceryActiveSlide].title}</h2>
                <p className="text-[10px] opacity-80 mb-3 font-medium leading-snug w-[95%] line-clamp-2">{GROCERY_SLIDES[groceryActiveSlide].tagline}</p>
                <button className={`transition-colors text-white text-[11px] font-bold px-4 py-2.5 rounded-full shadow flex items-center gap-1.5 w-fit ${GROCERY_SLIDES[groceryActiveSlide].btnClass}`}>
                  Shop Now <i className="ph ph-arrow-right text-sm"></i>
                </button>
              </div>
              <div className="absolute right-[-15px] bottom-0 h-[105%] w-[42%] flex items-end justify-end">
                <img src={GROCERY_SLIDES[groceryActiveSlide].image} className="h-full w-full object-cover rounded-bl-3xl drop-shadow-lg transition-all duration-700" alt="Grocery Slide Image" />
              </div>
              
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20">
                {GROCERY_SLIDES.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setGroceryActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${groceryActiveSlide === idx ? 'w-5 bg-primary' : 'w-1.5 bg-slate-300/85'}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 px-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Shop by Category</h3>
              <a href="#" className="text-primary text-xs font-semibold flex items-center gap-1">View All <i className="ph ph-caret-right"></i></a>
            </div>
            
            <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-5 px-5">
              <a href="#" className="flex flex-col items-center min-w-[72px] group">
                <div className="w-[72px] h-[72px] rounded-[1.5rem] overflow-hidden relative border border-slate-100 flex items-center justify-center mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.04)] bg-slate-50">
                  <img src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" alt="Groceries Category" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">Groceries</span>
              </a>
              <a href="#" className="flex flex-col items-center min-w-[72px] group">
                <div className="w-[72px] h-[72px] rounded-[1.5rem] overflow-hidden relative border border-slate-100 flex items-center justify-center mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.04)] bg-slate-50">
                  <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" alt="Beverages Category" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">Beverages</span>
              </a>
              <a href="#" className="flex flex-col items-center min-w-[72px] group">
                <div className="w-[72px] h-[72px] rounded-[1.5rem] overflow-hidden relative border border-slate-100 flex items-center justify-center mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.04)] bg-slate-50">
                  <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" alt="Personal Care Category" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">Personal Care</span>
              </a>
              <a href="#" className="flex flex-col items-center min-w-[72px] group">
                <div className="w-[72px] h-[72px] rounded-[1.5rem] overflow-hidden relative border border-slate-100 flex items-center justify-center mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.04)] bg-slate-50">
                  <img src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" alt="Household Category" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">Household</span>
              </a>
              <a href="#" className="flex flex-col items-center min-w-[72px] group">
                <div className="w-[72px] h-[72px] rounded-[1.5rem] overflow-hidden relative border border-slate-100 flex items-center justify-center mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.04)] bg-slate-50">
                  <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" alt="Baby Care Category" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">Baby Care</span>
              </a>
              <a href="#" className="flex flex-col items-center min-w-[72px] group">
                <div className="w-[72px] h-[72px] rounded-[1.5rem] bg-slate-50 border border-slate-200 flex items-center justify-center mb-2 group-hover:bg-slate-100 transition-colors">
                  <i className="ph ph-squares-four text-2xl text-slate-600"></i>
                </div>
                <span className="text-[11px] font-bold text-slate-700">More</span>
              </a>
            </div>
          </section>

          <section className="mt-6 px-5">
            <div className="bg-primary rounded-[1.25rem] flex overflow-hidden shadow-md">
              <div className="w-1/2 p-3.5 border-r border-white/20 flex flex-col justify-center">
                <div className="text-white font-bold text-sm flex items-center gap-1">Free Delivery <i className="ph-fill ph-truck"></i></div>
                <p className="text-emerald-100 text-[10px] mt-0.5">On orders over ৳999</p>
              </div>
              <div className="w-1/2 p-3.5 bg-gradient-to-r from-primary to-brand-dark relative flex flex-col justify-center">
                <div className="text-white font-bold text-sm">Exclusive Offer!</div>
                <p className="text-emerald-100 text-[10px] mt-0.5">Save more with our deals</p>
                <i className="ph-fill ph-gift text-4xl absolute right-2 bottom-1.5 text-white/20"></i>
              </div>
            </div>
          </section>

          <section className="mt-8 px-5">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <i className="ph-fill ph-lightning text-brand-orange text-xl animate-pulse"></i>
                <h3 className="font-bold text-slate-900 text-lg">Flash Sale</h3>
                <span className="text-slate-400 text-xs mx-1">|</span>
                <span className="text-slate-500 text-[11px] font-medium">Limited time offers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-brand-gold/10 text-brand-orange font-bold px-2 py-1 rounded text-xs border border-brand-gold/30 shadow-inner">02 : 45 : 30</div>
                <a href="#" className="text-primary text-xs font-semibold flex items-center gap-0.5 ml-1">View All <i className="ph ph-caret-right"></i></a>
              </div>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-5 px-5">
              {isLoading ? Array(4).fill(0).map((_, i) => <GrocerySkeleton key={i} />) : [
                { img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', title: 'Aashirvaad Atta', qty: '5kg', price: '৳460', oldPrice: '৳599', off: '-23%' },
                { img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', title: 'Fresh Soyabean Oil', qty: '2L', price: '৳280', oldPrice: '৳340', off: '-18%' },
                { img: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', title: 'Tang Orange', qty: '750g', price: '৳320', oldPrice: '৳375', off: '-15%' },
                { img: 'https://images.unsplash.com/photo-1626844131082-256783844137?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', title: 'ACI Pure Salt', qty: '1kg', price: '৳20', oldPrice: '৳25', off: '-20%' }
              ].map((item, i) => (
                <div key={i} className="min-w-[140px] border border-slate-100 rounded-[1.5rem] bg-white p-2.5 relative flex flex-col shadow-sm hover:shadow-md transition">
                  <div className="absolute top-2.5 left-2.5 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">{item.off}</div>
                  <div className="h-28 w-full bg-slate-50 rounded-[1.25rem] mb-3 flex items-center justify-center p-2">
                    <img src={item.img} className="h-full object-contain mix-blend-multiply" />
                  </div>
                  <h4 className="text-[12px] font-semibold text-slate-800 leading-tight mb-1">{item.title}</h4>
                  <span className="text-[10px] text-slate-500 mb-2">{item.qty}</span>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex gap-1.5 items-baseline">
                      <span className="font-bold text-slate-900 text-sm">{item.price}</span>
                      <span className="text-[10px] text-slate-400 line-through">{item.oldPrice}</span>
                    </div>
                    <button className="w-7 h-7 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-brand-dark transition shadow-sm">
                      <i className="ph ph-shopping-cart-simple text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 px-5">
            <div className="grid grid-cols-4 gap-2 bg-slate-50 rounded-[1.25rem] p-3 border border-slate-100">
              <div className="flex flex-col items-center text-center">
                <i className="ph ph-shield-check text-2xl text-primary mb-1"></i>
                <span className="text-[9px] font-bold text-slate-800">100% Original</span>
                <span className="text-[8px] text-slate-500">Authentic Products</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="ph ph-arrows-clockwise text-2xl text-primary mb-1"></i>
                <span className="text-[9px] font-bold text-slate-800">Easy Returns</span>
                <span className="text-[8px] text-slate-500">7 Days Return</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="ph ph-headset text-2xl text-primary mb-1"></i>
                <span className="text-[9px] font-bold text-slate-800">24/7 Support</span>
                <span className="text-[8px] text-slate-500">Customer Service</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="ph ph-lock-key text-2xl text-primary mb-1"></i>
                <span className="text-[9px] font-bold text-slate-800">Secure Payment</span>
                <span className="text-[8px] text-slate-500">100% Secure</span>
              </div>
            </div>
          </section>

          <section className="mt-8 px-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Top Brands</h3>
              <a href="#" className="text-primary text-xs font-semibold flex items-center gap-1">View All <i className="ph ph-caret-right"></i></a>
            </div>
            <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-5 px-5">
              <div className="min-w-[80px] h-[90px] rounded-[1.5rem] border border-slate-100 bg-white flex flex-col items-center justify-center gap-2 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Unilever_Logo.svg/1200px-Unilever_Logo.svg.png" className="w-10 h-10 object-contain" />
                <span className="text-[10px] font-semibold text-slate-600">Unilever</span>
              </div>
              <div className="min-w-[80px] h-[90px] rounded-[1.5rem] border border-slate-100 bg-white flex flex-col items-center justify-center gap-2 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo.svg/1200px-Procter_%26_Gamble_logo.svg.png" className="w-10 h-10 object-contain" />
                <span className="text-[10px] font-semibold text-slate-600">P&G</span>
              </div>
              <div className="min-w-[80px] h-[90px] rounded-[1.5rem] border border-slate-100 bg-white flex flex-col items-center justify-center gap-2 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nestl%C3%A9_logo.svg/1200px-Nestl%C3%A9_logo.svg.png" className="w-10 h-10 object-contain" />
                <span className="text-[10px] font-semibold text-slate-600">Nestle</span>
              </div>
              <div className="min-w-[80px] h-[90px] rounded-[1.5rem] border border-slate-100 bg-white flex flex-col items-center justify-center gap-2 shadow-sm">
                <h4 className="w-10 h-10 font-bold text-blue-800 text-lg flex items-center justify-center">MARCEL</h4>
                <span className="text-[10px] font-semibold text-slate-600">Marcel</span>
              </div>
              <div className="min-w-[80px] h-[90px] rounded-[1.5rem] border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 shadow-sm">
                <i className="ph ph-squares-four text-2xl text-slate-400"></i>
                <span className="text-[10px] font-semibold text-slate-600">More</span>
              </div>
            </div>
          </section>

          <TrustAndFaq />
            <Newsletter />
            <Footer />
        </div>
        </>
        )}

        {/* SHARED BOTTOM NAVIGATION */}
        {activeView === 'fashion' ? (
          <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-full sm:max-w-[480px] bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-around items-center pt-3 pb-5 shadow-[0_-5px_20px_rgba(0,0,0,0.04)] rounded-t-xl z-40 fashion-bottom-nav">
            <button onClick={() => onTabChange('home')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-500'}`}>
              <i className={`${activeTab === 'home' ? 'ph-fill' : 'ph'} ph-house mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'home' ? 'font-bold' : 'font-semibold'}`}>হোম</span>
            </button>
            <button onClick={() => onTabChange('categories')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'categories' ? 'text-fuchsia-600' : 'text-slate-400 hover:text-fuchsia-500'}`}>
              <i className={`${activeTab === 'categories' ? 'ph-fill' : 'ph'} ph-squares-four mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'categories' ? 'font-bold' : 'font-semibold'}`}>ক্যাটাগরি</span>
            </button>
            <button onClick={() => onTabChange('orders')} className={`flex flex-col items-center w-1/5 group outline-none relative ${activeTab === 'orders' ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500'}`}>
              <i className={`${activeTab === 'orders' ? 'ph-fill' : 'ph'} ph-receipt mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'orders' ? 'font-bold' : 'font-semibold'}`}>অর্ডার</span>
            </button>
            <button onClick={() => onTabChange('profile')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'profile' ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}>
              <i className={`${activeTab === 'profile' ? 'ph-fill' : 'ph'} ph-user mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'profile' ? 'font-bold' : 'font-semibold'}`}>প্রোফাইল</span>
            </button>
            <button onClick={() => onTabChange('more')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'more' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-800'}`}>
              <i className={`${activeTab === 'more' ? 'ph-fill' : 'ph'} ph-dots-three-circle mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'more' ? 'font-bold' : 'font-semibold'}`}>আরও</span>
            </button>
          </nav>
        ) : (
          <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-full sm:max-w-[480px] bg-white border-t border-slate-100 flex justify-around items-center pt-3 pb-5 shadow-[0_-5px_20px_rgba(0,0,0,0.04)] rounded-t-2xl z-40 grocery-bottom-nav">
            <button onClick={() => onTabChange('home')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'home' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
              <i className={`${activeTab === 'home' ? 'ph-fill' : 'ph'} ph-house mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'home' ? 'font-bold' : 'font-semibold'}`}>Home</span>
            </button>
            <button onClick={() => onTabChange('categories')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'categories' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
              <i className={`${activeTab === 'categories' ? 'ph-fill' : 'ph'} ph-squares-four mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'categories' ? 'font-bold' : 'font-semibold'}`}>Categories</span>
            </button>
            <button onClick={() => onTabChange('orders')} className={`flex flex-col items-center w-1/5 group outline-none relative ${activeTab === 'orders' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
              <i className={`${activeTab === 'orders' ? 'ph-fill' : 'ph'} ph-tag mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'orders' ? 'font-bold' : 'font-semibold'}`}>Orders</span>
            </button>
            <button onClick={() => onTabChange('profile')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'profile' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
              <i className={`${activeTab === 'profile' ? 'ph-fill' : 'ph'} ph-user mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'profile' ? 'font-bold' : 'font-semibold'}`}>Profile</span>
            </button>
            <button onClick={() => onTabChange('more')} className={`flex flex-col items-center w-1/5 group outline-none ${activeTab === 'more' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
              <i className={`${activeTab === 'more' ? 'ph-fill' : 'ph'} ph-dots-nine mb-1 text-[22px] group-hover:-translate-y-1 transition duration-300`}></i>
              <span className={`text-[10px] ${activeTab === 'more' ? 'font-bold' : 'font-semibold'}`}>More</span>
            </button>
          </nav>
        )}

        {/* DELIVERY LOCATION MODAL (BOTTOM SHEET / MODAL) */}
        {isLocationModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-300">
            {/* Backdrop Click */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => {
                setIsLocationModalOpen(false);
                setLocationError(null);
              }}
            />
            
            {/* Modal Container */}
            <div className="relative bg-white w-full sm:max-w-[440px] rounded-t-3xl sm:rounded-[1.5rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-slide-up sm:animate-fade-in font-bengali">
              {/* Handle bar for bottom sheet drag visual */}
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-3 sm:hidden shrink-0" />
              
              {/* Header */}
              <div className="px-5 pb-4 pt-2 sm:pt-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <i className="ph-fill ph-map-pin text-xl text-emerald-600"></i>
                  <h3 className="text-base font-extrabold text-slate-800">ডেলিভারি লোকেশন পরিবর্তন করুন</h3>
                </div>
                <button 
                  onClick={() => {
                    setIsLocationModalOpen(false);
                    setLocationError(null);
                  }}
                  className="p-1.5 hover:bg-slate-50 rounded-full transition text-slate-400 hover:text-slate-600 cursor-pointer outline-none"
                >
                  <i className="ph ph-x text-[20px] font-bold"></i>
                </button>
              </div>
              
              {/* Content (Scrollable) */}
              <div className="p-5 overflow-y-auto space-y-5 flex-1 max-h-[60vh] no-scrollbar">
                {/* GPS Button */}
                <button 
                  onClick={handleUseCurrentLocation}
                  disabled={isDetectingLocation}
                  className="w-full bg-emerald-50 hover:bg-emerald-100/80 active:bg-emerald-100 border border-emerald-200/50 text-emerald-800 rounded-[1.5rem] py-3.5 px-4 flex items-center justify-between transition-all font-bold text-sm shadow-sm cursor-pointer outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    {isDetectingLocation ? (
                      <i className="ph ph-circle-notch text-lg animate-spin text-emerald-600"></i>
                    ) : (
                      <i className="ph-fill ph-navigation-arrow text-lg text-emerald-600 animate-pulse"></i>
                    )}
                    <span>{isDetectingLocation ? 'লোকেশন অনুসন্ধান করা হচ্ছে...' : 'বর্তমান লোকেশন ব্যবহার করুন'}</span>
                  </div>
                  {!isDetectingLocation && (
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">GPS</span>
                  )}
                </button>
                
                {locationError && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-[1.25rem] p-3 text-xs font-semibold flex items-start gap-2 animate-shake">
                    <i className="ph-fill ph-warning-circle text-base shrink-0 mt-0.5"></i>
                    <span>{locationError}</span>
                  </div>
                )}
                
                {/* Divider */}
                <div className="relative flex items-center justify-center py-2 shrink-0">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <span className="relative px-3 bg-white text-[11px] font-bold text-slate-400">অথবা ম্যানুয়ালি লিখুন</span>
                </div>
                
                {/* Manual Input Form */}
                <form onSubmit={handleManualLocationSubmit} className="space-y-3 shrink-0">
                  <div className="flex rounded-[1.5rem] border border-slate-200 overflow-hidden focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all bg-slate-50/50 shadow-sm h-12 items-center px-3.5">
                    <i className="ph ph-map-trifold text-lg text-slate-400"></i>
                    <input 
                      type="text" 
                      value={manualLocationInput}
                      onChange={(e) => setManualLocationInput(e.target.value)}
                      placeholder="আপনার থানা/এলাকা বা ঠিকানা লিখুন..." 
                      className="w-full bg-transparent px-3 text-xs sm:text-sm outline-none font-semibold text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={!manualLocationInput.trim()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-[1.5rem] text-sm transition shadow-md shadow-emerald-600/10 outline-none cursor-pointer"
                  >
                    আপডেট করুন
                  </button>
                </form>
                
                {/* Popular Cities */}
                <div className="shrink-0">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">জনপ্রিয় শহরসমূহ</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {popularCities.map((city) => (
                      <button
                        key={city.name}
                        type="button"
                        onClick={() => selectPopularCity(city.name + ', বাংলাদেশ')}
                        className={`text-xs font-semibold py-2.5 px-1 rounded-[1.25rem] text-center border transition-all duration-200 outline-none cursor-pointer truncate ${
                          deliveryLocation.startsWith(city.name)
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/15 font-bold'
                            : 'bg-white border-slate-200/60 hover:border-emerald-500 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/20'
                        }`}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Current Selected Location Indicator Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500 font-semibold shrink-0">
                বর্তমান ঠিকানা: <span className="text-emerald-700 font-bold">{deliveryLocation}</span>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
