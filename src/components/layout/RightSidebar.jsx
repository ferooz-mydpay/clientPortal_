import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Building2, Users, FileCheck2, ShieldCheck, ArrowRight } from 'lucide-react';

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

  // Compute stats from active project timesheets
  const tsList = activeProject?.timesheets || [];
  const approvedCount = tsList.filter(ts => ts.statusKey === 'approved').length;
  const awaitingCount = tsList.filter(ts => ts.statusKey === 'awaiting').length;
  const inProgressCount = tsList.filter(ts => ts.statusKey === 'sentBack').length;
  const total = tsList.length || 1;

  return (
    <div className="space-y-6">
      {/* 1. Contracts Card with Project Switcher */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>{t.contracts}</span>
          </h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
            Active Agreement
          </span>
        </div>

        <div className="mt-4">
          {/* Active Project display */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="font-extrabold text-[14.5px] text-slate-900 leading-snug">
              {isRtl ? activeProject?.companyNameAr : activeProject?.companyName}
            </div>
            <div className="flex items-center justify-between text-[12px] text-slate-500 mt-2 font-medium">
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                {activeProject?.contractCode}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeProject?.employees} {isRtl ? 'موظف' : 'employees'}</span>
              </span>
            </div>
          </div>

          {/* Project Switcher — only shown when there are other projects */}
          {allProjects.length > 1 && (
            <div className="mt-4 relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-xs font-semibold text-slate-700 shadow-2xs cursor-pointer"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <Building2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span className="truncate">{isRtl ? 'تبديل المشروع' : 'Switch Contract / Project'}</span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute z-30 top-full mt-2 left-0 right-0 bg-white border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden p-1.5 animate-in fade-in zoom-in-95 duration-100">
                  {allProjects.map(proj => {
                    const isActive = proj.id === activeProject?.id;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => {
                          onSwitchProject(proj.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left rtl:text-right hover:bg-slate-50 transition-colors ${isActive ? 'bg-cyan-50/70' : ''}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className={`text-[13px] font-bold truncate ${isActive ? 'text-cyan-700' : 'text-slate-800'}`}>
                            {isRtl ? proj.companyNameAr : proj.companyName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            Contract {proj.contractCode} • {proj.employees} {isRtl ? 'موظف' : 'emp'}
                          </div>
                        </div>
                        {isActive && <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />}
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
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>{t.employeeStatus}</span>
          </h3>
          <span className="text-[12px] text-slate-500 font-bold bg-slate-100 px-2.5 py-0.5 rounded-full">
            {activeProject?.employees} {isRtl ? 'موظف' : 'total'}
          </span>
        </div>

        {/* Modern styled progress bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-4 p-0.5">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full w-full" />
        </div>

        {/* Legend */}
        <div className="mt-5 space-y-2.5 text-[13px]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>{t.onDuty}</span>
            </div>
            <span className="font-extrabold text-slate-900 text-sm">{activeProject?.employees || 1}</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>{t.exitAndReturn}</span>
            </div>
            <span className="font-bold text-slate-500 text-sm">0</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>{t.endOfService}</span>
            </div>
            <span className="font-bold text-slate-500 text-sm">0</span>
          </div>
        </div>
      </div>

      {/* 3. Timesheet Status Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-indigo-600" />
            <span>{t.timesheetStatus}</span>
          </h3>
          <span className="text-[12px] text-slate-500 font-bold bg-slate-100 px-2.5 py-0.5 rounded-full">
            {tsList.length} {isRtl ? 'إجمالي' : 'total'}
          </span>
        </div>

        {/* Segmented progress bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-4 flex gap-1 p-0.5">
          {awaitingCount > 0 && (
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
              style={{ width: `${(awaitingCount / total) * 100}%` }}
              title={`${awaitingCount} Awaiting`}
            />
          )}
          {inProgressCount > 0 && (
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all"
              style={{ width: `${(inProgressCount / total) * 100}%` }}
              title={`${inProgressCount} In progress`}
            />
          )}
          {approvedCount > 0 && (
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
              style={{ width: `${(approvedCount / total) * 100}%` }}
              title={`${approvedCount} Approved`}
            />
          )}
        </div>

        {/* Legend */}
        <div className="mt-5 space-y-2.5 text-[13px]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>{t.awaitingYourApproval}</span>
            </div>
            <span className="font-extrabold text-amber-700 text-sm">{awaitingCount}</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>{t.statusSentBack}</span>
            </div>
            <span className="font-extrabold text-rose-700 text-sm">{inProgressCount}</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{t.statusApproved}</span>
            </div>
            <span className="font-extrabold text-emerald-700 text-sm">{approvedCount}</span>
          </div>
        </div>

        {/* Last approval card */}
        <div className="mt-5 pt-4 border-t border-slate-100 bg-gradient-to-r from-indigo-50/50 to-cyan-50/50 rounded-2xl p-3 border border-indigo-100/50">
          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{t.lastApproval}</div>
          <div className="flex items-center justify-between mt-1 text-[13px]">
            <span className="text-slate-700 font-bold">{t.lastApprovalMonth}</span>
            <span className="font-mono font-extrabold text-indigo-700 text-[13px] bg-white px-2 py-0.5 rounded border border-indigo-100 shadow-2xs">
              {t.lastApprovalDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
