import React, { useState } from 'react';
import { KumoLogo } from './KumoLogo';

interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenSignup?: (mode?: 'tenant' | 'business') => void;
}

interface FlipBadgeProps {
  frontText?: string;
  backText?: string;
  className?: string;
  badgeStyle?: 'accent' | 'subtle';
}

const CompanyFlip: React.FC<FlipBadgeProps> = ({
  frontText = 'Mohoka Solutions (Pty) Ltd',
  backText = '2025 / 621537 / 07',
  className = '',
  badgeStyle = 'accent',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isAccent = badgeStyle === 'accent';

  return (
    <span
      id="mohoka-company-flip"
      onClick={() => setIsFlipped((prev) => !prev)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className={`inline-block relative cursor-pointer select-none align-baseline group ${className}`}
      style={{ perspective: '800px' }}
      title="Hover or tap to view company registration number"
    >
      <span
        className={`inline-grid transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isFlipped ? '[transform:rotateX(180deg)]' : 'group-hover:[transform:rotateX(180deg)]'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <span
          className={`col-start-1 row-start-1 inline-block transition-colors ${
            isAccent
              ? 'text-[#AFE7FC] font-bold hover:underline decoration-[#AFE7FC]/40 underline-offset-2'
              : 'text-white/80 hover:text-white hover:underline underline-offset-2'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontText}
        </span>

        {/* Back Face */}
        <span
          className={`col-start-1 row-start-1 inline-block font-mono tracking-wider text-[#AFE7FC] font-medium`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }}
        >
          {backText}
        </span>
      </span>
    </span>
  );
};

// Social icons — inline SVGs so no extra dependency is needed.
const IconX: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconInstagram: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconLinkedIn: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.24 8.25h4.5V23H.24zM8.25 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4.5z" />
  </svg>
);

const IconFacebook: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 22v-8.4h2.82l.42-3.27H13.5V8.24c0-.95.26-1.6 1.63-1.6h1.74V3.73C16.56 3.68 15.44 3.6 14.14 3.6c-2.72 0-4.58 1.66-4.58 4.7v2.03H6.73v3.27h2.83V22z" />
  </svg>
);

const IconMail: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </svg>
);

const IconPhone: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M4.5 3.5h3.6l1.4 4.6-2.1 1.7a13.2 13.2 0 0 0 5.8 5.8l1.7-2.1 4.6 1.4v3.6c0 1.1-.9 2-2 2-8 0-15-7-15-15 0-1.1.9-2 2-2z" />
  </svg>
);

const SOCIAL_LINKS = [
  { label: 'X (Twitter)', href: '#', Icon: IconX },
  { label: 'Instagram', href: '#', Icon: IconInstagram },
  { label: 'LinkedIn', href: '#', Icon: IconLinkedIn },
  { label: 'Facebook', href: '#', Icon: IconFacebook },
];

// Placeholders — swap for the real inbox / number when ready.
const CONTACT_EMAIL = 'hello@kumo.co.za';
const CONTACT_PHONE_DISPLAY = '+27 00 000 0000';
const CONTACT_PHONE_TEL = '+27000000000';

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSignup }) => {
  return (
    <footer
      id="kumo-footer"
      className="bg-[#000000] text-[#FFFFFF] pt-16 pb-8 overflow-hidden relative"
    >
      <div className="wrap">
        {/* Top Grid */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[5fr_7fr] gap-12 mb-12">
          {/* Brand Blurb */}
          <div className="flex flex-col items-start pr-4 max-w-md">
            <div className="flex items-center gap-3 mb-4 text-[#FFFFFF]">
              <KumoLogo className="w-8 h-8 shrink-0 text-[#AFE7FC]" />
              <span className="logo display text-[2rem] leading-none">kumo</span>
            </div>
            <p className="text-white/60 text-[0.85rem] leading-relaxed mb-4">
              Kumo is South Africa's tenant-initiated rent reporting platform. We enable renters across formal and informal housing to build verified payment records without landlord involvement.
            </p>
            <div className="text-[0.78rem] flex items-center flex-wrap gap-1.5 text-white/75 tracking-wide mt-2 mb-5">
              <span>Kumo, by</span>
              <CompanyFlip
                frontText="Mohoka Solutions (Pty) Ltd"
                backText="2025 / 621537 / 07"
                badgeStyle="accent"
              />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-[#AFE7FC] hover:border-[#AFE7FC]/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_1.3fr] gap-8">
            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-white/40 mb-4">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-[0.85rem]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#about')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#careers')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Careers
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-white/40 mb-4">
                Product
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-[0.85rem]">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenSignup?.('tenant')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Record
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#how-it-works')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    How it works
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-white/40 mb-4">
                Legal
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-[0.85rem]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#terms')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Terms
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#privacy')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#popia')}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    POPIA Compliance
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-white/40 mb-4">
                Contact
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-[0.85rem]">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
                  >
                    <IconMail className="w-4 h-4 shrink-0 text-white/40" />
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
                  >
                    <IconPhone className="w-4 h-4 shrink-0 text-white/40" />
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-white/40 pt-6 border-t border-white/10">
          <div className="flex items-center flex-wrap gap-1">
            <span>© 2026</span>
            <CompanyFlip
              frontText="Mohoka Solutions (Pty) Ltd"
              backText="2025 / 621537 / 07"
              badgeStyle="subtle"
            />
            <span>All rights reserved.</span>
          </div>
          <div>Built for South African Renters</div>
        </div>

        {/* Giant Ghost Watermark Wordmark */}
        <div className="text-center overflow-hidden select-none pointer-events-none mt-6 -mb-4">
          <span className="display text-[14vw] leading-none text-white/[0.05] tracking-tight block">
            KUMO
          </span>
        </div>
      </div>
    </footer>
  );
};