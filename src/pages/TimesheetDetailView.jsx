import React, { useState, useMemo } from 'react';
import { Globe } from 'lucide-react';

export const TimesheetDetailView = ({
  t,
  language,
  toggleLanguage,
  timesheet,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 16 Real employees data from the user screenshots
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
      annexure: 'ملحق عقد رقم 3',
    },
    {
      personnelNo: '1016398',
      name: 'KHURSHED ALAM',
      iqamaSid: '2574985814',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '700.00',
      monthlyFees: '1,350.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '700.00',
      netSalaryCustomer: '700.00',
      totalInvoice: '2,050.00',
      annexure: 'ملحق عقد رقم 1',
    },
    {
      personnelNo: '1016449',
      name: 'HOBIB MIAH',
      iqamaSid: '2575275702',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '700.00',
      monthlyFees: '1,350.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '700.00',
      netSalaryCustomer: '700.00',
      totalInvoice: '2,050.00',
      annexure: 'ملحق عقد رقم 1',
    },
    {
      personnelNo: '1009558',
      name: 'MOHAMMAD SAHADAT',
      iqamaSid: '2511250603',
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
      personnelNo: '1008343',
      name: 'MD BILLAL',
      iqamaSid: '2506742630',
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
      personnelNo: '1008314',
      name: 'MD HABIBUR',
      iqamaSid: '2505422713',
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
      personnelNo: '1008728',
      name: 'MD ABUL',
      iqamaSid: '2507719108',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,250.00',
      servicePrice: '2,150.00',
      workingDaysCustomer: '27',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '810.00',
      totalInvoice: '2,060.00',
      annexure: 'ملحق عقد رقم 3',
    },
    {
      personnelNo: '1009324',
      name: 'NOOR',
      iqamaSid: '2511192003',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,250.00',
      servicePrice: '2,150.00',
      workingDaysCustomer: '29',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '870.00',
      totalInvoice: '2,120.00',
      annexure: 'ملحق عقد رقم 3',
    },
    {
      personnelNo: '1008220',
      name: 'MD MINTU',
      iqamaSid: '2505018511',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '1,000.00',
      monthlyFees: '1,050.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '60',
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
      personnelNo: '1011244',
      name: 'MD ALAMIN',
      iqamaSid: '2524541402',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'الهند',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '900.00',
      monthlyFees: '1,150.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '28',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '900.00',
      netSalaryCustomer: '840.00',
      totalInvoice: '1,990.00',
      annexure: 'ملحق عقد رقم 1',
    },
    {
      personnelNo: '1003607',
      name: 'DILDAR ALI',
      iqamaSid: '2460068220',
      muqeem: 'Active & Inside KSA',
      gender: 'Male',
      nationality: 'بنجلاديش',
      crmStatus: 'OnDuty',
      contractId: 'JE-B-0211',
      totalSalary: '800.00',
      monthlyFees: '1,250.00',
      servicePrice: '2,050.00',
      workingDaysCustomer: '30',
      absencesDays: '0',
      deductionAmount: '0.00',
      deductionReason: '',
      overtimeAmount: '0.00',
      employeeOtherDues: '0.00',
      employeeOtherDeductions: '0.00',
      netSalary: '800.00',
      netSalaryCustomer: '800.00',
      totalInvoice: '2,050.00',
      annexure: 'ملحق عقد رقم 1',
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

  const tsCode = timesheet?.code || 'JE-B-0098-2026-12';
  const tsPeriod = timesheet?.period || '01/12/2026 – 31/12/2026';
  const tsStatus = timesheet?.statusKey === 'approved' ? t.statusApproved : (timesheet?.statusKey === 'awaiting' ? t.statusAwaiting : t.statusSentBack);

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb Back Link matching Image 1 */}
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {tsStatus}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-[13px] text-slate-300">
              <span>{t.periodLabel} <strong className="text-white font-normal">{tsPeriod}</strong></span>
              <span>{t.versionLabel} <strong className="text-white font-normal">1</strong></span>
              <span>{t.employeesLabel} <strong className="text-white font-normal">209</strong></span>
              <span>{t.sentOnLabel} <strong className="text-white font-normal">11/11/2026</strong></span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
            <button
              onClick={() => alert('Downloading Excel report for ' + tsCode)}
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

      {/* Main Table Card */}
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
            {t.showingEmployeesCount}
          </div>
        </div>

        {/* Huge Horizontal Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse whitespace-nowrap text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50/70">
                <th className="py-3 px-3">{t.colPersonnelNumber}</th>
                <th className="py-3 px-3">{t.colEmployeeName}</th>
                <th className="py-3 px-3">{t.colIqamaSid}</th>
                <th className="py-3 px-3">{t.colMuqeem}</th>
                <th className="py-3 px-3">{t.colGender}</th>
                <th className="py-3 px-3">{t.colNationality}</th>
                <th className="py-3 px-3">{t.colCrmStatus}</th>
                <th className="py-3 px-3">{t.colContractId}</th>
                <th className="py-3 px-3 text-right rtl:text-left">{t.colTotalSalary}</th>
                <th className="py-3 px-3 text-right rtl:text-left">{t.colMonthlyFees}</th>
                <th className="py-3 px-3 text-right rtl:text-left">{t.colServicePrice}</th>

                {/* Highlighted Green Columns Header matching screenshots */}
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-center font-bold">{t.colWorkingDaysCustomer}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-center font-bold">{t.colAbsencesDays}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-right rtl:text-left font-bold">{t.colDeductionAmount}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-center font-bold">{t.colDeductionReason}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-right rtl:text-left font-bold">{t.colOvertimeAmount}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-right rtl:text-left font-bold">{t.colEmployeeOtherDues}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-right rtl:text-left font-bold">{t.colEmployeeOtherDeductions}</th>

                <th className="py-3 px-3 text-right rtl:text-left">{t.colNetSalary}</th>
                <th className="py-3 px-3 text-right rtl:text-left">{t.colNetSalaryCustomer}</th>
                <th className="py-3 px-3 text-right rtl:text-left">{t.colTotalInvoice}</th>
                <th className="py-3 px-3">{t.colAnnexure}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEmployees.map((emp, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-slate-800">{emp.personnelNo}</td>
                  <td className="py-3 px-3 font-medium text-slate-900">{emp.name}</td>
                  <td className="py-3 px-3 font-mono">{emp.iqamaSid}</td>
                  <td className="py-3 px-3">{emp.muqeem}</td>
                  <td className="py-3 px-3">{emp.gender}</td>
                  <td className="py-3 px-3 font-arabic">{emp.nationality}</td>
                  <td className="py-3 px-3">{emp.crmStatus}</td>
                  <td className="py-3 px-3 font-mono">{emp.contractId}</td>
                  <td className="py-3 px-3 font-mono text-right rtl:text-left">{emp.totalSalary}</td>
                  <td className="py-3 px-3 font-mono text-right rtl:text-left">{emp.monthlyFees}</td>
                  <td className="py-3 px-3 font-mono text-right rtl:text-left">{emp.servicePrice}</td>

                  {/* Highlighted Soft Green Cells */}
                  <td className="py-3 px-3 bg-[#f0fdf4]/40 text-center font-medium text-slate-900">{emp.workingDaysCustomer}</td>
                  <td className="py-3 px-3 bg-[#f0fdf4]/40 text-center font-medium text-slate-900">{emp.absencesDays}</td>
                  <td className="py-3 px-3 bg-[#f0fdf4]/40 font-mono text-right rtl:text-left text-slate-400">{emp.deductionAmount}</td>
                  <td className="py-3 px-3 bg-[#f0fdf4]/40 text-center text-slate-400">{emp.deductionReason || '-'}</td>
                  <td className="py-3 px-3 bg-[#f0fdf4]/40 font-mono text-right rtl:text-left text-slate-400">{emp.overtimeAmount}</td>
                  <td className="py-3 px-3 bg-[#f0fdf4]/40 font-mono text-right rtl:text-left text-slate-400">{emp.employeeOtherDues}</td>
                  <td className="py-3 px-3 bg-[#f0fdf4]/40 font-mono text-right rtl:text-left text-slate-400">{emp.employeeOtherDeductions}</td>

                  <td className="py-3 px-3 font-mono text-right rtl:text-left font-medium text-slate-900">{emp.netSalary}</td>
                  <td className="py-3 px-3 font-mono text-right rtl:text-left font-medium text-slate-900">{emp.netSalaryCustomer}</td>
                  <td className="py-3 px-3 font-mono text-right rtl:text-left font-medium text-slate-900">{emp.totalInvoice}</td>
                  <td className="py-3 px-3 font-arabic text-slate-600">{emp.annexure}</td>
                </tr>
              ))}
            </tbody>

            {/* Total Footer Row matching Image 4 & 5 */}
            <tfoot>
              <tr className="bg-[#f1f5f9]/80 font-bold text-slate-900 border-t-2 border-slate-200">
                <td className="py-3.5 px-3" colSpan={8}>
                  {t.rowTotal}
                </td>
                <td className="py-3.5 px-3 font-mono text-right rtl:text-left">174,300.00</td>
                <td className="py-3.5 px-3 font-mono text-right rtl:text-left">258,550.00</td>
                <td className="py-3.5 px-3 text-right rtl:text-left">-</td>

                {/* Highlighted Green Columns Total */}
                <td className="py-3.5 px-3 bg-[#e6fcf0] text-center font-bold">6,239</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] text-center font-bold">65</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] font-mono text-right rtl:text-left text-slate-500">0.00</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] text-center font-normal text-slate-500">0</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] font-mono text-right rtl:text-left text-slate-500">0.00</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] font-mono text-right rtl:text-left text-slate-500">0.00</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] font-mono text-right rtl:text-left text-slate-500">-</td>

                <td className="py-3.5 px-3 text-right rtl:text-left">-</td>
                <td className="py-3.5 px-3 text-right rtl:text-left">-</td>
                <td className="py-3.5 px-3 text-right rtl:text-left">-</td>
                <td className="py-3.5 px-3">-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
