import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Phone, ShieldCheck, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; phone: string; address: string }) => void;
  redirectReason?: string; // e.g. "পণ্য কিনতে অনুগ্রহ করে লগইন করুন"
}

export function AuthModal({ isOpen, onClose, onLoginSuccess, redirectReason }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginType, setLoginType] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Fields
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(60);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOtpSent, otpCountdown]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      setErrors({ phone: 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' });
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setOtpCountdown(60);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setErrors({ otp: 'অনুগ্রহ করে সঠিক ৪ ডিজিটের ওটিপি (OTP) দিন' });
      return;
    }
    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: name || 'রকিব হাসান',
        email: email || 'rakib@example.com',
        phone: phone.startsWith('+880') ? phone : `+880 ${phone.replace(/^0/, '')}`,
        address: address || 'বাসা ১২, রোড ৪, ধানমন্ডি, ঢাকা',
      });
      onClose();
    }, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!email || !email.includes('@')) {
      newErrors.email = 'সঠিক ইমেল ঠিকানা লিখুন';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে';
    }
    if (authMode === 'signup' && !name.trim()) {
      newErrors.name = 'আপনার নাম লিখুন';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: name || 'রকিব হাসান',
        email: email,
        phone: phone || '+880 1712 345678',
        address: address || 'বাসা ১২, রোড ৪, ধানমন্ডি, ঢাকা',
      });
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative bg-white dark:bg-[#1C1C1C] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800/80"
        >
          {/* Top colored accent bar */}
          <div className="h-2 bg-gradient-to-r from-brand-emerald via-[#6DB33F] to-brand-gold w-full" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
          >
            <X size={18} />
          </button>

          <div className="p-6 sm:p-8">
            {/* Header / Brand Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-2xl font-heading font-extrabold text-brand-dark dark:text-brand-emerald mb-2">
                <ShoppingBag className="text-brand-emerald animate-pulse" size={24} />
                <span>Deshi<span className="text-brand-emerald">Mart</span></span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                বাংলাদেশের সেরা ঐতিহ্যবাহী ও অর্গানিক পণ্যের বিশ্বস্ত অনলাইন শপ
              </p>

              {/* Redirect warning / Buying constraints info */}
              {redirectReason && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 rounded-2xl border border-amber-100/40 dark:border-amber-900/20 text-xs font-bold flex items-center justify-center gap-2">
                  <Sparkles size={14} className="animate-bounce shrink-0" />
                  <span>{redirectReason}</span>
                </div>
              )}
            </div>

            {/* Auth mode switcher (Login / Signup) */}
            <div className="flex bg-gray-100 dark:bg-[#121212] p-1.5 rounded-2xl mb-6">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setErrors({});
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-[#222] text-brand-dark dark:text-brand-emerald shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                লগইন
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setErrors({});
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  authMode === 'signup'
                    ? 'bg-white dark:bg-[#222] text-brand-dark dark:text-brand-emerald shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                নতুন অ্যাকাউন্ট
              </button>
            </div>

            {/* Sub-tab: Phone vs Email switcher (Only for Login) */}
            {authMode === 'login' && (
              <div className="flex gap-4 justify-center mb-6">
                <button
                  onClick={() => setLoginType('phone')}
                  className={`text-xs font-bold pb-1 border-b-2 transition-all ${
                    loginType === 'phone'
                      ? 'border-brand-emerald text-brand-emerald'
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  মোবাইল নম্বর দিয়ে
                </button>
                <button
                  onClick={() => setLoginType('email')}
                  className={`text-xs font-bold pb-1 border-b-2 transition-all ${
                    loginType === 'email'
                      ? 'border-brand-emerald text-brand-emerald'
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  ইমেইল দিয়ে
                </button>
              </div>
            )}

            {/* Dynamic Form Content */}
            {authMode === 'login' && loginType === 'phone' ? (
              /* PHONE LOGIN / OTP */
              <div className="space-y-4">
                {!isOtpSent ? (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      মোবাইল নম্বর
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 text-xs sm:text-sm font-bold border-r border-gray-200 dark:border-gray-800 pr-2">
                        +৮৮
                      </div>
                      <input
                        type="tel"
                        placeholder="017XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        className="block w-full pl-16 pr-3 py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] dark:text-white rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-shadow font-semibold"
                        maxLength={11}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-red-500 mt-1.5 font-bold">{errors.phone}</p>
                    )}

                    <button
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="w-full mt-5 bg-brand-emerald hover:bg-brand-dark text-white py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>ওটিপি পাঠান (Send OTP)</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-3.5 rounded-2xl border border-brand-emerald/10 text-center">
                      <p className="text-xs text-brand-emerald font-semibold">
                        আমরা +৮৮ {phone} নম্বরে একটি ওটিপি কোড পাঠিয়েছি
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsOtpSent(false)}
                        className="text-[10px] text-gray-400 hover:text-brand-emerald underline mt-1 font-bold"
                      >
                        নম্বর পরিবর্তন করুন
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                        ৪ ডিজিট ওটিপি কোড (OTP)
                      </label>
                      <input
                        type="text"
                        placeholder="XXXX"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        className="block w-full px-3 py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] dark:text-white rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald text-center tracking-widest font-extrabold"
                        maxLength={4}
                      />
                      {errors.otp && (
                        <p className="text-[10px] text-red-500 mt-1.5 font-bold">{errors.otp}</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">কোড পাননি?</span>
                      {otpCountdown > 0 ? (
                        <span className="text-gray-400 font-medium">পুনরায় পাঠান ({otpCountdown} সেকেন্ড)</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpCountdown(60);
                          }}
                          className="text-brand-emerald font-bold hover:underline"
                        >
                          কোড পুনরায় পাঠান
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-brand-emerald hover:bg-brand-dark text-white py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck size={18} />
                          <span>ভেরিফাই করুন ও লগইন করুন</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* EMAIL LOGIN or SIGNUP */
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      আপনার নাম
                    </label>
                    <input
                      type="text"
                      placeholder="মোঃ রকিব হাসান"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] dark:text-white rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-emerald font-semibold"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    ইমেইল এড্রেস
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] dark:text-white rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-emerald font-semibold"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.email}</p>
                  )}
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      মোবাইল নম্বর
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                      <input
                        type="tel"
                        placeholder="017XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] dark:text-white rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-emerald font-semibold"
                        maxLength={11}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-10 py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] dark:text-white rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-emerald font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.password}</p>
                  )}
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      ডেলিভারি ঠিকানা (ঐচ্ছিক)
                    </label>
                    <textarea
                      placeholder="বাসা, সড়ক, এলাকা, জেলা"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] dark:text-white rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-emerald font-semibold h-16 resize-none"
                    />
                  </div>
                )}

                {authMode === 'login' && (
                  <div className="text-right">
                    <a href="#" className="text-xs text-brand-emerald hover:underline font-semibold">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand-emerald hover:bg-brand-dark text-white py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{authMode === 'login' ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন'}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick social login / Help banner */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                অথবা সামাজিক যোগাযোগ মাধ্যমে
              </span>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      onLoginSuccess({
                        name: 'নাকিব হাসান',
                        email: 'nakib@example.com',
                        phone: '+880 1812 987654',
                        address: 'ধানমন্ডি, ঢাকা',
                      });
                      onClose();
                    }, 1000);
                  }}
                  className="px-4 py-2 bg-[#1877F2]/10 dark:bg-[#1877F2]/20 text-[#1877F2] rounded-xl text-xs font-bold hover:bg-[#1877F2]/20 transition-all flex items-center gap-1.5"
                >
                  Facebook
                </button>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      onLoginSuccess({
                        name: 'নাকিব হাসান',
                        email: 'nakib@example.com',
                        phone: '+880 1812 987654',
                        address: 'ধানমন্ডি, ঢাকা',
                      });
                      onClose();
                    }, 1000);
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-[#121212] text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all flex items-center gap-1.5 border border-gray-200 dark:border-gray-800"
                >
                  Google
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
