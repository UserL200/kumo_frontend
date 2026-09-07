import React from 'react';

interface LargeCTAProps {
  view?: 'tenant' | 'business';
  onOpenSignup?: () => void;
}

export const LargeCTA: React.FC<LargeCTAProps> = ({ view = 'tenant', onOpenSignup }) => {
  const isBusiness = view === 'business';

  return (
    <section id="cta-section" className="wrap py-10 md:py-16">
      <div className="relative isolate overflow-hidden rounded-[32px] md:rounded-[48px] bg-(--ink) min-h-[clamp(20rem,40vw,28rem)] flex items-center justify-center text-center p-8 md:p-16 border border-(--parchment)/10 shadow-2xl">
        {/* Ambient Olive and Moss Glowing Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div
            className="w-[44rem] h-[44rem] rounded-full bg-(--olive) opacity-35 shrink-0"
            style={{ filter: 'blur(90px)' }}
          />
          <div
            className="absolute w-[26rem] h-[26rem] rounded-full bg-(--moss) opacity-25 shrink-0"
            style={{ filter: 'blur(70px)' }}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          <h2 className="display text-[clamp(2rem,5.5vw,3.8rem)] text-(--parchment) mb-8 leading-tight">
            {isBusiness ? 'Start verifying rent payments today' : 'Start building your record today'}
          </h2>

          <button
            id="cta-get-started-button"
            type="button"
            onClick={() => onOpenSignup?.()}
            className="px-9 py-4 rounded-full bg-(--parchment) hover:bg-[#dde8cc] text-(--ink) text-[1.05rem] font-bold transition-all active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-(--parchment)/30"
          >
            Get started
          </button>
        </div>
      </div>
    </section>
  );
};