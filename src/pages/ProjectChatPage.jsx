import React, { useState, useRef, useEffect } from 'react';
import { Globe, Send, Building2, User, CheckCheck, Clock, Paperclip, MessageSquare } from 'lucide-react';

export const ProjectChatPage = ({
  t,
  language,
  toggleLanguage,
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const isRtl = language === 'ar';

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
      {/* 1. Hero Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Direct Operations Communication Channel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.chatHeroTitle}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
              {t.chatHeroSubtitle}
            </p>
          </div>

          <div className="flex-shrink-0 self-start sm:self-center">
            <button
              onClick={toggleLanguage}
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 backdrop-blur-md text-white font-bold px-4 py-2.5 rounded-2xl text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer select-none"
              title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-cyan-300" />
              <span className={language === 'en' ? 'font-arabic text-sm' : 'font-sans'}>
                {t.langButtonText}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Your projects sidebar */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>{t.yourProjectsTitle}</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Online
            </span>
          </div>

          {/* Active project card */}
          <div className="bg-gradient-to-br from-indigo-50 to-cyan-50/60 border border-indigo-200/80 rounded-2xl p-4 transition-all cursor-pointer shadow-2xs group hover:border-indigo-300">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono font-extrabold text-[#4338ca] text-sm">
                JE-B-0098
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-xs text-slate-700 font-bold">
              {t.companyName}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Active operations room</span>
            </div>
          </div>
        </div>

        {/* Right Column: Chat Box */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200/80 overflow-hidden flex flex-col min-h-[580px]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-2xs">
                JE
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  JE-B-0098 • {t.companyName}
                </h3>
                <p className="text-[11.5px] text-slate-400 mt-0.5 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{t.projectSupervisorLabel} (Ali Gadalla)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-5 sm:p-6 space-y-4 overflow-y-auto bg-slate-50/30">
            {messages.map((msg) => {
              const isUser = msg.senderType === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`rounded-2xl p-4 max-w-sm sm:max-w-md transition-all shadow-xs ${
                      isUser
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tl-sm'
                        : 'bg-white border border-slate-200 text-slate-900 rounded-tr-sm'
                    }`}
                  >
                    {/* Sender Name */}
                    <div
                      className={`text-[11px] font-bold mb-1 ${
                        isUser ? 'text-indigo-200' : 'text-indigo-600'
                      }`}
                    >
                      {msg.sender}
                    </div>

                    {/* Message Body */}
                    <div className="text-sm font-medium leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-[10px] mt-2 font-mono flex items-center justify-end gap-1 ${
                        isUser ? 'text-indigo-200/90' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-cyan-300" />}
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
            className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.typeYourMessagePlaceholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all font-medium"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:scale-95 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{t.btnSendMessage}</span>
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
