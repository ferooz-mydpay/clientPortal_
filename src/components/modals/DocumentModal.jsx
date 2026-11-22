import React, { useState } from 'react';
import { X, FileText, Download, Upload, Calendar, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const DocumentModal = ({
  isOpen,
  onClose,
  document,
  mode = 'view', // 'view' or 'update'
  onUploadSuccess,
  onSubmitForRequest,
  t,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expiryDate, setExpiryDate] = useState('18/11/2026');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen || !document) return null;

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const filename = selectedFile ? selectedFile.name : document.filename;
      onUploadSuccess && onUploadSuccess(document.id, filename, expiryDate);
      setSelectedFile(null);
      onClose();
    }, 600);
  };

  const handleSubmitForRequestAction = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const filename = selectedFile ? selectedFile.name : document.filename;
      if (onSubmitForRequest) {
        onSubmitForRequest(document, filename, expiryDate);
      } else if (onUploadSuccess) {
        onUploadSuccess(document.id, filename, expiryDate);
      }
      setSelectedFile(null);
      onClose();
    }, 600);
  };

  // If mode === 'update'
  if (mode === 'update') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
        <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200/90 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-1">
                <Upload className="w-3 h-3 text-cyan-600" />
                <span>Document Refresh</span>
              </div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-slate-900 tracking-tight">
                {t.uploadDocTitlePrefix} {document.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            {/* Field 1: Choose a file */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                {t.chooseAFileLabel}
              </label>

              <div className="border border-slate-200 rounded-2xl p-2 flex items-center gap-2 bg-slate-50 hover:bg-slate-100/60 transition-colors">
                <label className="cursor-pointer bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-2xs select-none">
                  {t.chooseFileBtnSingle}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </label>
                <span className="text-xs text-slate-600 font-medium truncate flex-1">
                  {selectedFile ? selectedFile.name : t.noFileSelectedSingle}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                {t.allowedFilesHelper}
              </p>
            </div>

            {/* Field 2: Document expiry date */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                {t.documentExpiryDateOptional}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 ltr:pl-3.5 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
              <button
                type="submit"
                disabled={isUploading}
                className="bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 active:scale-95 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
              >
                {isUploading ? 'Uploading...' : t.btnUploadFileModal}
              </button>

              <button
                type="button"
                disabled={isUploading}
                onClick={handleSubmitForRequestAction}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.btnSubmitForRequest || 'Submit for request'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {t.btnCancelModal}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="bg-[#0b1120] text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">{t.viewDocumentTitle}</h3>
              <p className="text-xs text-slate-300 font-medium">{document.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
            <h4 className="font-extrabold text-sm text-slate-900">{document.filename}</h4>
            <p className="text-xs text-slate-400 mt-1 font-mono">Format: PDF • Signed Copy</p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-2">
            <span>Status: <strong className="text-emerald-700 font-bold">{document.statusKey === 'valid' ? 'Valid & Verified' : 'Pending Verification'}</strong></span>
            {document.expiryDate && <span>Expires: <strong className="text-slate-800 font-bold">{document.expiryDate}</strong></span>}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={() => alert(`Downloading ${document.filename}...`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
