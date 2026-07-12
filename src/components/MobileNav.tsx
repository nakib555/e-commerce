import React from 'react';
import { Home, Grid, ClipboardList, User, MoreHorizontal } from 'lucide-react';

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-1 flex justify-between items-center pb-safe">
      <button className="flex flex-col items-center p-2 text-brand-emerald">
        <Home size={20} />
        <span className="text-[9px] mt-1 font-medium">হোম</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500 hover:text-brand-emerald">
        <Grid size={20} />
        <span className="text-[9px] mt-1 font-medium">ক্যাটাগরি</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500 hover:text-brand-emerald">
        <ClipboardList size={20} />
        <span className="text-[9px] mt-1 font-medium">অর্ডার</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500 hover:text-brand-emerald">
        <User size={20} />
        <span className="text-[9px] mt-1 font-medium">প্রোফাইল</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500 hover:text-brand-emerald">
        <MoreHorizontal size={20} />
        <span className="text-[9px] mt-1 font-medium">আরও</span>
      </button>
    </div>
  );
}
