import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthCard } from '../components/AuthCard';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();

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
      setError('Please enter your work email address.');
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
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Reset Password
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
              Enter your registered work email to receive a secure password recovery link.
            </p>
          </div>

          {/* Result Alert / Confirmation */}
          {resultMessage && (
            <div
              className={`mb-6 p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
                isSuccess
                  ? 'bg-blue-50/90 border-brand-200 text-slate-800'
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-semibold text-brand-900">
                    {isSuccess ? 'Recovery Instructions Dispatched' : 'Notice'}
                  </p>
                  <p className="text-slate-600">{resultMessage}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium animate-in fade-in flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <FormInput
                label="Registered Work Email"
                id="reset-email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                rightIcon={<Send className="w-4 h-4" />}
                className="w-full mt-2"
              >
                Send Recovery Link
              </Button>
            </form>
          ) : (
            <div className="space-y-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                  setResultMessage(null);
                }}
                className="w-full text-xs"
              >
                Try Another Email
              </Button>
            </div>
          )}

          {/* Card Footer: Back to Login */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Sign In</span>
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};
