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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Terms of Service & Privacy
              </h3>
              <p className="text-[11px] text-slate-500">AURA Identity Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs text-slate-600 leading-relaxed pr-1 custom-scroll">
          <section className="space-y-1.5">
            <h4 className="font-semibold text-slate-900 text-sm">1. Terms of Access</h4>
            <p>
              By accessing and utilizing the AURA Identity Platform, you agree to comply with our security protocols, access policies, and operational integrity standards.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-slate-900 text-sm">2. Security & Token Integrity</h4>
            <p>
              All session tokens and credentials must be guarded against unauthorized redistribution. In production mode, passwords undergo cryptographic hashing and are never transmitted in plaintext.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-slate-900 text-sm">3. Acceptable Use Policy</h4>
            <p>
              Automated credential stuffing, penetration testing without prior authorization, or tampering with session storage is strictly prohibited.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-slate-900 text-sm">4. Data Privacy & Compliance</h4>
            <p>
              We prioritize data privacy with strict adherence to industry regulations including GDPR and SOC2 standards. We do not sell or monetize personal identifiers.
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Dismiss
          </button>
          {onAccept && (
            <button
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs shadow-xs hover:shadow transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Terms</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
