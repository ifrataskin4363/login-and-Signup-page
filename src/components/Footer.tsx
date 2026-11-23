import React from 'react';
import { Flower2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full py-6 px-6 text-center text-xs text-bloom-grey border-t border-bloom-pink/20 mt-auto bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Flower2 className="w-4 h-4 text-bloom-green" />
          <span className="font-serif font-semibold text-bloom-charcoal">BLOOM</span>
          <span>— Your space. Your journey. Your beginning.</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-bloom-rose fill-bloom-rose" /> for modern portfolios
          </span>
          <span className="text-bloom-pink">•</span>
          <span>© {new Date().getFullYear()} Bloom Authentication</span>
        </div>
      </div>
    </footer>
  );
};
