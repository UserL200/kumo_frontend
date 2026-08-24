import React, { useState, useEffect, useRef } from 'react';

interface Step {
  num: string;
  headline: string;
  description: string;
  slide: {
    bg: string;
    textColor: string;
    chipBg: string;
    chipText: string;
    chip: string;
    title: string;
    subtitle?: string;
  };
}

const STEPS: Step[] = [
  {
    num: 'step one',
    headline: 'link your bank account once',
    description:
      'securely connect through our licensed verification partner. we never see or store your login details.',
    slide: {
      bg: '#EAE7FC',
      textColor: '#0F0C15',
      chipBg: 'rgba(15,12,21,0.08)',
      chipText: '#0F0C15',
      chip: 'bank link',
      title: 'Connect',
      subtitle: 'Open Banking Auth',
    },
  },
  {
    num: 'step two',
    headline: 'we detect your rent',
    description:
      'our system spots your recurring rent payment automatically among your transactions — no manual entry.',
    slide: {
      bg: '#F8FFDA',
      textColor: '#0F0C15',
      chipBg: 'rgba(15,12,21,0.08)',
      chipText: '#0F0C15',
      chip: 'detected',
      title: 'R6,500 · Rent',
      subtitle: 'Recurring payment found',
    },
  },
  {
    num: 'step three',
    headline: 'you confirm it',
    description:
      "a quick tap confirms the detected payment is your rent. that's the only manual step in the whole flow.",
    slide: {
      bg: '#FDDCC9',
      textColor: '#0F0C15',
      chipBg: 'rgba(15,12,21,0.08)',
      chipText: '#0F0C15',
      chip: 'confirm',
      title: "Yes, that's rent",
      subtitle: 'One-tap verification',
    },
  },
  {
    num: 'step four',
    headline: "it's reported monthly",
    description:
      'from there, your on-time payments are reported to the bureaus every month, automatically, in the background.',
    slide: {
      bg: '#0F0C15',
      textColor: '#FCFBFB',
      chipBg: 'rgba(255,255,255,0.14)',
      chipText: '#FCFBFB',
      chip: 'reported',
      title: '6 months verified',
      subtitle: 'TransUnion & TPN updated',
    },
  },
];

export const ScrollStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  // Scroll listener to update active step as user scrolls through the section
  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-it-works" ref={outerRef} className="relative min-h-auto md:min-h-[260vh]">
      <div className="sticky top-[4.5rem] min-h-[calc(100vh-4.5rem)] flex items-center py-10 md:py-16 overflow-hidden">
        <div className="wrap w-full grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-16 items-center">
          {/* Left: Interactive Copy & Steps */}
          <div className="flex flex-col justify-center min-w-0">
            {/* Mobile / Responsive interactive step selector */}
            <div className="relative min-h-[14rem] flex flex-col justify-center">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.num}
                    id={`scroll-step-panel-${idx}`}
                    className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'opacity-100 translate-y-0 relative pointer-events-auto'
                        : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <div className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-[#6E2CFF] uppercase tracking-wider mb-2">
                      {step.num}
                    </div>
                    <h2 className="display text-[clamp(1.8rem,4.5vw,3rem)] text-[#0F0C15] mb-4 max-w-[14ch]">
                      {step.headline}
                    </h2>
                    <p className="text-[#0F0C15]/60 text-[clamp(0.95rem,1.5vw,1.15rem)] max-w-[42ch] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Step Navigation Progress Bars */}
            <div className="flex items-center gap-2 mt-8">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={`step-btn-${step.num}`}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`h-[5px] rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? 'w-10 bg-[#6E2CFF]' : 'w-7 bg-[#F5F4F4] hover:bg-[#0F0C15]/20'
                    }`}
                    aria-label={`Jump to ${step.num}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right: Phone Shell Mockup */}
          <div className="flex items-center justify-center">
            <div
              id="phone-shell-container"
              className="relative w-[min(290px,80vw)] aspect-[9/17.5] rounded-[40px] bg-[#0F0C15] p-[10px] shadow-2xl border-4 border-[#0F0C15]/20"
            >
              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-[#F5F4F4]">
                {/* Speaker pill notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0F0C15] rounded-full z-20" />

                {/* Slides */}
                {STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const { slide } = step;
                  return (
                    <div
                      key={`slide-${step.num}`}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        backgroundColor: slide.bg,
                        color: slide.textColor,
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                    >
                      <div
                        className="text-[0.64rem] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-sm"
                        style={{
                          backgroundColor: slide.chipBg,
                          color: slide.chipText,
                        }}
                      >
                        {slide.chip}
                      </div>

                      <div className="display text-[1.953rem] leading-tight max-w-[12ch]">
                        {slide.title}
                      </div>

                      {slide.subtitle && (
                        <div
                          className="text-[0.75rem] opacity-70 font-medium"
                          style={{ color: slide.textColor }}
                        >
                          {slide.subtitle}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
