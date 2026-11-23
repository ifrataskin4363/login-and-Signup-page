import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Flower2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-bloom-blush border border-bloom-pink/60 flex items-center justify-center animate-pulse">
            <Flower2 className="w-8 h-8 text-bloom-green animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="absolute inset-0 rounded-3xl border-2 border-bloom-rose animate-ping opacity-25" />
        </div>
        <p className="mt-4 font-serif text-sm tracking-widest text-bloom-charcoal font-medium">
          PREPARING YOUR SPACE...
        </p>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated visitors to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
