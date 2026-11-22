import React, { useState, useMemo } from 'react';
import { Plus, Globe, Filter, Clock, CheckCircle2, AlertCircle, FileText, Calendar, ArrowRight, Eye } from 'lucide-react';

export const RequestsPage = ({
  t,
  language,
  toggleLanguage,
  requestsData,
  onOpenNewRequest,
  onViewRequest,
}) => {
  const [activeTab, setActiveTab] = useState('All');
  const isRtl = language === 'ar';

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
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Service Level Agreement (SLA) Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.myRequests}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Submit and monitor workforce administrative actions & official transactions
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* New Request Button */}
            <button
              onClick={onOpenNewRequest}
              className="bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 active:scale-95 text-white font-extrabold px-6 py-2.5 rounded-2xl text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{t.btnNewRequest}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 backdrop-blur-md text-white font-bold px-4 py-2.5 rounded-2xl text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer select-none"
              title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-cyan-300" />
              <span className={language === 'en' ? 'font-arabic text-sm' : 'font-sans'}>
                {t.langButtonText}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = tab.id === 'All' 
            ? requestsData.length 
            : requestsData.filter(r => r.type.toLowerCase() === tab.id.toLowerCase()).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-cyan-50/70 text-indigo-900 border border-indigo-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Requests Table */}
      <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/60">
                <th className="py-4 px-6 font-semibold">{t.colRequestNo}</th>
                <th className="py-4 px-6 font-semibold">{t.colType}</th>
                <th className="py-4 px-6 font-semibold">{t.colReqStatus}</th>
                <th className="py-4 px-6 font-semibold">{t.colRequestedOn}</th>
                <th className="py-4 px-6 font-semibold">{t.colExpectedBy}</th>
                <th className="py-4 px-6 text-right rtl:text-left font-semibold">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-6 text-center text-slate-400 text-sm font-medium">
                    {t.noRequestsFound}
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const isCompleted = req.status === 'Completed';
                  const isNew = req.status === 'New';
                  const isInProgress = req.status === 'In Progress';

                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Request No */}
                      <td className="py-4 px-6 font-mono font-bold text-slate-900 text-xs sm:text-[13px]">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                          <span>{req.id}</span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-4 px-6 font-semibold text-slate-800 text-xs sm:text-[13px]">
                        {req.type}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>{t.statusCompleted}</span>
                          </span>
                        )}
                        {isNew && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            <span>{t.statusNew}</span>
                          </span>
                        )}
                        {isInProgress && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>{t.statusInProgress || 'In Progress'}</span>
                          </span>
                        )}
                      </td>

                      {/* Requested On */}
                      <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px] whitespace-nowrap font-medium">
                        {req.requestedOn}
                      </td>

                      {/* Expected By */}
                      <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px] whitespace-nowrap font-medium">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-mono">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{req.expectedBy}</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 whitespace-nowrap text-right rtl:text-left">
                        <button
                          onClick={() => onViewRequest(req)}
                          className="bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 border border-slate-200 hover:border-indigo-200 font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t.btnView}</span>
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
