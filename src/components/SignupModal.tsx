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

const WAITLIST_SUCCESS_MESSAGE =
  "You're on the waiting list. Check your inbox for a confirmation email — we'll let you know as soon as bank verification is ready and you can link your account.";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      setErrorMessage(null);
      setTouched(false);
      openedAtRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const emailValid = isValidEmail(email);
  const phoneValid = isValidSaPhone(phone);

  // A submit implausibly fast after the modal opened is a common bot
  // tell. Real honeypot detection happens server-side regardless (the
  // backend checks the same "website" field) — this local check just
  // saves a network round trip for the most obvious bots.
  const submittedTooFast = () => {
    const openedAt = openedAtRef.current;
    return !!openedAt && Date.now() - openedAt < MIN_FORM_FILL_TIME_MS;
  };

  const handleTenantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErrorMessage(null);
    if (!emailValid || !phoneValid) return;

    if (submittedTooFast()) {
      // Show the normal success copy without hitting the network —
      // don't tip off a script that it was caught.
      setSuccessMessage(WAITLIST_SUCCESS_MESSAGE);
      return;
    }

    setIsLoading(true);
    try {
      await signupWaitlist({ email, phone, honeypot });
      setSuccessMessage(WAITLIST_SUCCESS_MESSAGE);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid) return;
    if (submittedTooFast() || honeypot.trim().length > 0) {
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
    if (submittedTooFast() || honeypot.trim().length > 0) {
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
  // input they find. Named "website" to match the backend DTO field
  // (WaitlistJoinRequest.website) that the tenant form sends this as.
  const Honeypot = () => (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] w-px h-px overflow-hidden"
    >
      <label htmlFor="kumo-hp-field">Leave this field empty</label>
      <input
        id="kumo-hp-field"
        type="text"
        name="website"
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
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-(--ink)/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="signup-modal-container"
        className="w-full max-w-md bg-(--parchment) border border-(--ink)/15 rounded-[32px] p-6 md:p-8 relative text-(--ink) shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-button"
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl leading-none text-(--ink)/50 hover:text-(--ink) cursor-pointer"
        >
          ×
        </button>

        {/* Logo Badge */}
        <div className="w-10 h-10 rounded-full bg-(--moss) border border-(--ink)/10 flex items-center justify-center mb-4 text-(--ink)">
          <KumoLogo className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="display text-[1.8rem] text-(--ink) mb-2 leading-tight">
          {mode === 'tenant'
            ? 'Join the waiting list'
            : mode === 'business'
            ? 'Join the Kumo landlord network'
            : 'Log in to your record'}
        </h3>

        <p className="text-[0.85rem] text-(--ink)/70 leading-relaxed mb-6">
          {mode === 'tenant'
            ? "We're finalising our bank-verification partnerships. Pop your details in and we'll email you the moment you can link your account and start building your record."
            : mode === 'business'
            ? 'Give your tenants the opportunity to report without any admin on your side.'
            : 'Access your verified payment history and monthly reporting status.'}
        </p>

        {successMessage ? (
          <div className="bg-(--moss)/30 border border-(--moss) rounded-[20px] p-5 text-center">
            <p className="text-[0.85rem] font-bold text-(--ink) leading-relaxed mb-4">
              {successMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccessMessage(null);
                onClose();
              }}
              className="bg-(--ink) text-(--parchment) px-6 py-2.5 text-[0.85rem] font-bold rounded-full cursor-pointer hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : mode === 'tenant' ? (
          <form onSubmit={handleTenantSubmit} className="flex flex-col gap-4" noValidate>
            <Honeypot />

            <div>
              <label className="block text-[0.72rem] font-bold text-(--ink)/80 mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenant@example.co.za"
                className={`w-full bg-(--parchment) border rounded-[16px] px-4 py-3 text-[0.9rem] text-(--ink) focus:outline-none focus:ring-1 ${
                  touched && !emailValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-(--ink)/20 focus:border-(--ink) focus:ring-(--ink)'
                }`}
              />
              {touched && !emailValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">Enter a valid email address.</p>
              )}
            </div>

            <div>
              <label className="block text-[0.72rem] font-bold text-(--ink)/80 mb-1.5 uppercase tracking-wide">
                Mobile phone number (South Africa)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="082 123 4567"
                className={`w-full bg-(--parchment) border rounded-[16px] px-4 py-3 text-[0.9rem] text-(--ink) focus:outline-none focus:ring-1 ${
                  touched && !phoneValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-(--ink)/20 focus:border-(--ink) focus:ring-(--ink)'
                }`}
              />
              {touched && !phoneValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">
                  Enter a valid SA mobile number, e.g. 082 123 4567 or +27 82 123 4567.
                </p>
              )}
            </div>

            <div className="text-[0.72rem] text-(--ink)/60 leading-normal">
              We'll only use these details to email and, if needed, SMS you about your place on the waiting list.
            </div>

            {errorMessage && (
              <div className="text-[0.8rem] text-red-600 bg-red-50 border border-red-200 rounded-[12px] px-4 py-2.5">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-(--ink) hover:bg-[#1f1f1f] text-(--parchment) py-3.5 px-6 text-[0.95rem] font-bold rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'Joining waiting list...' : 'Join the waiting list'}
            </button>
          </form>
        ) : mode === 'business' ? (
          <form onSubmit={handleBusinessSubmit} className="flex flex-col gap-4" noValidate>
            <Honeypot />

            <div>
              <label className="block text-[0.72rem] font-bold text-(--ink)/80 mb-1.5 uppercase tracking-wide">
                Contact name or company
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Properties (Pty) Ltd"
                className="w-full bg-(--parchment) border border-(--ink)/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-(--ink) focus:outline-none focus:border-(--ink) focus:ring-1 focus:ring-(--ink)"
              />
            </div>

            <div>
              <label className="block text-[0.72rem] font-bold text-(--ink)/80 mb-1.5 uppercase tracking-wide">
                Business email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="landlord@example.co.za"
                className={`w-full bg-(--parchment) border rounded-[16px] px-4 py-3 text-[0.9rem] text-(--ink) focus:outline-none focus:ring-1 ${
                  touched && !emailValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-(--ink)/20 focus:border-(--ink) focus:ring-(--ink)'
                }`}
              />
              {touched && !emailValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">Enter a valid email address.</p>
              )}
            </div>

            <div>
              <label className="block text-[0.72rem] font-bold text-(--ink)/80 mb-1.5 uppercase tracking-wide">
                Number of rental units (optional)
              </label>
              <input
                type="text"
                value={propertyCount}
                onChange={(e) => setPropertyCount(e.target.value)}
                placeholder="e.g. 12 units"
                className="w-full bg-(--parchment) border border-(--ink)/20 rounded-[16px] px-4 py-3 text-[0.9rem] text-(--ink) focus:outline-none focus:border-(--ink) focus:ring-1 focus:ring-(--ink)"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-(--ink) hover:bg-[#1f1f1f] text-(--parchment) py-3.5 px-6 text-[0.95rem] font-bold rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'Submitting...' : 'List properties for free'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4" noValidate>
            <Honeypot />

            <div>
              <label className="block text-[0.72rem] font-bold text-(--ink)/80 mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.co.za"
                className={`w-full bg-(--parchment) border rounded-[16px] px-4 py-3 text-[0.9rem] text-(--ink) focus:outline-none focus:ring-1 ${
                  touched && !emailValid
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-(--ink)/20 focus:border-(--ink) focus:ring-(--ink)'
                }`}
              />
              {touched && !emailValid && (
                <p className="text-[0.72rem] text-red-500 mt-1">Enter a valid email address.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-(--ink) hover:bg-[#1f1f1f] text-(--parchment) py-3.5 px-6 text-[0.95rem] font-bold rounded-full transition-all cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              {isLoading ? 'Sending link...' : 'Send magic sign-in link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};