import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Flower2, LogOut, LayoutDashboard, ShieldCheck, Info, Sparkles } from 'lucide-react';

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
      <header className="relative z-30 w-full px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to={user ? '/dashboard' : '/login'}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Bloom Homepage"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-bloom-pink via-bloom-rose to-bloom-blush p-0.5 shadow-sm group-hover:shadow-bloom-glow transition-all duration-300">
              <div className="w-full h-full bg-white/90 backdrop-blur rounded-[14px] flex items-center justify-center text-bloom-green group-hover:scale-105 transition-transform">
                <Flower2 className="w-5 h-5 text-bloom-green" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wider font-semibold text-bloom-charcoal">
                BLOOM
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-bloom-green">
                Authentication
              </span>
            </div>
          </Link>

          {/* Right Navigation / Status badge */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Status indicator pill */}
            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all glass-panel-subtle hover:border-bloom-rose/60 hover:bg-white shadow-sm"
              title="Click to view authentication status details"
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  isDemoMode ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
              />
              <span className="text-bloom-charcoal/80 hidden sm:inline">
                {isDemoMode ? 'Interactive Demo Mode' : 'Supabase Active'}
              </span>
              <span className="text-bloom-charcoal/80 sm:hidden">
                {isDemoMode ? 'Demo' : 'Live'}
              </span>
              <Info className="w-3.5 h-3.5 text-bloom-grey ml-0.5" />
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-bloom-blush text-bloom-green hover:bg-bloom-pink/40 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-bloom-rose to-bloom-pink p-[1.5px] shadow-sm">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif text-xs font-bold text-bloom-green">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-bloom-grey hover:text-bloom-charcoal hover:bg-bloom-blush/60 rounded-full transition-colors"
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
                  className="px-3.5 py-1.5 rounded-full text-bloom-charcoal/80 hover:text-bloom-charcoal hover:bg-white/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-bloom-rose to-bloom-pink text-bloom-charcoal font-semibold shadow-sm hover:shadow-bloom-button transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Information Modal regarding Supabase vs Demo */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bloom-charcoal/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-bloom-pink/40 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-bloom-blush flex items-center justify-center text-bloom-green">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-bloom-charcoal">
                  Authentication Engine
                </h3>
                <p className="text-xs text-bloom-grey">
                  Current configuration: {isDemoMode ? 'Interactive Demo Mode' : 'Supabase Production'}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-bloom-charcoal/80 mb-6 bg-[#FAF7F5] p-4 rounded-2xl border border-bloom-pink/20">
              {isDemoMode ? (
                <>
                  <p className="font-medium text-bloom-green flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Demo Mode is fully interactive
                  </p>
                  <p>
                    All form validations, state flows, protected routes, password strength meters, and simulated email password resets operate completely out-of-the-box with browser persistence.
                  </p>
                  <p className="text-[11px] text-bloom-grey pt-1">
                    To connect live production Supabase authentication, configure <code className="bg-white px-1 py-0.5 rounded border border-bloom-pink/30">VITE_SUPABASE_URL</code> and <code className="bg-white px-1 py-0.5 rounded border border-bloom-pink/30">VITE_SUPABASE_ANON_KEY</code> in your environment file.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Supabase backend is connected
                  </p>
                  <p>
                    User authentication, session tokens, and password reset flows are processed securely via your live Supabase project instance.
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setShowConfigModal(false)}
              className="w-full py-2.5 rounded-xl bg-bloom-charcoal text-white font-medium text-xs hover:bg-black transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
};
