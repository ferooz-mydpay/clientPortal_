import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  Printer, 
  CheckCircle2, 
  Upload, 
  AlertCircle, 
  Search, 
  FileSpreadsheet, 
  Building2, 
  Calendar, 
  FileText,
  Pencil,
  Check,
  X
} from 'lucide-react';

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

  // 16 Real employees data matching Timesheet Detail View & screenshots
  const initialEmployeesData = [
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

  // Editable state
  const [employeesList, setEmployeesList] = useState(initialEmployeesData);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ workingDaysCustomer: '', absencesDays: '' });

  const handleStartEdit = (emp) => {
    setEditingId(emp.personnelNo);
    setEditValues({
      workingDaysCustomer: emp.workingDaysCustomer,
      absencesDays: emp.absencesDays,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({ workingDaysCustomer: '', absencesDays: '' });
  };

  const handleSaveEdit = (personnelNo) => {
    setEmployeesList(prev => prev.map(emp => {
      if (emp.personnelNo === personnelNo) {
        const newDays = parseInt(editValues.workingDaysCustomer, 10);
        const validDays = isNaN(newDays) || newDays < 0 ? 0 : newDays;
        const newAbs = parseInt(editValues.absencesDays, 10);
        const validAbs = isNaN(newAbs) || newAbs < 0 ? 0 : newAbs;
        
        // Recalculate customer net salary proportionally (base salary * workingDays / 30)
        const baseSalary = parseFloat(emp.totalSalary.replace(/,/g, '')) || 900;
        const recalculatedNet = ((baseSalary * Math.min(validDays, 30)) / 30).toFixed(2);

        return {
          ...emp,
          workingDaysCustomer: String(validDays),
          absencesDays: String(validAbs),
          netSalaryCustomer: recalculatedNet,
        };
      }
      return emp;
    }));
    setEditingId(null);
  };

  // Dynamic calculations for table footer
  const computedWorkingDaysTotal = useMemo(() => {
    const diff = employeesList.reduce((acc, curr, idx) => {
      const orig = parseInt(initialEmployeesData[idx]?.workingDaysCustomer || '30', 10);
      const now = parseInt(curr.workingDaysCustomer || '0', 10);
      return acc + (now - orig);
    }, 0);
    return (6239 + diff).toLocaleString();
  }, [employeesList]);

  const computedAbsenceDaysTotal = useMemo(() => {
    const diff = employeesList.reduce((acc, curr, idx) => {
      const orig = parseInt(initialEmployeesData[idx]?.absencesDays || '0', 10);
      const now = parseInt(curr.absencesDays || '0', 10);
      return acc + (now - orig);
    }, 0);
    return (65 + diff).toLocaleString();
  }, [employeesList]);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employeesList;
    const q = searchQuery.toLowerCase();
    return employeesList.filter(
      (emp) =>
        emp.name.toLowerCase().includes(q) ||
        emp.personnelNo.includes(q) ||
        emp.iqamaSid.includes(q)
    );
  }, [searchQuery, employeesList]);

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
                {t.employeesLabel} <strong className="text-white font-bold">{timesheet?.employees || 209}</strong>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                {t.sentOnLabel} <strong className="text-white font-bold">15/11/2026</strong>
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={() => alert('Downloading Excel report for ' + tsCode)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.btnDownloadExcel}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
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

      {/* Main Review Section: Table with Search matching Timesheet Detail View */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80 overflow-hidden">
        {/* Search Bar & Total count */}
        <div className="pb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Reconciliation Ledger
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isRtl ? 'أيام العمل والغياب قابلة للتعديل' : 'Working Days & Absences Editable'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify employee working days, fees, and net salaries
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchEmployeePlaceholder}
                className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
            <div className="text-xs text-slate-400 font-normal whitespace-nowrap self-center">
              {t.showingEmployeesCount}
            </div>
          </div>
        </div>

        {/* Huge Horizontal Scrollable Table with 22 columns + Action Edit Column */}
        <div className="overflow-x-auto mt-4">
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

                {/* Highlighted Green Columns Header */}
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-center font-bold">{t.colWorkingDaysCustomer}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-center font-bold">{t.colAbsencesDays}</th>
                <th className="py-3 px-3 bg-[#ecfdf5] text-[#065f46] text-center font-bold">{isRtl ? 'تعديل' : 'Edit'}</th>
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
              {filteredEmployees.map((emp, idx) => {
                const isEditing = editingId === emp.personnelNo;
                return (
                  <tr key={idx} className={`transition-colors ${isEditing ? 'bg-emerald-50/40' : 'hover:bg-slate-50/80'}`}>
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

                    {/* Highlighted Soft Green Cells — Editable in Place */}
                    <td className="py-2.5 px-3 bg-[#f0fdf4]/50 text-center font-medium text-slate-900">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          max="31"
                          value={editValues.workingDaysCustomer}
                          onChange={(e) => setEditValues(prev => ({ ...prev, workingDaysCustomer: e.target.value }))}
                          className="w-14 text-center font-bold text-slate-900 bg-white border-2 border-emerald-500 rounded-lg py-1 px-1 outline-none ring-2 ring-emerald-500/20 shadow-xs text-xs font-mono"
                          autoFocus
                        />
                      ) : (
                        <span className="font-bold text-slate-900">{emp.workingDaysCustomer}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 bg-[#f0fdf4]/50 text-center font-medium text-slate-900">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          max="31"
                          value={editValues.absencesDays}
                          onChange={(e) => setEditValues(prev => ({ ...prev, absencesDays: e.target.value }))}
                          className="w-14 text-center font-bold text-slate-900 bg-white border-2 border-emerald-500 rounded-lg py-1 px-1 outline-none ring-2 ring-emerald-500/20 shadow-xs text-xs font-mono"
                        />
                      ) : (
                        <span className="font-bold text-slate-900">{emp.absencesDays}</span>
                      )}
                    </td>
                    
                    {/* Transparent Action Edit / Tick / Cross Buttons */}
                    <td className="py-2.5 px-3 bg-[#f0fdf4]/50 text-center">
                      {isEditing ? (
                        <div className="inline-flex items-center justify-center gap-1">
                          {/* Transparent Green Tick (✓ Save) Button */}
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(emp.personnelNo)}
                            className="p-1 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100/80 active:scale-90 transition-all cursor-pointer shadow-xs bg-emerald-50/80 border border-emerald-300"
                            title={isRtl ? 'حفظ التعديلات' : 'Save changes'}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          {/* Transparent Red Cross (✕ Cancel) Button */}
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:scale-90 transition-all cursor-pointer border border-transparent hover:border-rose-200"
                            title={isRtl ? 'إلغاء' : 'Cancel'}
                          >
                            <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      ) : (
                        /* Transparent Edit Button */
                        <button
                          type="button"
                          onClick={() => handleStartEdit(emp)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-100/70 active:scale-95 transition-all text-[11px] font-semibold cursor-pointer border border-slate-200/60 hover:border-emerald-300 group"
                          title={isRtl ? 'تعديل أيام العمل والغياب' : 'Edit working days & absences'}
                        >
                          <Pencil className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                          <span>{isRtl ? 'تعديل' : 'Edit'}</span>
                        </button>
                      )}
                    </td>

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
                );
              })}
            </tbody>

            {/* Total Footer Row */}
            <tfoot>
              <tr className="bg-[#f1f5f9]/80 font-bold text-slate-900 border-t-2 border-slate-200">
                <td className="py-3.5 px-3" colSpan={8}>
                  {t.rowTotal}
                </td>
                <td className="py-3.5 px-3 font-mono text-right rtl:text-left">174,300.00</td>
                <td className="py-3.5 px-3 font-mono text-right rtl:text-left">258,550.00</td>
                <td className="py-3.5 px-3 text-right rtl:text-left">-</td>

                {/* Highlighted Green Columns Total */}
                <td className="py-3.5 px-3 bg-[#e6fcf0] text-center font-bold font-mono">{computedWorkingDaysTotal}</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] text-center font-bold font-mono">{computedAbsenceDaysTotal}</td>
                <td className="py-3.5 px-3 bg-[#e6fcf0] text-center font-bold text-slate-400">-</td>
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
