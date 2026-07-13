import React, { useState, useEffect } from 'react';
import { User, Heart, MapPin, CreditCard, Bell, Settings, LogOut, ChevronRight, Edit2, Check, ShieldCheck, Mail, Phone, Calendar, ShieldAlert, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileProfileProps {
  isLoggedIn?: boolean;
  user?: { name: string; email: string; phone: string; address: string } | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

export function MobileProfile({ isLoggedIn = false, user = null, onLoginClick, onLogout }: MobileProfileProps) {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    name: 'রকিব হাসান',
    email: 'rakib@example.com',
    phone: '+880 1712 345678',
    address: 'বাসা ১২, রোড ৪, ধানমন্ডি, ঢাকা',
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const [addresses, setAddresses] = useState([
    { id: 1, type: 'বাসা', address: 'বাসা ১২, রোড ৪, ধানমন্ডি, ঢাকা', isDefault: true },
    { id: 2, type: 'অফিস', address: 'লেভেল ৭, বীর উত্তম সিআর দত্ত রোড, বাংলামোটর, ঢাকা', isDefault: false },
  ]);

  const [savedCards, setSavedCards] = useState([
    { id: 1, type: 'Visa', number: '•••• •••• •••• 4242', expiry: '১২/২৮' },
    { id: 2, type: 'Mastercard', number: '•••• •••• •••• 5555', expiry: '০৪/২৭' },
  ]);

  const menuItems = [
    { id: 'profile', icon: <User size={20} />, label: 'প্রোফাইল তথ্য' },
    { id: 'wishlist', icon: <Heart size={20} />, label: 'উইশলিস্ট', count: 2 },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'ঠিকানা সমূহ' },
    { id: 'cards', icon: <CreditCard size={20} />, label: 'পেমেন্ট মেথড' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'নোটিফিকেশন', count: 1 },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.03)] text-center max-w-md w-full flex flex-col items-center"
        >
          {/* Locked profile visual icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center border-2 border-brand-emerald/20">
              <User size={40} className="stroke-[1.5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-brand-gold text-brand-dark p-2 rounded-full shadow-lg border-2 border-white dark:border-[#1E1E1E]">
              <ShieldAlert size={16} strokeWidth={2.5} />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
            স্বাগতম দেশি মার্টে!
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-sm">
            আপনার প্রোফাইল তথ্য দেখতে, অর্ডার ট্র্যাকিং করতে, প্রিয় পণ্য উইশলিস্টে রাখতে এবং নিরাপদ কেনাকাটা সম্পন্ন করতে অনুগ্রহ করে লগইন করুন।
          </p>

          <button
            onClick={onLoginClick}
            className="w-full bg-brand-emerald hover:bg-brand-dark text-white py-3.5 rounded-[1.5rem] text-xs sm:text-sm font-bold shadow-md hover:shadow-[0_4px_20px_rgba(15,138,95,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>লগইন / নতুন অ্যাকাউন্ট তৈরি</span>
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pb-12">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
        
        {/* Left Side: Profile overview & Menu selectors */}
        <div className="w-full lg:w-1/3 bg-white dark:bg-[#1E1E1E] rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden border-4 border-brand-emerald shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-1 bg-brand-emerald text-white p-1.5 rounded-full shadow cursor-pointer hover:bg-brand-dark transition-colors border border-white">
              <Edit2 size={12} />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{userInfo.name}</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">{userInfo.email}</p>
          
          <div className="w-full border-t border-gray-50 dark:border-gray-800 my-5"></div>
          
          {/* Menu Items (Side Selector on Desktop, List on Mobile) */}
          <div className="w-full flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = activeSubTab === item.id;
              return (
                <button 
                  key={item.id} 
                  onClick={() => setActiveSubTab(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${isActive ? 'bg-brand-emerald/10 text-brand-emerald font-semibold border-l-4 border-brand-emerald' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#252525]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-brand-emerald' : 'text-gray-400'}>{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.count && (
                      <span className="bg-brand-emerald text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight size={14} className="text-gray-400 opacity-60" />
                  </div>
                </button>
              );
            })}
          </div>

          <button 
            onClick={onLogout}
            className="w-full mt-6 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 text-red-600 dark:text-red-400 font-semibold p-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span className="text-sm">লগ আউট</span>
          </button>
        </div>

        {/* Right Side: Active Section Details */}
        <div className="w-full lg:w-2/3 bg-white dark:bg-[#1E1E1E] rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* PROFILE INFO */}
            {activeSubTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-800">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">প্রোফাইল তথ্য</h3>
                    <p className="text-xs text-gray-400 mt-0.5">আপনার ব্যক্তিগত তথ্য পরিবর্তন করুন</p>
                  </div>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-brand-emerald text-sm font-semibold flex items-center gap-1.5 border border-brand-emerald/20 hover:bg-brand-emerald/5 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Edit2 size={14} /> এডিট
                    </button>
                  ) : (
                    <button 
                      onClick={handleSaveProfile}
                      className="bg-brand-emerald hover:bg-brand-dark text-white text-sm font-semibold flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Check size={14} /> সংরক্ষণ করুন
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase">পূর্ণ নাম</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] dark:text-white rounded-lg px-3 py-2 text-sm focus:border-brand-emerald focus:outline-none"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2.5 p-1">
                        <User size={16} className="text-gray-400" />
                        {userInfo.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase">ই-মেইল এড্রেস</label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] dark:text-white rounded-lg px-3 py-2 text-sm focus:border-brand-emerald focus:outline-none"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2.5 p-1">
                        <Mail size={16} className="text-gray-400" />
                        {userInfo.email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase">মোবাইল নম্বর</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] dark:text-white rounded-lg px-3 py-2 text-sm focus:border-brand-emerald focus:outline-none"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2.5 p-1">
                        <Phone size={16} className="text-gray-400" />
                        {userInfo.phone}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase">অ্যাকাউন্ট ভেরিফিকেশন</label>
                    <div className="text-sm font-medium text-brand-emerald flex items-center gap-2 p-1">
                      <ShieldCheck size={18} />
                      ভেরিফাইড অ্যাকাউন্ট
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* WISHLIST */}
            {activeSubTab === 'wishlist' && (
              <motion.div 
                key="wishlist"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">আমার উইশলিস্ট</h3>
                  <p className="text-xs text-gray-400 mt-0.5">আপনার পছন্দের পণ্যের তালিকা</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mock products in wishlist */}
                  {[
                    { id: 1, name: 'সুন্দরবনের খাঁটি মধু', price: '৳ ৫৫০', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=150&h=150' },
                    { id: 2, name: 'প্রিমিয়াম দেশি ঘি', price: '৳ ৬০০', image: 'https://images.unsplash.com/photo-1589733966041-f764b55412c3?auto=format&fit=crop&w=150&h=150' },
                  ].map(prod => (
                    <div key={prod.id} className="flex gap-3 bg-gray-50/50 dark:bg-[#222] p-3 rounded-xl border border-gray-100/80 dark:border-gray-800">
                      <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-lg bg-white shrink-0" />
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{prod.name}</h4>
                        <span className="text-brand-emerald font-bold text-sm mt-1">{prod.price}</span>
                        <button className="text-[10px] text-red-500 font-medium hover:underline mt-1 w-max">মুছে ফেলুন</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ADDRESSES */}
            {activeSubTab === 'addresses' && (
              <motion.div 
                key="addresses"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">সংরক্ষিত ঠিকানা সমূহ</h3>
                    <p className="text-xs text-gray-400 mt-0.5">আপনার শিপিং ও বিলিং অ্যাড্রেস ম্যানেজ করুন</p>
                  </div>
                  <button className="text-brand-emerald text-sm font-semibold border border-brand-emerald/20 hover:bg-brand-emerald/5 px-3 py-1.5 rounded-lg transition-colors">
                    + নতুন যোগ করুন
                  </button>
                </div>

                <div className="space-y-3">
                  {addresses.map(addr => (
                    <div key={addr.id} className="flex gap-3.5 bg-gray-50/50 dark:bg-[#222] p-4 rounded-xl border border-gray-100/80 dark:border-gray-800 relative">
                      <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{addr.type}</span>
                          {addr.isDefault && (
                            <span className="bg-brand-emerald/10 text-brand-emerald text-[9px] px-2 py-0.5 rounded-full font-bold">ডিফল্ট</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">{addr.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CARDS */}
            {activeSubTab === 'cards' && (
              <motion.div 
                key="cards"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">আমার পেমেন্ট মেথড</h3>
                    <p className="text-xs text-gray-400 mt-0.5">সংরক্ষিত কার্ড ও পেমেন্ট ওয়ালেট</p>
                  </div>
                  <button className="text-brand-emerald text-sm font-semibold border border-brand-emerald/20 hover:bg-brand-emerald/5 px-3 py-1.5 rounded-lg transition-colors">
                    + নতুন কার্ড যোগ করুন
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedCards.map(card => (
                    <div key={card.id} className="bg-gradient-to-br from-brand-dark to-[#0f4630] text-white p-5 rounded-[1.5rem] relative shadow overflow-hidden flex flex-col justify-between h-36">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-emerald/20 rounded-full blur-2xl"></div>
                      
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold uppercase tracking-widest">{card.type}</span>
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                          <CreditCard size={16} />
                        </div>
                      </div>
                      
                      <div className="text-base font-mono tracking-widest my-2">
                        {card.number}
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="text-[10px] opacity-60 uppercase">মেয়াদকাল: {card.expiry}</div>
                        <button className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded">মুছুন</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* NOTIFICATIONS */}
            {activeSubTab === 'notifications' && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">আমার নোটিফিকেশন</h3>
                  <p className="text-xs text-gray-400 mt-0.5">সব অফার ও অর্ডার সংক্রান্ত বার্তা</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, title: 'আপনার অর্ডার #DM-1092 প্রক্রিয়াকরণ করা হচ্ছে', desc: 'আজ সকাল ১০:৩০ মিনিটে আপনার অর্ডারটি সফলভাবে রিসিভ করা হয়েছে।', time: '২ ঘণ্টা আগে', isUnread: true },
                    { id: 2, title: 'ঈদ ধামাকা অফার! ২০% পর্যন্ত ক্যাশব্যাক!', desc: 'বিকাশ পেমেন্টে কেনাকাটা করলেই পাচ্ছেন আকর্ষণীয় ঈদ উপহার ও ছাড়।', time: '১ দিন আগে', isUnread: false },
                  ].map(notif => (
                    <div key={notif.id} className={`p-4 rounded-xl border flex gap-3.5 relative ${notif.isUnread ? 'bg-brand-emerald/5 border-brand-emerald/15 dark:bg-brand-emerald/10 dark:border-brand-emerald/20' : 'bg-gray-50/50 border-gray-100/80 dark:bg-[#222] dark:border-gray-800'}`}>
                      {notif.isUnread && (
                        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-emerald"></span>
                      )}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notif.isUnread ? 'bg-brand-emerald/15 text-brand-emerald' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                        <Bell size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200">{notif.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">{notif.desc}</p>
                        <span className="text-[10px] text-gray-400 mt-2 block">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
