import React, { useState, useEffect } from 'react';
import heroImage from '../assets/images/hero_housing_1787469471730.jpg';

interface HeroProps {
  view: 'tenant' | 'business';
  onNavigate?: (path: string) => void;
  onOpenSignup?: (mode?: 'tenant' | 'business') => void;
}

export const Hero: React.FC<HeroProps> = ({ view, onNavigate, onOpenSignup }) => {
  const [activeLine, setActiveLine] = useState(0);

  const tenantLines = [
    'rent that finally counts',
    'a record, without asking your landlord',
  ];

  const businessLines = [
    'a more reliable tenant starts here',
    'zero admin, zero liability, on your side',
  ];

  const currentLines = view === 'tenant' ? tenantLines : businessLines;

  useEffect(() => {
    setActiveLine(0);
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % currentLines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [view, currentLines.length]);

  return (
    <section id="hero-section" className="wrap pt-3 md:pt-5 pb-0">
      {/* Hero Media Container */}
      <div
        id="hero-media-container"
        className="w-full h-[clamp(240px,50vh,520px)] rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#0F0C15] relative shadow-lg group"
      >
        <img
          id="hero-image"
          src={heroImage}
          alt="South African residential community and homes"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C15]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Overlapping Headline Panel */}
      <div className="relative z-10 max-w-[min(54ch,90vw)] mx-auto -mt-10 sm:-mt-14 md:-mt-16 px-3">
        <div className="bg-white rounded-t-[32px] md:rounded-t-[40px] pt-8 px-6 pb-4 text-center flex flex-col items-center shadow-xl border-t border-x border-[#0F0C15]/[0.06]">
          {/* Cycling Headline with CSS Grid overlap */}
          <div className="display text-[clamp(1.8rem,5.5vw,3.6rem)] text-[#0F0C15] tracking-[-0.05em] leading-[0.92] uppercase min-h-[clamp(3.8rem,8.5vw,5.5rem)] grid place-items-center w-full">
            {currentLines.map((line, idx) => {
              const isCurrent = activeLine === idx;
              return (
                <span
                  key={`${view}-${line}`}
                  className="col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(1,0.02,0,0.85)] max-w-[20ch] text-center"
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent ? 'translateY(0)' : 'translateY(12px)',
                    pointerEvents: isCurrent ? 'auto' : 'none',
                  }}
                >
                  {line}
                </span>
              );
            })}
          </div>

          {/* Subtitle / Paragraph */}
          <p className="text-[#0F0C15]/55 text-[clamp(0.95rem,1.5vw,1.25rem)] font-light max-w-[42ch] mt-5 leading-relaxed">
            {view === 'tenant'
              ? 'connect your bank account, and every on-time rent payment builds a verified record with the credit bureaus. no paperwork, no landlord involved.'
              : 'join the network of landlords whose properties give tenants a reason to report, without adding any admin, paperwork, or liability to your side.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 mb-2">
            <button
              id="hero-cta-button"
              type="button"
              onClick={() => onOpenSignup?.(view)}
              className="px-7 py-3.5 rounded-full bg-[#6E2CFF] hover:bg-[#5A24D9] text-white text-[0.9rem] font-medium transition-all active:scale-[0.98] cursor-pointer shadow-md"
            >
              {view === 'tenant' ? 'start building your record' : 'join the network'}
            </button>

            {view === 'tenant' && (
              <button
                type="button"
                onClick={() => onNavigate?.('#how-it-works')}
                className="btn-link text-[0.9rem] text-[#0F0C15] font-medium hover:text-[#6E2CFF] transition-colors py-2 px-3"
              >
                see how it works <span className="text-[#6E2CFF] text-lg font-normal">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
