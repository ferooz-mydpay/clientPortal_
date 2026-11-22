import React from 'react';
import { Globe } from 'lucide-react';

export const WelcomeBanner = ({ t, language, toggleLanguage, activeProject }) => {
  const isRtl = language === 'ar';
  const projectName = isRtl
    ? (activeProject?.companyNameAr || activeProject?.companyName)
    : (activeProject?.companyName || activeProject?.companyNameAr);

  const title = projectName
    ? (isRtl ? `مرحباً، ${projectName}` : `Welcome, ${projectName}`)
    : t.welcomeTitle;

  const subtitle = projectName
    ? (isRtl
        ? `نظرة عامة على حساب ${projectName} مع جسور الإمداد`
        : `An overview of ${projectName} account with Jussur Emdad`)
    : t.welcomeSubtitle;

  return (
    <div className="bg-[#0f172a] rounded-2xl md:rounded-[20px] p-6 sm:p-8 text-white relative shadow-sm border border-slate-800/60 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Welcome text */}
        <div className="space-y-1.5 max-w-3xl">
          <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-white">
            {title}
          </h1>
          <p className="text-slate-300 text-sm md:text-[15px] font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Language switch button */}
        <div className="flex-shrink-0 self-start md:self-center">
          <button
            onClick={toggleLanguage}
            className="bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer select-none"
            title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
          >
            <Globe className="w-4 h-4 text-slate-700" />
            <span className={language === 'en' ? 'font-arabic text-base -mt-0.5' : 'font-sans'}>
              {t.langButtonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
