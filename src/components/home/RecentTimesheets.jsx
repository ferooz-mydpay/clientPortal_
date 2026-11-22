import React from 'react';
import { ChevronRight, Calendar, ArrowUpRight } from 'lucide-react';

export const RecentTimesheets = ({
  t,
  onReviewTimesheet,
  onViewTimesheet,
  onViewAll,
  timesheetsData,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-6 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-full" />
          <div>
            <h2 className="text-[17px] sm:text-[19px] font-extrabold text-slate-900 tracking-tight">
              {t.recentTimesheets}
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Monthly workforce payroll reconciliation
            </p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="group inline-flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
        >
          <span>{t.viewAll}</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Responsive Table / List */}
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
            {timesheetsData.map((item) => {
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
                      <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[14.5px] text-slate-900 group-hover:text-indigo-600 transition-colors">
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
