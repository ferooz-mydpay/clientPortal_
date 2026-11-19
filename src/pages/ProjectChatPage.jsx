import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

export const ProjectChatPage = ({
  t,
  language,
  toggleLanguage,
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const newMsg = {
      id: Date.now(),
      sender: 'test Portal',
      senderType: 'user',
      text: inputText.trim(),
      timestamp: `${dateFormatted}, ${timeFormatted}`,
    };

    onSendMessage(newMsg);
    setInputText('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-6">
      {/* 1. Hero Header Banner matching Image 1 */}
      <div className="bg-[#0f172a] rounded-2xl md:rounded-[20px] p-6 sm:p-8 text-white relative shadow-sm border border-slate-800/60 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-white">
              {t.chatHeroTitle}
            </h1>
            <p className="text-slate-300 text-sm md:text-[15px] font-normal leading-relaxed">
              {t.chatHeroSubtitle}
            </p>
          </div>

          <div className="flex-shrink-0 self-start sm:self-center">
            <button
              onClick={toggleLanguage}
              className="bg-[#1e293b] hover:bg-slate-800 border border-slate-700/80 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer select-none"
              title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span className={language === 'en' ? 'font-arabic text-sm' : 'font-sans'}>
                {t.langButtonText}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout matching Image 1 & 2 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Your projects sidebar */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 mb-4">
            {t.yourProjectsTitle}
          </h2>

          {/* Active project card */}
          <div className="bg-[#eef2ff] border border-indigo-200/70 rounded-2xl p-4 transition-all cursor-pointer">
            <div className="font-bold text-[#4338ca] text-sm">
              JE-B-0098
            </div>
            <div className="text-xs text-slate-500 mt-1 font-normal">
              {t.companyName}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Box */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden flex flex-col min-h-[560px]">
          {/* Header */}
          <div className="p-5 border-b border-slate-100/90 bg-white">
            <h3 className="font-bold text-slate-900 text-sm">
              JE-B-0098 · {t.companyName}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.projectSupervisorLabel}
            </p>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-white">
            {messages.map((msg) => {
              const isUser = msg.senderType === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`rounded-2xl p-4 max-w-sm sm:max-w-md ${
                      isUser
                        ? 'bg-[#4338ca] text-white shadow-sm'
                        : 'bg-white border border-slate-200/90 text-slate-900 shadow-xs'
                    }`}
                  >
                    {/* Sender Name */}
                    <div
                      className={`text-[11px] font-bold mb-1 ${
                        isUser ? 'text-indigo-100' : 'text-[#4338ca]'
                      }`}
                    >
                      {msg.sender}
                    </div>

                    {/* Message Body */}
                    <div className="text-sm font-normal leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-[10px] mt-2 font-mono ${
                        isUser ? 'text-indigo-200/90' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Message Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-slate-100 bg-white flex items-center gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.typeYourMessagePlaceholder}
              className="flex-1 bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#4338ca] hover:bg-[#3730a3] active:scale-95 text-white font-semibold text-sm px-7 py-2.5 rounded-xl shadow-md shadow-indigo-300/40 transition-all cursor-pointer"
            >
              {t.btnSendMessage}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
