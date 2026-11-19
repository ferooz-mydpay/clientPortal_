import React, { useState, useMemo } from 'react';
import { FileText, RotateCcw, Check, Menu, Search, Globe } from 'lucide-react';

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
      titleColor: 'text-[#b45309]',
      value: counts.awaiting,
      topBorderColor: 'bg-[#f59e0b]',
      iconBg: 'bg-[#fef3c7]',
      iconColor: 'text-[#d97706]',
      icon: FileText,
    },
    {
      id: 'sentBack',
      title: t.tsSentBackToFinance,
      titleColor: 'text-slate-600',
      value: counts.sentBack,
      topBorderColor: 'bg-[#f59e0b]',
      iconBg: 'bg-[#fef3c7]',
      iconColor: 'text-[#d97706]',
      icon: RotateCcw,
    },
    {
      id: 'approved',
      title: t.tsApproved,
      titleColor: 'text-slate-600',
      value: counts.approved,
      topBorderColor: 'bg-[#10b981]',
      iconBg: 'bg-[#ecfdf5]',
      iconColor: 'text-[#10b981]',
      icon: Check,
    },
    {
      id: 'total',
      title: t.tsTotal,
      titleColor: 'text-slate-600',
      value: counts.total,
      topBorderColor: 'bg-[#6366f1]',
      iconBg: 'bg-[#eeeffe]',
      iconColor: 'text-[#6366f1]',
      icon: Menu,
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
      {/* 1. Hero / Header Card matching image 1 */}
      <div className="bg-[#0f172a] rounded-2xl md:rounded-[20px] p-6 sm:p-8 text-white relative shadow-sm border border-slate-800/60 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-white">
              {t.timesheetsHeroTitle}
            </h1>
            <p className="text-slate-300 text-sm md:text-[15px] font-normal leading-relaxed">
              {t.timesheetsHeroSubtitle}
            </p>
          </div>

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

      {/* 2. Four Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100/90 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-4 right-4 h-[3.5px] ${card.topBorderColor} rounded-full`} />

              {/* Title & Icon */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <span className={`text-[14px] font-semibold ${card.titleColor} leading-tight`}>
                  {card.title}
                </span>
                <div className={`w-9 h-9 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center flex-shrink-0`}>
                  <IconComp className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>

              {/* Large Value */}
              <div className="mt-4">
                <div className="text-[38px] md:text-[42px] font-bold text-slate-900 leading-none tracking-tight">
                  {card.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Full-Width Timesheets Table Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
        {/* Top Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-4">
          {/* Search Input on Left */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchTimesheetPlaceholder}
              className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Filter Pills Group on Right */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-[#eef2ff] text-[#4338ca] border border-indigo-200/60 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
              }`}
            >
              {t.filterAll} ({counts.total})
            </button>

            <button
              onClick={() => setStatusFilter('awaiting')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'awaiting'
                  ? 'bg-[#eef2ff] text-[#4338ca] border border-indigo-200/60 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
              }`}
            >
              {t.tsAwaitingApproval} ({counts.awaiting})
            </button>

            <button
              onClick={() => setStatusFilter('sentBack')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'sentBack'
                  ? 'bg-[#eef2ff] text-[#4338ca] border border-indigo-200/60 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
              }`}
            >
              {t.tsSentBackToFinance} ({counts.sentBack})
            </button>

            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === 'approved'
                  ? 'bg-[#eef2ff] text-[#4338ca] border border-indigo-200/60 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100/70 border border-transparent'
              }`}
            >
              {t.tsApproved} ({counts.approved})
            </button>
          </div>
        </div>

        {/* Timesheets Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-medium text-slate-400">
                <th className="py-3 px-3 font-medium">{t.colTimesheet}</th>
                <th className="py-3 px-3 font-medium">{t.colPeriod}</th>
                <th className="py-3 px-3 font-medium">{t.colStatus}</th>
                <th className="py-3 px-3 text-right rtl:text-left font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/90 text-sm">
              {filteredTimesheets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400 text-xs">
                    No timesheets found matching your filter or search.
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
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Timesheet Title & Code */}
                      <td className="py-4 px-3 align-middle">
                        <div className="font-bold text-[14px] text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[12px] text-slate-400 font-mono mt-0.5 tracking-tight">
                          {item.code}
                        </div>
                      </td>

                      {/* Period */}
                      <td className="py-4 px-3 align-middle text-[13px] text-slate-600 font-normal whitespace-nowrap">
                        {item.period}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-3 align-middle whitespace-nowrap">
                        {isApproved && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e8f8f0] text-[#059669]">
                            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                            {t.statusApproved}
                          </span>
                        )}

                        {isSentBack && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#fdf2f2] text-[#e11d48]">
                            <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                            {t.statusSentBack}
                          </span>
                        )}

                        {isAwaiting && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#fef9c3] text-[#b45309]">
                            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                            {t.statusAwaiting}
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-3 align-middle text-right rtl:text-left whitespace-nowrap">
                        {isAwaiting ? (
                          <button
                            onClick={() => onReviewTimesheet(item)}
                            className="bg-[#4338ca] hover:bg-[#3730a3] active:scale-95 text-white font-semibold text-xs px-5 py-2 rounded-xl shadow-md shadow-indigo-300/40 transition-all cursor-pointer whitespace-nowrap"
                          >
                            {t.btnReviewAndApprove}
                          </button>
                        ) : (
                          <button
                            onClick={() => onViewTimesheet(item)}
                            className="bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-700 font-semibold text-xs px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
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
