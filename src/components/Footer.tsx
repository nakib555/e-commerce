import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, ShoppingBag, Youtube, ChevronDown } from 'lucide-react';

function FooterAccordion({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-3 md:border-none md:py-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full md:hidden font-heading font-medium text-[15px]"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h4 className="font-heading font-bold text-lg mb-6 hidden md:block">{title}</h4>
      <div className={`${isOpen ? 'block' : 'hidden'} md:block mt-3 md:mt-0`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#08422C] text-white pt-12 md:pt-16 xl:pt-20 pb-24 md:pb-8">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-12 lg:gap-8 xl:gap-16 mb-8 md:mb-12 xl:mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 mb-8 md:mb-0">
            <a href="/" className="flex items-center gap-2 text-2xl md:text-3xl font-heading font-bold text-white mb-4 md:mb-6">
              <ShoppingBag className="text-brand-emerald" size={28} />
              <span>Deshi<span className="text-brand-emerald">Mart</span></span>
            </a>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
              দেশি মার্ট বাংলাদেশের অন্যতম বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম। সেরা পণ্য, সেরা দাম, আপনার জন্য।
            </p>
            <div className="flex items-center gap-3 md:gap-4">
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-emerald transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-emerald transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-emerald transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-emerald transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:contents">
            {/* Links 1 */}
            <FooterAccordion title="কাস্টমার সাপোর্ট">
              <ul className="space-y-3 text-sm text-gray-300 pb-2 md:pb-0">
                <li><a href="#" className="hover:text-white transition-colors">যোগাযোগ করুন</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ডেলিভারি তথ্য</a></li>
                <li><a href="#" className="hover:text-white transition-colors">রিটার্ন ও রিফান্ড</a></li>
                <li><a href="#" className="hover:text-white transition-colors">সাইজ গাইড</a></li>
                <li><a href="#" className="hover:text-white transition-colors">সাধারণ প্রশ্নাবলী</a></li>
              </ul>
            </FooterAccordion>

            {/* Links 2 */}
            <FooterAccordion title="আমার অ্যাকাউন্ট">
              <ul className="space-y-3 text-sm text-gray-300 pb-2 md:pb-0">
                <li><a href="#" className="hover:text-white transition-colors">আমার অ্যাকাউন্ট</a></li>
                <li><a href="#" className="hover:text-white transition-colors">আমার অর্ডার</a></li>
                <li><a href="#" className="hover:text-white transition-colors">উইশলিস্ট</a></li>
                <li><a href="#" className="hover:text-white transition-colors">অর্ডার ট্র্যাক করুন</a></li>
                <li><a href="#" className="hover:text-white transition-colors">লগইন / রেজিস্টার</a></li>
              </ul>
            </FooterAccordion>

            {/* Links 3 */}
            <FooterAccordion title="গুরুত্বপূর্ণ লিংক">
              <ul className="space-y-3 text-sm text-gray-300 pb-2 md:pb-0">
                <li><a href="#" className="hover:text-white transition-colors">আমাদের সম্পর্কে</a></li>
                <li><a href="#" className="hover:text-white transition-colors">গোপনীয়তা নীতি</a></li>
                <li><a href="#" className="hover:text-white transition-colors">রিটার্ন পলিসি</a></li>
                <li><a href="#" className="hover:text-white transition-colors">শর্তাবলী</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ব্লগ</a></li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="অ্যাপ ডাউনলোড করুন">
              <div className="flex gap-3 pb-2 md:pb-0 pt-2 md:pt-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8 md:h-10" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 md:h-10" />
              </div>
            </FooterAccordion>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400 w-full md:w-auto text-center">
            <p>© 2025 DeshiMart. সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">গোপনীয়তা নীতি</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">শর্তাবলী</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">সাইটম্যাপ</a>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <p className="text-xs text-gray-400 mb-2 md:hidden">পেমেন্ট পদ্ধতি</p>
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0">
              <div className="h-8 w-14 bg-white rounded flex items-center justify-center text-brand-dark px-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/BKash_Logo.svg" alt="bKash" className="h-4" />
              </div>
              <div className="h-8 w-14 bg-white rounded flex items-center justify-center text-brand-dark px-1">
                <img src="https://upload.wikimedia.org/wikipedia/bn/6/64/Nagad_Logo.svg" alt="Nagad" className="h-4" />
              </div>
              <div className="h-8 w-14 bg-white rounded flex items-center justify-center text-brand-dark px-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="VISA" className="h-3" />
              </div>
              <div className="h-8 w-14 bg-white rounded flex items-center justify-center text-brand-dark px-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
