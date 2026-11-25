import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Sparkles, KeyRound } from 'lucide-react';

interface DemoBannerProps {
  onFillDemo?: (credentials: { email: string; password: string }) => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ onFillDemo }) => {
  const { isDemoMode, fillDemoCredentials } = useAuth();

  if (!isDemoMode) return null;

  const handleAutofill = () => {
    const creds = fillDemoCredentials();
    if (onFillDemo) {
      onFillDemo(creds);
    }
  };

  return (
    <div className="w-full mb-5 sm:mb-6 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-50/90 via-white/95 to-sky-50/90 border border-brand-200/80 backdrop-blur-md shadow-2xs text-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2.5 text-slate-700">
        <span className="p-1.5 rounded-lg sm:rounded-xl bg-brand-100 text-brand-600 shrink-0">
          <Sparkles className="w-4 h-4" />
        </span>
        <div className="text-left">
          <span className="font-semibold text-brand-900 block sm:inline">Demo Environment:</span>
          <span className="text-slate-500 sm:ml-1 text-[11px] sm:text-xs">Zero setup required to test.</span>
        </div>
      </div>

      {onFillDemo && (
        <button
          type="button"
          onClick={handleAutofill}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-brand-50/80 border border-brand-200 text-brand-700 font-medium text-[11px] sm:text-xs shadow-2xs hover:shadow-xs transition-all hover:border-brand-300 w-full sm:w-auto shrink-0 active:scale-[0.98]"
        >
          <KeyRound className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span>Autofill Demo Login</span>
        </button>
      )}
    </div>
  );
};
