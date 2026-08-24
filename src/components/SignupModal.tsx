import React, { useState } from 'react';
import { KumoLogo } from './KumoLogo';
import {
  initiateBankLink,
  signupTenant,
  signupLandlord,
  BANK_LINK_PROVIDER,
  BANK_LINK_REDIRECT_URI,
} from '../config.ts';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'tenant' | 'business' | 'login';
}

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [propertyCount, setPropertyCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTenantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signupTenant({ email, phone });
      const bankLinkRes = await initiateBankLink();
      setSuccessMessage(
        `Account created. Redirecting to ${BANK_LINK_PROVIDER} verification portal (${bankLinkRes.redirectUrl})...`
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signupLandlord({ name, email, propertyCount });
      setSuccessMessage(
        'Thank you for listing your properties. Our team will be in touch shortly.'
      );
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setSuccessMessage('Magic login link sent to your email address.');
    setIsLoading(false);
  };

  return (
    <div
      id="signup-modal-backdrop"
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="signup-modal-container"
        className="w-full max-w-md bg-[#FFFFFF] border border-[#000000]/15 rounded-[32px] p-6 md:p-8 relative text-[#000000] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-button"
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl leading-none text-[#000000]/50 hover:text-[#000000] cursor-pointer"
        >
          ×
        </button>

        {/* Logo Badge */}
        <div className="w-10 h-10 rounded-full bg-[#AFE7FC] border border-[#000000]/10 flex items-center justify-center mb-4 text-[#000000]">
          <KumoLogo className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="display text-[1.8rem] text-[#000000] mb-2 leading-tight">
          {mode === 'tenant'
            ? 'Start building your record'
            : mode === 'business'
            ? 'Join the Kumo landlord network'
            : 'Log in to your record'}
        </h3>

        <p className="text-[0.85rem] text-[#000000]/70 leading-relaxed mb-6">
          {mode === 'tenant'
            ? ''
            : mode === 'business'
            ? 'Give your tenants the opportunity to report without any admin on your side.'
            : 'Access your verified payment history and monthly reporting status.'}
        </p>

        {successMessage ? (
          <div className="bg-[#AFE7FC]/30 border border-[#AFE7FC] rounded-[20px] p-5 text-center">
            <p className="text-[0.85rem] font-bold text-[#000000] leading-relaxed mb-4">
              {successMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccessMessage(null);
                onClose();
              }}
              className="bg-[#000000] text-[#FFFFFF] px-6 py-2.5 text-[0.85rem] font-bold rounded-full cursor-pointer hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : mode === 'tenant' ? (
          <form onSubmit={handleTenantSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.72rem] font-bold text-[#000000]/80 mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenant@example.co.za"
                className="w-full bg-[#FFFFFF] border border-[#000000]/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:border-[#E06336] focus:ring-1 focus:ring-[#E06336]"
              />
            </div>

            <div>
              <label className="block text-[0.72rem] font-bold text-[#000000]/80 mb-1.5 uppercase tracking-wide">
                Mobile phone number (South Africa)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="082 123 4567"
                className="w-full bg-[#FFFFFF] border border-[#000000]/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:border-[#E06336] focus:ring-1 focus:ring-[#E06336]"
              />
            </div>

            <div className="text-[0.72rem] text-[#000000]/60 leading-normal">
              By continuing, you will be redirected to our verified open-banking partner ({BANK_LINK_PROVIDER}) via {BANK_LINK_REDIRECT_URI}. Kumo does not store banking passwords.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E06336] hover:bg-[#c95126] text-[#FFFFFF] py-3.5 px-6 text-[0.95rem] font-bold rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'Connecting to partner...' : 'Continue to bank link'}
            </button>
          </form>
        ) : mode === 'business' ? (
          <form onSubmit={handleBusinessSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.72rem] font-bold text-[#000000]/80 mb-1.5 uppercase tracking-wide">
                Contact name or company
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Properties (Pty) Ltd"
                className="w-full bg-[#FFFFFF] border border-[#000000]/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:border-[#E06336] focus:ring-1 focus:ring-[#E06336]"
              />
            </div>

            <div>
              <label className="block text-[0.72rem] font-bold text-[#000000]/80 mb-1.5 uppercase tracking-wide">
                Business email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="landlord@example.co.za"
                className="w-full bg-[#FFFFFF] border border-[#000000]/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:border-[#E06336] focus:ring-1 focus:ring-[#E06336]"
              />
            </div>

            <div>
              <label className="block text-[0.72rem] font-bold text-[#000000]/80 mb-1.5 uppercase tracking-wide">
                Number of rental units (optional)
              </label>
              <input
                type="text"
                value={propertyCount}
                onChange={(e) => setPropertyCount(e.target.value)}
                placeholder="e.g. 12 units"
                className="w-full bg-[#FFFFFF] border border-[#000000]/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:border-[#E06336] focus:ring-1 focus:ring-[#E06336]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E06336] hover:bg-[#c95126] text-[#FFFFFF] py-3.5 px-6 text-[0.95rem] font-bold rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'Submitting...' : 'List properties for free'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.72rem] font-bold text-[#000000]/80 mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.co.za"
                className="w-full bg-[#FFFFFF] border border-[#000000]/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:border-[#E06336] focus:ring-1 focus:ring-[#E06336]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E06336] hover:bg-[#c95126] text-[#FFFFFF] py-3.5 px-6 text-[0.95rem] font-bold rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'Sending link...' : 'Send magic sign-in link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
