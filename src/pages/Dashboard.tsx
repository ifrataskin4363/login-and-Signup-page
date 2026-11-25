import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import {
  User,
  Shield,
  HelpCircle,
  LogOut,
  Mail,
  Calendar,
  CheckCircle2,
  KeyRound,
  ExternalLink,
  Save,
  MessageSquare,
  ShieldAlert,
  Server,
  Terminal,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, isDemoMode, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'support'>('profile');
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [profileMessage, setProfileMessage] = useState('');
  const [securityMessage, setSecurityMessage] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Security password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const res = await updateProfile({ name: nameInput.trim() });
    if (res.success) {
      setProfileMessage('Account details updated successfully!');
      setTimeout(() => setProfileMessage(''), 3500);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setSecurityMessage('Please complete all password fields.');
      return;
    }
    if (newPassword.length < 8) {
      setSecurityMessage('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setSecurityMessage('New passwords do not match.');
      return;
    }

    setSecurityMessage('Password credentials updated successfully! (Simulated session update)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setSecurityMessage(''), 4000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-4 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Top Banner & User Welcome */}
      <div className="relative mb-5 sm:mb-8 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 bg-white/95 border border-slate-200/90 shadow-brand-card overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-brand-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-brand-700 to-sky-500 p-0.5 sm:p-1 shadow-md shrink-0">
              <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-white flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold text-brand-700">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-brand-50 text-brand-700 text-[11px] sm:text-xs font-semibold mb-1 sm:mb-2 shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>Verified Cloud Identity</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back, {user?.name || 'Administrator'}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                Your enterprise account settings and authentication policies are active.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-end">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(true)}
              leftIcon={<LogOut className="w-4 h-4 text-slate-400" />}
              className="w-full sm:w-auto text-xs sm:text-sm !py-2 sm:!py-2.5"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Demo status alert inside dashboard */}
        {isDemoMode && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-600">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="font-semibold text-amber-800">Demonstration Session:</span>
              <span>Running in interactive client simulation mode.</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              Set Supabase keys in <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-600 font-mono">.env</code> or Vercel settings for production.
            </span>
          </div>
        )}
      </div>

      {/* Mobile Tab Segmented Control (< lg) */}
      <div className="lg:hidden mb-4 grid grid-cols-3 gap-1.5 p-1.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col xs:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-brand-50 text-brand-700 shadow-2xs border border-brand-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span className="truncate">Account</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex flex-col xs:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'security'
              ? 'bg-brand-50 text-brand-700 shadow-2xs border border-brand-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span className="truncate">Security</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`flex flex-col xs:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'support'
              ? 'bg-brand-50 text-brand-700 shadow-2xs border border-brand-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span className="truncate">Developer</span>
        </button>
      </div>

      {/* Main Grid: Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        {/* Navigation Sidebar — Visible on Desktop (lg+) */}
        <div className="hidden lg:block lg:col-span-4 space-y-4">
          {/* Quick Profile Summary Card */}
          <div className="p-6 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-700">
              Session Profile
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-800">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium truncate">{user?.name}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-800">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Registered {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <Server className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="capitalize">{user?.provider} Mode Authenticated</span>
              </div>
            </div>
          </div>

          {/* Navigation Tab buttons (Desktop) */}
          <div className="p-2 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-brand-50 text-brand-700 shadow-2xs border border-brand-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Account Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'security'
                  ? 'bg-brand-50 text-brand-700 shadow-2xs border border-brand-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Security & Password</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'support'
                  ? 'bg-brand-50 text-brand-700 shadow-2xs border border-brand-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Developer & Deployment</span>
            </button>
          </div>
        </div>

        {/* Tab Detail Pane */}
        <div className="col-span-1 lg:col-span-8">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white/95 border border-slate-200/90 shadow-brand-subtle">
            {/* Tab 1: Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Account Information
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage your personal profile and display parameters.
                  </p>
                </div>

                {profileMessage && (
                  <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50 border border-brand-200 text-xs text-brand-700 font-medium flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{profileMessage}</span>
                  </div>
                )}

                <form onSubmit={handleUpdateName} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-slate-700">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full rounded-xl glass-input py-3 sm:py-2.5 px-3.5 text-base sm:text-sm text-slate-900"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-slate-700">
                      Primary Email (Read-only)
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 sm:py-2.5 px-3.5 text-base sm:text-sm text-slate-400 cursor-not-allowed"
                    />
                    <p className="text-[11px] text-slate-400">
                      Email address is bound to your authentication provider account.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<Save className="w-4 h-4" />}
                    className="w-full sm:w-auto text-xs"
                  >
                    Save Changes
                  </Button>
                </form>
              </div>
            )}

            {/* Tab 2: Security */}
            {activeTab === 'security' && (
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Security & Credentials
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Ensure your access remains protected with updated credentials.
                  </p>
                </div>

                {securityMessage && (
                  <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50 border border-brand-200 text-xs text-brand-700 font-medium flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{securityMessage}</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-slate-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-xl glass-input py-3 sm:py-2.5 px-3.5 text-base sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-slate-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl glass-input py-3 sm:py-2.5 px-3.5 text-base sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-slate-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full rounded-xl glass-input py-3 sm:py-2.5 px-3.5 text-base sm:text-sm text-slate-900"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<KeyRound className="w-4 h-4" />}
                    className="w-full sm:w-auto text-xs"
                  >
                    Update Password
                  </Button>
                </form>

                <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
                  <ShieldAlert className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Session tokens are automatically verified and rotated. Sign out when utilizing untrusted or shared terminal stations.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Developer & Deployment Support */}
            {activeTab === 'support' && (
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Deployment & Developer Guide
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Everything you need to deploy AURA to Vercel and plug into Supabase.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-brand-600 shrink-0" />
                      <h4 className="text-xs font-semibold text-slate-900">
                        Vercel Deployment Checklist
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      This project includes a pre-configured <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-brand-700 font-mono">vercel.json</code> rewrite file. All React Router endpoints (<code className="bg-white px-1 py-0.5 rounded text-brand-700 font-mono">/login</code>, <code className="bg-white px-1 py-0.5 rounded text-brand-700 font-mono">/signup</code>, <code className="bg-white px-1 py-0.5 rounded text-brand-700 font-mono">/dashboard</code>) work seamlessly on direct page refreshes.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-brand-600 shrink-0" />
                      <h4 className="text-xs font-semibold text-slate-900">
                        Connecting Supabase in Production
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In your Vercel project settings under <strong>Environment Variables</strong>, add:
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-[10px] sm:text-[11px] space-y-1 overflow-x-auto">
                      <div>VITE_SUPABASE_URL=https://your-project.supabase.co</div>
                      <div>VITE_SUPABASE_ANON_KEY=your-anon-key-here</div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Without these variables, AURA runs in high-fidelity Demo Mode out of the box.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand-50 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open Vercel Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sign Out of AURA?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your local session will be cleared. You can authenticate again at any time.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-1/2 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors shadow-xs"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
