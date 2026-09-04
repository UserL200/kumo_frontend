import React from 'react';

interface CTAProps {
  onNavigate?: (path: string) => void;
  onOpenSignup?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onNavigate, onOpenSignup }) => {
  return (
    <section id="cta-section" className="mx-4 my-8 md:my-16">
      <div className="max-w-6xl mx-auto bg-(--parchment) rounded-[40px] py-16 px-5 md:px-14 text-center flex flex-col items-center min-w-0">
        <h2
          id="cta-headline"
          className="display text-[clamp(1.6rem,5vw,2.4rem)] text-(--ink) mb-8 max-w-xl"
        >
          Start building your record today
        </h2>

        <button
          id="cta-get-started-button"
          type="button"
          onClick={() => onOpenSignup?.()}
          className="px-8 py-3.5 rounded-full bg-(--ink) hover:bg-[#1f1f1f] text-(--text-inverse) text-[0.95rem] font-bold transition-all active:scale-[0.98] cursor-pointer shadow-lg"
        >
          Get started
        </button>
      </div>
    </section>
  );
};