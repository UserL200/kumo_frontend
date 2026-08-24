import React from 'react';

interface CTAProps {
  onNavigate?: (path: string) => void;
  onOpenSignup?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onNavigate, onOpenSignup }) => {
  return (
    <section id="cta-section" className="mx-4 my-8 md:my-16">
      <div className="max-w-6xl mx-auto bg-[#EAF3DE] rounded-[40px] py-16 px-5 md:px-14 text-center flex flex-col items-center min-w-0">
        <h2
          id="cta-headline"
          className="text-[clamp(1.6rem,5vw,2.4rem)] font-bold tracking-[-0.03em] leading-[0.92] text-[#0E2203] font-['Georgia',_'Times_New_Roman',_serif] mb-8 max-w-xl"
        >
          Start building your record today
        </h2>

        <button
          id="cta-get-started-button"
          type="button"
          onClick={() => onOpenSignup?.()}
          className="bg-[#2F6E2E] text-white px-6 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
        >
          Get started
        </button>
      </div>
    </section>
  );
};
