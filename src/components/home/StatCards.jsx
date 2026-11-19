import React from 'react';
import { Briefcase, FileText, Check, Clock } from 'lucide-react';

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
      subtitle: null,
      topBorderColor: 'bg-[#6366f1]',
      iconBg: 'bg-[#eeeffe]',
      iconColor: 'text-[#6366f1]',
      icon: Briefcase,
    },
    {
      id: 'approved-timesheets',
      title: t.approvedTimesheet || 'Approved timesheet',
      value: String(approvedCount),
      subtitle: `${approvedCount} ${t.recordsInTotal ? t.recordsInTotal.replace(/\d+/, approvedCount) : 'records in total'}`,
      topBorderColor: 'bg-[#10b981]',
      iconBg: 'bg-[#ecfdf5]',
      iconColor: 'text-[#10b981]',
      icon: Check,
    },
    {
      id: 'awaiting',
      title: t.awaitingYourApproval,
      titleColor: 'text-[#b45309]',
      value: String(awaitingCount),
      subtitle: null,
      topBorderColor: 'bg-[#f59e0b]',
      iconBg: 'bg-[#fef3c7]',
      iconColor: 'text-[#d97706]',
      icon: FileText,
    },
    {
      id: 'inprogress-timesheets',
      title: t.inProgressTimesheet || 'In progress timesheet',
      value: String(inProgressCount),
      subtitle: t.timesheetsApprovedYear ? t.timesheetsApprovedYear.replace(/\d+/, tsList.length) : `out of ${tsList.length} timesheets this year`,
      topBorderColor: 'bg-[#14b8a6]',
      iconBg: 'bg-[#e6f8f6]',
      iconColor: 'text-[#14b8a6]',
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100/90 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            {/* Top accent colored bar */}
            <div className={`absolute top-0 left-4 right-4 h-[3.5px] ${card.topBorderColor} rounded-full`} />

            {/* Top row: Label and Icon */}
            <div className="flex items-start justify-between gap-3 pt-1">
              <span className={`text-[14px] font-semibold ${card.titleColor || 'text-slate-600'} leading-tight`}>
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            {/* Bottom row: Large Number and optional subtitle */}
            <div className="mt-4">
              <div className="text-[38px] md:text-[42px] font-bold text-slate-900 leading-none tracking-tight">
                {card.value}
              </div>
              {card.subtitle && (
                <div className="text-[12px] text-slate-400 font-normal mt-2">
                  {card.subtitle}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
