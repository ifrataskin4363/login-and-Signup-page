import React from 'react';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full py-4 sm:py-6 px-4 sm:px-6 text-center text-xs text-slate-500 border-t border-slate-200/80 mt-auto bg-white/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-brand-600 text-white flex items-center justify-center shrink-0">
            <Shield className="w-3 h-3" />
          </div>
          <span className="font-bold text-slate-900">AURA</span>
          <span className="text-slate-400">•</span>
          <span className="text-[11px] sm:text-xs">Enterprise Cloud Identity & Access</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-y-1.5 gap-x-3 text-[11px] sm:text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
            <span>All Systems Normal</span>
          </span>
          <span className="text-slate-300 hidden xs:inline">•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            <span>256-bit Encrypted</span>
          </span>
          <span className="text-slate-300 hidden xs:inline">•</span>
          <span>© {CURRENT_YEAR} AURA</span>
        </div>
      </div>
    </footer>
  );
};
