import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import {
  User,
  Shield,
  HelpCircle,
  LogOut,
  Flower2,
  Mail,
  Calendar,
  CheckCircle2,
  Sparkles,
  KeyRound,
  ExternalLink,
  Save,
  MessageSquare,
  ShieldAlert,
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
      setProfileMessage('Profile information saved successfully!');
      setTimeout(() => setProfileMessage(''), 3500);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setSecurityMessage('Please fill all password fields.');
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

    setSecurityMessage('Password changed successfully! (Simulated session update)');
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
    <div className="min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Top Banner & User Welcome */}
      <div className="relative mb-8 rounded-3xl p-6 sm:p-10 glass-panel shadow-bloom-card overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-bloom-pink/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-bloom-blue/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-bloom-rose to-bloom-pink p-1 shadow-md shrink-0">
              <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold text-bloom-green">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bloom-blush text-bloom-green text-xs font-semibold mb-2 shadow-2xs">
                <Flower2 className="w-3.5 h-3.5" />
                <span>Bloom Member Space</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-bloom-charcoal">
                Welcome, {user?.name || 'Friend'}!
              </h1>
              <p className="text-xs sm:text-sm text-bloom-grey mt-1">
                Your personal journey and account settings are ready.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(true)}
              leftIcon={<LogOut className="w-4 h-4 text-bloom-grey" />}
              className="text-xs sm:text-sm !py-2.5"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Demo status alert inside dashboard */}
        {isDemoMode && (
          <div className="mt-6 pt-4 border-t border-bloom-pink/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-bloom-charcoal/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-semibold text-amber-700">Demonstration Session Active:</span>
              <span>This session is running in interactive frontend demo mode.</span>
            </div>
            <span className="text-[11px] text-bloom-grey">
              Configure Supabase keys in <code className="bg-white/80 px-1 rounded">.env</code> for production authentication.
            </span>
          </div>
        )}
      </div>

      {/* Main Grid: Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Profile Summary Card */}
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-bloom-pink/50 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-bloom-green">
              Account Overview
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-bloom-charcoal">
                <User className="w-4 h-4 text-bloom-grey shrink-0" />
                <span className="font-medium truncate">{user?.name}</span>
              </div>

              <div className="flex items-center gap-3 text-bloom-charcoal">
                <Mail className="w-4 h-4 text-bloom-grey shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>

              <div className="flex items-center gap-3 text-bloom-grey">
                <Calendar className="w-4 h-4 text-bloom-grey shrink-0" />
                <span>
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-bloom-grey">
                <Sparkles className="w-4 h-4 text-bloom-rose shrink-0" />
                <span className="capitalize">{user?.provider} Mode Authenticated</span>
              </div>
            </div>
          </div>

          {/* Navigation Tab buttons */}
          <div className="p-2 rounded-3xl bg-white/70 backdrop-blur-md border border-bloom-pink/40 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-bloom-rose to-bloom-pink text-bloom-charcoal shadow-xs'
                  : 'text-bloom-charcoal/70 hover:bg-bloom-blush/60 hover:text-bloom-charcoal'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Account Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-bloom-rose to-bloom-pink text-bloom-charcoal shadow-xs'
                  : 'text-bloom-charcoal/70 hover:bg-bloom-blush/60 hover:text-bloom-charcoal'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security & Password</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === 'support'
                  ? 'bg-gradient-to-r from-bloom-rose to-bloom-pink text-bloom-charcoal shadow-xs'
                  : 'text-bloom-charcoal/70 hover:bg-bloom-blush/60 hover:text-bloom-charcoal'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </button>
          </div>
        </div>

        {/* Tab Detail Pane */}
        <div className="lg:col-span-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-bloom-pink/50 shadow-bloom-card">
            {/* Tab 1: Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-bloom-charcoal">
                    Account Settings
                  </h2>
                  <p className="text-xs text-bloom-grey mt-1">
                    Manage your personal details and presentation within Bloom.
                  </p>
                </div>

                {profileMessage && (
                  <div className="p-3.5 rounded-2xl bg-bloom-blush border border-bloom-rose/40 text-xs text-bloom-green font-medium flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{profileMessage}</span>
                  </div>
                )}

                <form onSubmit={handleUpdateName} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-bloom-charcoal">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full rounded-2xl glass-input py-3 px-4 text-sm text-bloom-charcoal"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-bloom-charcoal">
                      Email Address (Read-only)
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full rounded-2xl bg-gray-100/70 border border-bloom-pink/30 py-3 px-4 text-sm text-bloom-grey cursor-not-allowed"
                    />
                    <p className="text-[11px] text-bloom-grey">
                      Primary email address is bound to your authentication provider.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<Save className="w-4 h-4" />}
                    className="!py-2.5 text-xs"
                  >
                    Save Changes
                  </Button>
                </form>
              </div>
            )}

            {/* Tab 2: Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-bloom-charcoal">
                    Security Credentials
                  </h2>
                  <p className="text-xs text-bloom-grey mt-1">
                    Keep your account secure by updating your secret password.
                  </p>
                </div>

                {securityMessage && (
                  <div className="p-3.5 rounded-2xl bg-bloom-blush border border-bloom-rose/40 text-xs text-bloom-green font-medium flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{securityMessage}</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-bloom-charcoal">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-2xl glass-input py-3 px-4 text-sm text-bloom-charcoal"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-bloom-charcoal">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-2xl glass-input py-3 px-4 text-sm text-bloom-charcoal"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-semibold text-bloom-charcoal">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full rounded-2xl glass-input py-3 px-4 text-sm text-bloom-charcoal"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<KeyRound className="w-4 h-4" />}
                    className="!py-2.5 text-xs"
                  >
                    Update Password
                  </Button>
                </form>

                <div className="pt-4 border-t border-bloom-pink/30 flex items-start gap-3 text-xs text-bloom-grey">
                  <ShieldAlert className="w-4 h-4 text-bloom-rose shrink-0 mt-0.5" />
                  <p>
                    Session tokens are verified on every state transaction. Remember to log out when utilizing shared public workstations.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Help & Support */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-bloom-charcoal">
                    Help & Support
                  </h2>
                  <p className="text-xs text-bloom-grey mt-1">
                    Resources, common answers, and portfolio support contacts.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-bloom-pink/30 space-y-1">
                    <h4 className="text-xs font-semibold text-bloom-charcoal">
                      How does the demo mode authentication work?
                    </h4>
                    <p className="text-xs text-bloom-grey leading-relaxed">
                      Bloom includes a fully functional simulated authentication system. You can sign up new accounts, test password strength validation, and trigger simulated password reset messages without setting up a backend database.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-bloom-pink/30 space-y-1">
                    <h4 className="text-xs font-semibold text-bloom-charcoal">
                      How can I plug in Supabase?
                    </h4>
                    <p className="text-xs text-bloom-grey leading-relaxed">
                      Simply create a free project at supabase.com and add <code className="bg-white px-1 py-0.5 rounded border border-bloom-pink/30">VITE_SUPABASE_URL</code> and <code className="bg-white px-1 py-0.5 rounded border border-bloom-pink/30">VITE_SUPABASE_ANON_KEY</code> to your <code className="bg-white px-1 py-0.5 rounded border border-bloom-pink/30">.env</code> file. Bloom detects them automatically.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-bloom-pink/30 space-y-1">
                    <h4 className="text-xs font-semibold text-bloom-charcoal">
                      Need custom portfolio additions?
                    </h4>
                    <p className="text-xs text-bloom-grey leading-relaxed">
                      Bloom is modularly architected with reusable UI components, Tailwind design tokens, and clean TypeScript interfaces ready for any project extension.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-bloom-blush text-bloom-green text-xs font-semibold hover:bg-bloom-pink/40 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>View Repository Guide</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bloom-charcoal/30 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-bloom-pink/50 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-bloom-blush text-bloom-rose flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-bloom-charcoal">
                Sign Out of Bloom?
              </h3>
              <p className="text-xs text-bloom-grey mt-1">
                You can easily sign back in at any time to resume your journey.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-1/2 py-2.5 rounded-xl border border-bloom-pink/60 text-xs font-medium text-bloom-charcoal hover:bg-bloom-blush/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="w-1/2 py-2.5 rounded-xl bg-bloom-charcoal text-white text-xs font-semibold hover:bg-black transition-colors"
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
