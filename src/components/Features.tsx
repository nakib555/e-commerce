import React from 'react';
import { features } from '../data';
import * as Icons from 'lucide-react';

export function Features() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 py-4 sm:py-8 xl:py-12">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 lg:p-8 xl:p-12">
        
        {/* Mobile View */}
        <div className="grid grid-cols-4 gap-2 md:hidden">
          {features.map((feature) => {
            const Icon = Icons[feature.icon as keyof typeof Icons] as React.ElementType;
            return (
              <div key={feature.id} className="flex flex-col items-center text-center gap-1.5">
                <div className="text-brand-emerald">
                  {Icon && <Icon size={20} strokeWidth={1.5} />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-[9px] leading-tight">{feature.title}</h4>
                  <p className="text-gray-500 text-[8px] leading-tight mt-0.5 hidden sm:block">{feature.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {features.map((feature, index) => {
            const Icon = Icons[feature.icon as keyof typeof Icons] as React.ElementType;
            return (
              <div key={feature.id} className={`flex items-center gap-4 ${index !== 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8 xl:pl-12' : ''}`}>
                <div className="text-brand-emerald">
                  {Icon && <Icon size={32} strokeWidth={1.5} />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{feature.title}</h4>
                  <p className="text-gray-500 text-xs sm:text-sm">{feature.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
