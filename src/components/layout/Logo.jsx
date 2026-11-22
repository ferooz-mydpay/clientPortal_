import React from 'react';
import logoImg from '../../assets/logo.png';

export const Logo = ({ className = "h-9", isFooter = false }) => {
  return (
    <div className="flex items-center select-none">
      {isFooter ? (
        <div className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-sm inline-flex items-center">
          <img
            src={logoImg}
            alt="Jussur Emdad - جسور الإمداد"
            className="h-8 w-auto object-contain"
          />
        </div>
      ) : (
        <img
          src={logoImg}
          alt="Jussur Emdad - جسور الإمداد"
          className={`w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${className}`}
        />
      )}
    </div>
  );
};
