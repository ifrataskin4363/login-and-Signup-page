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
  const [isTouchOrSmall, setIsTouchOrSmall] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: none)').matches || window.innerWidth < 768;
    }
    return false;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverQuery = window.matchMedia('(hover: none)');

    const updateCapabilities = () => {
      setPrefersReducedMotion(motionQuery.matches);
      setIsTouchOrSmall(hoverQuery.matches || window.innerWidth < 768);
    };

    motionQuery.addEventListener('change', updateCapabilities);
    hoverQuery.addEventListener('change', updateCapabilities);
    window.addEventListener('resize', updateCapabilities);

    return () => {
      motionQuery.removeEventListener('change', updateCapabilities);
      hoverQuery.removeEventListener('change', updateCapabilities);
      window.removeEventListener('resize', updateCapabilities);
    };
  }, []);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for high-end feel
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  // Rotate ranges: subtle tilt (+/- 4 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const shouldTilt = enableTilt && !prefersReducedMotion && !isTouchOrSmall;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shouldTilt) return;
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
      className="w-full flex items-center justify-center px-1 sm:px-4"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isTouchOrSmall && setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldTilt ? rotateX : 0,
          rotateY: shouldTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-md sm:max-w-lg rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-brand-card transition-all duration-300 p-5 sm:p-8 md:p-10 ${
          isHovered ? 'shadow-2xl border-brand-300/80' : ''
        } ${className}`}
      >
        {/* Subtle decorative internal corner glows */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-400/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-sky-400/10 blur-2xl pointer-events-none" />

        {/* Card Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
};

