import React from 'react';

export const Logo = ({ className = "h-9", isFooter = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* JE Icon Monogram */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Cyan curved arc / crescent forming the left side J */}
          <path
            d="M 46 12 C 26 12 12 26 12 50 C 12 74 26 88 46 88 C 48 88 50 86 50 83 L 50 75 C 50 72 48 70 45 70 C 33 70 26 62 26 50 C 26 38 33 30 45 30 C 48 30 50 28 50 25 L 50 17 C 50 14 48 12 46 12 Z"
            fill="#06b6d4"
          />
          {/* Cyan inner accent dot / detail */}
          <rect x="42" y="38" width="8" height="24" rx="4" fill="#06b6d4" />
          {/* Black/Navy E stylized letter on right */}
          <path
            d="M 58 14 C 55 14 54 16 54 19 L 54 81 C 54 84 55 86 58 86 L 82 86 C 85 86 87 84 87 81 L 87 73 C 87 70 85 68 82 68 L 68 68 L 68 56 L 80 56 C 83 56 85 54 85 51 L 85 45 C 85 42 83 40 80 40 L 68 40 L 68 28 L 82 28 C 85 28 87 26 87 23 L 87 19 C 87 16 85 14 82 14 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center leading-tight">
        <span className={`text-[17px] font-bold tracking-tight ${isFooter ? 'text-white' : 'text-slate-900'}`}>
          Jussur Emdad
        </span>
        <span className={`text-[15px] font-bold ${isFooter ? 'text-slate-200' : 'text-slate-900'} font-arabic -mt-0.5`}>
          جسور الإمداد
        </span>
      </div>
    </div>
  );
};
