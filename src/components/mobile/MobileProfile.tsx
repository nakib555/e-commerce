import React from 'react';
import { User, Heart, MapPin, CreditCard, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';

export function MobileProfile() {
  const menuItems = [
    { icon: <Heart size={20} />, label: 'উইশলিস্ট', count: 12 },
    { icon: <MapPin size={20} />, label: 'ঠিকানা সমূহ' },
    { icon: <CreditCard size={20} />, label: 'পেমেন্ট মেথড' },
    { icon: <Bell size={20} />, label: 'নোটিফিকেশন', count: 3 },
    { icon: <Settings size={20} />, label: 'সেটিংস' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#121212] min-h-screen">
      {/* Header Profile */}
      <div className="bg-white dark:bg-[#1E1E1E] p-6 pb-8 rounded-b-3xl shadow-sm border-b border-gray-100 dark:border-gray-800 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 mb-4 overflow-hidden border-4 border-white dark:border-[#1E1E1E] shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">রকিব হাসান</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">rakib@example.com</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">+880 1712 345678</p>
        
        <button className="mt-4 bg-brand-emerald/10 text-brand-emerald px-6 py-2 rounded-full text-sm font-medium">
          প্রোফাইল এডিট করুন
        </button>
      </div>

      {/* Menu Options */}
      <div className="p-4 mt-2">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className={`flex items-center justify-between p-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}
            >
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="text-gray-400 dark:text-gray-500">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="bg-brand-emerald text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </a>
          ))}
        </div>

        <button className="w-full mt-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium p-4 rounded-xl flex items-center justify-center gap-2">
          <LogOut size={20} />
          <span>লগ আউট</span>
        </button>
      </div>
    </div>
  );
}
