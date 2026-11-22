import React, { useState } from 'react';
import { LogIn, KeyRound, User, Lock, ShieldCheck, CheckCircle2, ArrowRight, Building2, Sparkles } from 'lucide-react';

export const SignInPage = ({ t, language, onSignIn, onNavigateHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('signin'); // 'signin', 'register', 'redeem'
  const isRtl = language === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-slate-50 via-white to-slate-100/70 py-8 sm:py-14 animate-in fade-in duration-300 relative overflow-hidden">
      {/* Decorative ambient background lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Top Header Badge & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>{isRtl ? 'بوابة العملاء الآمنة' : 'Secure Client Portal'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isRtl ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your client account'}
            </h1>
          </div>

          {/* Sub-tabs modern segmented control */}
          <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 self-start sm:self-center shadow-2xs">
            {/* Sign In Tab */}
            <button
              onClick={() => setActiveSubTab('signin')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4 text-cyan-600" />
              <span>{t.tabSignIn || 'Sign in'}</span>
            </button>

            {/* Register Tab */}
            <button
              onClick={() => setActiveSubTab('register')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'register'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabRegister || 'Register'}
            </button>

            {/* Redeem invitation Tab */}
            <button
              onClick={() => setActiveSubTab('redeem')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'redeem'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabRedeemInvitation || 'Redeem invitation'}
            </button>
          </div>
        </div>

        {/* Register Tab View */}
        {activeSubTab === 'register' && (
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl my-6 space-y-5 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {language === 'ar' ? 'طلب حساب عميل جديد' : 'Register for an enterprise account'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'ar' 
                ? 'يرجى إدخال بريدك الإلكتروني المؤسسي لطلب التسجيل في بوابة عملاء جسور الإمداد والربط مع عقود شركتك.' 
                : 'Please enter your work email to request client portal access and link your active enterprise workforce contracts.'}
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'ar' ? 'البريد الإلكتروني للعمل' : 'Work Email Address'}
              </label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all"
              />
            </div>
            <button 
              onClick={() => alert(language === 'ar' ? 'تم استلام طلب التسجيل بنجاح، سيتواصل معك ممثل جسور الإمداد.' : 'Registration request received. Your account executive will contact you shortly.')}
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer"
            >
              {language === 'ar' ? 'إرسال طلب التسجيل' : 'Submit Registration Request'}
            </button>
          </div>
        )}

        {/* Redeem Invitation View */}
        {activeSubTab === 'redeem' && (
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl my-6 space-y-5 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {language === 'ar' ? 'استرداد رمز الدعوة المؤسسي' : 'Redeem Invitation Code'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'ar' 
                ? 'أدخل رمز الدعوة الحصري الذي أرسله إليك المشرف المالي أو مدير الحساب لتفعيل الدخول.' 
                : 'Enter the activation code sent to you via email by your Jussur Emdad account supervisor.'}
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'ar' ? 'رمز الدعوة' : 'Invitation Code'}
              </label>
              <input 
                type="text" 
                placeholder="INV-XXXXXX" 
                className="w-full font-mono uppercase bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all"
              />
            </div>
            <button 
              onClick={() => alert(language === 'ar' ? 'تم التحقق من الرمز بنجاح!' : 'Code validated successfully!')}
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer"
            >
              {language === 'ar' ? 'تأكيد وتفعيل الرمز' : 'Validate & Activate Code'}
            </button>
          </div>
        )}

        {/* Main 2-Column Grid for Sign In */}
        {activeSubTab === 'signin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-2">
            {/* Left Column: Sign in with a local account (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isRtl ? 'تسجيل الدخول المباشر' : 'Direct Credentials'}
                  </span>
                </div>
                <h2 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 tracking-tight mb-6">
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

                  {/* Remember me? */}
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
                      className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{t.btnSignIn || 'Sign in'}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Security reassurance */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Protected by 256-bit TLS enterprise encryption.</span>
              </div>
            </div>

            {/* Right Column: Single Sign-On / External account (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0b1526] text-white rounded-3xl p-6 sm:p-9 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    {isRtl ? 'الدخول الموحد للشركات' : 'Enterprise SSO'}
                  </span>
                </div>

                <h2 className="text-[20px] sm:text-[22px] font-extrabold text-white tracking-tight mb-3">
                  {t.signInExternalTitle || 'Sign in with an external account'}
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  {isRtl
                    ? 'تسجيل الدخول السريع عبر حساب شركتك المعتمد في مايكروسوفت إنتراد ID بدون الحاجة إلى إدخال كلمة مرور جديدة.'
                    : 'Access your company workspace effortlessly via Microsoft Entra ID enterprise single sign-on.'}
                </p>

                {/* Microsoft Entra ID Button */}
                <button
                  type="button"
                  onClick={onSignIn}
                  className="w-full bg-white hover:bg-slate-50 text-slate-900 active:scale-95 text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer group"
                >
                  {/* Microsoft 4-square logo */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                  </svg>
                  <span>{t.btnMicrosoftEntraID || 'Microsoft Entra ID'}</span>
                </button>
              </div>

              {/* Enterprise Features list */}
              <div className="relative z-10 mt-8 pt-5 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Real-time timesheet synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ministry of Human Resources & GOSI compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Integrated project communication hub</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
