import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { WelcomePanel } from '../components/WelcomePanel';
import { AuthCard } from '../components/AuthCard';
import { FormInput } from '../components/FormInput';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';
import { DemoBanner } from '../components/DemoBanner';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle demo autofill
  const handleFillDemo = (credentials: { email: string; password: string }) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
    setErrors({});
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrors({});

    if (!validate()) return;

    setIsLoading(true);
    const result = await login(email, password, rememberMe);

    if (result.success) {
      setSuccessMessage('Welcome back! Authenticating session...');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8'],
      });

      const redirectPath = (location.state as any)?.from?.pathname || '/dashboard';
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 600);
    } else {
      setErrors({ general: result.error || 'Authentication failed. Please verify credentials.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
        {/* Left Column: Enterprise Value Proposition (Desktop & Tablet) */}
        <div className="lg:col-span-6 xl:col-span-7">
          <WelcomePanel />
        </div>

        {/* Right Column: Premium Auth Card */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center">
          <AuthCard>
            {/* Demo Helper Banner */}
            <DemoBanner onFillDemo={handleFillDemo} />

            {/* Card Header */}
            <div className="text-center sm:text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Sign in to manage your identity, sessions, and cloud access.
              </p>
            </div>

            {/* Error / Success Banners */}
            {errors.general && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium animate-in fade-in">
                {errors.general}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-brand-200 text-xs text-brand-700 font-medium flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <FormInput
                label="Work Email"
                id="login-email"
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
                id="login-password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                rightAction={
                  <Link
                    to="/forgot-password"
                    className="text-brand-600 hover:text-brand-700 font-medium text-xs hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                }
                required
              />

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-600 select-none group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 focus:ring-offset-0 transition-colors accent-brand-600 shrink-0"
                  />
                  <span className="group-hover:text-slate-900">Keep me signed in for 7 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full mt-2"
              >
                Sign In
              </Button>
            </form>

            {/* Card Footer: Switch to Signup */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Don't have an enterprise account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
};
