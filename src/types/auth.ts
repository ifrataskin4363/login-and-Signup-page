export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  provider: 'supabase' | 'demo';
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

export interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string; error?: string }>;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'avatarUrl'>>) => Promise<{ success: boolean; error?: string }>;
  fillDemoCredentials: () => { email: string; password: string };
}
