import React, { useState, useMemo } from 'react';
import { Plus, Globe } from 'lucide-react';

export const RequestsPage = ({
  t,
  language,
  toggleLanguage,
  requestsData,
  onOpenNewRequest,
  onViewRequest,
}) => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { id: 'All', label: t.reqTabAll },
    { id: 'Iqama', label: t.reqTabIqama },
    { id: 'End of Service', label: t.reqTabEndOfService },
    { id: 'Vacation', label: t.reqTabVacation },
    { id: 'Termination', label: t.reqTabTermination },
    { id: 'New Demand', label: t.reqTabNewDemand },
    { id: 'Replacement', label: t.reqTabReplacement },
    { id: 'Refused Case', label: t.reqTabRefusedCase },
    { id: 'Sponsorship Transfer', label: t.reqTabSponsorshipTransfer },
  ];

  const filteredRequests = useMemo(() => {
    if (activeTab === 'All') return requestsData;
    return requestsData.filter((r) => r.type.toLowerCase() === activeTab.toLowerCase());
  }, [requestsData, activeTab]);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner matching Image 1 */}
      <div className="bg-[#0f172a] rounded-2xl md:rounded-[20px] p-6 sm:p-8 text-white relative shadow-sm border border-slate-800/60 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-white">
            {t.myRequests}
          </h1>

          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* New Request Button */}
            <button
              onClick={onOpenNewRequest}
              className="bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all cursor-pointer select-none"
            >
              {t.btnNewRequest}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="bg-[#1e293b] hover:bg-slate-800 border border-slate-700/80 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer select-none"
              title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span className={language === 'en' ? 'font-arabic text-sm' : 'font-sans'}>
                {t.langButtonText}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs Bar matching Image 1 */}
      <div className="bg-[#eef2f6] border border-slate-200/80 rounded-2xl p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none shadow-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Requests Table matching Image 1 & 2 */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-medium text-slate-500 bg-white">
                <th className="py-3.5 px-6 font-semibold">{t.colRequestNo}</th>
                <th className="py-3.5 px-6 font-semibold">{t.colType}</th>
                <th className="py-3.5 px-6 font-semibold">{t.colReqStatus}</th>
                <th className="py-3.5 px-6 font-semibold">{t.colRequestedOn}</th>
                <th className="py-3.5 px-6 font-semibold">{t.colExpectedBy}</th>
                <th className="py-3.5 px-6 font-semibold">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-6 text-slate-500 text-xs font-normal">
                    {t.noRequestsFound}
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const isCompleted = req.status === 'Completed';
                  const isNew = req.status === 'New';

                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Request No */}
                      <td className="py-4 px-6 font-medium text-slate-800 text-xs sm:text-[13px]">
                        {req.id}
                      </td>

                      {/* Type */}
                      <td className="py-4 px-6 font-medium text-slate-700 text-xs sm:text-[13px]">
                        {req.type}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {isCompleted && (
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#e8f8f0] text-[#059669]">
                            {t.statusCompleted}
                          </span>
                        )}
                        {isNew && (
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#eef2ff] text-[#4338ca]">
                            {t.statusNew}
                          </span>
                        )}
                      </td>

                      {/* Requested On */}
                      <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px] whitespace-nowrap">
                        {req.requestedOn}
                      </td>

                      {/* Expected By */}
                      <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px] whitespace-nowrap">
                        {req.expectedBy}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <button
                          onClick={() => onViewRequest(req)}
                          className="text-[#4338ca] hover:text-[#3730a3] font-semibold text-xs transition-colors cursor-pointer"
                        >
                          {t.btnView}
                        </button>
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
