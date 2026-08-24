import React, { useState } from 'react';
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
      // 1. Stubbed POST /api/tenants/signup
      await signupTenant({ email, phone });

      // 2. Stubbed POST /api/bank-link/initiate
      const bankLinkRes = await initiateBankLink();
      setSuccessMessage(
        `account created. redirecting to ${BANK_LINK_PROVIDER} verification portal (${bankLinkRes.redirectUrl})...`
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
      // Stubbed POST /api/landlords/join
      await signupLandlord({ name, email, propertyCount });
      setSuccessMessage(
        'thank you for listing your properties. our team will be in touch shortly.'
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
    setSuccessMessage('magic login link sent to your email address.');
    setIsLoading(false);
  };

  return (
    <div
      id="signup-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2203]/40"
      onClick={onClose}
    >
      <div
        id="signup-modal-container"
        className="w-full max-w-md bg-[#FCFBF7] border border-[#0E2203]/[0.12] rounded-[24px] p-6 md:p-8 relative text-[#0E2203]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-button"
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[clamp(1.3rem,3.2vw,1.9rem)] leading-none text-[#0E2203]/60 hover:text-[#0E2203] cursor-pointer"
        >
          ×
        </button>

        {/* Title */}
        <h3 className="text-[clamp(1.3rem,3.2vw,1.9rem)] font-bold tracking-[-0.03em] leading-[0.92] text-[#0E2203] font-['Georgia',_'Times_New_Roman',_serif] mb-3">
          {mode === 'tenant'
            ? 'start building your record'
            : mode === 'business'
            ? 'list properties on kumo'
            : 'log in to your record'}
        </h3>

        <p className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203]/[0.55] leading-[1.5] mb-6">
          {mode === 'tenant'
            ? 'connect your south african bank account securely to verify recurring rent payments.'
            : mode === 'business'
            ? 'zero admin burden. give your tenants a reason to pay on time.'
            : 'enter your email to receive a secure sign-in link.'}
        </p>

        {successMessage ? (
          <div className="bg-[#EAF3DE] border border-[#0E2203]/[0.08] rounded-[16px] p-5 text-center">
            <p className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-[#0E2203] leading-relaxed mb-4">
              {successMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccessMessage(null);
                onClose();
              }}
              className="bg-[#2F6E2E] text-white px-6 py-2.5 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full cursor-pointer hover:opacity-90"
            >
              close
            </button>
          </div>
        ) : mode === 'tenant' ? (
          <form onSubmit={handleTenantSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[clamp(0.64rem,1.2vw,0.7rem)] font-medium text-[#0E2203]/70 mb-1.5">
                email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenant@example.co.za"
                className="w-full bg-[#F5F6EF] border border-[#0E2203]/[0.12] rounded-[16px] px-4 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203] focus:outline-none focus:border-[#0E2203]"
              />
            </div>

            <div>
              <label className="block text-[clamp(0.64rem,1.2vw,0.7rem)] font-medium text-[#0E2203]/70 mb-1.5">
                mobile phone number (south africa)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="082 123 4567"
                className="w-full bg-[#F5F6EF] border border-[#0E2203]/[0.12] rounded-[16px] px-4 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203] focus:outline-none focus:border-[#0E2203]"
              />
            </div>

            <div className="text-[clamp(0.64rem,1.2vw,0.7rem)] text-[#0E2203]/40 leading-normal">
              by continuing, you will be redirected to our verified open-banking partner ({BANK_LINK_PROVIDER}) via {BANK_LINK_REDIRECT_URI}. kumo does not store banking passwords.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2F6E2E] text-white py-3 px-6 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'connecting to partner...' : 'continue to bank link'}
            </button>
          </form>
        ) : mode === 'business' ? (
          <form onSubmit={handleBusinessSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[clamp(0.64rem,1.2vw,0.7rem)] font-medium text-[#0E2203]/70 mb-1.5">
                contact name or company
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="acme properties (pty) ltd"
                className="w-full bg-[#F5F6EF] border border-[#0E2203]/[0.12] rounded-[16px] px-4 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203] focus:outline-none focus:border-[#0E2203]"
              />
            </div>

            <div>
              <label className="block text-[clamp(0.64rem,1.2vw,0.7rem)] font-medium text-[#0E2203]/70 mb-1.5">
                business email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="landlord@example.co.za"
                className="w-full bg-[#F5F6EF] border border-[#0E2203]/[0.12] rounded-[16px] px-4 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203] focus:outline-none focus:border-[#0E2203]"
              />
            </div>

            <div>
              <label className="block text-[clamp(0.64rem,1.2vw,0.7rem)] font-medium text-[#0E2203]/70 mb-1.5">
                number of rental units (optional)
              </label>
              <input
                type="text"
                value={propertyCount}
                onChange={(e) => setPropertyCount(e.target.value)}
                placeholder="e.g. 12 units"
                className="w-full bg-[#F5F6EF] border border-[#0E2203]/[0.12] rounded-[16px] px-4 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203] focus:outline-none focus:border-[#0E2203]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2F6E2E] text-white py-3 px-6 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'submitting...' : 'list properties for free'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[clamp(0.64rem,1.2vw,0.7rem)] font-medium text-[#0E2203]/70 mb-1.5">
                email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.co.za"
                className="w-full bg-[#F5F6EF] border border-[#0E2203]/[0.12] rounded-[16px] px-4 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203] focus:outline-none focus:border-[#0E2203]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2F6E2E] text-white py-3 px-6 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'sending link...' : 'send magic sign-in link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
