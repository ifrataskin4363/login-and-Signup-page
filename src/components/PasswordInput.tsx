import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  rightAction?: React.ReactNode;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  error,
  rightAction,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-bloom-charcoal tracking-wide"
        >
          {label}
        </label>
        {rightAction && <div className="text-xs">{rightAction}</div>}
      </div>

      <div className="relative rounded-2xl shadow-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-bloom-grey/70">
          <Lock className="w-4 h-4" />
        </div>

        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-2xl glass-input py-3 pl-11 pr-12 text-sm text-bloom-charcoal placeholder:text-bloom-grey/60 transition-all ${
            error
              ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-200'
              : 'border-bloom-pink/60 hover:border-bloom-rose/70'
          } ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-bloom-grey hover:text-bloom-charcoal transition-colors focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-bloom-green" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-0.5 animate-in fade-in duration-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
