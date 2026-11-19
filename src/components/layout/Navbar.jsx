import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

export const Navbar = ({ 
  t, 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onNavigateProfile,
  isAuthenticated = true,
  onSignIn,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // When not authenticated, only show Home and Project Chat matching Image 1 & 2
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
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div 
          onClick={() => {
            if (isAuthenticated) {
              setActiveTab('home');
            } else {
              setActiveTab('signin');
            }
          }} 
          className="cursor-pointer"
        >
          <Logo />
        </div>

        {/* Center / Right: Nav items for desktop */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-7 text-[15px] font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-5 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#4338ca] font-bold'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4338ca] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-[19px] h-[19px] stroke-[2.2]" />
          </button>

          {/* If authenticated: User selector dropdown matching Screenshot 1 */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-1.5 text-sm font-bold text-slate-800 transition-all cursor-pointer ${
                  userDropdownOpen
                    ? 'border-2 border-[#00a3e0] bg-white rounded-2xl px-4 py-1.5 shadow-sm'
                    : 'hover:text-slate-950 px-3 py-1.5 rounded-xl hover:bg-slate-50'
                }`}
              >
                <span>{t.userPortalName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-600 stroke-[3] transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu matching Screenshot 1 */}
              {userDropdownOpen && (
                <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-40 bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateProfile && onNavigateProfile();
                    }}
                    className="w-full text-left rtl:text-right px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    {t.menuProfile}
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onSignOut) {
                        onSignOut();
                      }
                    }}
                    className="w-full text-left rtl:text-right px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    {t.menuSignOut}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* If not authenticated: Sign in link matching Screenshot 1 & 2 */
            <button
              onClick={onSignIn}
              className="text-[15px] font-medium text-slate-800 hover:text-slate-950 transition-colors cursor-pointer py-1.5 px-2"
            >
              {t.navSignIn || 'Sign in'}
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
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
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateProfile && onNavigateProfile();
                  }}
                  className="text-sm font-medium text-indigo-600 underline"
                >
                  {t.menuProfile}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onSignOut) onSignOut();
                  }}
                  className="text-xs text-rose-600 font-medium hover:underline"
                >
                  {t.menuSignOut}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onSignIn) onSignIn();
                }}
                className="text-sm font-medium text-indigo-600 underline"
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
