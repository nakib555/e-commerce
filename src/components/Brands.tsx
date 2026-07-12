import React from 'react';
import { Award } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

export function Brands() {
  const brands: Brand[] = [
    { id: '1', name: 'দেশি বুটিক', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=120&h=120' },
    { id: '2', name: 'আড়ং সিল্ক', logo: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=120&h=120' },
    { id: '3', name: 'খাদি ক্রাফট', logo: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=120&h=120' },
    { id: '4', name: 'অর্গানিক লাইফ', logo: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=120&h=120' },
    { id: '5', name: 'হ্যান্ডমেড বিডি', logo: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=120&h=120' },
    { id: '6', name: 'পিউর ফুড', logo: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=120&h=120' },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 md:py-8 xl:py-12">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <div className="w-1.5 h-6 bg-brand-emerald rounded-full"></div>
        <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          জনপ্রিয় ব্র্যান্ডসমূহ <Award className="text-brand-emerald" size={16} />
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-6">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            className="group bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800/80 p-3 sm:p-5 rounded-[18px] shadow-[0_4px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#121212] flex items-center justify-center border border-gray-100 dark:border-gray-800">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-brand-emerald transition-colors">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
