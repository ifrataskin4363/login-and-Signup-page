import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthCard } from '../components/AuthCard';
import { FormInput } from '../components/FormInput';
import { PasswordInput } from '../components/PasswordInput';
import { PasswordStrength } from '../components/PasswordStrength';
import { Button } from '../components/Button';
import { TermsModal } from '../components/TermsModal';
import { Mail, User, ArrowRight, CheckCircle2, Flower2 } from 'lucide-react';
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
      newErrors.email = 'Email address is required.';
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
      newErrors.terms = 'You must accept the terms and conditions to continue.';
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
        colors: ['#F4C7D5', '#EAA8BE', '#496B4A', '#A8BEA0'],
      });

      if (result.requiresVerification) {
        setSuccessInfo({
          message: 'Account created! Please check your email to verify your address before signing in.',
          requiresVerification: true,
        });
        setIsLoading(false);
      } else {
        setSuccessInfo({
          message: 'Account created successfully! Preparing your personal space...',
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 850);
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
        <div className="flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur border border-bloom-pink/50 text-bloom-green text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Flower2 className="w-3.5 h-3.5" />
          <span>JOIN BLOOM</span>
        </div>

        <AuthCard>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-bloom-charcoal tracking-tight">
              Create Your Account
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-bloom-grey leading-relaxed">
              Join us and start something wonderful.
            </p>
          </div>

          {/* Feedback Alerts */}
          {errors.general && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50/80 border border-red-200 text-xs text-red-600 font-medium animate-in fade-in">
              {errors.general}
            </div>
          )}

          {successInfo && (
            <div className="mb-4 p-3.5 rounded-2xl bg-bloom-blush border border-bloom-rose/40 text-xs text-bloom-green font-medium flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-bloom-green shrink-0 mt-0.5" />
              <div>
                <p>{successInfo.message}</p>
                {successInfo.requiresVerification && (
                  <Link
                    to="/login"
                    className="inline-block mt-2 font-semibold underline text-bloom-charcoal hover:text-bloom-green"
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
              placeholder="e.g. Camille Laurent"
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
              label="Email Address"
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
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

            {/* Password strength meter */}
            <PasswordStrength password={password} />

            <PasswordInput
              label="Confirm Password"
              id="signup-confirm-password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword}
              required
            />

            {/* Terms and Conditions Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-bloom-charcoal/80 select-none group">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  className="mt-0.5 w-4 h-4 rounded-md border-bloom-pink/70 text-bloom-green focus:ring-bloom-pink focus:ring-offset-0 transition-colors accent-bloom-green shrink-0"
                />
                <span className="leading-snug">
                  I agree to Bloom's{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-bloom-green font-semibold hover:underline"
                  >
                    Terms and Conditions
                  </button>{' '}
                  and Privacy Policy.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 font-medium mt-1.5">{errors.terms}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>

          {/* Switch to login */}
          <div className="mt-6 pt-5 border-t border-bloom-pink/30 text-center">
            <p className="text-xs text-bloom-grey">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-bloom-green hover:text-bloom-charcoal hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </AuthCard>

        {/* Terms Modal */}
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAccept={() => setAgreeTerms(true)}
        />
      </div>
    </div>
  );
};
