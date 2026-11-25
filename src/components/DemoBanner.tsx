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
    <div className="w-full mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-brand-50/90 via-white/95 to-sky-50/90 border border-brand-200/80 backdrop-blur-md shadow-xs text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2.5 text-slate-700">
        <span className="p-1.5 rounded-xl bg-brand-100 text-brand-600">
          <Sparkles className="w-4 h-4" />
        </span>
        <div>
          <span className="font-semibold text-brand-900">Demo Environment Active:</span>
          <span className="text-slate-500 ml-1 hidden sm:inline">Explore full authentication flows instantly.</span>
        </div>
      </div>

      {onFillDemo && (
        <button
          type="button"
          onClick={handleAutofill}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-brand-50/80 border border-brand-200 text-brand-700 font-medium text-[11px] shadow-2xs hover:shadow-xs transition-all hover:border-brand-300 shrink-0"
        >
          <KeyRound className="w-3.5 h-3.5 text-brand-600" />
          <span>Autofill Demo Login</span>
        </button>
      )}
    </div>
  );
};
