import React, { useState } from 'react';
import { X, Clock, CheckCircle2, FileText, User, Building2, Send, MessageSquare } from 'lucide-react';

export const ViewRequestModal = ({ isOpen, onClose, request, t, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !request) return null;

  const isCompleted = request.status === 'Completed';
  const isInProgress = request.status === 'In Progress';
  const isNew = request.status === 'New';

  // Workers data for this request
  const workers = request.workersList || [
    {
      name: 'احمد عبد الباقي محمد',
      idIqama: '2352715144',
      personnelNo: '1018573',
      nationality: 'مصر',
      profession: 'مبرمج حاسب آلي',
    },
  ];

  // History timeline events
  const historyEvents = request.history || (isCompleted
    ? [
        {
          timestamp: `${request.requestedOn}, 19:53`,
          actor: 'You',
          stage: 'New',
          message: t.msgRequestSubmitted,
        },
        {
          timestamp: `${request.requestedOn}, 19:53`,
          actor: 'Jussur',
          stage: 'In Progress',
          message: t.msgInProgress,
        },
        {
          timestamp: `${request.requestedOn}, 19:59`,
          actor: 'Jussur',
          stage: 'Completed',
          message: t.msgCompleted,
        },
      ]
    : [
        {
          timestamp: `${request.requestedOn}, 14:25`,
          actor: 'You',
          stage: 'New',
          message: t.msgRequestSubmitted,
        },
      ]);

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newEvent = {
      timestamp: `${new Date().toLocaleDateString('en-GB')}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      actor: 'You',
      stage: request.status,
      message: commentText.trim(),
    };
    onAddComment && onAddComment(request.id, newEvent);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 py-8 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-150 my-auto">
        {/* Top Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
              <FileText className="w-3 h-3 text-indigo-600" />
              <span>Administrative Dossier</span>
            </div>
            <h2 className="text-[18px] sm:text-[20px] font-extrabold text-slate-900 tracking-tight">
              {request.id} – {request.type}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Status Stepper */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            <span
              className={`flex-1 text-center py-1.5 rounded-xl text-xs font-bold transition-all ${
                isNew
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isCompleted || isInProgress
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-500'
              }`}
            >
              {t.statusNew}
            </span>

            <span
              className={`flex-1 text-center py-1.5 rounded-xl text-xs font-bold transition-all ${
                isInProgress
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isCompleted
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-500'
              }`}
            >
              {t.statusInProgress}
            </span>

            <span
              className={`flex-1 text-center py-1.5 rounded-xl text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              {t.statusCompleted}
            </span>
          </div>

          {/* Dates Metadata */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">
                  {t.colRequestedOn}
                </span>
                <span className="text-slate-900 font-bold text-[13px] mt-0.5 block font-mono">
                  {request.requestedOn}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">
                  {t.colExpectedBy}
                </span>
                <span className="text-slate-900 font-bold text-[13px] mt-0.5 block font-mono">
                  {request.expectedBy}
                </span>
              </div>
            </div>

            {/* Optional Vacation Dates */}
            {(request.startDate || request.type === 'Vacation') && (
              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-200/60">
                <div>
                  <span className="text-slate-400 font-semibold block">
                    {t.labelStartDate}
                  </span>
                  <span className="text-slate-900 font-bold text-[13px] mt-0.5 block font-mono">
                    {request.startDate || '15/11/2026'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">
                    {t.labelEndDate}
                  </span>
                  <span className="text-slate-900 font-bold text-[13px] mt-0.5 block font-mono">
                    {request.endDate || '26/11/2026'}
                  </span>
                </div>
              </div>
            )}

            {/* Request Details Line */}
            <div className="text-xs pt-2 border-t border-slate-200/60">
              <span className="font-bold text-slate-900">{t.labelRequestDetails}: </span>
              <span className="text-slate-700 font-medium">
                {request.details || (request.type === 'Vacation' ? 'وقاى' : 'not working')}
              </span>
            </div>
          </div>

          {/* Workers Section */}
          <div className="space-y-2.5">
            <h3 className="text-[16px] font-extrabold text-slate-900">
              {t.titleWorkers}
            </h3>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="text-slate-500 font-bold border-b border-slate-200 bg-slate-50 uppercase text-[10.5px]">
                      <th className="py-2.5 px-4">{t.colWorker}</th>
                      <th className="py-2.5 px-4">{t.colIdIqama}</th>
                      <th className="py-2.5 px-4">{t.colPersonnelNo}</th>
                      <th className="py-2.5 px-4">{t.colNationality}</th>
                      <th className="py-2.5 px-4">{t.colProfession}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100 text-slate-800 font-arabic">
                    {workers.map((w, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{w.name}</td>
                        <td className="py-3 px-4 font-mono font-medium">{w.idIqama}</td>
                        <td className="py-3 px-4 font-mono font-medium">{w.personnelNo}</td>
                        <td className="py-3 px-4 font-medium">{w.nationality}</td>
                        <td className="py-3 px-4 font-medium">{w.profession}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Request history Section */}
          <div className="space-y-3">
            <h3 className="text-[16px] font-extrabold text-slate-900">
              {t.titleRequestHistory}
            </h3>

            <div className="space-y-3 text-xs pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-indigo-200">
              {historyEvents.map((ev, idx) => (
                <div key={idx} className="space-y-0.5 relative">
                  <div className="text-slate-400 font-mono text-[11px]">
                    {ev.timestamp} · {ev.actor} · <span className="font-bold text-indigo-600">{ev.stage}</span>
                  </div>
                  <div className="text-slate-800 font-semibold text-[13px]">
                    {ev.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add a comment Section */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800">
              {t.labelAddComment}
            </label>

            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Type an administrative inquiry or additional instructions..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all resize-y font-medium"
            />

            <div>
              <button
                onClick={handleSendComment}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.btnSendComment}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
