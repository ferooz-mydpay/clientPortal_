import React from 'react';

export const RecentTimesheets = ({
  t,
  onReviewTimesheet,
  onViewTimesheet,
  onViewAll,
  timesheetsData,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-5 bg-[#4338ca] rounded-full inline-block" />
          <h2 className="text-[17px] sm:text-[18px] font-bold text-slate-900">
            {t.recentTimesheets}
          </h2>
        </div>

        <button
          onClick={onViewAll}
          className="bg-[#eef2ff] hover:bg-[#e0e7ff] text-[#4338ca] font-semibold text-xs px-4 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          {t.viewAll}
        </button>
      </div>

      {/* Responsive Table / List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left rtl:text-right mt-2">
          <thead>
            <tr className="border-b border-slate-100 text-[12px] font-medium text-slate-400">
              <th className="py-3 px-2 font-medium">{t.colTimesheet}</th>
              <th className="py-3 px-2 font-medium">{t.colPeriod}</th>
              <th className="py-3 px-2 font-medium">{t.colStatus}</th>
              <th className="py-3 px-2 text-right rtl:text-left font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/90 text-sm">
            {timesheetsData.map((item) => {
              const isAwaiting = item.statusKey === 'awaiting';
              const isSentBack = item.statusKey === 'sentBack';
              const isApproved = item.statusKey === 'approved';

              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Timesheet Title & Code */}
                  <td className="py-4 px-2 align-middle">
                    <div className="font-bold text-[14px] text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[12px] text-slate-400 font-mono mt-0.5 tracking-tight">
                      {item.code}
                    </div>
                  </td>

                  {/* Period */}
                  <td className="py-4 px-2 align-middle text-[13px] text-slate-600 font-normal whitespace-nowrap">
                    {item.period}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-2 align-middle whitespace-nowrap">
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
                  <td className="py-4 px-2 align-middle text-right rtl:text-left whitespace-nowrap">
                    {isAwaiting ? (
                      <button
                        onClick={() => onReviewTimesheet(item)}
                        className="bg-[#4338ca] hover:bg-[#3730a3] active:scale-95 text-white font-semibold text-xs px-5 py-2 rounded-xl shadow-md shadow-indigo-300/40 transition-all cursor-pointer"
                      >
                        {t.btnReview}
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
