import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Lock, 
  FileText, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  Folder, 
  Phone, 
  Mail, 
  Printer, 
  Download, 
  Save, 
  Share2, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  FileCheck,
  Plus,
  RotateCw,
  BarChart3,
  FileSpreadsheet,
  ChevronDown,
  X
} from 'lucide-react';

export const EmployeeDetailView = ({ employee, onBack, t, language }) => {
  const [activeTab, setActiveTab] = useState('general');
  const isRtl = language === 'ar';
  const [leaveRequests, setLeaveRequests] = useState([
    { id: '1', requestNumber: 'Leave-00003432', leaveType: 'Sick', employee: employee?.fullName || 'Employee', employeeNumber: employee?.employeeNo || '—', iqamaNumber: employee?.iqamaNo || '—', project: employee?.project || '—', vacationPeriod: '4', owner: 'Imran Ahmed', status: 'Submitted', createdOn: '06/Oct/26 1:43 AM' },
    { id: '2', requestNumber: 'Leave-00003431', leaveType: 'Sick', employee: employee?.fullName || 'Employee', employeeNumber: employee?.employeeNo || '—', iqamaNumber: employee?.iqamaNo || '—', project: employee?.project || '—', vacationPeriod: '2', owner: 'Imran Ahmed', status: 'Submitted', createdOn: '06/Oct/26 1:38 AM' },
    { id: '3', requestNumber: 'Leave-00003430', leaveType: 'Annual', employee: employee?.fullName || 'Employee', employeeNumber: employee?.employeeNo || '—', iqamaNumber: employee?.iqamaNo || '—', project: employee?.project || '—', vacationPeriod: '2', owner: 'Admin', status: 'Draft', createdOn: '05/Oct/26 1:57 AM' },
  ]);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  // Contract Renewal Requests state
  const [contractRequests, setContractRequests] = useState([
    { id: 'c1', requestNumber: 'CREN-00001021', employee: employee?.fullName || 'Employee', employeeNumber: employee?.employeeNo || '—', employeeType: 'Business Sec...', gender: 'Male', iqamaNumber: employee?.iqamaNo || '—', nationality: 'الفلبين', project: employee?.project || '—', employeeStatus: 'OnDuty', periodInMonths: '12', status: 'Rejected', owner: 'Fatimah Alharb', createdOn: '19/Oct/26 5:31 PM' },
    { id: 'c2', requestNumber: 'CREN-00001019', employee: employee?.fullName || 'Employee', employeeNumber: employee?.employeeNo || '—', employeeType: 'Business Sec...', gender: 'Male', iqamaNumber: employee?.iqamaNo || '—', nationality: 'الهند', project: employee?.project || '—', employeeStatus: 'OnDuty', periodInMonths: '12', status: 'Pending HR', owner: 'Imran Ahmed', createdOn: '25/Sep/26 5:38 PM' },
    { id: 'c3', requestNumber: 'CREN-00001015', employee: employee?.fullName || 'Employee', employeeNumber: employee?.employeeNo || '—', employeeType: 'Business Sec...', gender: 'Male', iqamaNumber: employee?.iqamaNo || '—', nationality: 'بنغلاديش', project: employee?.project || '—', employeeStatus: 'New', periodInMonths: '3', status: 'Approved', owner: 'HR Team', createdOn: '09/Aug/26 2:18 PM' },
  ]);
  const [contractModalOpen, setContractModalOpen] = useState(false);

  if (!employee) return null;

  const tabs = [
    { id: 'general', label: isRtl ? 'عام' : 'General' },
    { id: 'leaves', label: isRtl ? 'طلبات الإجازة' : 'Leave Requests' },
    { id: 'contracts', label: isRtl ? 'طلبات تجديد العقد' : 'Contract Renewal Requests' },
    { id: 'files', label: isRtl ? 'الملفات والمستندات' : 'Files' },
    { id: 'notes', label: isRtl ? 'الملاحظات' : 'Notes' },
  ];

  // Derive realistic financials based on the employee
  const basicSalary = 1500;
  const foodAllowance = 300;
  const totalSalary = basicSalary + foodAllowance;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#00a3e0] hover:text-[#0284c7] transition-colors cursor-pointer group"
        >
          {isRtl ? (
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          )}
          <span>{isRtl ? 'العودة إلى قائمة الموظفين' : 'Back to Employees'}</span>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>{isRtl ? 'طباعة' : 'Print'}</span>
          </button>
          <button
            onClick={() => alert(`Exporting ${employee.fullName} dossier...`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{isRtl ? 'تصدير PDF' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Main Employee Record Card Header matching Screenshot 1 */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b] overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Avatar + Name + Type */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20 shrink-0">
              {employee.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  {employee.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isRtl ? 'محفوظ' : 'Saved'}
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium">
                {isRtl ? 'موظف' : 'Employee'} • {employee.profession} • {employee.nationality}
              </p>
            </div>
          </div>

          {/* Right: CRM Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold mb-1">
                {isRtl ? 'رقم الموظف' : 'Employee Number'}
              </span>
              <span className="font-mono font-bold text-white text-sm bg-white/10 px-2 py-0.5 rounded border border-white/10">
                {employee.employeeNo}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold mb-1">
                {isRtl ? 'حالة الموظف' : 'Employee Status'}
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {isRtl ? 'إجراءات الخروج النهائي' : 'On Final Exit Process'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold mb-1">
                {isRtl ? 'المالك' : 'Owner'}
              </span>
              <span className="font-medium text-slate-200">
                منسفي ومشرقي حينك
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold mb-1">
                {isRtl ? 'تاريخ الإنشاء' : 'Created On'}
              </span>
              <span className="font-medium text-slate-200">
                30/Jul/26 9:57 AM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border border-slate-200/90 rounded-t-3xl px-3 sm:px-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none shadow-2xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-4 text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
                isActive
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panes */}
      <div className="bg-white rounded-b-3xl border border-t-0 border-slate-200/90 p-6 sm:p-9 space-y-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* ===================== TAB 1: GENERAL ===================== */}
        {activeTab === 'general' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Section 1: Core Information (2 columns matching Screenshot 1) */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-[#00a3e0]" />
                <span>{isRtl ? 'المعلومات الأساسية' : 'Core Employee Information'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs">
                {/* Left Column */}
                <div className="space-y-3.5">
                  {/* Employee Number (Locked) */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      {isRtl ? 'رقم الموظف' : 'Employee Number'}
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {employee.employeeNo}
                    </span>
                  </div>

                  {/* Full Name */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'الاسم الكامل' : 'Full Name'}
                    </span>
                    <span className="font-bold text-slate-900">
                      {employee.fullName}
                    </span>
                  </div>

                  {/* Employee Type */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'نوع الموظف' : 'Employee Type'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      Individual Sector
                    </span>
                  </div>

                  {/* Nationality */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'الجنسية' : 'Nationality'}
                    </span>
                    <span className="text-[#00a3e0] font-semibold hover:underline cursor-pointer">
                      {employee.nationality}
                    </span>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'الجنس' : 'Gender'}
                    </span>
                    <span className="font-medium text-slate-800">
                      {employee.gender}
                    </span>
                  </div>

                  {/* Shelter */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'المأوى' : 'Shelter'}
                    </span>
                    <span className="font-medium text-slate-800">
                      Look for Shelter
                    </span>
                  </div>

                  {/* Recruitment Request */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'طلب الاستقدام' : 'Recruitment Request'}
                    </span>
                    <span className="text-slate-400 font-mono">---</span>
                  </div>

                  {/* Entry Visa Number */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'رقم تأشيرة الدخول' : 'Entry Visa Number'}
                    </span>
                    <span className="font-mono text-slate-800 font-semibold">
                      6166461513
                    </span>
                  </div>

                  {/* Tafqit */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'التفقيط' : 'Tafqit'}
                    </span>
                    <span className="text-slate-400">---</span>
                  </div>

                  {/* From Agency */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'من الوكالة' : 'From Agency'}
                    </span>
                    <span className="text-slate-400">---</span>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'المالك المسؤول' : 'Owner'}
                    </span>
                    <span className="text-indigo-600 font-semibold">
                      منسفي ومشرقي حينك
                    </span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3.5">
                  {/* Employee Status */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'حالة الموظف' : 'Employee Status'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      On Final Exit Process
                    </span>
                  </div>

                  {/* Arabic Name */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'الاسم باللغة العربية' : 'Arabic Name'}
                    </span>
                    <span className="text-slate-400">---</span>
                  </div>

                  {/* Escape Status */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'حالة الهروب' : 'Escape Status'}
                    </span>
                    <span className="text-slate-400">---</span>
                  </div>

                  {/* Religion */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'الديانة' : 'Religion'}
                    </span>
                    <span className="text-slate-400">---</span>
                  </div>

                  {/* Sales Profession */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'المهنة' : 'Sales Profession'}
                    </span>
                    <span className="text-[#00a3e0] font-semibold hover:underline cursor-pointer">
                      {employee.profession}
                    </span>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'تاريخ الميلاد' : 'Date Of Birth'}
                    </span>
                    <span className="font-medium text-slate-800">
                      23/Jun/26
                    </span>
                  </div>

                  {/* Blood Group */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'فصيلة الدم' : 'Blood Group'}
                    </span>
                    <span className="text-slate-400">---</span>
                  </div>

                  {/* Marital Status */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'الحالة الاجتماعية' : 'Marital Status'}
                    </span>
                    <span className="text-slate-400">---</span>
                  </div>

                  {/* Driving License */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'رخصة قيادة' : 'Driving License'}
                    </span>
                    <span className="font-semibold text-slate-700">No</span>
                  </div>

                  {/* At The Client */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'لدى العميل' : 'At The Client'}
                    </span>
                    <span className="font-semibold text-slate-700">No</span>
                  </div>

                  {/* Has Bank Letter */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium">
                      {isRtl ? 'خطاب بنكي' : 'Has Bank Letter'}
                    </span>
                    <span className="font-semibold text-slate-700">No</span>
                  </div>

                  {/* Has Insurance Against Escape? */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      {isRtl ? 'تأمين ضد الهروب' : 'Has Insurance Against Escape?'}
                    </span>
                    <span className="font-semibold text-slate-700">No</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Contact Info matching Screenshot 1 */}
            <div className="pt-4 border-t border-slate-200/80">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00a3e0]" />
                <span>{isRtl ? 'معلومات الاتصال' : 'Contact Info'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'رقم الجوال' : 'Mobile Phone'}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {employee.mobile}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                  </span>
                  <span className="text-slate-400 font-mono">---</span>
                </div>
              </div>
            </div>

            {/* Section 3: Salary Info matching Screenshot 2 */}
            <div className="pt-4 border-t border-slate-200/80">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>{isRtl ? 'معلومات الراتب والبدلات' : 'Salary Info'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs">
                {/* Basic Salary */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'الراتب الأساسي' : 'Basic Salary'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    1,500.00 {isRtl ? 'ر.س' : 'SAR'}
                  </span>
                </div>

                {/* Housing Allowance */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'بدل السكن' : 'Housing Allowance'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    0.00 {isRtl ? 'ر.س' : 'SAR'}
                  </span>
                </div>

                {/* Transportation Allowance */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'بدل المواصلات' : 'Transportation Allowance'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    0.00 {isRtl ? 'ر.س' : 'SAR'}
                  </span>
                </div>

                {/* Food Allowance */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'بدل الإعاشة / الطعام' : 'Food Allowance'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    300.00 {isRtl ? 'ر.س' : 'SAR'}
                  </span>
                </div>

                {/* Other Allowances */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'بدلات أخرى' : 'Other Allowances'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    0.00 {isRtl ? 'ر.س' : 'SAR'}
                  </span>
                </div>

                {/* Total Salary */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 bg-emerald-50/70 p-2 rounded-lg">
                  <span className="text-emerald-900 font-bold">
                    {isRtl ? 'إجمالي الراتب' : 'Total Salary'}
                  </span>
                  <span className="font-mono font-bold text-emerald-700 text-base">
                    1,800.00 {isRtl ? 'ر.س' : 'SAR'}
                  </span>
                </div>

                {/* Bank Account Number */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500 font-medium">
                    {isRtl ? 'رقم الحساب البنكي (IBAN)' : 'Bank Account Number'}
                  </span>
                  <span className="text-slate-400 font-mono">---</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: LEAVE REQUESTS ===================== */}
        {activeTab === 'leaves' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00a3e0]" />
                <span>{isRtl ? 'طلبات الإجازة' : 'Leave Requests'}</span>
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-700">
                <button
                  onClick={() => setLeaveModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white bg-[#00a3e0] hover:bg-[#008ec4] transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'طلب إجازة جديد' : '+ New Leave Request'}</span>
                </button>
                <button onClick={() => window.location.reload()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'تحديث' : 'Refresh'}</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'سير العمل' : 'Flow'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'تقرير' : 'Run Report'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'قوالب Excel' : 'Excel Templates'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse text-[12px] whitespace-nowrap">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-2.5 px-3 w-8">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 cursor-pointer" />
                      </th>
                      <th className="py-2.5 px-3">Request Number ↑</th>
                      <th className="py-2.5 px-3">Leave Type</th>
                      <th className="py-2.5 px-3">Employee</th>
                      <th className="py-2.5 px-3">Employee Number</th>
                      <th className="py-2.5 px-3">Iqama Number</th>
                      <th className="py-2.5 px-3">Project</th>
                      <th className="py-2.5 px-3">Vacation Period</th>
                      <th className="py-2.5 px-3">Owner</th>
                      <th className="py-2.5 px-3">Request Status</th>
                      <th className="py-2.5 px-3">Created On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaveRequests.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="py-20 text-center">
                          <div className="flex flex-col items-center gap-3 text-slate-400">
                            <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center">
                              <Calendar className="w-7 h-7 text-slate-300" />
                            </div>
                            <p className="text-sm">{isRtl ? 'لا توجد بيانات للعرض' : "We didn't find anything to show here"}</p>
                          </div>
                        </td>
                      </tr>
                    ) : leaveRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 cursor-pointer" />
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#00a3e0] hover:underline cursor-pointer font-medium">{req.requestNumber}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">{req.leaveType}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#00a3e0] hover:underline cursor-pointer">{req.employee}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{req.employeeNumber}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{req.iqamaNumber}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#00a3e0] hover:underline cursor-pointer">{req.project}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">{req.vacationPeriod}</td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                              {req.owner.slice(0, 2).toUpperCase()}
                            </span>
                            <span className="text-slate-700">{req.owner}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            req.status === 'Submitted'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : req.status === 'Draft'
                              ? 'bg-slate-100 text-slate-600 border border-slate-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>{req.status}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">{req.createdOn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-50/90 border-t border-slate-200 px-4 py-2 text-[12px] text-slate-600">
                Rows: {leaveRequests.length}
              </div>
            </div>

            {/* New Leave Request Modal */}
            {leaveModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">{isRtl ? 'طلب إجازة جديد' : 'New Leave Request'}</h3>
                    <button onClick={() => setLeaveModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const newReq = {
                      id: Date.now().toString(),
                      requestNumber: `Leave-0000${3432 + leaveRequests.length + 1}`,
                      leaveType: e.target.leaveType.value,
                      employee: employee?.fullName || 'Employee',
                      employeeNumber: employee?.employeeNo || '—',
                      iqamaNumber: employee?.iqamaNo || '—',
                      project: employee?.project || '—',
                      vacationPeriod: e.target.days.value,
                      owner: 'Admin',
                      status: 'Draft',
                      createdOn: new Date().toLocaleDateString('en-GB')
                    };
                    setLeaveRequests(prev => [newReq, ...prev]);
                    setLeaveModalOpen(false);
                  }} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">{isRtl ? 'نوع الإجازة' : 'Leave Type'} *</label>
                      <select name="leaveType" required className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00a3e0]">
                        <option value="Annual">Annual</option>
                        <option value="Sick">Sick</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">{isRtl ? 'مدة الإجازة (أيام)' : 'Vacation Period (days)'} *</label>
                      <input name="days" required type="number" min="1" placeholder="e.g. 14" className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00a3e0]" />
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                      <button type="button" onClick={() => setLeaveModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs hover:bg-slate-50 transition-colors">
                        {isRtl ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button type="submit" className="px-4 py-2 bg-[#00a3e0] hover:bg-[#008ec4] text-white rounded-lg font-semibold text-xs transition-colors">
                        {isRtl ? 'إرسال' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 7: CONTRACT RENEWAL REQUESTS ===================== */}
        {activeTab === 'contracts' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#00a3e0]" />
                <span>{isRtl ? 'طلبات تجديد العقد' : 'Contract Renewal Requests'}</span>
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-700">
                <button
                  onClick={() => setContractModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white bg-[#00a3e0] hover:bg-[#008ec4] transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'طلب تجديد عقد جديد' : '+ New Contract Renewal'}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'إضافة عقد موجود' : 'Add Existing Contract'}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'تحديث' : 'Refresh'}</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'سير العمل' : 'Flow'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'تقرير' : 'Run Report'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'قوالب Excel' : 'Excel Templates'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Sub-title */}
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              {isRtl ? 'عرض طلبات تجديد العقد المرتبطة' : 'Contract Renewal Request Associated View'}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </p>

            {/* Grid */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse text-[12px] whitespace-nowrap">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-2.5 px-3 w-8">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 cursor-pointer" />
                      </th>
                      <th className="py-2.5 px-3">Request Number ↑</th>
                      <th className="py-2.5 px-3">Employee</th>
                      <th className="py-2.5 px-3">Employee Number</th>
                      <th className="py-2.5 px-3">Employee Type</th>
                      <th className="py-2.5 px-3">Gender</th>
                      <th className="py-2.5 px-3">Iqama Number</th>
                      <th className="py-2.5 px-3">Nationality</th>
                      <th className="py-2.5 px-3">Project</th>
                      <th className="py-2.5 px-3">Employee Status</th>
                      <th className="py-2.5 px-3">Period in Months</th>
                      <th className="py-2.5 px-3">Request Status</th>
                      <th className="py-2.5 px-3">Owner</th>
                      <th className="py-2.5 px-3">Created On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contractRequests.length === 0 ? (
                      <tr>
                        <td colSpan={14} className="py-20 text-center">
                          <div className="flex flex-col items-center gap-3 text-slate-400">
                            <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center">
                              <FileCheck className="w-7 h-7 text-slate-300" />
                            </div>
                            <p className="text-sm">{isRtl ? 'لا توجد بيانات للعرض' : "We didn't find anything to show here"}</p>
                          </div>
                        </td>
                      </tr>
                    ) : contractRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 cursor-pointer" />
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#00a3e0] hover:underline cursor-pointer font-medium">{req.requestNumber}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#00a3e0] hover:underline cursor-pointer">{req.employee}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{req.employeeNumber}</td>
                        <td className="py-2.5 px-3 text-slate-700">{req.employeeType}</td>
                        <td className="py-2.5 px-3 text-slate-700">{req.gender}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">{req.iqamaNumber}</td>
                        <td className="py-2.5 px-3 text-slate-700">{req.nationality}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[#00a3e0] hover:underline cursor-pointer">{req.project}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            req.employeeStatus === 'OnDuty'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : req.employeeStatus === 'New'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>{req.employeeStatus}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-semibold text-slate-700">{req.periodInMonths}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            req.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : req.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : req.status === 'Pending HR'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>{req.status}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                              {req.owner.slice(0, 2).toUpperCase()}
                            </span>
                            <span className="text-slate-700">{req.owner}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">{req.createdOn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-50/90 border-t border-slate-200 px-4 py-2 text-[12px] text-slate-600">
                Rows: {contractRequests.length}
              </div>
            </div>

            {/* New Contract Renewal Modal */}
            {contractModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">{isRtl ? 'طلب تجديد عقد جديد' : 'New Contract Renewal'}</h3>
                    <button onClick={() => setContractModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const newReq = {
                      id: Date.now().toString(),
                      requestNumber: `CREN-0000${1021 + contractRequests.length + 1}`,
                      employee: employee?.fullName || 'Employee',
                      employeeNumber: employee?.employeeNo || '—',
                      employeeType: 'Business Sec...',
                      gender: employee?.gender || '—',
                      iqamaNumber: employee?.iqamaNo || '—',
                      nationality: employee?.nationality || '—',
                      project: employee?.project || '—',
                      employeeStatus: 'OnDuty',
                      periodInMonths: e.target.period.value,
                      status: 'Pending HR',
                      owner: 'HR Team',
                      createdOn: new Date().toLocaleDateString('en-GB')
                    };
                    setContractRequests(prev => [newReq, ...prev]);
                    setContractModalOpen(false);
                  }} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">{isRtl ? 'مدة العقد (بالأشهر)' : 'Period in Months'} *</label>
                      <select name="period" required className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00a3e0]">
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                        <option value="24">24 Months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">{isRtl ? 'حالة الموظف' : 'Employee Status'} *</label>
                      <select name="empStatus" required className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00a3e0]">
                        <option value="OnDuty">OnDuty</option>
                        <option value="New">New</option>
                        <option value="On Exit">On Exit</option>
                      </select>
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                      <button type="button" onClick={() => setContractModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs hover:bg-slate-50 transition-colors">
                        {isRtl ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button type="submit" className="px-4 py-2 bg-[#00a3e0] hover:bg-[#008ec4] text-white rounded-lg font-semibold text-xs transition-colors">
                        {isRtl ? 'إرسال' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 8: FILES ===================== */}
        {activeTab === 'files' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Folder className="w-4 h-4 text-[#00a3e0]" />
              <span>{isRtl ? 'المستندات والوثائق الرسمية' : 'Employee Documents'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <div>
                    <span className="font-bold text-slate-900 block">Iqama_Card.pdf</span>
                    <span className="text-slate-400 text-[10px]">1.2 MB • Verified</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Downloading Iqama_Card.pdf')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <div>
                    <span className="font-bold text-slate-900 block">Passport_Copy.pdf</span>
                    <span className="text-slate-400 text-[10px]">2.4 MB • Verified</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Downloading Passport_Copy.pdf')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <div>
                    <span className="font-bold text-slate-900 block">Employment_Contract.pdf</span>
                    <span className="text-slate-400 text-[10px]">3.1 MB • Signed</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Downloading Employment_Contract.pdf')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 8: NOTES ===================== */}
        {activeTab === 'notes' && (
          <div className="space-y-6 animate-in fade-in duration-150 text-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#00a3e0]" />
              <span>{isRtl ? 'ملاحظات وسجل العمل' : 'HR & Supervisor Notes'}</span>
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Project Operations Note</span>
                <span className="text-slate-400 text-[11px]">18/Nov/2026, 12:30</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Employee is active on the NMC Cleaning & Maintenance project. Performance reports are satisfactory with zero disciplinary notices.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
