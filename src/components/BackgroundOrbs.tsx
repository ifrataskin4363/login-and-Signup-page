import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft gradient base glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFF5F8] via-[#FDF9FB] to-[#F1F7FB] opacity-90" />

      {/* Floating sphere 1 - Rose Pink (Top Right) */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#F4C7D5]/70 to-[#EAA8BE]/40 blur-3xl"
      />

      {/* Floating sphere 2 - Light Blue (Bottom Left) */}
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 35, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-24 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#DCEAF5]/80 to-[#FCE8EF]/50 blur-3xl"
      />

      {/* Floating sphere 3 - Sage / Botanical Green subtle accent (Center Right) */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-[#A8BEA0]/25 to-[#DCEAF5]/35 blur-3xl"
      />

      {/* Floating sphere 4 - Soft Blush (Center Left) */}
      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-[#FCE8EF]/70 to-[#F4C7D5]/30 blur-2xl"
      />

      {/* Subtle organic grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#496B4A 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />
    </div>
  );
};
