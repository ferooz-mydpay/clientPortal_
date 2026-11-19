import React, { useState, useMemo } from 'react';
import { EmployeeDetailView } from './EmployeeDetailView';

import { 
  Plus, 
  RotateCw, 
  Share2, 
  BarChart3, 
  FileSpreadsheet, 
  MoreHorizontal, 
  Search, 
  ArrowUpDown, 
  ChevronDown, 
  Check, 
  X,
  User,
  ExternalLink
} from 'lucide-react';

export const EmployeesPage = ({ t, language, toggleLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [activeEmployeeDetail, setActiveEmployeeDetail] = useState(null);
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);

  // Initial employees dataset matching Screenshot 2
  const [employeesData] = useState([
    {
      id: '1',
      employeeNo: '1021041',
      fullName: 'KHORSHIDA BEGUM',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '578394251',
      contractExpiry: '17/Aug/27',
      dateOfJoining: '18/Aug/25',
      projectDate: '02/Sep/25',
      nationality: 'بنجلاديش',
      profession: 'عامل نظافة',
      iqamaNo: '2614808461',
      iqamaExpiry: '15/May/26',
      borderNo: '3560551382',
      passportNo: 'A07640092',
      passportExpiry: '06/Aug/34',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '2',
      employeeNo: '1020811',
      fullName: 'ADRIAN ZAMORA GASCON',
      gender: 'Male',
      employmentSector: 'Business Sector',
      mobile: '545730686',
      contractExpiry: '06/Jul/27',
      dateOfJoining: '07/Jul/25',
      projectDate: '18/Aug/25',
      nationality: 'الفلبين',
      profession: 'عامل نظافة',
      iqamaNo: '2610360012',
      iqamaExpiry: '03/Apr/26',
      borderNo: '3183090174',
      passportNo: 'P7659207C',
      passportExpiry: '06/Aug/34',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '3',
      employeeNo: '1020821',
      fullName: 'RENALYN JANARIN BANQ...',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '568930404',
      contractExpiry: '06/Jul/27',
      dateOfJoining: '07/Jul/25',
      projectDate: '12/Aug/25',
      nationality: 'الفلبين',
      profession: 'عامل نظافة',
      iqamaNo: '2610674785',
      iqamaExpiry: '03/Apr/26',
      borderNo: '3547023619',
      passportNo: 'P2026957B',
      passportExpiry: '19/Jun/29',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '4',
      employeeNo: '1020815',
      fullName: 'JAMIELLA CAPALARAN',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '546377690',
      contractExpiry: '06/Jul/27',
      dateOfJoining: '07/Jul/25',
      projectDate: '21/Aug/25',
      nationality: 'الفلبين',
      profession: 'عامل نظافة',
      iqamaNo: '2610674211',
      iqamaExpiry: '03/Apr/26',
      borderNo: '3547023490',
      passportNo: 'P83160318',
      passportExpiry: '26/Nov/31',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '5',
      employeeNo: '1020813',
      fullName: 'HONIVEL OBEDENCIO ES...',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '569121701',
      contractExpiry: '06/Jul/27',
      dateOfJoining: '07/Jul/25',
      projectDate: '21/Aug/25',
      nationality: 'الفلبين',
      profession: 'عامل نظافة',
      iqamaNo: '2610674209',
      iqamaExpiry: '03/Apr/26',
      borderNo: '3547023488',
      passportNo: 'P7474658C',
      passportExpiry: '04/Jul/34',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '6',
      employeeNo: '1020796',
      fullName: 'MOSAIMA SUBULAN RO...',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '547107844',
      contractExpiry: '03/Jul/27',
      dateOfJoining: '04/Jul/25',
      projectDate: '04/Aug/25',
      nationality: 'الفلبين',
      profession: 'عامل نظافة',
      iqamaNo: '2610674812',
      iqamaExpiry: '31/Mar/26',
      borderNo: '3547023641',
      passportNo: 'P5528771A',
      passportExpiry: '04/Jan/28',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '7',
      employeeNo: '1020798',
      fullName: 'RUBY ANN REYES',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '563173726',
      contractExpiry: '03/Jul/27',
      dateOfJoining: '04/Jul/25',
      projectDate: '27/Aug/25',
      nationality: 'الفلبين',
      profession: 'عامل نظافة',
      iqamaNo: '2610674933',
      iqamaExpiry: '31/Mar/26',
      borderNo: '3547023702',
      passportNo: 'P0189369B',
      passportExpiry: '09/Jan/29',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '8',
      employeeNo: '1020771',
      fullName: 'FATEMA AKTER RUMA',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '577459732',
      contractExpiry: '29/Jun/27',
      dateOfJoining: '30/Jun/25',
      projectDate: '10/Jul/25',
      nationality: 'بنجلاديش',
      profession: 'عامل نظافة',
      iqamaNo: '2610191280',
      iqamaExpiry: '27/Mar/26',
      borderNo: '3557001245',
      passportNo: 'A17664477',
      passportExpiry: '20/Jan/35',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '9',
      employeeNo: '1020759',
      fullName: 'RUNA AKTER',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '576935407',
      contractExpiry: '29/Jun/27',
      dateOfJoining: '30/Jun/25',
      projectDate: '17/Jul/25',
      nationality: 'بنجلاديش',
      profession: 'عامل نظافة',
      iqamaNo: '2610359701',
      iqamaExpiry: '27/Mar/26',
      borderNo: '3560171890',
      passportNo: 'A17943212',
      passportExpiry: '11/Feb/35',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '10',
      employeeNo: '1020773',
      fullName: 'SUME ABDUL GAFUR',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '577096528',
      contractExpiry: '29/Jun/27',
      dateOfJoining: '30/Jun/25',
      projectDate: '10/Jul/25',
      nationality: 'بنجلاديش',
      profession: 'عامل نظافة',
      iqamaNo: '2610191314',
      iqamaExpiry: '27/Mar/26',
      borderNo: '3557001290',
      passportNo: 'A15837033',
      passportExpiry: '19/May/34',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '11',
      employeeNo: '1020654',
      fullName: 'SONIA MD MOSTUFA',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '0577327311',
      contractExpiry: '03/Jun/27',
      dateOfJoining: '04/Jun/25',
      projectDate: '13/Oct/25',
      nationality: 'بنجلاديش',
      profession: 'عامل نظافة',
      iqamaNo: '2610359190',
      iqamaExpiry: '30/May/26',
      borderNo: '3560171342',
      passportNo: 'A17209921',
      passportExpiry: '09/Dec/34',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '12',
      employeeNo: '1020615',
      fullName: 'MISS KULSUM AKTER',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '576257116',
      contractExpiry: '01/Jun/27',
      dateOfJoining: '02/Jun/25',
      projectDate: '09/Nov/25',
      nationality: 'بنجلاديش',
      profession: 'عامل نظافة',
      iqamaNo: '2610361288',
      iqamaExpiry: '28/May/26',
      borderNo: '3561926671',
      passportNo: 'A17461779',
      passportExpiry: '28/Dec/34',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    },
    {
      id: '13',
      employeeNo: '1020603',
      fullName: 'MST SELINA AKTER',
      gender: 'Female',
      employmentSector: 'Business Sector',
      mobile: '576258849',
      contractExpiry: '01/Jun/27',
      dateOfJoining: '02/Jun/25',
      projectDate: '26/Oct/25',
      nationality: 'بنجلاديش',
      profession: 'عامل نظافة',
      iqamaNo: '2610360419',
      iqamaExpiry: '29/Nov/25',
      borderNo: '3560551102',
      passportNo: 'EL0796099',
      passportExpiry: '19/Jul/28',
      project: '...في للتشغيل و الصيانة',
      contractId: 'JE-B-S0098',
      account: 'National Marketing Company Ltd.',
      owner: 'Laza...'
    }
  ]);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employeesData;
    const q = searchQuery.toLowerCase();
    return employeesData.filter(
      (e) =>
        e.fullName.toLowerCase().includes(q) ||
        e.employeeNo.includes(q) ||
        e.iqamaNo.includes(q) ||
        e.passportNo.toLowerCase().includes(q)
    );
  }, [employeesData, searchQuery]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    filteredEmployees.length > 0 &&
    selectedEmployees.length === filteredEmployees.length;

  if (activeEmployeeDetail) {
    return (
      <EmployeeDetailView
        employee={activeEmployeeDetail}
        onBack={() => setActiveEmployeeDetail(null)}
        t={t}
        language={language}
      />
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Controls Toolbar matching Screenshot 2 */}
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Left: Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'بحث عن موظف بالاسم أو الرقم...' : 'Search by name or number...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg ltr:pl-9 rtl:pr-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
          />
        </div>

        {/* Right: Action Buttons matching Screenshot 2 */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-700">
          <button
            onClick={() => setIsNewEmployeeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.btnNewEmployee || 'New Employee'}</span>
          </button>

          <button
            onClick={() => alert('Refreshed')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{t.btnRefresh || 'Refresh'}</span>
          </button>

          <button
            onClick={() => alert('Workflow flow')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t.btnFlow || 'Flow'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button
            onClick={() => alert('Run report')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.btnRunReport || 'Run Report'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button
            onClick={() => alert('Exporting Excel template...')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{t.btnExcelTemplates || 'Excel Templates'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button 
            onClick={() => alert('More options')}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid Card matching Screenshot 2 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-[12px] whitespace-nowrap">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-700 font-semibold select-none">
                <th className="py-2.5 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-3.5 h-3.5 rounded text-[#00a3e0] focus:ring-[#00a3e0] border-slate-300 cursor-pointer"
                  />
                </th>
                <th className="py-2.5 px-3 font-semibold">Employee N...</th>
                <th className="py-2.5 px-3 font-semibold">
                  <span className="flex items-center gap-1">
                    Full Name <span className="text-slate-900">↑</span>
                  </span>
                </th>
                <th className="py-2.5 px-3 font-semibold">
                  <span className="flex items-center gap-1">Gender <ChevronDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2.5 px-3 font-semibold">
                  <span className="flex items-center gap-1">Employ... <ChevronDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2.5 px-3 font-semibold">Mobile ...</th>
                <th className="py-2.5 px-3 font-semibold">Contrac...</th>
                <th className="py-2.5 px-3 font-semibold">Date of ...</th>
                <th className="py-2.5 px-3 font-semibold">Project ...</th>
                <th className="py-2.5 px-3 font-semibold">Nationa...</th>
                <th className="py-2.5 px-3 font-semibold">Sales Pr...</th>
                <th className="py-2.5 px-3 font-semibold">Iqama ...</th>
                <th className="py-2.5 px-3 font-semibold">Iqama E...</th>
                <th className="py-2.5 px-3 font-semibold">Border ...</th>
                <th className="py-2.5 px-3 font-semibold">Passpor...</th>
                <th className="py-2.5 px-3 font-semibold">Passpor...</th>
                <th className="py-2.5 px-3 font-semibold">
                  <span className="flex items-center gap-1">Project <ChevronDown className="w-3 h-3" /></span>
                </th>
                <th className="py-2.5 px-3 font-semibold">Contrac...</th>
                <th className="py-2.5 px-3 font-semibold">Account...</th>
                <th className="py-2.5 px-3 font-semibold">Owner (...)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEmployees.map((emp) => {
                const isSelected = selectedEmployees.includes(emp.id);
                return (
                  <tr
                    key={emp.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-sky-50/50' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(emp.id)}
                        className="w-3.5 h-3.5 rounded text-[#00a3e0] focus:ring-[#00a3e0] border-slate-300 cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-800">
                      <button
                        onClick={() => setActiveEmployeeDetail(emp)}
                        className="hover:text-[#00a3e0] hover:underline cursor-pointer"
                      >
                        {emp.employeeNo}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 font-medium">
                      <button
                        onClick={() => setActiveEmployeeDetail(emp)}
                        className="text-[#00a3e0] hover:underline cursor-pointer font-medium"
                      >
                        {emp.fullName}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{emp.gender}</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-[#e2e8f0] text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {emp.employmentSector}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{emp.mobile}</td>
                    <td className="py-2.5 px-3 text-slate-600">{emp.contractExpiry}</td>
                    <td className="py-2.5 px-3 text-slate-600">{emp.dateOfJoining}</td>
                    <td className="py-2.5 px-3 text-slate-600">{emp.projectDate}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[#00a3e0] hover:underline cursor-pointer">
                        {emp.nationality}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[#00a3e0] hover:underline cursor-pointer">
                        {emp.profession}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{emp.iqamaNo}</td>
                    <td className="py-2.5 px-3 text-slate-600">{emp.iqamaExpiry}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{emp.borderNo}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{emp.passportNo}</td>
                    <td className="py-2.5 px-3 text-slate-600">{emp.passportExpiry}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[#00a3e0] hover:underline cursor-pointer">
                        {emp.project}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{emp.contractId}</td>
                    <td className="py-2.5 px-3 text-slate-600 truncate max-w-[120px]">{emp.account}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                          {emp.owner.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="text-slate-700">{emp.owner}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Status bar matching Screenshot 2: "Rows: 36" */}
        <div className="bg-slate-50/90 border-t border-slate-200 px-4 py-2 text-[12px] text-slate-600 flex items-center justify-between">
          <div>
            <span>Rows: 36</span>
            {selectedEmployees.length > 0 && (
              <span className="ltr:ml-3 rtl:mr-3 text-indigo-600 font-semibold">
                ({selectedEmployees.length} selected)
              </span>
            )}
          </div>
          <div className="text-slate-400 text-[11px]">
            {language === 'ar' ? 'عرض السجلات النشطة' : 'Showing active records'}
          </div>
        </div>
      </div>

      {/* New Employee Modal */}
      {isNewEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Employee</h3>
              <button
                onClick={() => setIsNewEmployeeModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Employee added successfully!'); setIsNewEmployeeModalOpen(false); }} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input required type="text" placeholder="e.g. John Doe" className="w-full border border-slate-300 rounded p-2 text-xs" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Employee Number *</label>
                <input required type="text" placeholder="e.g. 1021045" className="w-full border border-slate-300 rounded p-2 text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Gender</label>
                  <select className="w-full border border-slate-300 rounded p-2 text-xs">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Mobile</label>
                  <input type="text" placeholder="05XXXXXXXX" className="w-full border border-slate-300 rounded p-2 text-xs" />
                </div>
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewEmployeeModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00a3e0] text-white rounded-lg font-medium"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
