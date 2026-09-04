import React from 'react';
import securityImage from '../assets/images/bank_security_visual_1787470823806.jpg';

interface SecuritySplitProps {
  onNavigate?: (path: string) => void;
}

export const SecuritySplit: React.FC<SecuritySplitProps> = () => {
  return (
    <section id="security-split-section" className="bg-(--parchment) py-12 md:py-24 w-full">
      <div className="max-w-6xl mx-auto px-5 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Media on left */}
          <div
            id="security-media-container"
            className="w-full aspect-square rounded-[24px] bg-(--parchment) border border-(--ink)/8 overflow-hidden order-2 lg:order-1 min-w-0 relative shadow-lg group"
          >
            <img
              id="security-image"
              src={securityImage}
              alt="Bank-grade encryption and security protection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--ink)/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Text on right */}
          <div className="flex flex-col items-start order-1 lg:order-2 min-w-0">
            <span
              id="security-eyebrow"
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-(--accent-fg) mb-3 inline-block"
            >
              Security
            </span>

            <h2
              id="security-headline"
              className="display text-[clamp(1.4rem,4vw,1.9rem)] text-(--ink) mb-6 max-w-none sm:max-w-[14ch]"
            >
              Bank-grade protection, on your terms
            </h2>

            <p
              id="security-paragraph"
              className="text-[clamp(0.85rem,1.4vw,1rem)] text-(--ink)/[0.55] leading-[1.5] max-w-none sm:max-w-[48ch]"
            >
              You can disconnect at any time. Your data is only ever used to detect and report your own rent payments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};