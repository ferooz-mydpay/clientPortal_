import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { Search, ChevronDown, Menu, X, Check, Building2, User, LogOut } from 'lucide-react';

export const Navbar = ({ 
  t, 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onNavigateProfile,
  isAuthenticated = true,
  onSignIn,
  onSignOut,
  activeProject,
  allProjects = [],
  onSwitchProject,
  language = 'en',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isRtl = language === 'ar';
  const currentProjectName = isRtl
    ? (activeProject?.companyNameAr || activeProject?.companyName)
    : (activeProject?.companyName || activeProject?.companyNameAr);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When not authenticated, only show Home and Project Chat
  const navItems = isAuthenticated
    ? [
        { id: 'home', label: t.navHome },
        { id: 'timesheets', label: t.navTimesheets },
        { id: 'employees', label: t.navEmployees || 'Employees' },
        { id: 'requests', label: t.navRequests },
        { id: 'chat', label: t.navProjectChat },
      ]
    : [
        { id: 'home', label: t.navHome },
        { id: 'chat', label: t.navProjectChat },
      ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-[70px] flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div 
          onClick={() => {
            if (isAuthenticated) {
              setActiveTab('home');
            } else {
              setActiveTab('signin');
            }
          }} 
          className="cursor-pointer shrink-0"
        >
          <Logo />
        </div>

        {/* Center / Right: Nav items for desktop */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-1.5 text-[14.5px] font-medium bg-slate-50/80 p-1 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer select-none text-sm ${
                    isActive
                      ? 'bg-white text-indigo-700 font-bold shadow-[0_2px_8px_rgba(79,70,229,0.12)] border border-indigo-100/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 font-semibold'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Search button with sleek pill design */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3 py-1.5 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all cursor-pointer group shadow-2xs"
            title="Search (Quick Find)"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600 hidden lg:inline">
              Quick Search...
            </span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </button>

          {/* If authenticated: Project selector dropdown */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none py-1.5 px-3 rounded-xl border ${
                  userDropdownOpen
                    ? 'border-indigo-500/80 bg-indigo-50/70 text-indigo-950 shadow-sm ring-2 ring-indigo-500/10'
                    : 'border-slate-200/90 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                }`}
                title={currentProjectName || t.userPortalName}
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left rtl:text-right max-w-[160px] lg:max-w-[210px]">
                  <span className="text-[13px] font-bold text-slate-900 truncate leading-tight">
                    {currentProjectName || t.userPortalName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono leading-none">
                    {activeProject?.contractCode}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-[0_16px_40px_-8px_rgba(15,23,42,0.15)] border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {allProjects.length > 0 && (
                    <>
                      <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>{isRtl ? 'المشاريع النشطة' : 'Switch Active Project'}</span>
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {allProjects.length} {isRtl ? 'عقود' : 'Active'}
                        </span>
                      </div>

                      <div className="max-h-56 overflow-y-auto space-y-1 py-1">
                        {allProjects.map((proj) => {
                          const isActive = proj.id === activeProject?.id;
                          return (
                            <button
                              key={proj.id}
                              onClick={() => {
                                onSwitchProject && onSwitchProject(proj.id);
                                setUserDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left rtl:text-right transition-all cursor-pointer ${
                                isActive 
                                  ? 'bg-gradient-to-r from-indigo-50 to-cyan-50/60 font-bold text-indigo-900 border border-indigo-200/70 shadow-2xs' 
                                  : 'text-slate-700 font-medium hover:bg-slate-50'
                              }`}
                            >
                              <div className="min-w-0 flex-1 pr-2 rtl:pr-0 rtl:pl-2">
                                <div className="text-[13px] truncate">
                                  {isRtl ? proj.companyNameAr : proj.companyName}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                  Contract • {proj.contractCode}
                                </div>
                              </div>
                              {isActive && (
                                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <div className="border-t border-slate-100 my-1.5" />
                    </>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateProfile && onNavigateProfile();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{t.menuProfile}</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onSignOut) {
                        onSignOut();
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>{t.menuSignOut}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* If not authenticated: High-converting Sign in button */
            <button
              onClick={onSignIn}
              className="bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white text-sm font-bold px-5 py-2 rounded-xl shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
            >
              {t.navSignIn || 'Sign in'}
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-2 pb-5 space-y-1.5 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between px-3">
            {isAuthenticated ? (
              <>
                <div className="text-xs font-bold text-slate-800 truncate max-w-[170px]">
                  {currentProjectName || t.userPortalName}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateProfile && onNavigateProfile();
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    {t.menuProfile}
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                    className="text-xs text-rose-600 font-semibold hover:underline"
                  >
                    {t.menuSignOut}
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onSignIn) onSignIn();
                }}
                className="w-full text-center bg-cyan-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm"
              >
                {t.navSignIn || 'Sign in'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
