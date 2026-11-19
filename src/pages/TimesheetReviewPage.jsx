import React, { useState, useMemo } from 'react';
import { Globe } from 'lucide-react';

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

  // 8 Real employees data matching Image 1 & 2
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
          className="text-xs font-semibold text-[#4338ca] hover:underline cursor-pointer inline-flex items-center gap-1"
        >
          {t.breadcrumbTimesheets}
        </button>
      </div>

      {/* Hero Header Card matching Image 1 */}
      <div className="bg-[#0f172a] rounded-2xl md:rounded-[20px] p-6 sm:p-7 text-white relative shadow-sm border border-slate-800/60 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left Title and Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-[26px] font-bold tracking-tight text-white font-mono">
                {tsCode}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {t.statusAwaiting}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-[13px] text-slate-300">
              <span>{t.periodLabel} <strong className="text-white font-normal">{tsPeriod}</strong></span>
              <span>{t.versionLabel} <strong className="text-white font-normal">3</strong></span>
              <span>{t.employeesLabel} <strong className="text-white font-normal">97</strong></span>
              <span>{t.sentOnLabel} <strong className="text-white font-normal">15/11/2026</strong></span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
            <button
              onClick={() => alert('Downloading Excel template for ' + tsCode)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              {t.btnDownloadExcel}
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              {t.btnPrint}
            </button>
            <button
              onClick={toggleLanguage}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer select-none flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-slate-300" />
              <span className={language === 'en' ? 'font-arabic text-sm' : 'font-sans'}>
                {t.langButtonText}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Card matching Image 1 & 2 */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        {/* Search Bar & Total count */}
        <div className="p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchEmployeePlaceholder}
            className="w-full sm:w-80 bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
          />
          <div className="text-xs text-slate-400 font-normal">
            {t.showingEmployeesCount97}
          </div>
        </div>

        {/* Table matching Image 1 & 2 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse whitespace-nowrap text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50/70">
                <th className="py-3 px-4">{t.colPersonnelNumber}</th>
                <th className="py-3 px-4">{t.colEmployeeName}</th>
                <th className="py-3 px-4">{t.colIqamaSid}</th>
                <th className="py-3 px-4">{t.colAlternativeNumber}</th>
                <th className="py-3 px-4">{t.colCompany}</th>
                <th className="py-3 px-4">{t.colJoinDate}</th>
                <th className="py-3 px-4">{t.colContractId}</th>
                <th className="py-3 px-4">{t.colSalaryProcessed}</th>
                <th className="py-3 px-4 text-right rtl:text-left">{t.colTotalSalary}</th>
                <th className="py-3 px-4 text-right rtl:text-left">{t.colFees}</th>
                <th className="py-3 px-4 text-right rtl:text-left">{t.colVacationPay}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEmployees.map((emp, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">{emp.personnelNo}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{emp.name}</td>
                  <td className="py-3 px-4 font-mono">{emp.iqamaSid}</td>
                  <td className="py-3 px-4 font-mono">{emp.alternativeNumber}</td>
                  <td className="py-3 px-4 font-arabic">{emp.company}</td>
                  <td className="py-3 px-4 font-mono">{emp.joinDate}</td>
                  <td className="py-3 px-4 font-mono">{emp.contractId}</td>
                  <td className="py-3 px-4">{emp.salaryProcessed}</td>
                  <td className="py-3 px-4 font-mono text-right rtl:text-left">{emp.totalSalary}</td>
                  <td className="py-3 px-4 font-mono text-right rtl:text-left">{emp.fees}</td>
                  <td className="py-3 px-4 font-mono text-right rtl:text-left">{emp.vacationPay}</td>
                </tr>
              ))}
            </tbody>

            {/* Total Footer Row matching Image 2 */}
            <tfoot>
              <tr className="bg-[#f1f5f9]/80 font-bold text-slate-900 border-t-2 border-slate-200">
                <td className="py-3.5 px-4" colSpan={8}>
                  {t.rowTotal}
                </td>
                <td className="py-3.5 px-4 font-mono text-right rtl:text-left">72,850.00</td>
                <td className="py-3.5 px-4 font-mono text-right rtl:text-left">23280</td>
                <td className="py-3.5 px-4 font-mono text-right rtl:text-left">3989</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Section 1: Upload an edited version matching Image 2 */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
        <h3 className="text-base font-bold text-slate-900">
          {t.uploadEditedVersionTitle}
        </h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {t.uploadEditedVersionSubtitle}
        </p>

        {/* File Picker */}
        <div className="mt-4 flex items-center gap-2">
          <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-medium px-4 py-2 rounded-xl transition-colors">
            {t.btnChooseExcelFile}
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => setSelectedExcelFile(e.target.files?.[0] || null)}
            />
          </label>
          <span className="text-xs text-slate-500">
            {selectedExcelFile ? selectedExcelFile.name : t.noFileSelectedExcel}
          </span>
        </div>

        {/* Reason for change */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-bold text-slate-900">
            {t.reasonForChangeLabel}
          </label>
          <textarea
            rows={3}
            value={reasonForChange}
            onChange={(e) => setReasonForChange(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
          />
        </div>

        {/* Upload & send button */}
        <div className="mt-4">
          <button
            onClick={handleUploadAndSend}
            className="bg-[#4338ca] hover:bg-[#3730a3] active:scale-95 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-indigo-300/40 transition-all cursor-pointer"
          >
            {t.btnUploadAndSendForReview}
          </button>
        </div>
      </div>

      {/* Section 2: Notes (optional) & Approve timesheet matching Image 3 */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
        <label className="block text-xs font-bold text-slate-900 mb-2">
          {t.notesOptionalReviewLabel}
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
        />

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500">
            {t.approvingDisclaimer}
          </p>
          <button
            onClick={handleApprove}
            className="bg-[#4338ca] hover:bg-[#3730a3] active:scale-95 text-white font-semibold text-xs sm:text-sm px-7 py-2.5 rounded-xl shadow-md shadow-indigo-300/40 transition-all cursor-pointer"
          >
            {t.btnApproveTimesheetAction}
          </button>
        </div>
      </div>
    </div>
  );
};
