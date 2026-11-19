import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

export const SignInPage = ({ t, language, onSignIn, onNavigateHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('signin'); // 'signin', 'register', 'redeem'

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="bg-white min-h-[550px] py-6 sm:py-10 animate-in fade-in duration-200">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8">
        {/* Top Sub-tabs matching Image 2 */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 mb-8">
          {/* Sign In Tab (Active pill) */}
          <button
            onClick={() => setActiveSubTab('signin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-all cursor-pointer ${
              activeSubTab === 'signin'
                ? 'bg-white border border-slate-300 text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4 text-slate-700 stroke-[2.2]" />
            <span>{t.tabSignIn || 'Sign in'}</span>
          </button>

          {/* Register Tab */}
          <button
            onClick={() => setActiveSubTab('register')}
            className={`px-3 py-1.5 text-sm font-normal rounded transition-all cursor-pointer ${
              activeSubTab === 'register'
                ? 'bg-white border border-slate-300 text-slate-800 shadow-sm font-medium'
                : 'text-[#00a3e0] hover:underline'
            }`}
          >
            {t.tabRegister || 'Register'}
          </button>

          {/* Redeem invitation Tab */}
          <button
            onClick={() => setActiveSubTab('redeem')}
            className={`px-3 py-1.5 text-sm font-normal rounded transition-all cursor-pointer ${
              activeSubTab === 'redeem'
                ? 'bg-white border border-slate-300 text-slate-800 shadow-sm font-medium'
                : 'text-[#00a3e0] hover:underline'
            }`}
          >
            {t.tabRedeemInvitation || 'Redeem invitation'}
          </button>
        </div>

        {/* Register or Redeem Placeholder when selected */}
        {activeSubTab === 'register' && (
          <div className="max-w-md py-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Register for an account'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'ar' 
                ? 'يرجى إدخال بريدك الإلكتروني لطلب تسجيل جديد في بوابة عملاء جسور الإمداد.' 
                : 'Please enter your email to request registration for the Jussur Emdad Client Portal.'}
            </p>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00a3e0]"
            />
            <button 
              onClick={() => alert('Registration request received.')}
              className="bg-[#00a3e0] hover:bg-[#008ec4] text-white px-5 py-2 rounded text-sm font-medium"
            >
              {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
            </button>
          </div>
        )}

        {activeSubTab === 'redeem' && (
          <div className="max-w-md py-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'ar' ? 'استرداد رمز الدعوة' : 'Redeem Invitation Code'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'ar' 
                ? 'أدخل رمز الدعوة الذي تم إرساله إليك عبر البريد الإلكتروني.' 
                : 'Enter the invitation code sent to your email.'}
            </p>
            <input 
              type="text" 
              placeholder="INV-XXXXXX" 
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00a3e0]"
            />
            <button 
              onClick={() => alert('Code validated successfully.')}
              className="bg-[#00a3e0] hover:bg-[#008ec4] text-white px-5 py-2 rounded text-sm font-medium"
            >
              {language === 'ar' ? 'تأكيد الرمز' : 'Redeem Code'}
            </button>
          </div>
        )}

        {/* Main 2-Column Grid matching 100% with Image 1 & Image 2 */}
        {activeSubTab === 'signin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start pt-2">
            {/* Left Column: Sign in with a local account */}
            <div>
              <h2 className="text-[19px] sm:text-[20px] font-bold text-slate-900 tracking-tight mb-8">
                {t.signInLocalTitle || 'Sign in with a local account'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="sm:w-32 shrink-0 sm:text-right rtl:sm:text-left text-sm font-bold text-slate-900">
                    <span className="text-red-500 font-bold ltr:mr-1 rtl:ml-1">*</span>
                    {t.labelUsername || 'Username'}
                  </label>
                  <div className="flex-1 max-w-[320px]">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0] transition-all"
                    />
                  </div>
                </div>

                {/* Password Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="sm:w-32 shrink-0 sm:text-right rtl:sm:text-left text-sm font-bold text-slate-900">
                    <span className="text-red-500 font-bold ltr:mr-1 rtl:ml-1">*</span>
                    {t.labelPassword || 'Password'}
                  </label>
                  <div className="flex-1 max-w-[320px]">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0] transition-all"
                    />
                  </div>
                </div>

                {/* Remember me? Row (indented to match input start) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="sm:w-32 shrink-0 hidden sm:block" />
                  <div className="flex-1 max-w-[320px]">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-[#00a3e0] focus:ring-[#00a3e0] border-slate-300 cursor-pointer"
                      />
                      <span className="text-sm font-normal text-slate-800">
                        {t.labelRememberMe || 'Remember me?'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Buttons Row (indented to match input start) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                  <div className="sm:w-32 shrink-0 hidden sm:block" />
                  <div className="flex items-center gap-3">
                    {/* Sign in button matching cyan background in screenshots */}
                    <button
                      type="submit"
                      className="bg-[#00a3e0] hover:bg-[#008ec4] text-white text-sm font-medium px-5 py-1.5 rounded transition-colors shadow-sm cursor-pointer active:scale-95"
                    >
                      {t.btnSignIn || 'Sign in'}
                    </button>

                    {/* Forgot your password? button matching white with cyan border */}
                    <button
                      type="button"
                      onClick={() => alert(language === 'ar' ? 'تم إرسال تعليمات استعادة كلمة المرور إلى بريدك المسجل.' : 'Password reset instructions have been sent to your email.')}
                      className="bg-white border border-[#00a3e0] text-[#00a3e0] hover:bg-[#00a3e0]/5 text-sm font-normal px-3.5 py-1.5 rounded transition-colors cursor-pointer"
                    >
                      {t.btnForgotPassword || 'Forgot your password?'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Sign in with an external account */}
            <div>
              <h2 className="text-[19px] sm:text-[20px] font-bold text-slate-900 tracking-tight mb-8">
                {t.signInExternalTitle || 'Sign in with an external account'}
              </h2>

              {/* Microsoft Entra ID button matching Screenshot */}
              <div>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="bg-[#00a3e0] hover:bg-[#008ec4] text-white text-sm font-semibold px-4 py-2 rounded transition-colors shadow-sm cursor-pointer active:scale-95 inline-flex items-center gap-2"
                >
                  <span>{t.btnMicrosoftEntraID || 'Microsoft Entra ID'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
