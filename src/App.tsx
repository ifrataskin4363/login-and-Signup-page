import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col justify-center"
      >
        <Routes location={location}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col justify-between selection:bg-bloom-pink/60 selection:text-bloom-charcoal">
          {/* Decorative ambient background spheres & glow */}
          <BackgroundOrbs />

          {/* Navigation Bar */}
          <Navbar />

          {/* Page Routing */}
          <main className="relative z-10 flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>

          {/* Persistent Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
