import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthCard } from '../components/AuthCard';
import { FormInput } from '../components/FormInput';
import { PasswordInput } from '../components/PasswordInput';
import { PasswordStrength } from '../components/PasswordStrength';
import { Button } from '../components/Button';
import { TermsModal } from '../components/TermsModal';
import { Mail, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ message: string; requiresVerification?: boolean } | null>(null);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Please enter at least 2 characters.';
    }

    if (!email.trim()) {
      newErrors.email = 'Work email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email format.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmation password is required.';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must accept the terms and privacy conditions to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessInfo(null);
    setErrors({});

    if (!validate()) return;

    setIsLoading(true);
    const result = await signup(name, email, password);

    if (result.success) {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8'],
      });

      if (result.requiresVerification) {
        setSuccessInfo({
          message: 'Account created! Please verify your email address to complete registration.',
          requiresVerification: true,
        });
        setIsLoading(false);
      } else {
        setSuccessInfo({
          message: 'Account initialized successfully! Redirecting to your dashboard...',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 750);
      }
    } else {
      setErrors({ general: result.error || 'Could not complete registration. Please try again.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Floating Brand Badge */}
        <div className="flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>JOIN AURA PLATFORM</span>
        </div>

        <AuthCard>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Create Your Account
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Start with secure single sign-on, identity controls, and high-performance sessions.
            </p>
          </div>

          {/* Feedback Alerts */}
          {errors.general && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium animate-in fade-in">
              {errors.general}
            </div>
          )}

          {successInfo && (
            <div className="mb-4 p-3.5 rounded-xl bg-blue-50 border border-brand-200 text-xs text-brand-700 font-medium flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <p>{successInfo.message}</p>
                {successInfo.requiresVerification && (
                  <Link
                    to="/login"
                    className="inline-block mt-2 font-semibold underline text-slate-900 hover:text-brand-600"
                  >
                    Proceed to Login
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormInput
              label="Full Name"
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Alex Rivera"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
              required
            />

            <FormInput
              label="Work Email Address"
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <PasswordInput
              label="Password"
              id="signup-password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              required
            />

            {/* Dynamic Password Strength Checklist */}
            <PasswordStrength password={password} />

            <PasswordInput
              label="Confirm Password"
              id="signup-confirm-password"
              autoComplete="new-password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword}
              required
            />

            {/* Terms and conditions */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 focus:ring-offset-0 transition-colors accent-brand-600"
                />
                <span className="leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="font-semibold text-brand-600 hover:text-brand-700 underline"
                  >
                    Terms of Service
                  </button>{' '}
                  and Privacy Policy.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-600 font-medium pt-1 animate-in fade-in">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full mt-3"
            >
              Create Account
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an enterprise account?{' '}
              <Link
                to="/login"
                className="font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </AuthCard>

        {/* Terms Dialog Modal */}
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAccept={() => setAgreeTerms(true)}
        />
      </div>
    </div>
  );
};
