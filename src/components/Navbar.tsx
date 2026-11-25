import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, LogOut, LayoutDashboard, Info, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isDemoMode, logout } = useAuth();
  const navigate = useNavigate();
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header className="relative z-30 w-full px-6 py-4 transition-all border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to={user ? '/dashboard' : '/login'}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="AURA Identity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-500 p-0.5 shadow-brand-subtle group-hover:shadow-brand-button transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-brand-600 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-brand-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
                AURA
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-brand-600 mt-1">
                Identity Platform
              </span>
            </div>
          </Link>

          {/* Right Navigation / Status badge */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Status indicator pill */}
            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200/90 transition-all bg-white hover:border-brand-300 hover:bg-brand-50/50 shadow-2xs"
              title="Click to view environment details"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isDemoMode ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
                }`}
              />
              <span className="text-slate-700 hidden sm:inline">
                {isDemoMode ? 'Demo Mode' : 'Production Active'}
              </span>
              <span className="text-slate-700 sm:hidden">
                {isDemoMode ? 'Demo' : 'Live'}
              </span>
              <Info className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 p-[1.5px] shadow-2xs">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center font-bold text-xs text-brand-700">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-xs hover:shadow transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* System Status & Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Environment Status</h3>
                  <p className="text-[11px] text-slate-500">AURA Authentication Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isDemoMode ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                  />
                  Current Status: {isDemoMode ? 'Interactive Demo Mode' : 'Connected to Supabase'}
                </span>
                <p className="text-[11px] text-slate-500">
                  {isDemoMode
                    ? 'Ready out of the box with simulated client sessions and pre-loaded test accounts.'
                    : 'Real-time production connection active. Credentials securely stored and hashed.'}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-slate-800">Production Supabase Credentials:</p>
                <p className="text-[11px] text-slate-500">
                  To switch to live production backend, define <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-600 font-mono">VITE_SUPABASE_URL</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-600 font-mono">VITE_SUPABASE_ANON_KEY</code> in your environment variables.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
