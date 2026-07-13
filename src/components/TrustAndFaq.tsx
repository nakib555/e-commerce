import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, RotateCcw, BadgeCheck, ChevronDown, HelpCircle, HeartHandshake, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export function TrustAndFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const trustItems = [
    {
      id: 1,
      icon: <BadgeCheck className="text-brand-emerald" size={24} />,
      title: '১০০% খাঁটি ও অর্গানিক',
      description: 'সরাসরি কৃষক ও বিশ্বস্ত খামার থেকে সংগৃহীত একদম ভেজালমুক্ত পণ্য।'
    },
    {
      id: 2,
      icon: <Truck className="text-[#6DB33F]" size={24} />,
      title: 'দ্রুত ডেলিভারি',
      description: 'সারাদেশে দ্রুততম সময়ে আপনার দোরগোড়ায় নিরাপদ হোম ডেলিভারি।'
    },
    {
      id: 3,
      icon: <RotateCcw className="text-brand-gold" size={24} />,
      title: 'সহজ রিটার্ন সুবিধা',
      description: 'পণ্যে যেকোনো সমস্যা থাকলে ৭ দিনের মধ্যে সহজ এক্সচেঞ্জ বা রিটার্ন।'
    },
    {
      id: 4,
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
      title: 'নিরাপদ পেমেন্ট',
      description: 'বিকাশ, রকেট, নগদ বা ক্যাশ অন ডেলিভারিতে সম্পূর্ণ নিরাপদ পেমেন্ট।'
    }
  ];

  const faqs: FaqItem[] = [
    {
      question: 'আপনাদের পণ্যগুলো কি সত্যিই ১০০% খাঁটি?',
      answer: 'জী, আমাদের সুন্দরবনের মধু, গাওয়া ঘি, এবং সরিষার তেলসহ সকল খাদ্যপণ্য নিজস্ব তত্ত্বাবধানে সরাসরি উৎস থেকে সংগ্রহ করা হয়। আমরা শতভাগ বিশুদ্ধতার নিশ্চয়তা দিচ্ছি।'
    },
    {
      question: 'ডেলিভারি চার্জ কত এবং কতদিনের মধ্যে পাবো?',
      answer: 'ঢাকা সিটির ভেতরে ডেলিভারি চার্জ ৬০ টাকা এবং ঢাকার বাইরে ১২০ টাকা। সাধারণত ঢাকা সিটির ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৩-৫ দিনের মধ্যে ডেলিভারি সম্পন্ন করা হয়।'
    },
    {
      question: 'আমি কি ক্যাশ অন ডেলিভারি (COD) সুবিধা পাবো?',
      answer: 'জী অবশ্যই! আপনি পুরো বাংলাদেশেই ক্যাশ অন ডেলিভারি সুবিধা পাবেন। পণ্য হাতে পেয়ে দেখে তারপর মূল্য পরিশোধ করতে পারবেন।'
    },
    {
      question: 'পণ্যে কোনো সমস্যা থাকলে ফেরত দেওয়ার নিয়ম কি?',
      answer: 'পণ্য গ্রহণের সময় কোনো ত্রুটি বা সমস্যা থাকলে সাথে সাথে আমাদের ডেলিভারি পার্টনারকে জানান অথবা ২৪ ঘণ্টার মধ্যে আমাদের কাস্টমার কেয়ারে যোগাযোগ করুন। আমরা সম্পূর্ণ ফ্রিতে পণ্য পরিবর্তন বা রিফান্ড করে দেবো।'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-6 sm:py-10 bg-white dark:bg-[#121212]">
      {/* Visual Divider line */}
      <div className="w-full h-px bg-gray-100 dark:bg-gray-800/80 mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
        
        {/* Left Side: Trust items and payment partner graphics */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-emerald/10 text-brand-emerald dark:bg-brand-emerald/20 rounded-full text-[11px] font-extrabold mb-2.5">
              <Sparkles size={11} className="animate-pulse" />
              <span>আমাদের অঙ্গীকার</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-800 dark:text-gray-100 tracking-tight flex items-center gap-2">
              <HeartHandshake className="text-brand-emerald" size={22} />
              কেন দেশি মার্ট থেকে কিনবেন?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              গুণগত মান এবং বিশ্বস্ততাই আমাদের ব্যবসার মূল চালিকাশক্তি
            </p>
          </div>

          {/* Trust Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 sm:p-5 rounded-[1.5rem] bg-gray-50/50 dark:bg-[#1C1C1C]/40 border border-gray-100/80 dark:border-gray-800/80 hover:border-brand-emerald/20 hover:bg-white dark:hover:bg-[#1E1E1E] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#222] shadow-sm flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-extrabold text-gray-800 dark:text-gray-200 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Payment Partners representation */}
          <div className="pt-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 block mb-3">আমাদের পেমেন্ট মেথড সমূহ:</span>
            <div className="flex flex-wrap gap-2.5 items-center">
              {['bkash', 'nagad', 'rocket', 'visa', 'mastercard', 'cod'].map((payment) => (
                <div 
                  key={payment}
                  className="px-3 py-1.5 bg-gray-50 dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider shadow-sm hover:scale-105 transition-transform"
                >
                  {payment === 'cod' ? 'ক্যাশ অন ডেলিভারি' : payment}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: FAQ Section with Expandable items */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-800 dark:text-gray-100 tracking-tight flex items-center gap-2">
              <HelpCircle className="text-brand-emerald animate-bounce" size={22} />
              সাধারণ জিজ্ঞাসাসমূহ (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              কেনাকাটা সংক্রান্ত প্রয়োজনীয় প্রশ্নের উত্তরসমূহ দেখে নিন
            </p>
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-[1.5rem] border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-[#1A1A1A]/30 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-4 sm:px-5 py-4 flex items-center justify-between text-left gap-3 focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 shrink-0"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-4 sm:px-5 pb-4 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-850 pt-3 bg-white dark:bg-[#1A1A1A] font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
