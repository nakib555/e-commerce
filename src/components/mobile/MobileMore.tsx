import React, { useState } from 'react';
import { HelpCircle, Info, FileText, Shield, MessageSquare, ChevronRight, ChevronDown, Mail, Phone, MapPin, Send, CheckCircle2, Smartphone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MobileMore() {
  const [activeSection, setActiveSection] = useState<'menu' | 'help' | 'contact' | 'about'>('menu');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const faqs = [
    { q: 'দেশিমার্ট থেকে কীভাবে পণ্য অর্ডার করব?', a: 'পছন্দের পণ্য কার্টে যোগ করে শিপিং তথ্য দিন এবং পেমেন্ট সম্পন্ন করে অর্ডার নিশ্চিত করুন।' },
    { q: 'ডেলিভারি চার্জ কত এবং কত সময় লাগে?', a: 'ঢাকার ভেতর ডেলিভারি ফি ৫০ টাকা (১-২ দিন) এবং ঢাকার বাইরে ১০০ টাকা (৩-৫ দিন)।' },
    { q: 'মূল্য পরিশোধের পদ্ধতিগুলো কী কী?', a: 'বিকাশ, রকেট, নগদ অনলাইন পেমেন্ট অথবা ক্যাশ অন ডেলিভারি (পণ্য বুঝে পেয়ে মূল্য পরিশোধ)।' },
    { q: 'পণ্য ফেরত দেওয়ার নিয়ম কী?', a: 'পণ্য গ্রহণের ২৪ ঘণ্টার মধ্যে আমাদের সাপোর্ট সেন্টারে যোগাযোগ করে শর্ত সাপেক্ষে ফেরত পাঠাতে পারবেন।' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setActiveSection('menu');
    }, 2500);
  };

  return (
    <div className="w-full min-h-screen pb-12">
      <AnimatePresence mode="wait">
        
        {/* MAIN MENU LIST */}
        {activeSection === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6">
              <h2 className="text-xl sm:text-3xl font-heading font-bold text-gray-800 dark:text-gray-100">আরও তথ্য ও সাহায্য</h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">আমাদের সাপোর্ট এবং সার্ভিস সংক্রান্ত তথ্যাবলী</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Support Cards */}
              <button 
                onClick={() => setActiveSection('help')}
                className="flex items-center justify-between p-5 bg-white dark:bg-[#1E1E1E] rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                    <HelpCircle size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">সাহায্য ও সাধারণ জিজ্ঞাসা (FAQ)</h3>
                    <p className="text-xs text-gray-400 mt-0.5">সব ধরণের প্রশ্ন ও উত্তর দেখে নিন</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button 
                onClick={() => setActiveSection('contact')}
                className="flex items-center justify-between p-5 bg-white dark:bg-[#1E1E1E] rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">যোগাযোগ করুন</h3>
                    <p className="text-xs text-gray-400 mt-0.5">আমাদের সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button 
                onClick={() => setActiveSection('about')}
                className="flex items-center justify-between p-5 bg-white dark:bg-[#1E1E1E] rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all text-left md:col-span-2"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                    <Info size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">আমাদের সম্পর্কে</h3>
                    <p className="text-xs text-gray-400 mt-0.5">দেশিমার্ট এবং দেশি পণ্যের অগ্রযাত্রা</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              {/* Install PWA Prompt Card */}
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('show-pwa-install'))}
                className="flex items-center justify-between p-5 bg-gradient-to-r from-brand-emerald to-emerald-600 text-white rounded-[1.5rem] shadow-sm hover:shadow-md transition-all text-left md:col-span-2 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone size={120} />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                    <Smartphone size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                      মোবাইল অ্যাপ ইনস্টল করুন <span className="bg-brand-gold text-brand-dark font-black text-[9px] px-1.5 py-0.5 rounded-full uppercase animate-bounce">NEW</span>
                    </h3>
                    <p className="text-xs text-white/85 mt-0.5">হোম স্ক্রিন শর্টকাট সহ সেরা পারফরম্যান্স পান</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/80" />
              </button>
            </div>

            {/* Privacy and Terms Links */}
            <div className="mt-8 bg-gray-50 dark:bg-[#1A1A1A] rounded-[1.5rem] p-4 border border-gray-100 dark:border-gray-800/60 max-w-lg mx-auto flex items-center justify-around text-xs font-semibold text-gray-500 dark:text-gray-400">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-emerald flex items-center gap-1">
                <FileText size={14} /> শর্তাবলী
              </a>
              <span className="text-gray-300 dark:text-gray-800">|</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-emerald flex items-center gap-1">
                <Shield size={14} /> প্রাইভেসি পলিসি
              </a>
            </div>

            <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-12">
              <p className="font-medium">ভার্সন ২.১.০</p>
              <p className="mt-1">© ২০২৬ দেশিমার্ট. সর্বস্বত্ব সংরক্ষিত.</p>
            </div>
          </motion.div>
        )}

        {/* FAQ SECTION */}
        {activeSection === 'help' && (
          <motion.div
            key="help"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-150 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">সাধারণ জিজ্ঞাসা (FAQ)</h3>
                <p className="text-xs text-gray-400 mt-0.5">সবচেয়ে বেশি জানতে চাওয়া প্রশ্নগুলোর উত্তর</p>
              </div>
              <button 
                onClick={() => setActiveSection('menu')}
                className="text-xs font-bold text-brand-emerald hover:underline"
              >
                ফিরে যান
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden transition-shadow shadow-sm"
                  >
                    <button 
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-gray-700 dark:text-gray-200"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-gray-50/50 dark:bg-[#252525]/30 border-t border-gray-50 dark:border-gray-800/80"
                        >
                          <p className="p-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* CONTACT US */}
        {activeSection === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-150 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">যোগাযোগ করুন</h3>
                <p className="text-xs text-gray-400 mt-0.5">আপনার কোনো মতামত বা সমস্যা থাকলে আমাদের জানান</p>
              </div>
              <button 
                onClick={() => setActiveSection('menu')}
                className="text-xs font-bold text-brand-emerald hover:underline"
              >
                ফিরে যান
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200">হেল্পলাইন</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+৮৮০ ৯৬১২ ৩৪৫৬৭৮</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200">ই-মেইল</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">support@deshimart.com.bd</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200">প্রধান কার্যালয়</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">ধানমন্ডি ১২/এ, ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>
              </div>

              {/* Message Form */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle2 size={44} className="text-brand-emerald mb-3 animate-bounce" />
                    <h4 className="font-bold text-gray-800 dark:text-white text-sm">বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
                    <p className="text-xs text-gray-400 mt-1">আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200 mb-2">সরাসরি বার্তা পাঠান</h4>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">নাম</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] dark:text-white rounded-lg px-3 py-2 text-xs focus:border-brand-emerald focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">ই-মেইল</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] dark:text-white rounded-lg px-3 py-2 text-xs focus:border-brand-emerald focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">বার্তা</label>
                      <textarea 
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] dark:text-white rounded-lg px-3 py-2 text-xs focus:border-brand-emerald focus:outline-none resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-emerald hover:bg-brand-dark text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Send size={12} /> বার্তা পাঠান
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ABOUT US */}
        {activeSection === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-150 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">আমাদের সম্পর্কে</h3>
                <p className="text-xs text-gray-400 mt-0.5">দেশিমার্ট এর গল্প ও দৃষ্টিভঙ্গি</p>
              </div>
              <button 
                onClick={() => setActiveSection('menu')}
                className="text-xs font-bold text-brand-emerald hover:underline"
              >
                ফিরে যান
              </button>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-100 dark:border-gray-800 p-6 space-y-4 max-w-2xl mx-auto leading-relaxed">
              <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-[1.5rem] flex items-center justify-center mb-2">
                <Info size={32} />
              </div>
              <h4 className="text-base font-bold text-gray-800 dark:text-white">দেশিমার্ট কেন আলাদা?</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                দেশিমার্ট বাংলাদেশের অন্যতম জনপ্রিয় অনলাইন স্টোর যা গ্রামীণ উদ্যোক্তা এবং কৃষকদের উৎপাদিত খাঁটি ও অর্গানিক দেশি পণ্য সরাসরি শহুরে ভোক্তাদের নিকট পৌঁছে দেয়। আমাদের লক্ষ্য হলো দেশি পণ্যের প্রসার ঘটানো এবং ভোক্তাদের শতভাগ খাঁটি ও বিশুদ্ধ পণ্যের নিশ্চয়তা প্রদান করা।
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                মধু, ঘি, অর্গানিক চাল, সরিষার তেল সহ অসংখ্য নিত্য প্রয়োজনীয় পণ্য সুনির্দিষ্ট মান নিয়ন্ত্রণ প্রক্রিয়ার মাধ্যমে সংগ্রহ করা হয়। আপনার কেনাকাটার প্রতিটি ধাপ নিরাপদ রাখতে আমরা বদ্ধপরিকর।
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
