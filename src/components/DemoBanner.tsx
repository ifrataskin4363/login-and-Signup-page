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
    <div className="w-full mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-bloom-blush/80 via-white/80 to-bloom-blue/60 border border-bloom-pink/60 backdrop-blur-md shadow-xs text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2.5 text-bloom-charcoal/90">
        <span className="p-1.5 rounded-xl bg-bloom-pink/40 text-bloom-green">
          <Sparkles className="w-4 h-4" />
        </span>
        <div>
          <span className="font-semibold text-bloom-green">Portfolio Demo Mode:</span>
          <span className="text-bloom-grey ml-1 hidden sm:inline">Explore full auth functionality instantly.</span>
        </div>
      </div>

      {onFillDemo && (
        <button
          type="button"
          onClick={handleAutofill}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-bloom-blush border border-bloom-pink/60 text-bloom-charcoal font-medium text-[11px] shadow-2xs hover:shadow-sm transition-all hover:border-bloom-rose shrink-0"
        >
          <KeyRound className="w-3.5 h-3.5 text-bloom-rose" />
          <span>Autofill Demo Login</span>
        </button>
      )}
    </div>
  );
};
