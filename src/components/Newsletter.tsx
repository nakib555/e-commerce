import React from 'react';
import { Mail } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="bg-brand-light dark:bg-[#151515] border-y border-gray-200 dark:border-gray-800/80 py-12">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-8 xl:gap-16">
        
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-[#222] shadow-sm flex items-center justify-center text-brand-emerald shrink-0 border border-gray-50 dark:border-gray-850">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-brand-dark dark:text-gray-100 mb-1">নতুন অফার ও আপডেট পেতে সাবস্ক্রাইব করুন</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">আপনার ই-মেইল দিন এবং সবার আগে জানুন আমাদের নতুন অফারগুলো।</p>
          </div>
        </div>

        <div className="w-full md:w-auto md:min-w-[400px]">
          <form className="flex w-full bg-white dark:bg-[#222] rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 focus-within:border-brand-emerald focus-within:ring-1 focus-within:ring-brand-emerald transition-shadow">
            <input 
              type="email" 
              placeholder="আপনার ই-মেইল লিখুন" 
              className="flex-1 px-4 py-3 focus:outline-none text-gray-700 dark:text-white dark:bg-transparent"
              required
            />
            <button 
              type="submit" 
              className="bg-brand-dark dark:bg-brand-emerald text-white px-6 font-medium hover:bg-brand-emerald transition-colors cursor-pointer"
            >
              সাবস্ক্রাইব করুন
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
