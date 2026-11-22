import React, { useState } from 'react';
import { 
  Lock, 
  Info, 
  Mail, 
  ChevronDown, 
  User, 
  AlertCircle,
  Building2,
  Phone,
  Globe,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Camera
} from 'lucide-react';

export const ProfilePage = ({ t, language, onNavigateHome, onShowToast }) => {
  const [formData, setFormData] = useState({
    firstName: 'test',
    lastName: 'Portal',
    email: 'ali.nagib1982@gmail.com',
    businessPhone: '0511417276',
    organizationName: '',
    title: '',
    nickname: '',
    website: '',
    publicProfileCopy: '',
    preferredLanguage: '',
    contactEmail: true,
    contactFax: true,
    contactPhone: true,
    contactMail: true,
  });

  const isRtl = language === 'ar';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast(language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح.' : 'Profile updated successfully.');
    }
  };

  const handleConfirmEmail = () => {
    if (onShowToast) {
      onShowToast(language === 'ar' ? 'تم إرسال رابط تأكيد البريد الإلكتروني.' : 'Confirmation email has been sent.');
    }
  };

  return (
    <div className="animate-in fade-in duration-200 space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
        <button 
          onClick={onNavigateHome}
          className="text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer"
        >
          {t.breadcrumbHome || 'Home'}
        </button>
        <span className="text-slate-400 font-normal">/</span>
        <span className="text-slate-900 font-bold">{t.breadcrumbProfile || 'Profile'}</span>
      </nav>

      {/* Main Title Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#090d16] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Identity & Security Settings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.profileTitle || 'Profile Management'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage your personal details, corporate credentials, and security preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Security Menu (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Avatar Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <div className="relative">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold shrink-0 shadow-md">
                {formData.firstName?.[0]?.toUpperCase()}{formData.lastName?.[0]?.toUpperCase()}
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                {formData.firstName} {formData.lastName}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5 truncate max-w-[170px]">
                {formData.email}
              </div>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Account
              </span>
            </div>
          </div>

          {/* Navigation / Security Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden text-sm">
            {/* Active Profile Item */}
            <div className="px-5 py-3.5 bg-indigo-50/60 border-b border-indigo-100 font-bold text-indigo-700 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span>{t.menuProfile || 'Profile Details'}</span>
              </span>
              <Check className="w-4 h-4 text-indigo-600" />
            </div>

            {/* Security Section Header */}
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.securitySectionTitle || 'Security'}</span>
            </div>

            {/* Security Sub-items */}
            <button 
              type="button"
              onClick={() => onShowToast && onShowToast(language === 'ar' ? 'نموذج تغيير كلمة المرور' : 'Change password modal')}
              className="w-full text-left rtl:text-right px-5 py-3 text-slate-700 hover:bg-slate-50 border-b border-slate-100 transition-colors cursor-pointer font-medium text-xs sm:text-sm flex items-center justify-between group"
            >
              <span>{t.menuChangePassword || 'Change Password'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 rtl:rotate-180 transition-colors" />
            </button>

            <button 
              type="button"
              onClick={() => onShowToast && onShowToast(language === 'ar' ? 'نموذج تغيير البريد الإلكتروني' : 'Change email modal')}
              className="w-full text-left rtl:text-right px-5 py-3 text-slate-700 hover:bg-slate-50 border-b border-slate-100 flex items-center justify-between transition-colors cursor-pointer font-medium text-xs sm:text-sm"
            >
              <span>{t.menuChangeEmail || 'Change Email'}</span>
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                !
              </span>
            </button>

            <button 
              type="button"
              onClick={() => onShowToast && onShowToast(language === 'ar' ? 'إدارة المصادقة الخارجية' : 'External authentication')}
              className="w-full text-left rtl:text-right px-5 py-3 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer font-medium text-xs sm:text-sm flex items-center justify-between group"
            >
              <span>{t.menuManageExternalAuth || 'Manage External Authentication'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 rtl:rotate-180 transition-colors" />
            </button>
          </div>
        </div>

        {/* Right Column: Information form (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
          {/* Explanatory intro */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="font-semibold text-slate-800">{t.profileIntro1 || 'Please provide some information about yourself.'}</p>
            <p>
              {language === 'ar' ? (
                <>سيتم عرض <strong className="font-bold text-slate-900">الاسم الأول</strong> و <strong className="font-bold text-slate-900">اسم العائلة</strong> إلى جانب تعليقاتك وطلباتك الرسمية.</>
              ) : (
                <>The <strong className="font-bold text-slate-900">First Name</strong> and <strong className="font-bold text-slate-900">Last Name</strong> you provide will be displayed alongside any official requests or notes on the portal.</>
              )}
            </p>
          </div>

          {/* Email Confirmation Alert */}
          <div className="bg-gradient-to-r from-cyan-50 to-sky-50 border border-cyan-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-cyan-950 font-medium">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                i
              </span>
              <span>{t.emailRequiresConfirmation || 'Your email requires confirmation.'}</span>
            </div>
            <button
              type="button"
              onClick={handleConfirmEmail}
              className="bg-cyan-700 hover:bg-cyan-800 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t.btnConfirmEmail || 'Confirm Email'}</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              {t.yourInformationTitle || 'Your Information'}
            </h2>

            {/* Grid of Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {language === 'ar' ? 'الاسم الأول' : 'First Name'}{' '}
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {language === 'ar' ? 'اسم العائلة' : 'Last Name'}{' '}
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}{' '}
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all font-medium font-mono"
                />
              </div>

              {/* Business Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {language === 'ar' ? 'هاتف العمل' : 'Business Phone'}{' '}
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all font-medium font-mono"
                />
              </div>

              {/* Organization Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {language === 'ar' ? 'اسم المنظمة / الشركة' : 'Organization Name'}{' '}
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="e.g. National Marketing Company Ltd."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Operations Director"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 active:scale-95 text-white font-extrabold px-7 py-3 rounded-2xl text-sm shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
              >
                {t.btnUpdate || 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
