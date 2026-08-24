import React from 'react';

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
        eyebrow: 'how it works',
        headline: 'your bank already knows you pay rent. now your record can show it.',
        paragraph:
          'securely link your account once. we detect your recurring rent payment automatically and report it monthly, so your history builds itself in the background.',
        button: 'see how it works',
        placeholder: 'screenshot: bank link flow',
      }
    : {
        eyebrow: 'no work for you',
        headline: "you don't do anything. that's the point.",
        paragraph:
          "tenants opt in and connect their own bank account. you're not asked to confirm payments, share records, or take on any reporting responsibility. your property just becomes one where tenants have a reason to pay on time and build something from it.",
        button: 'learn more',
        placeholder: 'landlord / property exterior photo — replace before launch',
      };

  return (
    <section id="feature-split-section" className="bg-[#FCFBF7] py-12 md:py-24 w-full">
      <div className="max-w-6xl mx-auto px-5 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col items-start min-w-0">
            <span
              id="feature-eyebrow"
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-[#2F6E2E] mb-3 inline-block"
            >
              {content.eyebrow}
            </span>

            <h2
              id="feature-headline"
              className="text-[clamp(1.4rem,4vw,1.9rem)] font-bold tracking-[-0.03em] leading-[0.92] text-[#0E2203] font-['Georgia',_'Times_New_Roman',_serif] mb-6 max-w-none sm:max-w-[14ch]"
            >
              {content.headline}
            </h2>

            <p
              id="feature-paragraph"
              className="text-[clamp(0.85rem,1.4vw,1rem)] text-[#0E2203]/[0.55] leading-[1.5] mb-8 max-w-none sm:max-w-[48ch]"
            >
              {content.paragraph}
            </p>

            <button
              id="feature-cta-button"
              type="button"
              onClick={() => onActionClick?.()}
              className="bg-[#2F6E2E] text-white px-6 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
            >
              {content.button}
            </button>
          </div>

          {/* Right Column: Media Placeholder */}
          <div
            id="feature-media-placeholder"
            className="w-full aspect-square rounded-[24px] bg-[#EAF3DE] border border-[#0E2203]/[0.08] flex items-center justify-center p-8 text-center min-w-0"
          >
            <span className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-[#0E2203]/[0.70]">
              {content.placeholder}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
