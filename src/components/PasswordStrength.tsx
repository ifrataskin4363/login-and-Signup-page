import React, { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const requirements = useMemo(() => {
    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'Contains uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
      { label: 'Contains lowercase letter (a-z)', met: /[a-z]/.test(password) },
      { label: 'Contains a number (0-9)', met: /[0-9]/.test(password) },
      { label: 'Contains special symbol (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const score = useMemo(() => {
    if (!password) return 0;
    return requirements.filter((r) => r.met).length;
  }, [requirements, password]);

  const { strengthLabel, barColor, badgeColor } = useMemo(() => {
    if (!password) {
      return { strengthLabel: 'Enter password', barColor: 'bg-bloom-pink/30', badgeColor: 'text-bloom-grey' };
    }
    if (score <= 2) {
      return { strengthLabel: 'Weak', barColor: 'bg-red-400', badgeColor: 'text-red-500' };
    }
    if (score === 3 || score === 4) {
      return { strengthLabel: 'Medium', barColor: 'bg-amber-400', badgeColor: 'text-amber-600' };
    }
    return { strengthLabel: 'Strong', barColor: 'bg-bloom-green', badgeColor: 'text-bloom-green' };
  }, [score, password]);

  if (!password) return null;

  return (
    <div className="space-y-2.5 pt-1 text-left animate-in fade-in duration-200">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-bloom-grey font-medium">Password strength</span>
          <span className={`font-semibold ${badgeColor}`}>{strengthLabel}</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`rounded-full transition-colors duration-300 ${
                index <= score ? barColor : 'bg-bloom-pink/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Requirement List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px] text-bloom-charcoal/70">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            {req.met ? (
              <Check className="w-3.5 h-3.5 text-bloom-green shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-bloom-grey/50 shrink-0" />
            )}
            <span className={req.met ? 'text-bloom-charcoal font-medium' : 'text-bloom-grey'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
