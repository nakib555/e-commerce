import React from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';

export function MobileOrders() {
  const orders = [
    { id: '#DM-1092', date: 'আজ, ১০:৩০ এএম', status: 'processing', total: '৳ ১২৫০', items: 3 },
    { id: '#DM-1085', date: 'গতকাল, ০৪:১৫ পিএম', status: 'delivered', total: '৳ ৮৯০', items: 2 },
  ];

  return (
    <div className="p-4 bg-gray-50 dark:bg-[#121212] min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">আমার অর্ডার</h2>
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-[#1E1E1E] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{order.id}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{order.date}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
              <span>{order.items} টি পণ্য</span>
              <span className="font-bold text-brand-emerald">{order.total}</span>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
              {order.status === 'processing' ? (
                <>
                  <Clock size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-500">প্রক্রিয়াকরণ হচ্ছে</span>
                </>
              ) : (
                <>
                  <CheckCircle size={16} className="text-brand-emerald" />
                  <span className="text-sm font-medium text-brand-emerald">ডেলিভারি সম্পন্ন</span>
                </>
              )}
              
              <button className="ml-auto text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-md">
                বিস্তারিত
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
