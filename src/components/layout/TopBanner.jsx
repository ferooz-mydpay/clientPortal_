import React from 'react';
import { ShieldCheck, UserCheck, ChevronRight } from 'lucide-react';

export const TopBanner = ({ t, signedInUser }) => {
  const displayUser = signedInUser || t.userName;

  return (
    <div className="bg-[#0b1120] text-white text-[12px] sm:text-[12.5px] py-1.5 px-4 sm:px-8 border-b border-slate-800/80 relative z-40">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left message & Security Assurance */}
        <div className="flex items-center gap-2.5 text-slate-300">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Encrypted Session</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300">
            {t.sitePrivate}{' '}
            <a 
              href="#learn-more" 
              className="text-white hover:text-cyan-400 underline decoration-slate-500 hover:decoration-cyan-400 underline-offset-2 font-medium transition-colors inline-flex items-center gap-0.5"
            >
              <span>{t.learnMore}</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </a>
          </span>
        </div>

        {/* Right user info */}
        <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-[12.5px]">
          <span className="text-slate-400">{t.signedInAs}</span>
          <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 text-white font-medium px-2.5 py-0.5 rounded-md hover:border-slate-600 transition-colors cursor-pointer group">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-105 transition-transform" />
            <span className="tracking-tight">{displayUser}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
