import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, HeartHandshake, Leaf, Flower } from 'lucide-react';

export const WelcomePanel: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-between p-8 lg:p-12 h-full overflow-hidden">
      {/* Decorative botanical backdrop shapes */}
      <div className="absolute top-10 -left-12 w-64 h-64 rounded-full bg-bloom-pink/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-72 h-72 rounded-full bg-bloom-blue/40 blur-3xl pointer-events-none" />

      {/* Top Header Badge & Titles */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur border border-bloom-pink/50 text-bloom-green text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm"
        >
          <Leaf className="w-3.5 h-3.5 text-bloom-green animate-pulse" />
          <span>WELCOME TO BLOOM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-bloom-charcoal leading-[1.15] font-semibold tracking-tight"
        >
          A fresh start <br />
          <span className="italic font-normal text-bloom-green relative">
            begins here.
            <svg
              className="absolute -bottom-2 left-0 w-full text-bloom-rose/40"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5C50 1.5 150 1.5 199 5.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-bloom-charcoal/75 text-base sm:text-lg leading-relaxed max-w-md font-normal"
        >
          Create your account and discover a simple, beautiful way to get started. Your journey begins with just a few details.
        </motion.p>
      </div>

      {/* Decorative Botanical Art Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative my-8 p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm overflow-hidden"
      >
        <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-15 text-bloom-green">
          <Flower className="w-full h-full" />
        </div>

        {/* Feature Highlights */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-2xl bg-bloom-blush flex items-center justify-center text-bloom-green group-hover:scale-110 transition-transform shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-bloom-charcoal">Simple & Secure</h2>
              <p className="text-xs text-bloom-grey mt-0.5">
                Modern cryptographic standards and session management keep your journey protected.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-2xl bg-bloom-blue/70 flex items-center justify-center text-bloom-charcoal group-hover:scale-110 transition-transform shadow-xs">
              <Sparkles className="w-5 h-5 text-bloom-green" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-bloom-charcoal">Beautiful Experience</h2>
              <p className="text-xs text-bloom-grey mt-0.5">
                Thoughtfully crafted micro-interactions, soft pastel palettes, and gentle glassmorphic depth.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-2xl bg-bloom-pink/60 flex items-center justify-center text-bloom-charcoal group-hover:scale-110 transition-transform shadow-xs">
              <HeartHandshake className="w-5 h-5 text-bloom-green" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-bloom-charcoal">Your Personal Space</h2>
              <p className="text-xs text-bloom-grey mt-0.5">
                A tailored space designed to feel calm, inspiring, and completely yours from day one.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Quote / Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 pt-2 flex items-center gap-3 text-xs text-bloom-green font-medium"
      >
        <span className="w-8 h-px bg-bloom-sage" />
        <span className="italic font-serif text-sm tracking-wide text-bloom-charcoal/80">
          "Your space. Your journey. Your beginning."
        </span>
      </motion.div>
    </div>
  );
};
