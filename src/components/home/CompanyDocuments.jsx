import React from 'react';
import { FileText, Download, Eye, RefreshCw, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const CompanyDocuments = ({
  t,
  documentsData,
  onViewDoc,
  onDownloadDoc,
  onUpdateDoc,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-6 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full" />
          <div>
            <h2 className="text-[17px] sm:text-[19px] font-extrabold text-slate-900 tracking-tight">
              {t.companyDocuments}
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Official corporate certificates & compliance records
            </p>
          </div>
        </div>
      </div>

      {/* 2x2 Grid of Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {documentsData.map((doc) => {
          const isValid = doc.statusKey === 'valid';

          return (
            <div
              key={doc.id}
              className="border border-slate-200/90 rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50/50 hover:border-indigo-300/80 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Document Title & Status Badge */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[14.5px] text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-[11.5px] text-slate-400 mt-1 truncate font-mono">
                        {doc.filename}
                      </p>
                    </div>
                  </div>

                  {isValid ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.statusValid}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 flex-shrink-0">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t.statusPendingReview}</span>
                    </span>
                  )}
                </div>

                {/* Expiry date if applicable */}
                {doc.expiryDate && (
                  <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-600 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.expiresOn} {doc.expiryDate}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                {/* View & Download Row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewDoc(doc)}
                    className="py-2 px-3 text-center text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.btnView}</span>
                  </button>
                  <button
                    onClick={() => onDownloadDoc(doc)}
                    className="py-2 px-3 text-center text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.btnDownload}</span>
                  </button>
                </div>

                {/* Update button */}
                <button
                  onClick={() => onUpdateDoc(doc)}
                  className="w-full py-2 px-3 text-center text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.btnUpdate}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
