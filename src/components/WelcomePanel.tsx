import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, KeyRound, CheckCircle2 } from 'lucide-react';

export const WelcomePanel: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-12 h-full overflow-hidden">
      {/* Top Header Badge & Titles */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-brand-200 text-brand-700 text-xs font-semibold tracking-wider uppercase mb-6 shadow-2xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>ENTERPRISE IDENTITY & ACCESS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-slate-900 leading-[1.12] font-bold tracking-tight"
        >
          Secure access for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-sky-600">
            modern teams.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-md font-normal"
        >
          Experience enterprise-grade authentication with zero configuration friction. Built for speed, high reliability, and effortless scalability.
        </motion.p>
      </div>

      {/* Feature Highlights Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative my-8 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-brand-subtle space-y-4"
      >
        <div className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0 group-hover:scale-105 transition-transform">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-900">Zero-Trust Architecture</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              End-to-end token validation, cryptographic session handling, and instant revocations.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-900">Lightning Fast Performance</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Optimized for global edge networks, ensuring sub-50ms token verification worldwide.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-105 transition-transform">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-900">Seamless Cloud Integration</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Effortlessly switches between Interactive Demo Mode and Supabase with zero code changes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Compliance & Security Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative z-10 pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium"
      >
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
          SOC2 Type II
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
          GDPR Ready
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
          99.99% SLA
        </span>
      </motion.div>
    </div>
  );
};
