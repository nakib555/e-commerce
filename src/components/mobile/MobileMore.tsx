import React from 'react';
import { HelpCircle, Info, FileText, Shield, MessageSquare, ChevronRight } from 'lucide-react';

export function MobileMore() {
  const moreItems = [
    { icon: <HelpCircle size={20} />, label: 'সাহায্য ও সাপোর্ট' },
    { icon: <MessageSquare size={20} />, label: 'যোগাযোগ করুন' },
    { icon: <Info size={20} />, label: 'আমাদের সম্পর্কে' },
    { icon: <FileText size={20} />, label: 'শর্তাবলী' },
    { icon: <Shield size={20} />, label: 'প্রাইভেসি পলিসি' },
  ];

  return (
    <div className="p-4 bg-gray-50 dark:bg-[#121212] min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 mt-2">আরও তথ্য</h2>
      
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
        {moreItems.map((item, index) => (
          <a 
            key={index} 
            href="#" 
            className={`flex items-center justify-between p-4 ${index !== moreItems.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}
          >
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="text-gray-400 dark:text-gray-500">
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </a>
        ))}
      </div>

      <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8 mb-4">
        <p>ভার্সন ১.০.০</p>
        <p className="mt-1">© ২০২৩ দেশিমার্ট. সর্বস্বত্ব সংরক্ষিত.</p>
      </div>
    </div>
  );
}
