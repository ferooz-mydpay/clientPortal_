import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Lock, ExternalLink, Globe } from 'lucide-react';

export const Footer = ({ t, onNavigate }) => {
  return (
    <footer className="mt-20 bg-[#070b14] text-white border-t border-slate-800/90 relative z-10 overflow-hidden">
      {/* Top subtle glow bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-indigo-500 opacity-80" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 md:py-16">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="space-y-3 max-w-xl">
            <Logo isFooter={true} />
            <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed pt-1">
              {t.footerSubtitle || 'Unified enterprise workforce management and client portal powered by Jussur Emdad.'}
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enterprise Grade Security</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Compliant with Saudi Labor & GOSI</span>
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[13.5px] text-slate-300 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {t.footerLinkHome}
            </button>
            <button
              onClick={() => onNavigate('timesheets')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {t.footerLinkTimesheets}
            </button>
            <button
              onClick={() => onNavigate('employees')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {t.navEmployees || 'Employees'}
            </button>
            <button
              onClick={() => onNavigate('requests')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {t.footerLinkRequests}
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {t.navProjectChat}
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-arabic text-slate-400">
            {t.footerCopyrightAr}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-slate-400">
              {t.footerCopyrightEn}
            </p>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-slate-500 text-[11px]">v2.5.0 Enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
