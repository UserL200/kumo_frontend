import React from 'react';
import featureSplitTenantImg from '../assets/images/feature_split_tenant.png';
import bankSecurityImg from '../assets/images/bank_security_visual_1787470823806.jpg';

interface FeatureSplitProps {
  onNavigate?: (path: string) => void;
  view: 'tenant' | 'business';
  onActionClick?: () => void;
}

export const FeatureSplit: React.FC<FeatureSplitProps> = ({
  onNavigate,
  view,
  onActionClick,
}) => {
  const isTenant = view === 'tenant';

  const content = isTenant
    ? {
        eyebrow: 'How it works',
        headline: 'Your bank already knows you pay rent. Now your record can show it.',
        paragraph:
          'Securely link your account once. We detect your recurring rent payment automatically and report it monthly, so your history builds itself in the background.',
        button: 'See how it works',
        image: featureSplitTenantImg,
        imageAlt: 'Bank account link flow in the Kumo app',
      }
    : {
        eyebrow: 'No work for you',
        headline: "You don't do anything. That's the point.",
        paragraph:
          "Tenants opt in and connect their own bank account. You're not asked to confirm payments, share records, or take on any reporting responsibility. Your property just becomes one where tenants have a reason to pay on time and build something from it.",
        button: 'Learn more',
        image: bankSecurityImg,
        imageAlt: 'Verified property management portfolio',
      };

  return (
    <section id="feature-split-section" className="bg-(--parchment) py-12 md:py-24 w-full">
      <div className="max-w-6xl mx-auto px-5 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col items-start min-w-0">
            <span
              id="feature-eyebrow"
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-(--accent-fg) mb-3 inline-block"
            >
              {content.eyebrow}
            </span>

            <h2
              id="feature-headline"
              className="display text-[clamp(1.4rem,4vw,1.9rem)] text-(--ink) mb-6 max-w-none sm:max-w-[14ch]"
            >
              {content.headline}
            </h2>

            <p
              id="feature-paragraph"
              className="text-[clamp(0.85rem,1.4vw,1rem)] text-(--ink)/55 leading-[1.5] mb-8 max-w-none sm:max-w-[48ch]"
            >
              {content.paragraph}
            </p>

            <button
              id="feature-cta-button"
              type="button"
              onClick={() => onActionClick?.()}
              className="bg-(--ink) hover:bg-[#1f1f1f] text-(--text-inverse) px-6 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              {content.button}
            </button>
          </div>

          {/* Right Column: Media */}
          <div
            id="feature-media-placeholder"
            className="w-full aspect-square rounded-[24px] bg-(--parchment) border border-(--ink)/8 overflow-hidden relative shadow-lg group min-w-0"
          >
            <img
              src={content.image}
              alt={content.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};