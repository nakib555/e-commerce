import React, { useState } from 'react';
import { X, Star, ShoppingCart, Minus, Plus, Heart, Check, Truck, ShieldCheck, RotateCcw, Share2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

// Map product IDs to rich detailed descriptions, specs, and alternative images in Bengali
const getProductDetails = (id: string) => {
  const detailsMap: Record<string, {
    description: string;
    specs: { key: string; value: string }[];
    bullets: string[];
    thumbnails: string[];
  }> = {
    'f1': {
      description: 'আমাদের প্রিমিয়াম কটন পাঞ্জাবি ১০০% খাঁটি সুতি কাপড় দিয়ে তৈরি। এটি অত্যন্ত আরামদায়ক এবং যেকোনো সামাজিক ও উৎসবমুখর অনুষ্ঠানের জন্য চমৎকার পছন্দ। নিখুঁত সেলাই এবং মার্জিত ডিজাইনের সংমিশ্রণ একে অনন্য করে তুলেছে।',
      bullets: [
        '১০০% প্রিমিয়াম সুতি সুতা দিয়ে তৈরি',
        'উন্নত মানের এমব্রয়ডারি ওয়ার্ক',
        'রং নষ্ট বা ফ্যাকাশে হবে না',
        'অত্যন্ত আরামদায়ক এবং টেকসই'
      ],
      specs: [
        { key: 'উপাদান', value: '১০০% ফাইন কটন' },
        { key: 'ফিটিং', value: 'রেগুলার ফিট' },
        { key: 'কলার টাইপ', value: 'ব্যান্ড কলার' },
        { key: 'উৎপাদন', value: 'বাংলাদেশ' }
      ],
      thumbnails: [
        'https://images.unsplash.com/photo-1594938298596-36f5920b784a?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1593030761757-71fae46af504?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=400&h=500'
      ]
    },
    'f2': {
      description: 'বাঙালিয়ানা ঐতিহ্যের এক চমৎকার প্রতীক জামদানী শাড়ি। আমাদের এই শাড়িটি সরাসরি রূপগঞ্জের তাঁতিদের হাত থেকে সংগৃহীত। চমৎকার বুনন এবং দৃষ্টিনন্দন জরির কাজের সুনিপুণ ব্যবহারে এটি যেকোনো উৎসবে আপনার সৌন্দর্য দ্বিগুণ করে তুলবে।',
      bullets: [
        'ঐতিহ্যবাহী তাঁতের হাতে বোনা ডিজাইন',
        'প্রিমিয়াম হাফ-সিল্ক এবং সুতি মিশ্রণ',
        'নরম ও পরতে অত্যন্ত আরামদায়ক',
        'কুঁচি চমৎকারভাবে সেট হয়ে থাকে'
      ],
      specs: [
        { key: 'উপাদান', value: 'হাফ সিল্ক ও কটন মিশ্রণ' },
        { key: 'দৈর্ঘ্য', value: '১২ হাত (স্ট্যান্ডার্ড সাইজ)' },
        { key: 'ডিজাইন', value: 'ফুল বডি জ্যামিতিক নকশা' },
        { key: 'যত্ন', value: 'ড্রাই ক্লিন রিকমেন্ডেড' }
      ],
      thumbnails: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1583391733958-65e2874df10b?auto=format&fit=crop&q=80&w=400&h=500'
      ]
    },
    'f3': {
      description: 'আমাদের লাক্সারি মেনস ওয়াচ একটি আভিজাত্যপূর্ণ এবং আধুনিক ঘড়ি। এটি আপনার ব্যক্তিত্বকে আরও উজ্জ্বল করবে। মেটাল বেল্ট এবং চমৎকার ডায়ালের কম্বিনেশন একে যেকোনো ফর্মাল বা ক্যাজুয়াল আউটফিটের সাথে মানানসই করে তোলে।',
      bullets: [
        'উচ্চ মানের স্টেইনলেস স্টিল বেল্ট',
        'স্ক্র্যাচ-প্রতিরোধী স্যাফায়ার গ্লাস',
        'জল প্রতিরোধী (৩ ATM পর্যন্ত)',
        '১ বছরের মেকানিক্যাল ওয়ারেন্টি'
      ],
      specs: [
        { key: 'মুভমেন্ট', value: 'কোয়ার্টজ ক্রনোগ্রাফ' },
        { key: 'ডায়াল সাইজ', value: '৪২ মিমি' },
        { key: 'বেল্ট উপাদান', value: 'স্টেইনলেস স্টিল' },
        { key: 'ওয়াটার প্রুফ', value: 'হ্যাঁ (৩০ মিটার)' }
      ],
      thumbnails: [
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1508656910606-c87c062c3e21?auto=format&fit=crop&q=80&w=400&h=500'
      ]
    },
    'f4': {
      description: 'ভ্রমণপিপাসুদের জন্য সেরা সঙ্গী এই ট্রাভেল ব্যাকপ্যাক। এতে রয়েছে একাধিক পকেট এবং ল্যাপটপ চেম্বার। ওয়াটারপ্রুফ মেটেরিয়াল দিয়ে তৈরি হওয়ায় বৃষ্টির মধ্যেও আপনার প্রয়োজনীয় গ্যাজেট ও পোশাক থাকবে সম্পূর্ণ সুরক্ষিত।',
      bullets: [
        'সম্পূর্ণ ওয়াটারপ্রুফ পলিয়েস্টার ফ্যাব্রিক',
        '১৫.৬ ইঞ্চি ল্যাপটপ পকেট সহ চার্জিং পোর্ট',
        'আরামদায়ক প্যাডেড শোল্ডার স্ট্র্যাপ',
        'দীর্ঘস্থায়ী মজবুত চেইন এবং বাকেল'
      ],
      specs: [
        { key: 'ধারন ক্ষমতা', value: '৪০ লিটার' },
        { key: 'ওজন', value: '৮৫০ গ্রাম' },
        { key: 'উপাদান', value: '১৬৮০D ওয়াটারপ্রুফ নাইলন' },
        { key: 'ল্যাপটপ স্লট', value: 'হ্যাঁ (১৫.৬ ইঞ্চি)' }
      ],
      thumbnails: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=400&h=500'
      ]
    },
    'f5': {
      description: 'প্রাকৃতিক উপাদানে তৈরি আমাদের অল-ইন-ওয়ান স্কিন কেয়ার সেট। এটি ত্বককে গভীরভাবে পরিষ্কার করে, আর্দ্রতা ধরে রাখে এবং প্রাকৃতিকভাবে উজ্জ্বল করে তোলে। সব ধরনের ত্বকের জন্য এটি সম্পূর্ণ নিরাপদ ও কার্যকরী।',
      bullets: [
        'কোনো ক্ষতিকারক কেমিক্যাল বা প্যারাবেন নেই',
        'ত্বকের পিএইচ (pH) ব্যালেন্স বজায় রাখে',
        'ব্রণ এবং কালো দাগ দূর করতে সাহায্য করে',
        '১০০% প্রাকৃতিক ভেষজ নির্যাস থেকে তৈরি'
      ],
      specs: [
        { key: 'সেটের পণ্যসমূহ', value: 'ফেসওয়াশ, সিরাম, ময়েশ্চারাইজার' },
        { key: 'ত্বকের ধরন', value: 'সব ধরনের ত্বকের উপযোগী' },
        { key: 'পরিমাণ', value: '৩ টি আইটেম প্যাক' },
        { key: 'উৎস', value: 'অর্গানিক অ্যান্ড হারবাল' }
      ],
      thumbnails: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400&h=500'
      ]
    },
    'f6': {
      description: 'আমাদের ট্রেন্ডি ক্যাজুয়াল স্নিকার্স চমৎকার আরাম এবং স্থায়িত্বের নিখুঁত সংমিশ্রণ। এর ব্রিদাবল ডিজাইন এবং নরম সোল দীর্ঘ সময় হাঁটাচলার পরও পা রাখবে সম্পূর্ণ সতেজ ও ব্যথামুক্ত। জিম, রানিং বা সাধারণ ব্যবহারের জন্য সেরা।',
      bullets: [
        'অত্যন্ত হালকা ও ব্রিদাবল মেশ আপার',
        'শক-অ্যাবজরবিং কুশন ইভা সোল',
        'অ্যান্টি-স্লিপ গ্রিপ নিশ্চিত করে',
        'সহজে ধোয়া এবং পরিষ্কার করা যায়'
      ],
      specs: [
        { key: 'উপাদান', value: 'ব্রিদাবল মেশ ও ক্যানভাস' },
        { key: 'সোল টাইপ', value: 'নমনীয় ইভা সোল' },
        { key: 'স্টাইল', value: 'লো-টপ ক্যাজুয়াল' },
        { key: 'সাইজ লভ্যতা', value: '৪০, ৪১, ৪২, ৪৩, ৪৪' }
      ],
      thumbnails: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400&h=500',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400&h=500'
      ]
    }
  };

  // Best sellers fallback details
  const b1 = detailsMap['f1'];
  const b2 = detailsMap['f2'];
  const b3 = detailsMap['f3'];
  const b4 = detailsMap['f4'];
  const b5 = detailsMap['f5'];
  const b6 = detailsMap['f6'];

  const bestSellersMap: Record<string, typeof b1> = {
    'b1': {
      ...b1,
      description: 'এলিগেন্ট ডিজাইনের এমব্রয়ডারি পাঞ্জাবি যা আপনার আভিজাত্যকে ফুটিয়ে তুলবে। সম্পূর্ণ প্রিমিয়াম সেমি-কটন সুতায় তৈরি এই পাঞ্জাবিটি আরাম ও ডিজাইনের এক অনন্য কোলাজ। যেকোনো বিশেষ অনুষ্ঠানের জন্য উপযোগী।',
    },
    'b2': {
      ...b2,
      description: 'রাজকীয় রেড-গোল্ড জামদানী শাড়ি। চমৎকার জমকালো পাড় এবং ফুল বডি ঘন জলছাপ নকশায় বোনা শাড়িটি উৎসবের কেন্দ্রবিন্দুতে আপনাকে রাখবে। ঐতিহ্যবাহী কারিগরি কুশলতার এক মাস্টারপিস।',
    },
    'b3': {
      ...b3,
      description: 'মিনিমালিস্ট ও চমৎকার ব্ল্যাক-লেদার ওয়াচ। দৈনন্দিন ক্যাজুয়াল ফ্যাশনে এবং কর্পোরেট মিটিংয়ে মানানসই এক দারুণ ঘড়ি। নিখুঁত ডিজাইনের সাথে চমৎকার এনালগ ডিসপ্লে এর আকর্ষন বাড়িয়ে তোলে।',
    },
    'b4': {
      ...b4,
      description: 'সব ধরণের ভ্রমণের উপযোগী বড় ব্যাকপ্যাক। উন্নত চেইন এবং ওয়াটার-রেজিস্ট্যান্ট কোটিং করা ফেব্রিক দিয়ে তৈরি। এতে ল্যাপটপ এবং বেশ কয়েকদিনের পোশাক খুব সহজেই রাখা যায়।',
    },
    'b5': {
      ...b5,
      description: 'ভিটামিন-সি ও হায়ালুরোনিক সমৃদ্ধ স্কিন কেয়ার সেট। এটি ত্বককে সতেজ করতে এবং ত্বকের টেক্সচার উন্নত করতে দারুণ কাজ করে। কোনো কেমিক্যাল গন্ধ ছাড়া সম্পূর্ণ প্রাকৃতিকভাবে তৈরি।',
    },
    'b6': {
      ...b6,
      description: 'লাইটওয়েট রানিং এবং ক্যাজুয়াল স্নিকার্স। প্রতিদিনের হাঁটাচলা, রানিং বা যেকোনো খেলাধুলায় সর্বোচ্চ নমনীয়তা এবং গ্রিপ দেবে। আরামদায়ক ফিটিং এবং আধুনিক রঙের জন্য দারুণ স্টাইলিশ।',
    }
  };

  return detailsMap[id] || bestSellersMap[id] || {
    description: 'দেশিমার্টের শতভাগ খাঁটি ও প্রিমিয়াম কোয়ালিটির পণ্য। প্রতিটি অর্ডার আমরা অত্যন্ত সতর্কতার সাথে নির্বাচন এবং প্রক্রিয়াকরণ করি যাতে আপনি পান সেরা অভিজ্ঞতা। আমাদের লক্ষ্য দেশি ঐতিহ্যের মান বজায় রাখা।',
    bullets: [
      'শতভাগ খাঁটি ও বিশুদ্ধ উপাদানে তৈরি',
      'আমাদের নিজস্ব তদারকিতে সংগৃহীত',
      'আকর্ষণীয় ও টেকসই প্যাকেজিং',
      'নিরাপদ ও দ্রুত ডেলিভারির নিশ্চয়তা'
    ],
    specs: [
      { key: 'উপাদান', value: 'প্রিমিয়াম অর্গানিক গ্রেড' },
      { key: 'উৎস', value: 'দেশি মার্ট কোয়ালিটি ল্যাবস' },
      { key: 'ডেলিভারি', value: 'সারা বাংলাদেশ' },
      { key: 'রিটার্ন পলিসি', value: '৭ দিন সহজ রিটার্ন সুবিধা' }
    ],
    thumbnails: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&h=500',
      'https://images.unsplash.com/photo-1589733966041-f764b55412c3?auto=format&fit=crop&w=400&h=500'
    ]
  };
};

export function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const detail = getProductDetails(product.id);
  const allImages = [product.image, ...detail.thumbnails].filter((v, i, a) => a.indexOf(v) === i);

  // Auto-reset image selection when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  const handleQtyChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setQuantity(prev => prev + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            id="modal-backdrop"
          />

          {/* Modal Card container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white dark:bg-[#1E1E1E] w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col z-10 border border-gray-100 dark:border-gray-800"
            id="product-detail-modal"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200 text-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors shadow-sm"
              id="close-modal-btn"
            >
              <X size={20} />
            </button>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10">
                
                {/* Left Side: Images Gallery */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  {/* Main Display Image */}
                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#121212] border border-gray-100 dark:border-gray-800 relative shadow-inner flex items-center justify-center p-4">
                    <img 
                      src={selectedImage} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                    
                    {product.discount && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                        -{product.discount}% ছাড়
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Selector Grid */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 bg-gray-50 dark:bg-[#121212] p-1.5 flex items-center justify-center transition-all ${selectedImage === img ? 'border-brand-emerald shadow-md' : 'border-gray-150 dark:border-gray-800 opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} alt={`${product.name}-${index}`} className="max-h-full max-w-full object-contain rounded-lg" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side: Product Details & Controls */}
                <div className="md:col-span-6 flex flex-col justify-between">
                  <div>
                    {/* Badges / Category */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-brand-emerald/10 text-brand-emerald text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                        স্টকে আছে (স্ট্যান্ডার্ড ডেলিভারি)
                      </span>
                      {product.isNew && (
                        <span className="bg-[#125838] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                          নতুন পণ্য
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white leading-snug font-heading mb-2">
                      {product.name}
                    </h2>

                    {/* Ratings & Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200 dark:text-gray-700'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {product.rating} <span className="text-gray-400 font-normal">({product.reviews} রিভিউ)</span>
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gray-50 dark:bg-[#1A1A1A] p-4 rounded-2xl flex items-center justify-between mb-6 border border-gray-100 dark:border-gray-800">
                      <div>
                        <span className="text-xs text-gray-400 block mb-1 font-medium">বিক্রয় মূল্য:</span>
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-xl sm:text-3xl font-extrabold text-[#125838] dark:text-brand-emerald">
                            ৳{(product.price * quantity).toLocaleString('en-IN')}
                          </span>
                          {product.oldPrice && (
                            <span className="text-sm sm:text-base text-gray-400 line-through">
                              ৳{(product.oldPrice * quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                      {quantity > 1 && (
                        <span className="text-[11px] sm:text-xs bg-brand-emerald/15 text-brand-emerald font-bold px-2.5 py-1 rounded-lg">
                          একক মূল্য: ৳{product.price}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">পরিমাণ নির্বাচন করুন:</span>
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#121212]">
                        <button 
                          onClick={() => handleQtyChange('dec')}
                          className="px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-gray-50 dark:hover:bg-[#222] text-gray-500 hover:text-brand-emerald transition-colors"
                          id="qty-minus"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 sm:w-12 text-center text-sm font-extrabold text-gray-800 dark:text-white">
                          {quantity}
                        </span>
                        <button 
                          onClick={() => handleQtyChange('inc')}
                          className="px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-gray-50 dark:hover:bg-[#222] text-gray-500 hover:text-brand-emerald transition-colors"
                          id="qty-plus"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Tabs area */}
                    <div className="mb-6">
                      <div className="flex border-b border-gray-100 dark:border-gray-800 gap-6">
                        <button 
                          onClick={() => setActiveTab('desc')}
                          className={`pb-2.5 text-xs sm:text-sm font-bold transition-all relative ${activeTab === 'desc' ? 'text-brand-emerald' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          বিবরণ
                          {activeTab === 'desc' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-emerald rounded-full"></div>}
                        </button>
                        <button 
                          onClick={() => setActiveTab('specs')}
                          className={`pb-2.5 text-xs sm:text-sm font-bold transition-all relative ${activeTab === 'specs' ? 'text-brand-emerald' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          স্পেসিফিকেশন
                          {activeTab === 'specs' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-emerald rounded-full"></div>}
                        </button>
                        <button 
                          onClick={() => setActiveTab('reviews')}
                          className={`pb-2.5 text-xs sm:text-sm font-bold transition-all relative ${activeTab === 'reviews' ? 'text-brand-emerald' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          রিভিউ ও রেটিং
                          {activeTab === 'reviews' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-emerald rounded-full"></div>}
                        </button>
                      </div>

                      <div className="py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-h-40 overflow-y-auto pr-1">
                        {activeTab === 'desc' && (
                          <div className="space-y-3">
                            <p>{detail.description}</p>
                            <ul className="space-y-1.5 list-none pl-0">
                              {detail.bullets.map((b, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0"></span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {activeTab === 'specs' && (
                          <div className="space-y-2">
                            {detail.specs.map((s, i) => (
                              <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800/60 last:border-0">
                                <span className="font-semibold text-gray-400">{s.key}</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium">{s.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {activeTab === 'reviews' && (
                          <div className="space-y-4">
                            <div className="bg-[#E8F5E9]/30 dark:bg-emerald-950/10 p-3 rounded-xl border border-emerald-50/50 dark:border-emerald-900/10 flex items-center gap-3">
                              <Star className="text-brand-emerald fill-brand-emerald" size={20} />
                              <div>
                                <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-white">শতভাগ কাস্টমার সন্তুষ্টি</h4>
                                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">সব ক্রেতাই আমাদের এই পণ্যের কোয়ালিটি পছন্দ করেছেন।</p>
                              </div>
                            </div>
                            
                            {[
                              { user: 'আরিফুল ইসলাম', rating: 5, date: '৩ দিন আগে', comment: 'অসাধারণ পণ্য! ছবির মতো হুবহু একই পেয়েছি। সেলাই ও ফ্যাব্রিক অত্যন্ত উন্নত মানের।' },
                              { user: 'সাদিয়া রহমান', rating: 4, date: '১ সপ্তাহ আগে', comment: 'খুবই সুন্দর ডিজাইন এবং পরতে খুব আরামদায়ক। ডেলিভারিও খুব ফাস্ট ছিল।' }
                            ].map((rev, i) => (
                              <div key={i} className="p-3 bg-gray-50/50 dark:bg-[#252525]/30 rounded-xl border border-gray-100 dark:border-gray-800/55">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="font-bold text-xs text-gray-700 dark:text-gray-200">{rev.user}</span>
                                  <span className="text-[10px] text-gray-400">{rev.date}</span>
                                </div>
                                <div className="flex gap-0.5 mb-1.5">
                                  {[...Array(5)].map((_, starI) => (
                                    <Star key={starI} size={10} className={`${starI < rev.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} />
                                  ))}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{rev.comment}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-3.5">
                    {/* Delivery Features Info */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 dark:border-gray-800 text-center text-[10px] text-gray-500">
                      <div className="flex flex-col items-center gap-1">
                        <Truck size={14} className="text-brand-emerald" />
                        <span className="font-semibold">সারাদেশে ডেলিভারি</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <ShieldCheck size={14} className="text-brand-emerald" />
                        <span className="font-semibold">১০০% ভেরিফাইড পণ্য</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <RotateCcw size={14} className="text-brand-emerald" />
                        <span className="font-semibold">৭ দিনের সহজ রিটার্ন</span>
                      </div>
                    </div>

                    {/* Call-to-action buttons */}
                    <div className="flex gap-3 sm:gap-4">
                      {/* Add to wishlist */}
                      <button 
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`p-3 sm:p-4 rounded-xl border flex items-center justify-center transition-all ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#222] text-gray-400 dark:text-gray-300'}`}
                        title="পছন্দের তালিকায় রাখুন"
                        id="wishlist-btn"
                      >
                        <Heart size={20} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                      </button>

                      {/* Add to Cart */}
                      <button 
                        onClick={handleAddToCartClick}
                        className={`flex-1 font-bold rounded-xl py-3 sm:py-4 px-4 flex items-center justify-center gap-2 shadow-sm transition-all ${isAdded ? 'bg-emerald-600 text-white shadow-inner' : 'bg-brand-emerald hover:bg-brand-dark text-white hover:shadow-lg'}`}
                        id="add-to-cart-btn"
                      >
                        {isAdded ? (
                          <>
                            <Check size={18} className="animate-pulse" />
                            <span>কার্টে যুক্ত হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={18} />
                            <span>কার্টে যোগ করুন</span>
                          </>
                        )}
                      </button>

                      {/* Buy Now */}
                      <button 
                        onClick={() => {
                          onAddToCart(product, quantity);
                          onClose();
                          // Simulating quick checkout trigger by invoking the orders or more tab
                          // We can just add to cart and close for instant buying experience
                        }}
                        className="flex-1 bg-gradient-to-r from-brand-emerald to-[#6DB33F] hover:from-brand-dark hover:to-brand-emerald text-white font-extrabold rounded-xl py-3 sm:py-4 px-4 shadow hover:shadow-lg transition-all text-center flex items-center justify-center"
                        id="buy-now-btn"
                      >
                        সরাসরি কিনুন
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
