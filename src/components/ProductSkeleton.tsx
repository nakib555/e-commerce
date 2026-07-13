import React from 'react';

export function ProductSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/60 shadow-sm flex flex-col h-full ${className}`}>
      <div className="relative aspect-[4/5] shimmer w-full"></div>
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="h-4 shimmer rounded w-full mb-2.5"></div>
          <div className="h-4 shimmer rounded w-2/3"></div>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <div className="w-full">
            <div className="h-5 shimmer rounded w-16 mb-2"></div>
            <div className="h-3.5 shimmer rounded w-10"></div>
          </div>
          <div className="w-8 h-8 rounded-full shimmer md:hidden shrink-0 ml-2"></div>
        </div>
      </div>
    </div>
  );
}

