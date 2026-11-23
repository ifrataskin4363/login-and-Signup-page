import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthCard } from '../components/AuthCard';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { resetPassword, isDemoMode } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResultMessage(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email format.');
      return;
    }

    setIsLoading(true);
    const res = await resetPassword(email);

    if (res.success) {
      setIsSuccess(true);
      setResultMessage(res.message);
    } else {
      setIsSuccess(false);
      setError(res.error || 'Failed to dispatch reset instructions.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <AuthCard>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-bloom-blush text-bloom-green flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-bloom-charcoal tracking-tight">
              Forgot Your Password?
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-bloom-grey leading-relaxed max-w-sm mx-auto">
              Enter your registered email address to begin the password reset process.
            </p>
          </div>

          {/* Result Alert / Confirmation */}
          {resultMessage && (
            <div
              className={`mb-6 p-4 rounded-2xl border text-xs leading-relaxed animate-in fade-in ${
                isSuccess
                  ? 'bg-bloom-blush/90 border-bloom-rose/40 text-bloom-charcoal'
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-bloom-green shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-semibold text-bloom-green">
                    {isSuccess ? 'Reset Request Handled' : 'Notice'}
                  </p>
                  <p className="text-bloom-charcoal/80">{resultMessage}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium animate-in fade-in flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <FormInput
                label="Registered Email Address"
                id="reset-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              {isDemoMode && (
                <div className="p-3 rounded-xl bg-[#FAF7F5] border border-bloom-pink/30 flex items-start gap-2 text-[11px] text-bloom-grey">
                  <Info className="w-3.5 h-3.5 text-bloom-rose shrink-0 mt-0.5" />
                  <span>
                    Demo mode active: you can test with <code className="text-bloom-charcoal font-semibold">camille@bloom.com</code> or any registered email. The simulated dispatch will be verified.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                rightIcon={<Send className="w-4 h-4" />}
                className="w-full mt-2"
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setResultMessage(null);
                  setEmail('');
                }}
                className="w-full py-2.5 rounded-xl border border-bloom-pink/60 text-xs text-bloom-charcoal hover:bg-white transition-all font-medium"
              >
                Try Another Email Address
              </button>
            </div>
          )}

          {/* Back to Login link */}
          <div className="mt-8 pt-6 border-t border-bloom-pink/30 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-bloom-green hover:text-bloom-charcoal transition-colors hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};
