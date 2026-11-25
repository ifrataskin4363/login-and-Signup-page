import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed select-none px-5 py-3';

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-600 via-blue-600 to-brand-700 text-white font-semibold shadow-brand-button hover:shadow-lg hover:from-brand-500 hover:to-brand-600 hover:-translate-y-0.5 focus:ring-brand-500/25 active:translate-y-0',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow hover:-translate-y-0.5 focus:ring-slate-500/25 active:translate-y-0',
    outline:
      'bg-white border border-slate-200 text-slate-700 hover:bg-brand-50/70 hover:border-brand-300 hover:text-brand-700 focus:ring-brand-500/20 hover:-translate-y-0.5 shadow-xs',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 focus:ring-brand-500/15',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
