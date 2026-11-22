import React, { useState } from 'react';
import { Search, X, Calendar, FileText, ArrowRight, Building2, Sparkles } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, t, onSelectTimesheet, onSelectDoc }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const sampleResults = [
    { type: 'timesheet', title: 'December 2026', code: 'JE-B-0098-2026-12', status: 'Approved' },
    { type: 'timesheet', title: 'May 2026', code: 'JE-B-0098-2026-05', status: 'Awaiting your approval' },
    { type: 'timesheet', title: 'October 2026', code: 'JE-B-0098-2026-10', status: 'In progress' },
    { type: 'document', title: 'Commercial Registration', filename: 'GOSI-_EM.pdf' },
    { type: 'document', title: 'National Address', filename: 'National_address_New.pdf' },
    { type: 'document', title: 'VAT Certificate', filename: 'VAT_registration_certificate_of_JE_-_New.pdf' },
    { type: 'contract', title: 'National Marketing Company Ltd.', code: 'JE-B-0098' },
  ];

  const filtered = query.trim()
    ? sampleResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.code && item.code.toLowerCase().includes(query.toLowerCase())) ||
          (item.filename && item.filename.toLowerCase().includes(query.toLowerCase()))
      )
    : sampleResults;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-start justify-center p-4 pt-20 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder || 'Search timesheets, contracts, documents...'}
            className="w-full text-sm font-medium outline-none text-slate-800 placeholder-slate-400 bg-transparent"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded-md">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">
              No results found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onClose();
                  if (item.type === 'timesheet') onSelectTimesheet(item);
                  if (item.type === 'document') onSelectDoc(item);
                }}
                className="p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-all group border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    {item.type === 'timesheet' ? (
                      <Calendar className="w-4 h-4" />
                    ) : item.type === 'contract' ? (
                      <Building2 className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-[11.5px] text-slate-400 font-mono mt-0.5">
                      {item.code || item.filename}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {item.status && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {item.status}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
