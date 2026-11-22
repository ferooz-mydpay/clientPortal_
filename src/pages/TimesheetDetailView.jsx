import React, { useState, useMemo } from 'react';
import { Globe, ArrowLeft, ArrowRight, Download, Printer, Search, Calendar, DollarSign, Users, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TimesheetDetailView = ({
  t,
  language,
  toggleLanguage,
  timesheet,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isRtl = language === 'ar';

  // 16 Real employees data
  const employeesData = [
    {
      personnelNo: '1006876',
      name: 'NAEM KASHEM',
      iqamaSid: '2499528756',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,250.00',
      servicePrice: '2,150.00',
      workingDaysCustomer: '30',
      absencesDays: '2',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '840.00',
      totalInvoice: '2,090.00',
      annexure: 'ملحق عقد رقم 3',
    },
    {
      personnelNo: '1008231',
      name: 'SULTAN',
      iqamaSid: '2505020004',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,150.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '900.00',
      totalInvoice: '2,050.00',
      annexure: 'ملحق عقد رقم 1',
    },
    {
      personnelNo: '1008222',
      name: 'MD',
      iqamaSid: '2505018685',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,150.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '900.00',
      totalInvoice: '2,050.00',
      annexure: 'ملحق عقد رقم 1',
    },
    {
      personnelNo: '1008173',
      name: 'MD MOYNUL',
      iqamaSid: '2505011029',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,150.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '900.00',
      totalInvoice: '2,050.00',
      annexure: 'ملحق عقد رقم 1',
    },
    {
      personnelNo: '1008781',
      name: 'RAM SINHASAN',
      iqamaSid: '2507874846',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'نيبال',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '1,000.00',
      monthlyFees: '1,050.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '1,000.00',
      netSalaryCustomer: '1,000.00',
      totalInvoice: '2,050.00',
      annexure: 'ملحق عقد رقم 1',
    },
    {
      personnelNo: '1008489',
      name: 'MD YEASIN',
      iqamaSid: '2507114110',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,250.00',
      servicePrice: '2,150.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '900.00',
      totalInvoice: '2,150.00',
      annexure: 'ملحق عقد رقم 1',
    },
  ];

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return employeesData;
    const q = searchQuery.toLowerCase();
    return employeesData.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.personnelNo.includes(q) ||
        e.iqamaSid.includes(q)
    );
  }, [searchQuery]);

  const tsCode = timesheet?.code || 'JE-B-0098-2026-12';
  const tsPeriod = timesheet?.period || '01/12/2026 – 31/12/2026';
  const statusKey = timesheet?.statusKey || 'approved';

  return (
    <div className="space-y-6">
      {/* Top Back Action */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer group"
        >
          {isRtl ? (
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          )}
          <span>{t.breadcrumbTimesheets}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                {tsCode}
              </h1>
              {statusKey === 'approved' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{t.statusApproved}</span>
                </span>
              ) : statusKey === 'sentBack' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-400/15 text-rose-300 border border-rose-400/30">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>{t.statusSentBack}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{t.statusAwaiting}</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                Period: <strong className="text-white font-bold">{tsPeriod}</strong>
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                Total Employees: <strong className="text-white font-bold">{employeesData.length}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => alert('Downloading Excel report for ' + tsCode)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.btnDownloadExcel}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>{t.btnPrint}</span>
            </button>
            <button
              onClick={toggleLanguage}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-300" />
              <span className={language === 'en' ? 'font-arabic text-sm' : 'font-sans'}>{t.langButtonText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Ledger Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Detailed Workforce Ledger
            </h2>
            <p className="text-xs text-slate-400">
              Complete breakdown of working days, deductions, net customer billings, and annexures
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employee or Iqama..."
              className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70 whitespace-nowrap">
                <th className="py-3 px-3">Personnel No</th>
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Iqama / SID</th>
                <th className="py-3 px-3">Muqeem Status</th>
                <th className="py-3 px-3">Profession / Status</th>
                <th className="py-3 px-3">Contract</th>
                <th className="py-3 px-3 text-right rtl:text-left">Salary (SAR)</th>
                <th className="py-3 px-3 text-right rtl:text-left">Monthly Fees (SAR)</th>
                <th className="py-3 px-3 text-right rtl:text-left">Service Price (SAR)</th>
                <th className="py-3 px-3 text-center">Days Worked</th>
                <th className="py-3 px-3 text-center">Absences</th>
                <th className="py-3 px-3 text-right rtl:text-left">Deductions (SAR)</th>
                <th className="py-3 px-3 text-right rtl:text-left">Net Salary (SAR)</th>
                <th className="py-3 px-3 text-right rtl:text-left">Total Invoice (SAR)</th>
                <th className="py-3 px-3">Annexure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((emp) => (
                <tr key={emp.personnelNo} className="hover:bg-slate-50/80 transition-colors whitespace-nowrap">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800">{emp.personnelNo}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{emp.name}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{emp.iqamaSid}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {emp.muqeem}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{emp.crmStatus}</td>
                  <td className="py-3.5 px-3 font-mono text-indigo-600 font-bold">{emp.contractId}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-800 text-right rtl:text-left">{emp.totalSalary}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600 text-right rtl:text-left">{emp.monthlyFees}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-800 text-right rtl:text-left">{emp.servicePrice}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-800">{emp.workingDaysCustomer}</td>
                  <td className="py-3.5 px-3 text-center text-slate-500">{emp.absencesDays}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600 text-right rtl:text-left">{emp.deductionAmount}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-700 text-right rtl:text-left">{emp.netSalaryCustomer}</td>
                  <td className="py-3.5 px-3 font-mono font-extrabold text-indigo-700 text-right rtl:text-left">{emp.totalInvoice}</td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{emp.annexure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
