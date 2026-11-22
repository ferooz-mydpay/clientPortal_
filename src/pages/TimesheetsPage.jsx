import React, { useState, useMemo } from 'react';
import { FileText, RotateCcw, Check, Menu, Search, Globe, Calendar, ArrowRight, Shield, CheckCircle2, ChevronRight } from 'lucide-react';

export const TimesheetsPage = ({
  t,
  language,
  toggleLanguage,
  timesheetsData,
  onReviewTimesheet,
  onViewTimesheet,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'awaiting', 'sentBack', 'approved'
  const isRtl = language === 'ar';

  // Dynamic counts based on timesheetsData
  const counts = useMemo(() => {
    const awaiting = timesheetsData.filter((i) => i.statusKey === 'awaiting').length;
    const sentBack = timesheetsData.filter((i) => i.statusKey === 'sentBack').length;
    const approved = timesheetsData.filter((i) => i.statusKey === 'approved').length;
    const total = timesheetsData.length;
    return { awaiting, sentBack, approved, total };
  }, [timesheetsData]);

  // Stat cards for the Timesheets page
  const statCards = [
    {
      id: 'awaiting',
      title: t.tsAwaitingApproval,
      titleColor: 'text-amber-800',
      value: counts.awaiting,
      topBorderColor: 'from-amber-400 to-amber-500',
      badgeBg: counts.awaiting > 0 ? 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse' : 'bg-slate-100 text-slate-600 border-slate-200',
      iconBg: 'bg-amber-500/10 text-amber-600',
      icon: FileText,
      badgeText: counts.awaiting > 0 ? 'Action Needed' : 'Cleared',
    },
    {
      id: 'sentBack',
      title: t.tsSentBackToFinance,
      titleColor: 'text-rose-800',
      value: counts.sentBack,
      topBorderColor: 'from-rose-400 to-rose-500',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-500/10 text-rose-600',
      icon: RotateCcw,
      badgeText: 'Under Revision',
    },
    {
      id: 'approved',
      title: t.tsApproved,
      titleColor: 'text-emerald-800',
      value: counts.approved,
      topBorderColor: 'from-emerald-400 to-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      icon: Check,
      badgeText: 'Finalized',
    },
    {
      id: 'total',
      title: t.tsTotal,
      titleColor: 'text-indigo-800',
      value: counts.total,
      topBorderColor: 'from-indigo-400 to-indigo-500',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-500/10 text-indigo-600',
      icon: Menu,
      badgeText: 'All Records',
    },
  ];

  // Filtered rows
  const filteredTimesheets = useMemo(() => {
    return timesheetsData.filter((item) => {
      // Status filter
      if (statusFilter !== 'all' && item.statusKey !== statusFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesPeriod = item.period.toLowerCase().includes(q);
        return matchesTitle || matchesCode || matchesPeriod;
      }
      return true;
    });
  }, [timesheetsData, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 1. Hero / Header Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
        {/* Ambient glow lights */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Timesheet Approvals & Payroll Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.timesheetsHeroTitle}
            </h1>
            <p className="text-slate-300 text-sm sm:text-[15px] font-normal leading-relaxed">
              {t.timesheetsHeroSubtitle}
            </p>
          </div>

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

      {/* 2. Four KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80 relative overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.topBorderColor}`} />

              {/* Title & Icon */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className={`text-[13.5px] font-bold ${card.titleColor} leading-tight`}>
                    {card.title}
                  </span>
                  <div className={`w-10 h-10 rounded-2xl ${card.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-2xs`}>
                    <IconComp className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>

                <div className="mt-2.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${card.badgeBg}`}>
                    <span>{card.badgeText}</span>
                  </span>
                </div>
              </div>

              {/* Large Value */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="text-[38px] sm:text-[42px] font-extrabold text-slate-900 leading-none tracking-tight font-sans">
                  {card.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Full-Width Timesheets Table Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
        {/* Top Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          {/* Search Input on Left */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchTimesheetPlaceholder}
              className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            />
          </div>

          {/* Filter Pills Group on Right */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.filterAll} ({counts.total})
            </button>

            <button
              onClick={() => setStatusFilter('awaiting')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'awaiting'
                  ? 'bg-white text-amber-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tsAwaitingApproval} ({counts.awaiting})
            </button>

            <button
              onClick={() => setStatusFilter('sentBack')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'sentBack'
                  ? 'bg-white text-rose-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tsSentBackToFinance} ({counts.sentBack})
            </button>

            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'approved'
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tsApproved} ({counts.approved})
            </button>
          </div>
        </div>

        {/* Timesheets List Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-3 font-semibold">{t.colTimesheet}</th>
                <th className="py-3.5 px-3 font-semibold">{t.colPeriod}</th>
                <th className="py-3.5 px-3 font-semibold">{t.colStatus}</th>
                <th className="py-3.5 px-3 text-right rtl:text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTimesheets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400 text-sm font-medium">
                    No timesheets found matching your query.
                  </td>
                </tr>
              ) : (
                filteredTimesheets.map((item) => {
                  const isAwaiting = item.statusKey === 'awaiting';
                  const isSentBack = item.statusKey === 'sentBack';
                  const isApproved = item.statusKey === 'approved';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Timesheet Title & Code */}
                      <td className="py-4 px-3 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-slate-100 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-extrabold text-[14.5px] text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11.5px] text-slate-400 font-mono mt-0.5 tracking-tight">
                              {item.code}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Period */}
                      <td className="py-4 px-3 align-middle text-[13px] text-slate-600 font-medium whitespace-nowrap">
                        {item.period}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-3 align-middle whitespace-nowrap">
                        {isApproved && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {t.statusApproved}
                          </span>
                        )}

                        {isSentBack && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            {t.statusSentBack}
                          </span>
                        )}

                        {isAwaiting && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            {t.statusAwaiting}
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-3 align-middle text-right rtl:text-left whitespace-nowrap">
                        {isAwaiting ? (
                          <button
                            onClick={() => onReviewTimesheet(item)}
                            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/25 transition-all cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <span>{t.btnReview}</span>
                            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </button>
                        ) : (
                          <button
                            onClick={() => onViewTimesheet(item)}
                            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs px-4 py-2 rounded-xl transition-all hover:border-slate-300 cursor-pointer shadow-2xs"
                          >
                            {t.btnView}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
