import React, { useState } from 'react';
import { KumoLogo } from './KumoLogo';

interface FooterProps {
  onNavigate?: (path: string) => void;
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

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
            <div className="text-[0.78rem] flex items-center flex-wrap gap-1.5 text-white/75 tracking-wide mt-2">
              <span>Kumo, by</span>
              <CompanyFlip
                frontText="Mohoka Solutions (Pty) Ltd"
                backText="2025 / 621537 / 07"
                badgeStyle="accent"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
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
                    onClick={() => onNavigate?.('#record')}
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
