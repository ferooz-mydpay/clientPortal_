import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, User, Calendar, Clock, DollarSign, Download } from 'lucide-react';

export const TimesheetReviewModal = ({
  isOpen,
  onClose,
  timesheet,
  onApprove,
  onReject,
  t,
}) => {
  if (!isOpen || !timesheet) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {t.reviewModalTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">
              {t.reviewModalSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Contract</span>
              <span className="text-sm font-bold text-slate-800 font-mono">JE-B-0098</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Total Staff</span>
              <span className="text-sm font-bold text-slate-800">1 Employee</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Total Hours</span>
              <span className="text-sm font-bold text-slate-800">176 Hours</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Status</span>
              <span className="text-xs font-bold text-amber-600">Awaiting Approval</span>
            </div>
          </div>

          {/* Employee Breakdown */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 font-semibold text-xs text-slate-600 flex justify-between">
              <span>Employee Breakdown</span>
              <span>May 2026</span>
            </div>
            <div className="p-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  FA
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Fahad Al-Otaibi</h4>
                  <p className="text-xs text-slate-400">Marketing Operations Specialist</p>
                </div>
              </div>

              <div className="text-right rtl:text-left text-xs space-y-0.5">
                <div className="text-slate-600"><span className="font-semibold text-slate-900">22</span> working days</div>
                <div className="text-slate-600"><span className="font-semibold text-slate-900">176</span> standard hrs</div>
                <div className="text-emerald-600 font-semibold">0 overtime hrs</div>
              </div>
            </div>
          </div>

          {/* Notice box */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-3 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              By approving this timesheet, you confirm that the employee hours and attendance for May 2026 are accurate for billing and payroll.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={() => onReject(timesheet.id)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
          >
            {t.btnRejectToFinance}
          </button>
          <button
            onClick={() => onApprove(timesheet.id)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#4338ca] hover:bg-[#3730a3] shadow-md shadow-indigo-300/40 transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{t.btnApproveTimesheet}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
