import React from 'react';

export function ProductSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full animate-pulse ${className}`}>
      <div className="relative aspect-[4/5] bg-gray-200 w-full"></div>
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="h-5 bg-gray-200 rounded w-16 mb-1.5"></div>
            <div className="h-3 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="w-7 h-7 rounded-full bg-gray-200 md:hidden"></div>
        </div>
      </div>
    </div>
  );
}
