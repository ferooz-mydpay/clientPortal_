import React from 'react';

export const CompanyDocuments = ({
  t,
  documentsData,
  onViewDoc,
  onDownloadDoc,
  onUpdateDoc,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 mt-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100/80">
        <span className="w-1.5 h-5 bg-[#4338ca] rounded-full inline-block" />
        <h2 className="text-[17px] sm:text-[18px] font-bold text-slate-900">
          {t.companyDocuments}
        </h2>
      </div>

      {/* 2x2 Grid of Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {documentsData.map((doc) => {
          const isValid = doc.statusKey === 'valid';

          return (
            <div
              key={doc.id}
              className="border border-slate-100 rounded-2xl p-5 bg-[#ffffff] hover:border-slate-200 transition-all flex flex-col justify-between"
            >
              {/* Document Title & Status Badge */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-[14px] sm:text-[15px] text-slate-900 leading-snug">
                    {doc.title}
                  </h3>

                  {isValid ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e8f8f0] text-[#059669] flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      {t.statusValid}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fef9c3] text-[#b45309] flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                      {t.statusPendingReview}
                    </span>
                  )}
                </div>

                {/* Expiry date if applicable */}
                {doc.expiryDate && (
                  <p className="text-[12px] text-slate-500 mt-2 font-normal">
                    {t.expiresOn} {doc.expiryDate}
                  </p>
                )}

                {/* File info */}
                <p className="text-[12px] text-slate-400 mt-2 truncate font-mono">
                  {t.fileLabel}: {doc.filename}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2">
                {/* View & Download Row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewDoc(doc)}
                    className="py-2 px-3 text-center text-xs font-semibold text-[#4338ca] bg-[#eef2ff] hover:bg-[#e0e7ff] rounded-xl transition-colors cursor-pointer"
                  >
                    {t.btnView}
                  </button>
                  <button
                    onClick={() => onDownloadDoc(doc)}
                    className="py-2 px-3 text-center text-xs font-semibold text-[#4338ca] bg-[#eef2ff] hover:bg-[#e0e7ff] rounded-xl transition-colors cursor-pointer"
                  >
                    {t.btnDownload}
                  </button>
                </div>

                {/* Update full-width button */}
                <button
                  onClick={() => onUpdateDoc(doc)}
                  className="w-full py-2 px-3 text-center text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {t.btnUpdate}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
