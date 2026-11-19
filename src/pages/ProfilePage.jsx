import React, { useState } from 'react';
import { 
  Lock, 
  Info, 
  Mail, 
  ChevronDown, 
  User, 
  AlertCircle 
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
    <div className="animate-in fade-in duration-200">
      {/* Breadcrumbs matching Screenshot 2 */}
      <nav className="flex items-center gap-2 text-[15px] mb-5">
        <button 
          onClick={onNavigateHome}
          className="text-[#00a3e0] hover:underline font-medium cursor-pointer"
        >
          {t.breadcrumbHome || 'Home'}
        </button>
        <span className="text-slate-400 font-normal">/</span>
        <span className="text-slate-900 font-bold">{t.breadcrumbProfile || 'Profile'}</span>
      </nav>

      {/* Main Title */}
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
        {t.profileTitle || 'Profile'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Security Menu (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Avatar Card */}
          <div className="bg-white rounded border border-slate-200 p-5 flex items-center gap-4 shadow-none">
            <div className="w-[84px] h-[84px] bg-[#94a3b8] rounded flex items-center justify-center text-white shrink-0 overflow-hidden">
              <svg 
                className="w-16 h-16 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div>
              <div className="text-[17px] font-semibold text-slate-800">
                {formData.firstName} {formData.lastName}
              </div>
            </div>
          </div>

          {/* Navigation / Security Card */}
          <div className="bg-white rounded border border-slate-200 shadow-none overflow-hidden text-[14px]">
            {/* Active Profile Item */}
            <div className="px-4 py-3 bg-white border-b border-slate-200 font-medium text-slate-900 cursor-pointer">
              {t.menuProfile || 'Profile'}
            </div>

            {/* Security Section Header */}
            <div className="px-4 py-3 bg-white border-b border-slate-200 font-semibold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-800" />
              <span>{t.securitySectionTitle || 'Security'}</span>
            </div>

            {/* Security Sub-items */}
            <button 
              type="button"
              onClick={() => onShowToast && onShowToast(language === 'ar' ? 'نموذج تغيير كلمة المرور' : 'Change password modal')}
              className="w-full text-left rtl:text-right px-6 py-2.5 text-slate-700 hover:bg-slate-50 border-b border-slate-200 transition-colors cursor-pointer"
            >
              {t.menuChangePassword || 'Change Password'}
            </button>

            <button 
              type="button"
              onClick={() => onShowToast && onShowToast(language === 'ar' ? 'نموذج تغيير البريد الإلكتروني' : 'Change email modal')}
              className="w-full text-left rtl:text-right px-6 py-2.5 text-slate-700 hover:bg-slate-50 border-b border-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{t.menuChangeEmail || 'Change Email'}</span>
              <span className="w-4 h-4 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                !
              </span>
            </button>

            <button 
              type="button"
              onClick={() => onShowToast && onShowToast(language === 'ar' ? 'إدارة المصادقة الخارجية' : 'External authentication')}
              className="w-full text-left rtl:text-right px-6 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {t.menuManageExternalAuth || 'Manage External Authentication'}
            </button>
          </div>
        </div>

        {/* Right Column: Information form (8 cols) */}
        <div className="lg:col-span-8">
          {/* Explanatory text matching Screenshot 2 */}
          <div className="text-[14px] text-slate-800 leading-relaxed space-y-3.5 mb-6">
            <p>{t.profileIntro1 || 'Please provide some information about yourself.'}</p>
            <p>
              {language === 'ar' ? (
                <>سيتم عرض <strong className="font-bold text-slate-900">الاسم الأول</strong> و <strong className="font-bold text-slate-900">اسم العائلة</strong> الذي تقدمه إلى جانب أي تعليقات أو منشورات أو أفكار تقوم بها على الموقع.</>
              ) : (
                <>The <strong className="font-bold text-slate-900">First Name</strong> and <strong className="font-bold text-slate-900">Last Name</strong> you provide will be displayed alongside any comments, forum posts, or ideas you make on the site.</>
              )}
            </p>
            <p>
              {language === 'ar' ? (
                <>عنوان <strong className="font-bold text-slate-900">البريد الإلكتروني</strong> ورقم <strong className="font-bold text-slate-900">الهاتف</strong> مطلوبان ولكن لن يتم عرضهما على الموقع.</>
              ) : (
                <>The <strong className="font-bold text-slate-900">Email Address</strong> and <strong className="font-bold text-slate-900">Phone</strong> number are required but will not be displayed on the site.</>
              )}
            </p>
            <p>
              {language === 'ar' ? (
                <>منظمتك <strong className="font-bold text-slate-900">مطلوبة</strong>، و <strong className="font-bold text-slate-900">المسمى الوظيفي</strong> اختياري. سيتم عرضهما مع تعليقاتك ومنشوراتك في المنتدى.</>
              ) : (
                <>Your <strong className="font-bold text-slate-900">Organization</strong> is required, and a <strong className="font-bold text-slate-900">Title</strong> is optional. They will be displayed with your comments and forum posts.</>
              )}
            </p>
          </div>

          {/* Cyan Alert Box matching Screenshot 2 */}
          <div className="bg-[#dcf3f8] border border-[#b2e5ef] rounded p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-2.5 text-[14px] text-[#006064] font-medium">
              <span className="w-5 h-5 rounded-full bg-[#00838f] text-white flex items-center justify-center text-xs font-bold shrink-0">
                i
              </span>
              <span>{t.emailRequiresConfirmation || 'Your email requires confirmation.'}</span>
            </div>
            <button
              type="button"
              onClick={handleConfirmEmail}
              className="bg-[#2f677d] hover:bg-[#255263] text-white text-xs font-semibold px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t.btnConfirmEmail || 'Confirm Email'}</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t.yourInformationTitle || 'Your Information'}
            </h2>

            {/* Grid of Inputs matching Screenshots 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name * */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'الاسم الأول' : 'First Name'}{' '}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>

              {/* Last Name * */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'اسم العائلة' : 'Last Name'}{' '}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'E-mail'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>

              {/* Business Phone * */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'هاتف العمل' : 'Business Phone'}{' '}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>

              {/* Organization Name */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'اسم المنظمة' : 'Organization Name'}
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'المسمى الوظيفي' : 'Title'}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>

              {/* Nickname */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'الاسم المستعار' : 'Nickname'}
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>

              {/* Web Site */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  {language === 'ar' ? 'الموقع الإلكتروني' : 'Web Site'}
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
                />
              </div>
            </div>

            {/* Public Profile Copy (Full width) */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1.5">
                {language === 'ar' ? 'نبذة الملف الشخصي العام' : 'Public Profile Copy'}
              </label>
              <textarea
                name="publicProfileCopy"
                rows={5}
                value={formData.publicProfileCopy}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded p-3 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0]"
              />
            </div>

            {/* Preferred Language 1 matching Screenshot 3 & 4 */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1.5">
                {language === 'ar' ? 'اللغة المفضلة 1' : 'Preferred Language 1'}
              </label>
              <div className="relative">
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="w-full appearance-none bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00a3e0] focus:border-[#00a3e0] cursor-pointer"
                >
                  <option value="">{t.selectPlaceholder || 'Select'}</option>
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabic)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-600 absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* How may we contact you? Select all that apply. matching Screenshot 4 */}
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                {language === 'ar' ? (
                  <>كيف يمكننا التواصل معك؟ <span className="font-normal text-slate-500">حدد كل ما ينطبق.</span></>
                ) : (
                  <>How may we contact you? <span className="font-normal text-slate-500">Select all that apply.</span></>
                )}
              </h3>

              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="contactEmail"
                    checked={formData.contactEmail}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-[#00a3e0] focus:ring-[#00a3e0] border-slate-300 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {t.contactOptionEmail || 'Email'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="contactFax"
                    checked={formData.contactFax}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-[#00a3e0] focus:ring-[#00a3e0] border-slate-300 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {t.contactOptionFax || 'Fax'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="contactPhone"
                    checked={formData.contactPhone}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-[#00a3e0] focus:ring-[#00a3e0] border-slate-300 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {t.contactOptionPhone || 'Phone'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="contactMail"
                    checked={formData.contactMail}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-[#00a3e0] focus:ring-[#00a3e0] border-slate-300 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {t.contactOptionMail || 'Mail'}
                  </span>
                </label>
              </div>
            </div>

            {/* Update Button matching Screenshot 4 */}
            <div className="pt-2">
              <button
                type="submit"
                className="bg-[#00a3e0] hover:bg-[#008ec4] text-white text-sm font-medium px-6 py-2 rounded transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {t.btnUpdateProfile || 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
