import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Building2 } from 'lucide-react';

export const RightSidebar = ({ t, language, allProjects = [], activeProject, onSwitchProject }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isRtl = language === 'ar';

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const otherProjects = allProjects.filter(p => p.id !== activeProject?.id);

  // Compute stats from active project timesheets
  const tsList = activeProject?.timesheets || [];
  const approvedCount = tsList.filter(ts => ts.statusKey === 'approved').length;
  const awaitingCount = tsList.filter(ts => ts.statusKey === 'awaiting').length;
  const inProgressCount = tsList.filter(ts => ts.statusKey === 'sentBack').length;
  const total = tsList.length || 1;

  return (
    <div className="space-y-6">
      {/* 1. Contracts Card with Project Switcher */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
        <h3 className="text-[16px] font-bold text-slate-900">{t.contracts}</h3>

        <div className="mt-3.5 pt-3.5 border-t border-slate-100">
          {/* Active Project */}
          <div className="font-bold text-[14px] text-slate-900">
            {isRtl ? activeProject?.companyNameAr : activeProject?.companyName}
          </div>
          <div className="flex items-center justify-between text-[12px] text-slate-400 mt-2 font-normal">
            <span>Contract {activeProject?.contractCode}</span>
            <span>{activeProject?.employees} {isRtl ? 'موظف' : 'employees'}</span>
          </div>

          {/* Project Switcher — only shown when there are other projects */}
          {allProjects.length > 1 && (
            <div className="mt-4 relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-medium text-slate-700"
              >
                <span className="flex items-center gap-1.5 min-w-0">
                  <Building2 className="w-3.5 h-3.5 text-[#00a3e0] shrink-0" />
                  <span className="truncate">{isRtl ? activeProject?.companyNameAr : activeProject?.companyName}</span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute z-30 top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                  {allProjects.map(proj => {
                    const isActive = proj.id === activeProject?.id;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => {
                          onSwitchProject(proj.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 ${isActive ? 'bg-cyan-50/60' : ''}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className={`text-[13px] font-semibold truncate ${isActive ? 'text-[#00a3e0]' : 'text-slate-800'}`}>
                            {isRtl ? proj.companyNameAr : proj.companyName}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">Contract {proj.contractCode} · {proj.employees} {isRtl ? 'موظف' : 'emp'}</div>
                        </div>
                        {isActive && <Check className="w-4 h-4 text-[#00a3e0] shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Employee Status Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-slate-900">{t.employeeStatus}</h3>
          <span className="text-[12px] text-slate-400 font-normal">
            {activeProject?.employees} {isRtl ? 'موظف' : 'employees'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-[#4f46e5] rounded-full w-full" />
        </div>

        {/* Legend */}
        <div className="mt-5 space-y-3 text-[13px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
              <span>{t.onDuty}</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">{activeProject?.employees || 1}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span>{t.exitAndReturn}</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">0</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
              <span>{t.endOfService}</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">0</span>
          </div>
        </div>
      </div>

      {/* 3. Timesheet Status Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-slate-900">{t.timesheetStatus}</h3>
          <span className="text-[12px] text-slate-400 font-normal">{tsList.length} {isRtl ? 'إجمالي' : 'total'}</span>
        </div>

        {/* Segmented progress bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-4 flex gap-0.5">
          <div
            className="h-full bg-[#f59e0b] rounded-l-full"
            style={{ width: `${(awaitingCount / total) * 100}%` }}
            title={`${awaitingCount} Awaiting`}
          />
          <div
            className="h-full bg-[#e11d48]"
            style={{ width: `${(inProgressCount / total) * 100}%` }}
            title={`${inProgressCount} In progress`}
          />
          <div
            className="h-full bg-[#059669] rounded-r-full"
            style={{ width: `${(approvedCount / total) * 100}%` }}
            title={`${approvedCount} Approved`}
          />
        </div>

        {/* Legend */}
        <div className="mt-5 space-y-3 text-[13px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span>{t.awaitingYourApproval}</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">{awaitingCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]" />
              <span>{t.statusSentBack}</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">{inProgressCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
              <span>{t.statusApproved}</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">{approvedCount}</span>
          </div>
        </div>

        {/* Last approval */}
        <div className="border-t border-slate-100 mt-5 pt-4">
          <div className="text-[11px] text-slate-400 font-normal">{t.lastApproval}</div>
          <div className="flex items-center justify-between mt-1 text-[13px]">
            <span className="text-slate-600 font-medium">{t.lastApprovalMonth}</span>
            <span className="font-bold text-slate-900 text-[14px]">{t.lastApprovalDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
