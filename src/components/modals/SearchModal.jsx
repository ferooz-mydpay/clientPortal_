import React, { useState } from 'react';
import { Search, X, Calendar, FileText, ArrowRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20">
      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full text-sm outline-none text-slate-800 placeholder-slate-400 bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
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
                className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    {item.type === 'timesheet' ? (
                      <Calendar className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {item.code || item.filename}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.status && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {item.status}
                    </span>
                  )}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
