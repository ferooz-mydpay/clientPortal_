import React from 'react';

export const Logo = ({ className = "h-9", isFooter = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className} group`}>
      {/* JE Icon Monogram */}
      <div className="relative w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        {/* Ambient glow behind icon */}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-md -z-10 group-hover:bg-cyan-500/30 transition-colors" />

        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="jussurCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="jussurDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Cyan curved arc / crescent forming the left side J */}
          <path
            d="M 46 12 C 26 12 12 26 12 50 C 12 74 26 88 46 88 C 48 88 50 86 50 83 L 50 75 C 50 72 48 70 45 70 C 33 70 26 62 26 50 C 26 38 33 30 45 30 C 48 30 50 28 50 25 L 50 17 C 50 14 48 12 46 12 Z"
            fill="url(#jussurCyan)"
          />
          {/* Cyan inner accent dot / detail */}
          <rect x="42" y="38" width="8" height="24" rx="4" fill="url(#jussurCyan)" />
          {/* Black/Navy E stylized letter on right */}
          <path
            d="M 58 14 C 55 14 54 16 54 19 L 54 81 C 54 84 55 86 58 86 L 82 86 C 85 86 87 84 87 81 L 87 73 C 87 70 85 68 82 68 L 68 68 L 68 56 L 80 56 C 83 56 85 54 85 51 L 85 45 C 85 42 83 40 80 40 L 68 40 L 68 28 L 82 28 C 85 28 87 26 87 23 L 87 19 C 87 16 85 14 82 14 Z"
            fill={isFooter ? "#ffffff" : "url(#jussurDark)"}
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`text-[17px] font-extrabold tracking-tight ${isFooter ? 'text-white' : 'text-slate-900'}`}>
            Jussur Emdad
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-cyan-500/10 text-cyan-600 rounded border border-cyan-500/20 uppercase tracking-wider hidden sm:inline">
            Enterprise
          </span>
        </div>
        <span className={`text-[14px] font-bold ${isFooter ? 'text-slate-300' : 'text-slate-500'} font-arabic -mt-0.5 tracking-wide`}>
          جسور الإمداد
        </span>
      </div>
    </div>
  );
};
