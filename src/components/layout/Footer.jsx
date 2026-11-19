import React from 'react';

export const Footer = ({ t, onNavigate }) => {
  return (
    <footer className="mt-16 bg-[#0b1320] text-white border-t-2 border-[#4338ca] relative z-10">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-10 md:py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="space-y-1.5">
            <h2 className="text-xl md:text-[22px] font-bold text-indigo-200 font-arabic tracking-wide">
              {t.footerTitleArabic}
            </h2>
            <p className="text-slate-300 text-sm font-semibold tracking-tight">
              {t.footerTitleEn}
            </p>
            <p className="text-slate-500 text-xs font-medium pt-1">
              {t.footerSubtitle}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[13px] text-slate-300 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footerLinkHome}
            </button>
            <button
              onClick={() => onNavigate('timesheets')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footerLinkTimesheets}
            </button>
            <button
              onClick={() => onNavigate('employees')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.navEmployees || 'Employees'}
            </button>
            <button
              onClick={() => onNavigate('requests')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.footerLinkRequests}
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="font-arabic">
            {t.footerCopyrightAr}
          </p>
          <p>
            {t.footerCopyrightEn}
          </p>
        </div>
      </div>
    </footer>
  );
};
