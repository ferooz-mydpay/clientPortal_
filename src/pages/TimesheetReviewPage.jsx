import React, { useState, useMemo } from 'react';
import { Globe, ArrowLeft, ArrowRight, Download, Printer, CheckCircle2, Upload, AlertCircle, Search, FileSpreadsheet, Building2, Calendar, FileText } from 'lucide-react';

export const TimesheetReviewPage = ({
  t,
  language,
  toggleLanguage,
  timesheet,
  onBack,
  onApproveTimesheet,
  onUploadEditedVersion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExcelFile, setSelectedExcelFile] = useState(null);
  const [reasonForChange, setReasonForChange] = useState('');
  const [notes, setNotes] = useState('');
  const isRtl = language === 'ar';

  // 8 Real employees data
  const employeesData = [
    {
      personnelNo: '1011250',
      name: 'MD',
      iqamaSid: '2521448007',
      alternativeNumber: 'BM11002',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '07/06/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
    {
      personnelNo: '1010591',
      name: 'NUR',
      iqamaSid: '2516027865',
      alternativeNumber: 'BM10338',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '11/08/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
    {
      personnelNo: '1011365',
      name: 'MD',
      iqamaSid: '2523419279',
      alternativeNumber: 'BM11117',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '20/06/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
    {
      personnelNo: '1009963',
      name: 'MD SHAMIM',
      iqamaSid: '2512931748',
      alternativeNumber: 'BM09706',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '14/08/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
    {
      personnelNo: '1009216',
      name: 'MD RANA',
      iqamaSid: '2509670291',
      alternativeNumber: 'BM08959',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '11/08/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
    {
      personnelNo: '1011381',
      name: 'MD SHIRAZUL',
      iqamaSid: '2523419527',
      alternativeNumber: 'BM11133',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '21/06/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
    {
      personnelNo: '1010262',
      name: 'MOHAMMAD',
      iqamaSid: '2514104781',
      alternativeNumber: 'BM10006',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '07/04/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
    {
      personnelNo: '1009344',
      name: 'MD ASADUL',
      iqamaSid: '2511194595',
      alternativeNumber: 'BM09087',
      company: 'شركة السيف مهندسون مقاولون',
      joinDate: '14/08/2022',
      contractId: 'JE-B-0132',
      salaryProcessed: 'No',
      totalSalary: '750.00',
      fees: '240',
      vacationPay: '41',
    },
  ];

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employeesData;
    const q = searchQuery.toLowerCase();
    return employeesData.filter(
      (emp) =>
        emp.name.toLowerCase().includes(q) ||
        emp.personnelNo.includes(q) ||
        emp.iqamaSid.includes(q)
    );
  }, [searchQuery]);

  const tsCode = timesheet?.code || 'JE-B-0098-2026-05';
  const tsPeriod = timesheet?.period || '01/05/2026 – 31/05/2026';

  const handleUploadAndSend = (e) => {
    e.preventDefault();
    if (!reasonForChange.trim()) {
      alert('Please provide a reason for the change.');
      return;
    }
    onUploadEditedVersion && onUploadEditedVersion(tsCode, reasonForChange);
  };

  const handleApprove = () => {
    onApproveTimesheet && onApproveTimesheet(timesheet?.id || 'ts-may-2026');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb Back Link */}
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

      {/* Hero Header Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Title and Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                {tsCode}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{t.statusAwaiting}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-[13px] text-slate-300">
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                {t.periodLabel} <strong className="text-white font-bold">{tsPeriod}</strong>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                {t.versionLabel} <strong className="text-white font-bold">3</strong>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                {t.employeesLabel} <strong className="text-white font-bold">97</strong>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                {t.sentOnLabel} <strong className="text-white font-bold">15/11/2026</strong>
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => alert('Downloading Excel template for ' + tsCode)}
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

      {/* Main Review Section: Table with Search */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Reconciliation Ledger
            </h2>
            <p className="text-xs text-slate-400">
              Verify employee working days, fees, and net salaries
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, or Iqama..."
              className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Employees Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/60">
                <th className="py-3 px-3 font-semibold">Personnel No</th>
                <th className="py-3 px-3 font-semibold">Name</th>
                <th className="py-3 px-3 font-semibold">Iqama / SID</th>
                <th className="py-3 px-3 font-semibold">Alternative No</th>
                <th className="py-3 px-3 font-semibold">Company</th>
                <th className="py-3 px-3 font-semibold">Join Date</th>
                <th className="py-3 px-3 font-semibold">Contract</th>
                <th className="py-3 px-3 font-semibold">Salary Processed</th>
                <th className="py-3 px-3 text-right rtl:text-left font-semibold">Total Salary (SAR)</th>
                <th className="py-3 px-3 text-right rtl:text-left font-semibold">Fees (SAR)</th>
                <th className="py-3 px-3 text-right rtl:text-left font-semibold">Vacation Pay (SAR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredEmployees.map((emp) => (
                <tr key={emp.personnelNo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800">{emp.personnelNo}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{emp.name}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{emp.iqamaSid}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-500">{emp.alternativeNumber}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">{emp.company}</td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">{emp.joinDate}</td>
                  <td className="py-3.5 px-3 font-mono text-indigo-600 font-bold">{emp.contractId}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                      {emp.salaryProcessed}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 text-right rtl:text-left">{emp.totalSalary}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-700 text-right rtl:text-left">{emp.fees}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-700 text-right rtl:text-left">{emp.vacationPay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Decision Panel: Approve or Upload Edited Version */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Approve Box (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-800 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Authorization</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-2">
              Approve Timesheet
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              By confirming, this timesheet will be verified as approved and sent directly to Jussur Emdad Finance to finalize invoice processing and payroll disbursement.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-emerald-800/80">
            <button
              onClick={handleApprove}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-extrabold py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.btnApproveTimesheet || 'Approve Timesheet'}</span>
            </button>
          </div>
        </div>

        {/* Upload Edited Excel Version (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-3">
              <Upload className="w-3.5 h-3.5 text-indigo-600" />
              <span>Submit Modifications</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              Upload Edited Timesheet Version
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              If there are discrepancies in employee days or deductions, upload your updated Excel file.
            </p>

            <form onSubmit={handleUploadAndSend} className="space-y-4">
              {/* File input */}
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 text-center bg-slate-50 transition-colors">
                <input
                  type="file"
                  id="excel-file-upload"
                  className="hidden"
                  accept=".xlsx, .xls"
                  onChange={(e) => setSelectedExcelFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="excel-file-upload" className="cursor-pointer block">
                  <FileSpreadsheet className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <span className="text-xs font-bold text-indigo-600 hover:underline">
                    {selectedExcelFile ? selectedExcelFile.name : 'Click to select updated Excel file'}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Accepts .xlsx or .xls</p>
                </label>
              </div>

              {/* Reason for change */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Reason for modification *
                </label>
                <textarea
                  rows={2}
                  value={reasonForChange}
                  onChange={(e) => setReasonForChange(e.target.value)}
                  placeholder="Explain adjustments made to working days, deductions, or overtime..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                Send Edited Version for Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
