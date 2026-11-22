import React, { useState, useMemo } from 'react';
import { EmployeeDetailView } from './EmployeeDetailView';
import { 
  Search, 
  ArrowUpDown, 
  ChevronDown, 
  Check, 
  X,
  User,
  ExternalLink,
  Users,
  Shield,
  Building2,
  Calendar,
  Phone,
  FileCheck2,
  Globe
} from 'lucide-react';

export const EmployeesPage = ({ t, language, toggleLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [activeEmployeeDetail, setActiveEmployeeDetail] = useState(null);
  const isRtl = language === 'ar';

  // Initial employees dataset
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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Ministry of Labor & Muqeem Synchronized</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {isRtl ? 'سجل القوى العاملة والموظفين' : 'Workforce & Employees Directory'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
              {isRtl
                ? 'إدارة شاملة للموظفين المعينين، الإقامات، العقود، والبيانات الرسمية'
                : 'Comprehensive dossier of assigned personnel, Iqama validity, contracts, and legal status'}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <button
              onClick={toggleLanguage}
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 backdrop-blur-md text-white font-bold px-4 py-2.5 rounded-2xl text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer select-none"
              title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-cyan-300" />
              <span className={language === 'en' ? 'font-arabic text-sm' : 'font-sans'}>
                {t.langButtonText}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Controls Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        {/* Quick Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'بحث عن موظف بالاسم أو الرقم أو الإقامة...' : 'Search by name, ID, or Iqama...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-bold text-slate-800">{filteredEmployees.length}</span>
          <span>{isRtl ? 'موظف مسجل' : 'records found'}</span>
          {selectedEmployees.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              {selectedEmployees.length} selected
            </span>
          )}
        </div>
      </div>

      {/* 3. Main Data Table */}
      <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-[12px] whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold select-none text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3 font-semibold">Employee No</th>
                <th className="py-3.5 px-3 font-semibold">
                  <span className="flex items-center gap-1">
                    Full Name <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </span>
                </th>
                <th className="py-3.5 px-3 font-semibold">Gender</th>
                <th className="py-3.5 px-3 font-semibold">Employment Sector</th>
                <th className="py-3.5 px-3 font-semibold">Mobile</th>
                <th className="py-3.5 px-3 font-semibold">Contract Expiry</th>
                <th className="py-3.5 px-3 font-semibold">Date of Joining</th>
                <th className="py-3.5 px-3 font-semibold">Nationality</th>
                <th className="py-3.5 px-3 font-semibold">Profession</th>
                <th className="py-3.5 px-3 font-semibold">Iqama No</th>
                <th className="py-3.5 px-3 font-semibold">Iqama Expiry</th>
                <th className="py-3.5 px-3 font-semibold">Passport No</th>
                <th className="py-3.5 px-3 font-semibold">Contract Code</th>
                <th className="py-3.5 px-3 font-semibold">Account</th>
                <th className="py-3.5 px-3 font-semibold">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEmployees.map((emp) => {
                const isSelected = selectedEmployees.includes(emp.id);
                return (
                  <tr
                    key={emp.id}
                    className={`hover:bg-slate-50/90 transition-colors ${
                      isSelected ? 'bg-cyan-50/40' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(emp.id)}
                        className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      <button
                        onClick={() => setActiveEmployeeDetail(emp)}
                        className="hover:text-cyan-600 hover:underline cursor-pointer font-bold"
                      >
                        {emp.employeeNo}
                      </button>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <button
                        onClick={() => setActiveEmployeeDetail(emp)}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer font-bold flex items-center gap-1.5"
                      >
                        <span>{emp.fullName}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 inline" />
                      </button>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{emp.gender}</td>
                    <td className="py-3 px-3">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-slate-200">
                        {emp.employmentSector}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">{emp.mobile}</td>
                    <td className="py-3 px-3 text-slate-600">{emp.contractExpiry}</td>
                    <td className="py-3 px-3 text-slate-600">{emp.dateOfJoining}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{emp.nationality}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{emp.profession}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">{emp.iqamaNo}</td>
                    <td className="py-3 px-3 text-slate-600">{emp.iqamaExpiry}</td>
                    <td className="py-3 px-3 font-mono text-slate-600">{emp.passportNo}</td>
                    <td className="py-3 px-3 font-mono font-bold text-indigo-600">{emp.contractId}</td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[150px]">{emp.account}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                          {emp.owner.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="text-slate-700 font-medium">{emp.owner}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Status bar */}
        <div className="bg-slate-50/90 border-t border-slate-200 px-5 py-3 text-[12px] text-slate-600 flex items-center justify-between">
          <div className="font-medium">
            <span>Showing {filteredEmployees.length} employees</span>
            {selectedEmployees.length > 0 && (
              <span className="ltr:ml-3 rtl:mr-3 text-cyan-700 font-bold">
                ({selectedEmployees.length} selected)
              </span>
            )}
          </div>
          <div className="text-slate-400 text-[11px] font-medium">
            {language === 'ar' ? 'سجلات معتمدة ومحدثة' : 'Verified active workforce records'}
          </div>
        </div>
      </div>
    </div>
  );
};
