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
    'relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed select-none px-6 py-3.5';

  const variants = {
    primary:
      'bg-gradient-to-r from-bloom-rose via-bloom-pink to-bloom-rose bg-[length:200%_auto] text-bloom-charcoal font-semibold shadow-bloom-button hover:shadow-lg hover:-translate-y-0.5 focus:ring-bloom-pink/40 hover:bg-right active:translate-y-0',
    secondary:
      'bg-bloom-green text-white hover:bg-bloom-green/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:ring-bloom-sage/40 active:translate-y-0',
    outline:
      'bg-white/80 backdrop-blur-sm border-2 border-bloom-pink/70 text-bloom-charcoal hover:bg-bloom-blush/40 hover:border-bloom-rose focus:ring-bloom-pink/30 hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-bloom-charcoal/80 hover:text-bloom-charcoal hover:bg-bloom-blush/50 focus:ring-bloom-pink/20',
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
