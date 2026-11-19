import React from 'react';
import { Lock } from 'lucide-react';

export const TopBanner = ({ t, signedInUser }) => {
  const displayUser = signedInUser || t.userName;

  return (
    <div className="bg-[#111827] text-white text-[12px] sm:text-[13px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
      <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left message */}
        <div className="flex items-center gap-2 text-slate-300">
          <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>
            {t.sitePrivate}{' '}
            <a href="#learn-more" className="text-white hover:underline font-medium">
              {t.learnMore}
            </a>
          </span>
        </div>

        {/* Right user info */}
        <div className="text-slate-300 text-xs sm:text-[13px]">
          {t.signedInAs}{' '}
          <span className="text-white font-medium hover:underline cursor-pointer">
            {displayUser}
          </span>
        </div>
      </div>
    </div>
  );
};
