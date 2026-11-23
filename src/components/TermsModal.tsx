import React from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bloom-charcoal/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-bloom-pink/50 relative max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-bloom-pink/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-bloom-blush flex items-center justify-center text-bloom-green">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-bloom-charcoal">
                Terms & Privacy Guidelines
              </h3>
              <p className="text-[11px] text-bloom-grey">Bloom Authentication Experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-bloom-grey hover:text-bloom-charcoal hover:bg-bloom-blush/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs text-bloom-charcoal/80 leading-relaxed pr-1 custom-scroll">
          <section className="space-y-1.5">
            <h4 className="font-semibold text-bloom-charcoal text-sm">1. Acceptance of Terms</h4>
            <p>
              By accessing Bloom, you agree to treat your credentials responsibly and adhere to the guidelines established within this authentication environment.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-bloom-charcoal text-sm">2. Security & Credentials</h4>
            <p>
              Your security is our core priority. In production mode, passwords undergo cryptographic hashing and are never stored in plain text. In demonstration mode, sessions persist within client storage for showcase purposes.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-bloom-charcoal text-sm">3. Respectful Usage</h4>
            <p>
              Bloom is built to deliver a peaceful, distraction-free environment. You agree to utilize this system without introducing harmful automated requests or fraudulent credentials.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-bloom-charcoal text-sm">4. Data Privacy</h4>
            <p>
              We honor your personal privacy. We do not sell or market your personal identifiers to any third parties.
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-bloom-pink/20 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-bloom-grey hover:text-bloom-charcoal hover:bg-bloom-blush/50 transition-colors"
          >
            Close
          </button>
          {onAccept && (
            <button
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-bloom-green text-white text-xs font-semibold hover:bg-bloom-green/90 transition-all shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Agree & Continue</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
