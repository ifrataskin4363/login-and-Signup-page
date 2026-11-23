import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  icon,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-bloom-charcoal tracking-wide"
        >
          {label}
        </label>
        {helperText && !error && (
          <span className="text-[11px] text-bloom-grey">{helperText}</span>
        )}
      </div>

      <div className="relative rounded-2xl shadow-xs">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-bloom-grey/70">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full rounded-2xl glass-input py-3 text-sm text-bloom-charcoal placeholder:text-bloom-grey/60 transition-all ${
            icon ? 'pl-11' : 'pl-4'
          } pr-4 ${
            error
              ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-200'
              : 'border-bloom-pink/60 hover:border-bloom-rose/70'
          } ${className}`}
          {...props}
        />
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
