import React from 'react';
import { Briefcase, FileText, Check, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

export const StatCards = ({ t, activeProject }) => {
  const tsList = activeProject?.timesheets || [];
  const approvedCount = tsList.filter(ts => ts.statusKey === 'approved').length;
  const awaitingCount = tsList.filter(ts => ts.statusKey === 'awaiting').length;
  const inProgressCount = tsList.filter(ts => ts.statusKey === 'sentBack').length;
  const projectCount = 1; // always 1 "active project" on this card

  const cards = [
    {
      id: 'projects',
      title: t.projects,
      value: String(projectCount),
      subtitle: activeProject?.contractCode ? `Code • ${activeProject.contractCode}` : null,
      topBorderColor: 'from-indigo-500 to-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      iconBg: 'bg-indigo-500/10 text-indigo-600',
      icon: Briefcase,
      badgeText: 'Active',
    },
    {
      id: 'approved-timesheets',
      title: t.approvedTimesheet || 'Approved timesheet',
      value: String(approvedCount),
      subtitle: `${approvedCount} ${t.recordsInTotal ? t.recordsInTotal.replace(/\d+/, approvedCount) : 'records in total'}`,
      topBorderColor: 'from-emerald-500 to-teal-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      icon: Check,
      badgeText: 'Processed',
    },
    {
      id: 'awaiting',
      title: t.awaitingYourApproval,
      titleColor: 'text-amber-800',
      value: String(awaitingCount),
      subtitle: awaitingCount > 0 ? 'Requires your immediate action' : 'All caught up',
      topBorderColor: 'from-amber-500 to-orange-500',
      badgeBg: awaitingCount > 0 ? 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse' : 'bg-slate-100 text-slate-600 border-slate-200',
      iconBg: 'bg-amber-500/10 text-amber-600',
      icon: FileText,
      badgeText: awaitingCount > 0 ? 'Action Needed' : 'Cleared',
      pulse: awaitingCount > 0,
    },
    {
      id: 'inprogress-timesheets',
      title: t.inProgressTimesheet || 'In progress timesheet',
      value: String(inProgressCount),
      subtitle: t.timesheetsApprovedYear ? t.timesheetsApprovedYear.replace(/\d+/, tsList.length) : `out of ${tsList.length} timesheets this year`,
      topBorderColor: 'from-cyan-500 to-sky-500',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      iconBg: 'bg-cyan-500/10 text-cyan-600',
      icon: Clock,
      badgeText: 'Finance Review',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80 relative overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Top gradient highlight bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.topBorderColor}`} />

            {/* Top row: Label and Icon */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className={`text-[13.5px] font-bold ${card.titleColor || 'text-slate-700'} leading-snug`}>
                  {card.title}
                </span>
                <div className={`w-10 h-10 rounded-2xl ${card.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-200 shadow-2xs`}>
                  <IconComponent className="w-5 h-5 stroke-[2.2]" />
                </div>
              </div>

              {/* Pill badge */}
              <div className="mt-2.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${card.badgeBg}`}>
                  {card.pulse && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  <span>{card.badgeText}</span>
                </span>
              </div>
            </div>

            {/* Bottom row: Large KPI Number and subtitle */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <div className="text-[38px] sm:text-[42px] font-extrabold text-slate-900 leading-none tracking-tight font-sans">
                {card.value}
              </div>
              {card.subtitle && (
                <div className="text-[12px] text-slate-400 font-medium mt-2 flex items-center gap-1.5">
                  <span className="truncate">{card.subtitle}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
