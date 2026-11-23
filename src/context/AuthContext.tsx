import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, AuthSession, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = 'bloom_demo_auth_session';
const DEMO_USERS_KEY = 'bloom_demo_registered_users';

// Pre-seeded demo user
const DEFAULT_DEMO_USER: User = {
  id: 'usr_demo_101',
  name: 'Camille Laurent',
  email: 'camille@bloom.com',
  createdAt: new Date().toISOString(),
  provider: 'demo',
};

const DEFAULT_DEMO_PASSWORD = 'Password123!';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isDemoMode = !isSupabaseConfigured;

  // Initialize demo registered users in localStorage if empty
  useEffect(() => {
    if (!localStorage.getItem(DEMO_USERS_KEY)) {
      localStorage.setItem(
        DEMO_USERS_KEY,
        JSON.stringify([
          {
            ...DEFAULT_DEMO_USER,
            password: DEFAULT_DEMO_PASSWORD,
          },
        ])
      );
    }
  }, []);

  // Restore session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;

          if (data.session) {
            const sbUser = data.session.user;
            const mappedUser: User = {
              id: sbUser.id,
              email: sbUser.email || '',
              name: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'Bloom Member',
              avatarUrl: sbUser.user_metadata?.avatar_url,
              createdAt: sbUser.created_at,
              provider: 'supabase',
            };
            setUser(mappedUser);
            setSession({
              user: mappedUser,
              token: data.session.access_token,
              expiresAt: data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 3600000,
            });
          }

          // Listen to auth changes
          const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            if (currentSession?.user) {
              const mappedUser: User = {
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                name: currentSession.user.user_metadata?.full_name || currentSession.user.email?.split('@')[0] || 'Bloom Member',
                avatarUrl: currentSession.user.user_metadata?.avatar_url,
                createdAt: currentSession.user.created_at,
                provider: 'supabase',
              };
              setUser(mappedUser);
              setSession({
                user: mappedUser,
                token: currentSession.access_token,
                expiresAt: currentSession.expires_at ? currentSession.expires_at * 1000 : Date.now() + 3600000,
              });
            } else {
              setUser(null);
              setSession(null);
            }
          });

          return () => {
            authListener.subscription.unsubscribe();
          };
        } else {
          // Demo mode: Check sessionStorage first, then localStorage
          const savedSession = sessionStorage.getItem(DEMO_STORAGE_KEY) || localStorage.getItem(DEMO_STORAGE_KEY);
          if (savedSession) {
            try {
              const parsed: AuthSession = JSON.parse(savedSession);
              // Validate expiration
              if (parsed.expiresAt > Date.now()) {
                setUser(parsed.user);
                setSession(parsed);
              } else {
                localStorage.removeItem(DEMO_STORAGE_KEY);
                sessionStorage.removeItem(DEMO_STORAGE_KEY);
              }
            } catch (err) {
              console.error('Failed to parse demo session', err);
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [isDemoMode]);

  // Login handler
  const login = async (email: string, password: string, rememberMe = true) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user && data.session) {
          const mappedUser: User = {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Bloom Member',
            avatarUrl: data.user.user_metadata?.avatar_url,
            createdAt: data.user.created_at,
            provider: 'supabase',
          };
          setUser(mappedUser);
          setSession({
            user: mappedUser,
            token: data.session.access_token,
            expiresAt: data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 86400000,
          });
          return { success: true };
        }
        return { success: false, error: 'Could not resolve user session.' };
      } else {
        // DEMO MODE LOGIN
        await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network delay

        const normalizedEmail = email.trim().toLowerCase();
        const storedUsersRaw = localStorage.getItem(DEMO_USERS_KEY);
        const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

        // Match against stored demo users or default demo user
        const matched = storedUsers.find((u: any) => u.email.toLowerCase() === normalizedEmail);

        if (!matched) {
          return {
            success: false,
            error: 'No account found with this email. Please check your credentials or create an account.',
          };
        }

        if (matched.password !== password) {
          return {
            success: false,
            error: 'Incorrect password. Try "Password123!" for the demo account.',
          };
        }

        const authenticatedUser: User = {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          avatarUrl: matched.avatarUrl,
          createdAt: matched.createdAt,
          provider: 'demo',
        };

        const newSession: AuthSession = {
          user: authenticatedUser,
          token: `demo_token_${Date.now()}`,
          expiresAt: Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000),
        };

        setUser(authenticatedUser);
        setSession(newSession);

        if (rememberMe) {
          localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newSession));
        } else {
          sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newSession));
        }

        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected error occurred during login.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Signup handler
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }

        // Supabase might require email confirmation
        if (data.user && !data.session) {
          return {
            success: true,
            requiresVerification: true,
          };
        }

        if (data.user && data.session) {
          const mappedUser: User = {
            id: data.user.id,
            email: data.user.email || '',
            name: name.trim(),
            createdAt: data.user.created_at,
            provider: 'supabase',
          };
          setUser(mappedUser);
          setSession({
            user: mappedUser,
            token: data.session.access_token,
            expiresAt: data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 86400000,
          });
          return { success: true };
        }

        return { success: true };
      } else {
        // DEMO MODE SIGNUP
        await new Promise((resolve) => setTimeout(resolve, 750));

        const normalizedEmail = email.trim().toLowerCase();
        const storedUsersRaw = localStorage.getItem(DEMO_USERS_KEY);
        const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

        if (storedUsers.some((u: any) => u.email.toLowerCase() === normalizedEmail)) {
          return {
            success: false,
            error: 'An account with this email address already exists.',
          };
        }

        const newUserRecord = {
          id: `usr_${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          password,
          createdAt: new Date().toISOString(),
          provider: 'demo',
        };

        storedUsers.push(newUserRecord);
        localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(storedUsers));

        const authenticatedUser: User = {
          id: newUserRecord.id,
          name: newUserRecord.name,
          email: newUserRecord.email,
          createdAt: newUserRecord.createdAt,
          provider: 'demo',
        };

        const newSession: AuthSession = {
          user: authenticatedUser,
          token: `demo_token_${Date.now()}`,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        };

        setUser(authenticatedUser);
        setSession(newSession);
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newSession));

        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected error occurred during signup.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem(DEMO_STORAGE_KEY);
      sessionStorage.removeItem(DEMO_STORAGE_KEY);
      setUser(null);
      setSession(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Password reset handler
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          return { success: false, message: '', error: error.message };
        }

        return {
          success: true,
          message: `A password reset link has been dispatched to ${normalizedEmail}. Please check your inbox.`,
        };
      } else {
        // DEMO MODE: Explicitly notify about simulated email
        await new Promise((resolve) => setTimeout(resolve, 800));

        const storedUsersRaw = localStorage.getItem(DEMO_USERS_KEY);
        const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const exists = storedUsers.some((u: any) => u.email.toLowerCase() === normalizedEmail);

        if (!exists && normalizedEmail !== DEFAULT_DEMO_USER.email) {
          return {
            success: false,
            message: '',
            error: 'No registered user matches this email address in demo storage.',
          };
        }

        return {
          success: true,
          message: `[Demo Mode] Password reset simulation successful. In production with Supabase, an official email with a secure token link would be sent to ${normalizedEmail}.`,
        };
      }
    } catch (err: any) {
      return { success: false, message: '', error: err.message || 'Failed to request password reset.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<Pick<User, 'name' | 'avatarUrl'>>) => {
    if (!user) return { success: false, error: 'No active session.' };

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.updateUser({
          data: {
            full_name: updates.name ?? user.name,
            avatar_url: updates.avatarUrl ?? user.avatarUrl,
          },
        });
        if (error) throw error;
      }

      const updatedUser: User = {
        ...user,
        ...updates,
      };

      setUser(updatedUser);

      if (session) {
        const updatedSession = { ...session, user: updatedUser };
        setSession(updatedSession);
        if (localStorage.getItem(DEMO_STORAGE_KEY)) {
          localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(updatedSession));
        } else if (sessionStorage.getItem(DEMO_STORAGE_KEY)) {
          sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(updatedSession));
        }
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update profile.' };
    }
  };

  const fillDemoCredentials = () => {
    return {
      email: DEFAULT_DEMO_USER.email,
      password: DEFAULT_DEMO_PASSWORD,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isDemoMode,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile,
        fillDemoCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
