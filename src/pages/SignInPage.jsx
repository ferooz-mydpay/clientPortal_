import React, { useState } from 'react';
import { User, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export const SignInPage = ({ t, language, onSignIn, onNavigateHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const isRtl = language === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-slate-50 via-white to-slate-100/70 py-10 sm:py-16 animate-in fade-in duration-300 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative ambient background lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-[500px] w-full mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Header Badge & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>{isRtl ? 'بوابة العملاء الآمنة' : 'Secure Client Portal'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isRtl ? 'تسجيل الدخول' : 'Sign in'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            {isRtl ? 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم' : 'Enter your credentials to access your enterprise dashboard'}
          </p>
        </div>

        {/* Centered Sign-in Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.08)] relative overflow-hidden">
          {/* Subtle top cyan line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-cyan-500 to-indigo-500" />

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isRtl ? 'تسجيل الدخول المباشر' : 'Direct Credentials'}
            </span>
          </div>
          <h2 className="text-[19px] sm:text-[21px] font-extrabold text-slate-900 tracking-tight mb-6">
            {t.signInLocalTitle || 'Sign in with a local account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Row */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                <span className="text-rose-500 font-bold mr-1">*</span>
                {t.labelUsername || 'Username'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 ltr:pl-3.5 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. CRMJSVC1"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Row */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                <span className="text-rose-500 font-bold mr-1">*</span>
                {t.labelPassword || 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 ltr:pl-3.5 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Remember me? & Forgot password */}
            <div className="pt-1 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  {t.labelRememberMe || 'Remember me?'}
                </span>
              </label>

              <button
                type="button"
                onClick={() => alert(language === 'ar' ? 'تم إرسال تعليمات استعادة كلمة المرور إلى بريدك المسجل.' : 'Password reset instructions have been sent to your email.')}
                className="text-xs font-bold text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer"
              >
                {t.btnForgotPassword || 'Forgot your password?'}
              </button>
            </div>

            {/* Submit button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 active:scale-[0.98] text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.btnSignIn || 'Sign in'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </form>

          {/* Security reassurance */}
          <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Protected by 256-bit TLS enterprise encryption.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
