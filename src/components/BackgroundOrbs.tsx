import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Light modern gradient mesh base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-[#F0F6FF] to-[#EBF3FE] opacity-95" />

      {/* Primary Luminous Royal Blue Orb (Top Right) */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-400/25 via-blue-500/15 to-transparent blur-3xl"
      />

      {/* Cyan & Sky Blue Ambient Orb (Bottom Left) */}
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-32 -left-28 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-sky-400/20 via-brand-300/15 to-transparent blur-3xl"
      />

      {/* Soft Indigo / Cobalt Accent (Center Right) */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 right-12 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/15 via-blue-400/10 to-transparent blur-3xl"
      />

      {/* Subtle crisp modern grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1D4ED8 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
