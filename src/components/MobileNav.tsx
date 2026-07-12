import React from 'react';
import { Home, Grid, ClipboardList, User, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const navItems = [
    { id: 'home', label: 'হোম', icon: Home },
    { id: 'categories', label: 'ক্যাটাগরি', icon: Grid },
    { id: 'orders', label: 'অর্ডার', icon: ClipboardList },
    { id: 'profile', label: 'প্রোফাইল', icon: User, iconStyle: { fontSize: '1px', lineHeight: '14px' } },
    { id: 'more', label: 'আরও', icon: MoreHorizontal },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-50 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-around items-center w-full shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.08)] dark:shadow-none">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`relative flex flex-col items-center justify-center py-2 px-3.5 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'text-brand-emerald font-semibold scale-105' 
                : 'text-gray-500 dark:text-gray-400 hover:text-brand-emerald/80'
            }`}
          >
            {/* Sliding Pill Background Indicator */}
            {isActive && (
              <motion.span
                layoutId="mobileActiveIndicatorBg"
                className="absolute inset-0 bg-brand-emerald/8 dark:bg-brand-emerald/15 rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              />
            )}
            
            {/* Elegant Micro Top Glowing Line */}
            {isActive && (
              <motion.span
                layoutId="mobileActiveTopLine"
                className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-8 h-[3px] bg-brand-emerald rounded-b-full shadow-[0_2px_8px_rgba(15,138,95,0.6)]"
                transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              />
            )}

            <div className="flex flex-col items-center">
              <Icon 
                size={20} 
                style={item.iconStyle} 
                className={`transition-all duration-300 ${isActive ? 'scale-110 text-brand-emerald drop-shadow-[0_2px_8px_rgba(15,138,95,0.15)]' : 'scale-100'}`} 
              />
              <span className={`text-[10px] mt-1 font-medium tracking-wide transition-all duration-200 ${isActive ? 'text-brand-emerald' : 'text-gray-500 dark:text-gray-400'}`}>
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

