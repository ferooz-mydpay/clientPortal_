import React, { useState } from 'react';
import { X, ArrowRight, Building2, User, Plus, FileText, Upload } from 'lucide-react';

const EMPLOYEE_POOL = [
  { id: 'e1', name: 'Khorshida Begum',       number: '1021041', iqama: '2617180471', projectId: 'p1' },
  { id: 'e2', name: 'Adrian Zamora Gascon',  number: '1020811', iqama: '2610360...', projectId: 'p1' },
  { id: 'e3', name: 'Benalyn Janarin Bang',  number: '1020821', iqama: '2610674...' , projectId: 'p1' },
  { id: 'e4', name: 'Honivel Obedencio',     number: '1020813', iqama: '2610674...' , projectId: 'p2' },
  { id: 'e5', name: 'Mosaima Subulan Ro.',   number: '1020796', iqama: '2610674...' , projectId: 'p2' },
  { id: 'e6', name: 'Ruby Ann Reyes',        number: '1020798', iqama: '2610374...' , projectId: 'p2' },
  { id: 'e7', name: 'Fatema Akter Ruma',     number: '1020771', iqama: '2610191...' , projectId: 'p3' },
  { id: 'e8', name: 'Runa Akter',            number: '1020759', iqama: '2610359...' , projectId: 'p3' },
  { id: 'e9', name: 'Sume Abdul Gafur',      number: '1020773', iqama: '2610374...' , projectId: 'p3' },
];

export const NewRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  t,
  language,
  allProjects = [],
  activeProject,
}) => {
  const [requestType, setRequestType] = useState('Sponsorship Transfer');
  const [actionNeeded, setActionNeeded] = useState('Transfer to Jussur');

  // Transfer-specific state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [transferToProjectId, setTransferToProjectId] = useState('');

  const [workersText, setWorkersText]   = useState('');
  const [iqamaFiles, setIqamaFiles]     = useState([]);
  const [passportFiles, setPassportFiles] = useState([]);
  const [otherFiles, setOtherFiles]     = useState([]);
  const [notes, setNotes]               = useState('');

  const isRtl = language === 'ar';
  const isSponsorshipTransfer = requestType === 'Sponsorship Transfer';

  if (!isOpen) return null;

  const requestTypeOptions = [
    { value: 'Iqama',                label: t.reqTabIqama },
    { value: 'End of Service',       label: t.reqTabEndOfService },
    { value: 'Vacation',             label: t.reqTabVacation },
    { value: 'Termination',          label: t.reqTabTermination },
    { value: 'New Demand',           label: t.reqTabNewDemand },
    { value: 'Replacement',          label: t.reqTabReplacement },
    { value: 'Refused Case',         label: t.reqTabRefusedCase },
    { value: 'Sponsorship Transfer', label: t.reqTabSponsorshipTransfer },
  ];

  // The selected employee object
  const selectedEmployee = EMPLOYEE_POOL.find(e => e.id === selectedEmployeeId);
  // Current project of selected employee
  const currentProject = allProjects.find(p => p.id === selectedEmployee?.projectId);
  // Projects available to transfer TO (exclude current)
  const transferTargets = allProjects.filter(p => p.id !== selectedEmployee?.projectId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transferTo = allProjects.find(p => p.id === transferToProjectId);
    const newReq = {
      id: `REQ-${String(Math.floor(10000 + Math.random() * 90000))}`,
      type: requestType,
      typeKey: requestType.toLowerCase().replace(/\s+/g, '-'),
      status: 'New',
      requestedOn: new Date().toLocaleDateString('en-GB'),
      expectedBy: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      actionNeeded,
      employee: selectedEmployee?.name || '',
      fromProject: currentProject?.companyName || '',
      toProject: transferTo?.companyName || '',
      workers: isSponsorshipTransfer
        ? (selectedEmployee ? `${selectedEmployee.name}, ${selectedEmployee.iqama}` : '')
        : workersText,
      notes,
    };
    onSubmit(newReq);
    // Reset
    setSelectedEmployeeId('');
    setTransferToProjectId('');
    setWorkersText('');
    setIqamaFiles([]);
    setPassportFiles([]);
    setOtherFiles([]);
    setNotes('');
    onClose();
  };

  const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all cursor-pointer font-medium';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 py-8 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-150 my-auto">
        {/* Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-1">
              <Plus className="w-3 h-3 text-cyan-600 stroke-[3]" />
              <span>Initiate Request</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {t.newRequestModalTitle} – {requestType}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* 1. Request Type */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              {t.requestTypeLabel}
            </label>
            <select
              value={requestType}
              onChange={(e) => { setRequestType(e.target.value); setSelectedEmployeeId(''); setTransferToProjectId(''); }}
              className={inputCls}
            >
              {requestTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* SPONSORSHIP TRANSFER: smart employee picker */}
          {isSponsorshipTransfer ? (
            <div className="space-y-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {isRtl ? 'تفاصيل نقل الكفالة' : 'Transfer Details'}
              </p>

              {/* Employee selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  <User className="w-3.5 h-3.5 inline-block mr-1 text-cyan-600" />
                  {isRtl ? 'الموظف' : 'Employee'} *
                </label>
                <select
                  required
                  value={selectedEmployeeId}
                  onChange={(e) => { setSelectedEmployeeId(e.target.value); setTransferToProjectId(''); }}
                  className={inputCls}
                >
                  <option value="">{isRtl ? '— اختر الموظف —' : '— Select employee —'}</option>
                  {EMPLOYEE_POOL.map(emp => {
                    const proj = allProjects.find(p => p.id === emp.projectId);
                    return (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.number}) · {proj ? proj.companyName : emp.projectId}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Transfer flow visual */}
              {selectedEmployee && currentProject && (
                <>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    {/* FROM */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {isRtl ? 'من' : 'Currently at'}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {selectedEmployee.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-slate-900 truncate">{selectedEmployee.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{currentProject.companyName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">Contract {currentProject.contractCode}</p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <ArrowRight className="w-5 h-5 text-cyan-600 rtl:rotate-180" />
                      <span className="text-[9px] font-bold text-cyan-600 uppercase tracking-wider">
                        {isRtl ? 'نقل' : 'Transfer'}
                      </span>
                    </div>

                    {/* TO */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {isRtl ? 'إلى' : 'Transfer to'}
                      </p>
                      {transferToProjectId ? (
                        (() => {
                          const toProj = allProjects.find(p => p.id === transferToProjectId);
                          return (
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                <Building2 className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[13px] font-bold text-slate-900 truncate">{toProj?.companyName}</p>
                                <p className="text-[10px] text-slate-400 font-mono">Contract {toProj?.contractCode}</p>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <p className="text-[12px] text-slate-400 italic">{isRtl ? 'اختر المشروع أدناه' : 'Select project below'}</p>
                      )}
                    </div>
                  </div>

                  {/* Transfer To selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      <Building2 className="w-3.5 h-3.5 inline-block mr-1 text-cyan-600" />
                      {isRtl ? 'نقل إلى' : 'Transfer To'} *
                    </label>
                    {transferTargets.length === 0 ? (
                      <p className="text-xs text-slate-400 italic px-1">{isRtl ? 'لا توجد مشاريع أخرى متاحة' : 'No other projects available'}</p>
                    ) : (
                      <select
                        required
                        value={transferToProjectId}
                        onChange={(e) => setTransferToProjectId(e.target.value)}
                        className={inputCls}
                      >
                        <option value="">{isRtl ? '— اختر المشروع المستهدف —' : '— Select destination project —'}</option>
                        {transferTargets.map(proj => (
                          <option key={proj.id} value={proj.id}>
                            {proj.companyName} · Contract {proj.contractCode} · {proj.employees} emp
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </>
              )}

              {/* Action Needed */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t.actionNeededLabel}
                </label>
                <select
                  value={actionNeeded}
                  onChange={(e) => setActionNeeded(e.target.value)}
                  className={inputCls}
                >
                  <option value="Transfer to Jussur">{t.actionTransferToJussur}</option>
                  <option value="Transfer from Jussur">{t.actionTransferFromJussur}</option>
                </select>
              </div>
            </div>
          ) : (
            /* ALL OTHER REQUEST TYPES */
            <>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t.actionNeededLabel}
                </label>
                <select
                  value={actionNeeded}
                  onChange={(e) => setActionNeeded(e.target.value)}
                  className={inputCls}
                >
                  <option value="Transfer to Jussur">{t.actionTransferToJussur}</option>
                  <option value="Transfer from Jussur">{t.actionTransferFromJussur}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {t.workersLabel}
                </label>
                <textarea
                  rows={4}
                  value={workersText}
                  onChange={(e) => setWorkersText(e.target.value)}
                  placeholder="Enter employee names, Iqama numbers, or personnel IDs..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all resize-y font-medium"
                />
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{t.workersHelperText}</p>
              </div>
            </>
          )}

          {/* Attachments */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">{t.attachmentsLabel}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.attachmentsHelperText}</p>
            </div>

            {[
              { label: t.iqamaCopiesLabel,      files: iqamaFiles,    setFiles: setIqamaFiles },
              { label: t.passportCopiesLabel,   files: passportFiles, setFiles: setPassportFiles },
              { label: t.otherAttachmentsLabel, files: otherFiles,    setFiles: setOtherFiles },
            ].map(({ label, files, setFiles }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">{label}</label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors">
                    {t.chooseFilesBtn}
                    <input type="file" multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    {files.length > 0 ? `${files.length} file(s) selected` : t.noFileSelected}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">{t.notesOptionalLabel}</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional remarks or urgency instructions..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all resize-y font-medium"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 active:scale-95 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
            >
              {t.btnSubmitRequest}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              {t.btnCancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
