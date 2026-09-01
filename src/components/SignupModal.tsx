import React, { useState, useEffect, useRef } from 'react';
import { KumoLogo } from './KumoLogo';
import {
  signupWaitlist,
  signupLandlord,
  isValidEmail,
  isValidSaPhone,
} from '../config.ts';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'tenant' | 'business' | 'login';
}

// Minimum time (ms) a real human takes to open the modal and fill a
// field. Bots that submit instantly on page load get silently rejected.
const MIN_FORM_FILL_TIME_MS = 2000;

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [propertyCount, setPropertyCount] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const openedAtRef = useRef<number | null>(null);

  // Record when the modal actually opened, per open — used for the
  // minimum-fill-time anti-spam check on submit.
  useEffect(() => {
    if (isOpen) {
      openedAtRef.current = Date.now();
    } else {
      // Reset transient form state whenever the modal closes so a
      // fresh open (possibly in a different mode) starts clean.
      setEmail('');
      setPhone('');
      setName('');
      setPropertyCount('');
      setHoneypot('');
      setIsLoading(false);
      setSuccessMessage(null);
      setTouched(false);
      openedAtRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const emailValid = isValidEmail(email);
  const phoneValid = isValidSaPhone(phone);

  // Returns true if the submit looks like it came from a bot: the
  // honeypot field was filled in (a real user never sees or fills
  // it), or the form was submitted implausibly fast after opening.
  const looksLikeSpam = () => {
    if (honeypot.trim().length > 0) return true;
    const openedAt = openedAtRef.current;
    if (openedAt && Date.now() - openedAt < MIN_FORM_FILL_TIME_MS) return true;
    return false;
  };

  const handleTenantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid || !phoneValid) return;
    if (looksLikeSpam()) {
      // Silently succeed-looking to the bot without doing any work —
      // don't tip off automated submitters that they were caught.
      setSuccessMessage("You're on the waiting list. We'll email you as soon as bank verification opens up.");
      return;
    }

    setIsLoading(true);
    try {
      await signupWaitlist({ email, phone });
      setSuccessMessage(
        "You're on the waiting list. Check your inbox for a confirmation email — we'll let you know as soon as bank verification is ready and you can link your account."
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid) return;
    if (looksLikeSpam()) {
      setSuccessMessage('Thank you for listing your properties. Our team will be in touch shortly.');
      return;
    }

    setIsLoading(true);
    try {
      await signupLandlord({ name, email, propertyCount });
      setSuccessMessage(
        'Thank you for listing your properties. Our team will be in touch shortly.'
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid) return;
    if (looksLikeSpam()) {
      setSuccessMessage('Magic login link sent to your email address.');
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setSuccessMessage('Magic login link sent to your email address.');
    setIsLoading(false);
  };

  // Shared honeypot field, rendered inside every form. Hidden from
  // sighted and screen-reader users via CSS + tabIndex + aria-hidden,
  // but still present in the DOM for bots that blindly fill every
  // input they find.
  const Honeypot = () => (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] w-px h-px overflow-hidden"
    >
      <label htmlFor="kumo-hp-field">Leave this field empty</label>
      <input
        id="kumo-hp-field"
        type="text"
        name="company_website"
        autoComplete="off"
        tabIndex={-1}
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
    </div>
  );

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
            ? 'Join the waiting list'
            : mode === 'business'
            ? 'Join the Kumo landlord network'
            : 'Log in to your record'}
        </h3>

        <p className="text-[0.85rem] text-[#000000]/70 leading-relaxed mb-6">
          {mode === 'tenant'
            ? "We're finalising our bank-verification partnerships. Pop your details in and we'll email you the moment you can link your account and start building your record."
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
          <form onSubmit={handleTenantSubmit} className="flex flex-col gap-4" noValidate>
            <Honeypot />

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
                className={`w-full bg-[#FFFFFF] border rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:ring-1 ${
                  touched && !emailValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-[#000000]/20 focus:border-[#E06336] focus:ring-[#E06336]'
                }`}
              />
              {touched && !emailValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">Enter a valid email address.</p>
              )}
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
                className={`w-full bg-[#FFFFFF] border rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:ring-1 ${
                  touched && !phoneValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-[#000000]/20 focus:border-[#E06336] focus:ring-[#E06336]'
                }`}
              />
              {touched && !phoneValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">
                  Enter a valid SA mobile number, e.g. 082 123 4567 or +27 82 123 4567.
                </p>
              )}
            </div>

            <div className="text-[0.72rem] text-[#000000]/60 leading-normal">
              We'll only use these details to email and, if needed, SMS you about your place on the waiting list.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E06336] hover:bg-[#c95126] text-[#FFFFFF] py-3.5 px-6 text-[0.95rem] font-bold rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'Joining waiting list...' : 'Join the waiting list'}
            </button>
          </form>
        ) : mode === 'business' ? (
          <form onSubmit={handleBusinessSubmit} className="flex flex-col gap-4" noValidate>
            <Honeypot />

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
                className={`w-full bg-[#FFFFFF] border rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:ring-1 ${
                  touched && !emailValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-[#000000]/20 focus:border-[#E06336] focus:ring-[#E06336]'
                }`}
              />
              {touched && !emailValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">Enter a valid email address.</p>
              )}
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
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4" noValidate>
            <Honeypot />

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
                className={`w-full bg-[#FFFFFF] border rounded-[16px] px-4 py-3 text-[0.9rem] text-[#000000] focus:outline-none focus:ring-1 ${
                  touched && !emailValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-[#000000]/20 focus:border-[#E06336] focus:ring-[#E06336]'
                }`}
              />
              {touched && !emailValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">Enter a valid email address.</p>
              )}
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