import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  isLoggedIn?: boolean;
  user?: { name: string; email: string; phone: string; address: string } | null;
  onRequireLogin?: (reason: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isLoggedIn = false,
  user = null,
  onRequireLogin
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  
  // Checkout form state
  const [name, setName] = useState('রকিব হাসান');
  const [phone, setPhone] = useState('+880 1712 345678');
  const [address, setAddress] = useState('বাসা ১২, রোড ৪, ধানমন্ডি, ঢাকা');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'cod'>('bkash');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0; // 10% promo discount
  const deliveryFee = subtotal > 1499 || subtotal === 0 ? 0 : 50;
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'EID2026') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('ভুল প্রোমো কোড! অনুগ্রহ করে "EID2026" ব্যবহার করুন।');
    }
  };

  const handleValidation = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'নাম লিখুন';
    if (!phone.trim() || phone.length < 11) errors.phone = 'সঠিক মোবাইল নম্বর লিখুন';
    if (!address.trim()) errors.address = 'ডেলিভারি ঠিকানা লিখুন';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      setStep('success');
    }
  };

  const handleReset = () => {
    setStep('cart');
    setPromoApplied(false);
    setPromoCode('');
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-white dark:bg-[#1A1A1A] z-[101] shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#151515]/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-800 dark:text-gray-100">আপনার শপিং কার্ট</h3>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {step === 'cart' && `${cartItems.length} টি পণ্য যুক্ত করা হয়েছে`}
                    {step === 'checkout' && 'ডেলিভারি ও পেমেন্ট বিবরণ'}
                    {step === 'success' && 'অর্ডার সফল হয়েছে!'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {step === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-4">
                        <ShoppingBag size={28} />
                      </div>
                      <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-1">আপনার কার্টটি খালি!</h4>
                      <p className="text-xs text-gray-400 max-w-[250px] leading-relaxed mb-6">
                        দেশি মার্টের চমৎকার সব পণ্য দেখে কার্টে যুক্ত করুন।
                      </p>
                      <button
                        onClick={onClose}
                        className="bg-brand-emerald hover:bg-brand-dark text-white px-5 py-2 rounded-xl text-xs font-semibold shadow transition-colors"
                      >
                        কেনাকাটা শুরু করুন
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <motion.div
                          layout
                          key={item.product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3 bg-gray-50/50 dark:bg-[#222]/30 p-3 rounded-2xl border border-gray-100/80 dark:border-gray-800/80"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 dark:border-gray-800">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                              {item.product.name}
                            </h4>
                            <div className="flex items-baseline gap-1.5 mt-1">
                              <span className="text-xs sm:text-sm font-extrabold text-brand-emerald">
                                ৳{item.product.price}
                              </span>
                              {item.product.oldPrice && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  ৳{item.product.oldPrice}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity controls */}
                              <div className="flex items-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg p-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 text-gray-400 hover:text-brand-emerald"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Promo Code Card */}
                      <div className="bg-[#E8F5E9]/30 dark:bg-emerald-950/10 border border-brand-emerald/15 rounded-2xl p-3 mt-4">
                        <div className="flex items-center gap-1 text-brand-emerald text-xs font-bold mb-2">
                          <Sparkles size={14} />
                          <span>প্রোমো কোড ব্যবহার করুন</span>
                        </div>
                        {promoApplied ? (
                          <div className="flex items-center justify-between text-xs bg-brand-emerald/10 dark:bg-brand-emerald/20 text-brand-emerald px-3 py-2 rounded-lg font-bold">
                            <span>"EID2026" প্রোমো কোড সক্রিয়!</span>
                            <span>১০% ছাড়</span>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder='কোড দিন (যেমন: "EID2026")'
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="flex-1 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-emerald"
                            />
                            <button
                              onClick={handleApplyPromo}
                              className="bg-brand-emerald text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-brand-dark"
                            >
                              প্রয়োগ করুন
                            </button>
                          </div>
                        )}
                        {promoError && (
                          <p className="text-[10px] text-red-500 mt-1 font-semibold">{promoError}</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 'checkout' && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-800 pb-2">
                    <CreditCard size={16} className="text-brand-emerald" />
                    ডেলিভারি তথ্য
                  </h4>

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">নাম</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-emerald"
                    />
                    {formErrors.name && (
                      <p className="text-[10px] text-red-500 font-semibold">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">মোবাইল নম্বর</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-emerald"
                    />
                    {formErrors.phone && (
                      <p className="text-[10px] text-red-500 font-semibold">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Address Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">ডেলিভারি ঠিকানা</label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-emerald resize-none"
                    />
                    {formErrors.address && (
                      <p className="text-[10px] text-red-500 font-semibold">{formErrors.address}</p>
                    )}
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">পেমেন্ট মেথড</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                          paymentMethod === 'bkash'
                            ? 'border-brand-emerald bg-brand-emerald/5 dark:bg-brand-emerald/10'
                            : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                        }`}
                      >
                        <span className="text-xs font-bold text-pink-600">bKash</span>
                        <span className="text-[9px] text-gray-400 mt-1">অনলাইন পেমেন্ট</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                          paymentMethod === 'cod'
                            ? 'border-brand-emerald bg-brand-emerald/5 dark:bg-brand-emerald/10'
                            : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                        }`}
                      >
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-200">Cash on Delivery</span>
                        <span className="text-[9px] text-gray-400 mt-1">পণ্য বুঝে পেয়ে পেমেন্ট</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {step === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-16 h-16 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mb-5"
                  >
                    <CheckCircle2 size={36} className="text-brand-emerald" />
                  </motion.div>
                  <h3 className="font-heading font-extrabold text-lg text-gray-800 dark:text-gray-100 mb-1">
                    অর্ডার সফলভাবে সম্পন্ন হয়েছে!
                  </h3>
                  <p className="text-xs text-brand-emerald font-bold mb-3">অর্ডার আইডি: #DM-2026-98</p>
                  <p className="text-xs text-gray-400 max-w-[280px] leading-relaxed mb-6">
                    ধন্যবাদ! আপনার অর্ডারটি প্রক্রিয়াকরণ শুরু হয়েছে। শীঘ্রই আমাদের ডেলিভারি টিম আপনার ঠিকানায় পৌঁছে যাবে।
                  </p>
                  <div className="bg-gray-50 dark:bg-[#222]/40 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl w-full max-w-[320px] text-left space-y-2.5 text-xs mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ডেলিভারি ঠিকানা:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 max-w-[180px] text-right truncate">{address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">মোবাইল:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">পেমেন্ট মেথড:</span>
                      <span className="font-semibold text-brand-emerald">{paymentMethod === 'bkash' ? 'বিকাশ অনলাইন' : 'ক্যাশ অন ডেলিভারি'}</span>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex justify-between text-sm font-extrabold">
                      <span className="text-gray-800 dark:text-gray-200">মোট পরিশোধিত:</span>
                      <span className="text-brand-emerald">৳{total}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleReset}
                    className="bg-brand-emerald hover:bg-brand-dark text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow transition-colors w-full max-w-[320px]"
                  >
                    শপিং চালিয়ে যান
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary Area */}
            {cartItems.length > 0 && step !== 'success' && (
              <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#151515]/50 space-y-4">
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>পণ্যের মূল্য</span>
                    <span>৳{subtotal}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-brand-emerald font-semibold">
                      <span>প্রোমো কোড (১০% ছাড়)</span>
                      <span>-৳{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>ডেলিভারি ফি</span>
                    <span>{deliveryFee === 0 ? '৳০ (ফ্রি)' : `৳${deliveryFee}`}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-extrabold text-base text-gray-800 dark:text-white">
                    <span>সর্বমোট মূল্য</span>
                    <span className="text-brand-emerald">৳{total}</span>
                  </div>
                </div>

                {/* Main Call to Action Button */}
                {step === 'cart' ? (
                  <button
                    onClick={() => {
                      if (isLoggedIn) {
                        setStep('checkout');
                      } else {
                        onRequireLogin?.('পণ্য কিনতে অনুগ্রহ করে লগইন করুন');
                      }
                    }}
                    className="w-full bg-brand-emerald hover:bg-brand-dark text-white py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <span>চেকআউট করুন</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('cart')}
                      className="flex-1 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      কার্টে ফিরে যান
                    </button>
                    <button
                      onClick={handleCheckoutSubmit}
                      className="flex-1 bg-brand-emerald text-white py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-dark transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck size={16} />
                      <span>অর্ডার নিশ্চিত করুন</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
