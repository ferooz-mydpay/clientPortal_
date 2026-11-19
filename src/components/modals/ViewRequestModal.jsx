import React, { useState } from 'react';

export const ViewRequestModal = ({ isOpen, onClose, request, t, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !request) return null;

  const isCompleted = request.status === 'Completed';
  const isInProgress = request.status === 'In Progress';
  const isNew = request.status === 'New';

  // Workers data for this request (matching screenshots)
  const workers = request.workersList || [
    {
      name: 'احمد عبد الباقي محمد',
      idIqama: '2352715144',
      personnelNo: '1018573',
      nationality: 'مصر',
      profession: 'مبرمج حاسب آلي',
    },
  ];

  // History timeline events (matching screenshots)
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 py-8">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Top Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100/80">
          <h2 className="text-[17px] sm:text-[19px] font-bold text-slate-900">
            {request.id} – {request.type}
          </h2>

          <button
            onClick={onClose}
            className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-4 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            {t.btnClose}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Status Stepper / Pills Row matching screenshots */}
          <div className="flex items-center gap-2">
            {/* New status pill */}
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-semibold ${
                isNew
                  ? 'bg-[#4338ca] text-white shadow-xs'
                  : isCompleted || isInProgress
                  ? 'bg-[#e8f8f0] text-[#059669]'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {t.statusNew}
            </span>

            {/* In Progress status pill */}
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-semibold ${
                isInProgress
                  ? 'bg-[#4338ca] text-white shadow-xs'
                  : isCompleted
                  ? 'bg-[#e8f8f0] text-[#059669]'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {t.statusInProgress}
            </span>

            {/* Completed status pill */}
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-semibold ${
                isCompleted
                  ? 'bg-[#4338ca] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {t.statusCompleted}
            </span>
          </div>

          {/* Dates Metadata */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">
                  {t.colRequestedOn}
                </span>
                <span className="text-slate-800 font-semibold text-[13px] mt-0.5 block">
                  {request.requestedOn}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">
                  {t.colExpectedBy}
                </span>
                <span className="text-slate-800 font-semibold text-[13px] mt-0.5 block">
                  {request.expectedBy}
                </span>
              </div>
            </div>

            {/* Optional Vacation Dates */}
            {(request.startDate || request.type === 'Vacation') && (
              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <span className="text-slate-500 font-medium block">
                    {t.labelStartDate}
                  </span>
                  <span className="text-slate-800 font-semibold text-[13px] mt-0.5 block">
                    {request.startDate || '15/11/2026'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">
                    {t.labelEndDate}
                  </span>
                  <span className="text-slate-800 font-semibold text-[13px] mt-0.5 block">
                    {request.endDate || '26/11/2026'}
                  </span>
                </div>
              </div>
            )}

            {/* Request Details Line */}
            <div className="text-xs pt-1">
              <span className="font-bold text-slate-900">{t.labelRequestDetails} </span>
              <span className="text-slate-700 font-normal">
                {request.details || (request.type === 'Vacation' ? 'وقاى' : 'not working')}
              </span>
            </div>
          </div>

          {/* Workers Section */}
          <div className="space-y-2.5">
            <h3 className="text-[17px] font-bold text-slate-900">
              {t.titleWorkers}
            </h3>

            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="text-slate-600 font-semibold border-b border-slate-200/80 bg-slate-100/60">
                      <th className="py-2.5 px-4 font-semibold">{t.colWorker}</th>
                      <th className="py-2.5 px-4 font-semibold">{t.colIdIqama}</th>
                      <th className="py-2.5 px-4 font-semibold">{t.colPersonnelNo}</th>
                      <th className="py-2.5 px-4 font-semibold">{t.colNationality}</th>
                      <th className="py-2.5 px-4 font-semibold">{t.colProfession}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100 text-slate-800 font-arabic">
                    {workers.map((w, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold">{w.name}</td>
                        <td className="py-3 px-4 font-mono font-normal">{w.idIqama}</td>
                        <td className="py-3 px-4 font-mono font-normal">{w.personnelNo}</td>
                        <td className="py-3 px-4">{w.nationality}</td>
                        <td className="py-3 px-4">{w.profession}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Request history Section */}
          <div className="space-y-3">
            <h3 className="text-[17px] font-bold text-slate-900">
              {t.titleRequestHistory}
            </h3>

            <div className="space-y-3 text-xs pl-3 rtl:pl-0 rtl:pr-3 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-200">
              {historyEvents.map((ev, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-slate-500 font-normal">
                    {ev.timestamp} · {ev.actor} · {ev.stage}
                  </div>
                  <div className="text-slate-800 font-medium text-[13px]">
                    {ev.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add a comment Section */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-900">
              {t.labelAddComment}
            </label>

            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder=""
              className="w-full bg-white border border-slate-300 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
            />

            <div>
              <button
                onClick={handleSendComment}
                className="bg-[#4338ca] hover:bg-[#3730a3] active:scale-95 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-indigo-300/40 transition-all cursor-pointer"
              >
                {t.btnSendComment}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
