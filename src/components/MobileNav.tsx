import React from 'react';
import { Home, Grid, ClipboardList, User, MoreHorizontal } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-gray-800 z-50 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex justify-between items-center w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center p-2 transition-colors ml-[5px] ${activeTab === 'home' ? 'text-brand-emerald' : 'text-gray-500 dark:text-gray-400 hover:text-brand-emerald dark:hover:text-brand-emerald'}`}
      >
        <Home size={20} />
        <span className="text-[9px] mt-1 font-medium">হোম</span>
      </button>
      <button 
        onClick={() => onTabChange('categories')}
        className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'categories' ? 'text-brand-emerald' : 'text-gray-500 dark:text-gray-400 hover:text-brand-emerald dark:hover:text-brand-emerald'}`}
      >
        <Grid size={20} />
        <span className="text-[9px] mt-1 font-medium">ক্যাটাগরি</span>
      </button>
      <button 
        onClick={() => onTabChange('orders')}
        className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'orders' ? 'text-brand-emerald' : 'text-gray-500 dark:text-gray-400 hover:text-brand-emerald dark:hover:text-brand-emerald'}`}
      >
        <ClipboardList size={20} />
        <span className="text-[9px] mt-1 font-medium">অর্ডার</span>
      </button>
      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center p-2 transition-colors ${activeTab === 'profile' ? 'text-brand-emerald' : 'text-gray-500 dark:text-gray-400 hover:text-brand-emerald dark:hover:text-brand-emerald'}`}
      >
        <User size={20} style={{ fontSize: '1px', lineHeight: '14px' }} />
        <span className="text-[9px] mt-1 font-medium">প্রোফাইল</span>
      </button>
      <button 
        onClick={() => onTabChange('more')}
        className={`flex flex-col items-center p-2 transition-colors mr-[5px] ${activeTab === 'more' ? 'text-brand-emerald' : 'text-gray-500 dark:text-gray-400 hover:text-brand-emerald dark:hover:text-brand-emerald'}`}
      >
        <MoreHorizontal size={20} />
        <span className="text-[9px] mt-1 font-medium">আরও</span>
      </button>
    </div>
  );
}
