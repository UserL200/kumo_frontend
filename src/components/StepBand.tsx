import React from 'react';

interface StepBandProps {
  onNavigate?: (path: string) => void;
}

const STEPS = [
  'connect your bank',
  'we detect your rent',
  'you confirm it',
  "it's reported monthly",
];

export const StepBand: React.FC<StepBandProps> = () => {
  return (
    <section id="step-band-section" className="mx-4 my-8 md:my-16">
      <div className="max-w-6xl mx-auto bg-[#0E2203] rounded-[40px] py-16 px-5 md:px-14">
        <div className="flex flex-col items-start mb-12 min-w-0">
          <span
            id="step-band-eyebrow"
            className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-[#6FCFEB] mb-3 inline-block"
          >
            the record, step by step
          </span>

          <h2
            id="step-band-headline"
            className="text-[clamp(1.4rem,4vw,1.9rem)] font-bold tracking-[-0.03em] leading-[0.92] text-white font-['Georgia',_'Times_New_Roman',_serif] max-w-none sm:max-w-[16ch]"
          >
            from bank link to verified history
          </h2>
        </div>

        {/* 4 Chips: Row on desktop/tablet, 2x2 grid below 640px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, idx) => (
            <div
              key={`step-${idx}`}
              id={`step-chip-${idx}`}
              className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.14)] rounded-[16px] px-4 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE] font-medium flex items-center justify-center text-center min-w-0"
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
