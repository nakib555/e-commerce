import React, { useState } from 'react';
import { Package, Clock, CheckCircle, Search, ChevronRight, ChevronDown, MapPin, CreditCard, Receipt, FileText, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileOrdersProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

export function MobileOrders({ isLoggedIn = false, onLoginClick }: MobileOrdersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [trackId, setTrackId] = useState('#DM-1092');

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.03)] text-center max-w-md w-full flex flex-col items-center"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center border-2 border-brand-emerald/20 mb-6">
            <Package size={40} className="stroke-[1.5]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
            আপনার অর্ডার সমূহ
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-sm">
            আপনার অর্ডার ট্র্যাকিং করতে এবং পূর্ববর্তী সমস্ত ক্রয়ের ইতিহাস দেখতে অনুগ্রহ করে লগইন করুন।
          </p>

          <button
            onClick={onLoginClick}
            className="w-full bg-brand-emerald hover:bg-brand-dark text-white py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-[0_4px_20px_rgba(15,138,95,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>লগইন করুন</span>
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  const orders = [
    { 
      id: '#DM-1092', 
      date: 'আজ, ১০:৩০ এএম', 
      status: 'processing', 
      total: '৳ ১,২৫০', 
      itemsCount: 3,
      items: [
        { name: 'খাঁটি সুন্দরবনের মধু (৫০০ গ্রাম)', qty: 1, price: '৳ ৫৫০' },
        { name: 'প্রিমিয়াম দেশি ঘি (১ কেজি)', qty: 1, price: '৳ ৬০০' },
        { name: 'দার্জিলিং ব্ল্যাক টি', qty: 1, price: '৳ ১০০' }
      ],
      shippingAddress: 'রকিব হাসান, হাউজ ১২, রোড ৪, ধানমন্ডি, ঢাকা',
      paymentMethod: 'বিকাশ (অনলাইন পেমেন্ট)',
      subtotal: '৳ ১,২৫০',
      deliveryFee: '৳ ০ (ফ্রি)',
      grandTotal: '৳ ১,২৫০'
    },
    { 
      id: '#DM-1085', 
      date: 'গতকাল, ০৪:১৫ পিএম', 
      status: 'delivered', 
      total: '৳ ৮৯০', 
      itemsCount: 2,
      items: [
        { name: 'দেশি কালোজিরা চাল (৫ কেজি)', qty: 1, price: '৳ ৭৯০' },
        { name: 'অর্গানিক সরিষার তেল (১ লিটার)', qty: 1, price: '৳ ১০০' }
      ],
      shippingAddress: 'রকিব হাসান, হাউজ ১২, রোড ৪, ধানমন্ডি, ঢাকা',
      paymentMethod: 'ক্যাশ অন ডেলিভারি',
      subtotal: '৳ ৮৪০',
      deliveryFee: '৳ ৫০',
      grandTotal: '৳ ৮৯০'
    },
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };

  return (
    <div className="w-full min-h-screen pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-3xl font-heading font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Package className="text-brand-emerald" size={24} />
            আমার অর্ডার সমূহ
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">আপনার সব কেনাকাটার বিবরণ এবং শিপিং স্ট্যাটাস এখানে দেখুন</p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="অর্ডার আইডি দিয়ে খুঁজুন..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] dark:text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Live Order Tracker Widget */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-100/70 dark:border-gray-800 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
          </span>
          <h3 className="text-xs sm:text-sm font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">লাইভ অর্ডার ট্র্যাকার</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6">
          <div className="flex-1 relative">
            <select
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="w-full appearance-none border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#121212] rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none focus:border-brand-emerald cursor-pointer"
            >
              <option value="#DM-1092">#DM-1092 (সুন্দরবনের মধু, প্রিমিয়াম ঘি...)</option>
              <option value="#DM-1085">#DM-1085 (কালোজিরা চাল, সরিষার তেল)</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none" />
          </div>
          <button className="bg-brand-emerald hover:bg-[#0C724E] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm hover:shadow transition-all shrink-0">
            ট্র্যাক করুন
          </button>
        </div>

        {/* Stepper tracker */}
        {trackId && (
          <div className="relative pt-2 pb-1">
            {/* Connection Line */}
            <div className="absolute left-[15px] top-[26px] bottom-[26px] w-[2px] bg-gray-100 dark:bg-gray-800" />

            <div className="flex flex-col gap-6 relative z-10">
              {[
                { label: 'অর্ডার প্লেসড', desc: 'আজ, ১০:৩০ এএম', status: 'completed' },
                { label: 'প্যাকেজিং হচ্ছে', desc: 'প্রক্রিয়াধীন রয়েছে', status: trackId === '#DM-1085' ? 'completed' : 'active' },
                { label: 'কুরিয়ারে শিপড', desc: 'আজ বা আগামীকাল', status: trackId === '#DM-1085' ? 'completed' : 'pending' },
                { label: 'ডেলিভারি সম্পন্ন', desc: 'অপেক্ষমান', status: trackId === '#DM-1085' ? 'completed' : 'pending' }
              ].map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';
                
                return (
                  <div key={idx} className="flex items-center gap-4 flex-1">
                    {/* Circle Indicator */}
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shrink-0 ${
                        isCompleted 
                          ? 'bg-brand-emerald border-brand-emerald text-white shadow-[0_2px_8px_rgba(15,138,95,0.3)]' 
                          : isActive 
                            ? 'bg-yellow-500 border-yellow-500 text-white shadow-[0_2px_8px_rgba(234,179,8,0.3)] animate-pulse' 
                            : 'bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-gray-800 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={15} />
                      ) : (
                        <Clock size={15} />
                      )}
                    </div>
                    
                    <div className="text-left">
                      <div className={`text-xs font-extrabold ${isCompleted ? 'text-brand-emerald' : isActive ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {step.label}
                      </div>
                      <div className="text-[10px] text-gray-400 font-semibold mt-0.5">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 p-3 sm:p-4 rounded-2xl shadow-sm text-center">
          <div className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs font-semibold">মোট অর্ডার</div>
          <div className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white mt-1">২ টি</div>
        </div>
        <div className="bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-100/50 dark:border-yellow-900/50 p-3 sm:p-4 rounded-2xl shadow-sm text-center">
          <div className="text-yellow-600 dark:text-yellow-400 text-[10px] sm:text-xs font-semibold">প্রক্রিয়াকরণ হচ্ছে</div>
          <div className="text-lg sm:text-2xl font-bold text-yellow-700 dark:text-yellow-400 mt-1">১ টি</div>
        </div>
        <div className="bg-[#E8F5E9]/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/50 p-3 sm:p-4 rounded-2xl shadow-sm text-center">
          <div className="text-brand-emerald dark:text-emerald-400 text-[10px] sm:text-xs font-semibold">ডেলিভারি সম্পন্ন</div>
          <div className="text-lg sm:text-2xl font-bold text-brand-emerald mt-1">১ টি</div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 rounded-2xl p-12 text-center shadow-sm">
          <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">কোনো অর্ডার তথ্য পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order, index) => {
            const isExpanded = expandedOrderId === order.id;
            return (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Main Row */}
                <div 
                  onClick={() => toggleExpand(order.id)}
                  className="p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{order.id}</span>
                        {order.status === 'processing' ? (
                          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold">প্রক্রিয়াধীন</span>
                        ) : (
                          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-brand-emerald dark:text-emerald-400 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold">সম্পন্ন</span>
                        )}
                      </div>
                      <span className="text-[11px] sm:text-xs text-gray-400 mt-1 block">{order.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto sm:ml-0">
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">{order.itemsCount} টি পণ্য</span>
                      <span className="text-sm sm:text-lg font-extrabold text-brand-emerald mt-0.5 block">{order.total}</span>
                    </div>
                    <div className="text-gray-400">
                      <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Collapsible Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-[#1A1A1A]/20"
                    >
                      <div className="p-4 sm:p-6 space-y-6">
                        {/* Products Included */}
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-1.5">
                            <Receipt size={16} className="text-brand-emerald" />
                            ক্রয়কৃত পণ্যের বিবরণ
                          </h4>
                          <div className="space-y-2.5">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex items-center justify-between text-xs sm:text-sm bg-white dark:bg-[#222] p-3 rounded-xl border border-gray-100/80 dark:border-gray-800">
                                <div className="font-medium text-gray-700 dark:text-gray-300 pr-4">
                                  {item.name} <span className="text-gray-400 ml-1">x{item.qty}</span>
                                </div>
                                <span className="font-bold text-gray-800 dark:text-gray-100 shrink-0">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping & Payment Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-[#222] p-4 rounded-xl border border-gray-100/80 dark:border-gray-800">
                            <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1.5">
                              <MapPin size={16} className="text-brand-emerald" />
                              ডেলিভারি ঠিকানা
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{order.shippingAddress}</p>
                          </div>
                          
                          <div className="bg-white dark:bg-[#222] p-4 rounded-xl border border-gray-100/80 dark:border-gray-800">
                            <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1.5">
                              <CreditCard size={16} className="text-brand-emerald" />
                              পেমেন্ট তথ্য
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{order.paymentMethod}</p>
                          </div>
                        </div>

                        {/* Billing Breakdown */}
                        <div className="bg-white dark:bg-[#222] p-4 rounded-xl border border-gray-100/80 dark:border-gray-800 max-w-sm ml-auto space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between text-gray-500">
                            <span>সাবটোটাল</span>
                            <span>{order.subtotal}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>ডেলিভারি ফি</span>
                            <span>{order.deliveryFee}</span>
                          </div>
                          <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex justify-between font-bold text-gray-800 dark:text-white">
                            <span>সর্বমোট</span>
                            <span className="text-brand-emerald">{order.grandTotal}</span>
                          </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex justify-end gap-3 pt-2">
                          <button className="flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#222] hover:bg-gray-50 text-xs text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-all">
                            <FileText size={14} />
                            ইনভয়েস ডাউনলোড
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
