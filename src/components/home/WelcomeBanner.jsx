import React from 'react';
import { Globe, Building2, CheckCircle2, Shield, Sparkles } from 'lucide-react';

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
        ? `نظرة عامة على حساب ${projectName} وإدارة القوى العاملة مع جسور الإمداد`
        : `Executive dashboard and workforce overview for ${projectName}`)
    : t.welcomeSubtitle;

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
      {/* Decorative ambient background mesh & glowing lights */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Welcome text and metadata */}
        <div className="space-y-3 max-w-3xl">
          {/* Status chips row */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Contract {activeProject?.contractCode || 'Active'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 text-[11px] font-medium backdrop-blur-md">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>Verified Client</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-[15px] font-normal leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Action Controls: Language switcher */}
        <div className="flex-shrink-0 self-start md:self-center">
          <button
            onClick={toggleLanguage}
            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 backdrop-blur-md text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-lg transition-all flex items-center gap-2.5 cursor-pointer select-none"
            title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
          >
            <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center text-cyan-300 group-hover:rotate-12 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <span className={language === 'en' ? 'font-arabic text-base -mt-0.5' : 'font-sans font-semibold'}>
              {t.langButtonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
