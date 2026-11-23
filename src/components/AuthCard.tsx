import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  className = '',
  enableTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for high-end feel
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  // Rotate ranges: subtle tilt (+/- 5 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion || !enableTilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full flex items-center justify-center p-2 sm:p-4"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: prefersReducedMotion || !enableTilt ? 0 : rotateX,
          rotateY: prefersReducedMotion || !enableTilt ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-md sm:max-w-lg rounded-[28px] sm:rounded-[36px] bg-white/85 backdrop-blur-xl border border-bloom-pink/50 shadow-bloom-card transition-shadow duration-500 p-6 sm:p-10 ${
          isHovered ? 'shadow-2xl border-bloom-rose/70' : ''
        } ${className}`}
      >
        {/* Subtle decorative inner corner glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-bloom-pink/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-bloom-blue/40 blur-2xl pointer-events-none" />

        {/* Card Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
};
