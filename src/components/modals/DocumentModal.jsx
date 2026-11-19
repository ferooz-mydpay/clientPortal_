import React, { useState } from 'react';
import { X, FileText, Download } from 'lucide-react';

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

  // If mode === 'update', render the EXACT UI from the user screenshot!
  if (mode === 'update') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 sm:p-7 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Title matching screenshot */}
          <h2 className="text-[17px] sm:text-[18px] font-bold text-slate-900 mb-4">
            {t.uploadDocTitlePrefix} {document.title}
          </h2>

          <form onSubmit={handleUpload} className="space-y-4">
            {/* Field 1: Choose a file */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                {t.chooseAFileLabel}
              </label>

              {/* Input container matching screenshot */}
              <div className="border border-slate-300 rounded-xl p-1.5 flex items-center gap-2 bg-white">
                <label className="cursor-pointer bg-[#f1f5f9] hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors select-none">
                  {t.chooseFileBtnSingle}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </label>
                <span className="text-xs text-slate-500 truncate">
                  {selectedFile ? selectedFile.name : t.noFileSelectedSingle}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mt-1.5 font-normal">
                {t.allowedFilesHelper}
              </p>
            </div>

            {/* Field 2: Document expiry date (optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                {t.documentExpiryDateOptional}
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Action buttons matching screenshot and adjusted with Submit for request */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5">
              <button
                type="submit"
                disabled={isUploading}
                className="bg-[#00a3e0] hover:bg-[#0284c7] active:scale-95 text-white font-semibold text-xs px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-sky-400/25 transition-all cursor-pointer"
              >
                {isUploading ? 'Uploading...' : t.btnUploadFileModal}
              </button>

              <button
                type="button"
                disabled={isUploading}
                onClick={handleSubmitForRequestAction}
                className="bg-[#4338ca] hover:bg-[#3730a3] active:scale-95 text-white font-semibold text-xs px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.btnSubmitForRequest || 'Submit for request'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-4 sm:px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#0f172a] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold">{t.viewDocumentTitle}</h3>
              <p className="text-xs text-slate-300">{document.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 text-center space-y-3">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{document.filename}</h4>
              <p className="text-xs text-slate-400 mt-1">
                PDF Document • Verified by Jussur Emdad Compliance
              </p>
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
              {document.statusKey === 'valid' ? 'Valid & Verified' : 'Pending Review'}
            </div>
          </div>

          {document.expiryDate && (
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-800 flex justify-between">
              <span>Expiry Date:</span>
              <span className="font-bold">{document.expiryDate}</span>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {t.close}
          </button>
          <button
            onClick={() => {
              alert(`Downloading ${document.filename}...`);
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.btnDownload}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
