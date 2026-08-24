import React from 'react';

interface LargeCTAProps {
  onOpenSignup?: () => void;
}

export const LargeCTA: React.FC<LargeCTAProps> = ({ onOpenSignup }) => {
  return (
    <section id="cta-section" className="wrap py-10 md:py-16">
      <div className="relative isolate overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#FCFBFB] min-h-[clamp(20rem,40vw,28rem)] flex items-center justify-center text-center p-8 md:p-16 border border-[#0F0C15]/[0.06] shadow-xl">
        {/* Ambient Cyan and Lime Glowing Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div
            className="w-[44rem] h-[44rem] rounded-full bg-[#59FCF9] opacity-40 shrink-0"
            style={{ filter: 'blur(90px)' }}
          />
          <div
            className="absolute w-[26rem] h-[26rem] rounded-full bg-[#DAFF35] opacity-50 shrink-0"
            style={{ filter: 'blur(70px)' }}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          <h2 className="display text-[clamp(2rem,5.5vw,3.8rem)] text-[#0F0C15] mb-8 leading-tight">
            start building your record today
          </h2>

          <button
            id="cta-get-started-button"
            type="button"
            onClick={() => onOpenSignup?.()}
            className="px-8 py-4 rounded-full bg-[#6E2CFF] hover:bg-[#5A24D9] text-white text-[1rem] font-medium transition-all active:scale-98 cursor-pointer shadow-lg hover:shadow-xl"
          >
            get started
          </button>
        </div>
      </div>
    </section>
  );
};
