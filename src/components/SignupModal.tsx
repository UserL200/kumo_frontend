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
      await signupTenant({ email, phone });
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
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0F0C15]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="signup-modal-container"
        className="w-full max-w-md bg-white border border-[#0F0C15]/10 rounded-[32px] p-6 md:p-8 relative text-[#0F0C15] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-button"
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl leading-none text-[#0F0C15]/50 hover:text-[#0F0C15] cursor-pointer"
        >
          ×
        </button>

        {/* Title */}
        <h3 className="display text-[1.8rem] text-[#0F0C15] mb-2 leading-tight">
          {mode === 'tenant'
            ? 'start building your record'
            : mode === 'business'
            ? 'join the kumo landlord network'
            : 'log in to your record'}
        </h3>

        <p className="text-[0.85rem] text-[#0F0C15]/55 leading-relaxed mb-6">
          {mode === 'tenant'
            ? 'connect your south african bank account securely to verify recurring rent payments.'
            : mode === 'business'
            ? 'give your tenants the opportunity to report without any admin on your side.'
            : 'access your verified payment history and monthly reporting status.'}
        </p>

        {successMessage ? (
          <div className="bg-[#F8FFDA] border border-[#0F0C15]/[0.08] rounded-[20px] p-5 text-center">
            <p className="text-[0.85rem] font-medium text-[#0F0C15] leading-relaxed mb-4">
              {successMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccessMessage(null);
                onClose();
              }}
              className="bg-[#0F0C15] text-white px-6 py-2.5 text-[0.85rem] font-medium rounded-full cursor-pointer hover:opacity-90"
            >
              close
            </button>
          </div>
        ) : mode === 'tenant' ? (
          <form onSubmit={handleTenantSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#0F0C15]/70 mb-1.5 uppercase tracking-wide">
                email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenant@example.co.za"
                className="w-full bg-[#F5F4F4] border border-[#0F0C15]/[0.08] rounded-[16px] px-4 py-3 text-[0.9rem] text-[#0F0C15] focus:outline-none focus:border-[#6E2CFF]"
              />
            </div>

            <div>
              <label className="block text-[0.72rem] font-semibold text-[#0F0C15]/70 mb-1.5 uppercase tracking-wide">
                mobile phone number (south africa)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="082 123 4567"
                className="w-full bg-[#F5F4F4] border border-[#0F0C15]/[0.08] rounded-[16px] px-4 py-3 text-[0.9rem] text-[#0F0C15] focus:outline-none focus:border-[#6E2CFF]"
              />
            </div>

            <div className="text-[0.72rem] text-[#0F0C15]/45 leading-normal">
              by continuing, you will be redirected to our verified open-banking partner ({BANK_LINK_PROVIDER}) via {BANK_LINK_REDIRECT_URI}. kumo does not store banking passwords.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6E2CFF] hover:bg-[#5A24D9] text-white py-3.5 px-6 text-[0.9rem] font-medium rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'connecting to partner...' : 'continue to bank link'}
            </button>
          </form>
        ) : mode === 'business' ? (
          <form onSubmit={handleBusinessSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#0F0C15]/70 mb-1.5 uppercase tracking-wide">
                contact name or company
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="acme properties (pty) ltd"
                className="w-full bg-[#F5F4F4] border border-[#0F0C15]/[0.08] rounded-[16px] px-4 py-3 text-[0.9rem] text-[#0F0C15] focus:outline-none focus:border-[#6E2CFF]"
              />
            </div>

            <div>
              <label className="block text-[0.72rem] font-semibold text-[#0F0C15]/70 mb-1.5 uppercase tracking-wide">
                business email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="landlord@example.co.za"
                className="w-full bg-[#F5F4F4] border border-[#0F0C15]/[0.08] rounded-[16px] px-4 py-3 text-[0.9rem] text-[#0F0C15] focus:outline-none focus:border-[#6E2CFF]"
              />
            </div>

            <div>
              <label className="block text-[0.72rem] font-semibold text-[#0F0C15]/70 mb-1.5 uppercase tracking-wide">
                number of rental units (optional)
              </label>
              <input
                type="text"
                value={propertyCount}
                onChange={(e) => setPropertyCount(e.target.value)}
                placeholder="e.g. 12 units"
                className="w-full bg-[#F5F4F4] border border-[#0F0C15]/[0.08] rounded-[16px] px-4 py-3 text-[0.9rem] text-[#0F0C15] focus:outline-none focus:border-[#6E2CFF]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6E2CFF] hover:bg-[#5A24D9] text-white py-3.5 px-6 text-[0.9rem] font-medium rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'submitting...' : 'list properties for free'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#0F0C15]/70 mb-1.5 uppercase tracking-wide">
                email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.co.za"
                className="w-full bg-[#F5F4F4] border border-[#0F0C15]/[0.08] rounded-[16px] px-4 py-3 text-[0.9rem] text-[#0F0C15] focus:outline-none focus:border-[#6E2CFF]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6E2CFF] hover:bg-[#5A24D9] text-white py-3.5 px-6 text-[0.9rem] font-medium rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'sending link...' : 'send magic sign-in link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
