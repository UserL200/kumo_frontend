import React, { useState, useEffect, useRef } from 'react';
import heroImage from '../assets/images/hero_housing_1787469471730.jpg';

interface HeroProps {
  view: 'tenant' | 'business';
  onNavigate?: (path: string) => void;
  onOpenSignup?: (mode?: 'tenant' | 'business') => void;
}

export const Hero: React.FC<HeroProps> = ({ view, onNavigate, onOpenSignup }) => {
  const [activeLine, setActiveLine] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const tenantLines = [
    'Rent that finally counts',
    'Build your record, without new credit',
  ];

  const businessLines = [
    'A more reliable tenant starts here',
    'Zero admin, zero liability, on your side',
  ];

  const currentLines = view === 'tenant' ? tenantLines : businessLines;

  useEffect(() => {
    setActiveLine(0);
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % currentLines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [view, currentLines.length]);


  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = Math.min(scrollY * 0.25, 80);
  const fadeOpacity = Math.max(1 - scrollY / 500, 0.4);

  return (
    <section ref={sectionRef} id="hero-section" className="w-full">
      <div
        id="hero-media-container"
        className="w-full h-[clamp(320px,60vh,620px)] overflow-hidden bg-(--ink) relative"
      >
        <img
          id="hero-image"
          src={heroImage}
          alt="South African residential community and homes"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
          style={{
            transform: `translateY(${parallaxOffset}px) scale(1.08)`,
            opacity: fadeOpacity,
            transition: 'opacity 0.2s linear',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--ink)/55 via-(--ink)/10 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14 px-5">
          <div className="max-w-[min(70ch,92vw)] mx-auto text-center">
            <div className="display text-[clamp(1.8rem,6vw,4.4rem)] text-(--parchment) tracking-[-0.03em] leading-[0.95] uppercase min-h-[clamp(3.4rem,9vw,6.4rem)] grid place-items-center w-full">
              {currentLines.map((line, idx) => {
                const isCurrent = activeLine === idx;
                return (
                  <span
                    key={`${view}-${line}`}
                    className="col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(1,0.02,0,0.85)] max-w-[32ch] text-center"
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
          </div>
        </div>
      </div>
      <div className="wrap max-w-[min(70ch,92vw)] mx-auto py-8 md:py-10 text-center flex flex-col items-center">
        <p className="text-(--ink)/70 text-[clamp(0.95rem,1.5vw,1.25rem)] font-normal max-w-[54ch] leading-relaxed">
          {view === 'tenant'
            ? 'Connect your bank account, and every on-time rent payment builds a verified record. No paperwork, no landlord involved to start.'
            : 'Join the network of landlords whose properties give tenants a reason to report, without adding any admin, paperwork, or liability to your side.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            id="hero-cta-button"
            type="button"
            onClick={() => onOpenSignup?.(view)}
            className="px-8 py-3.5 rounded-full bg-(--ink) hover:bg-[#1f1f1f] text-(--text-inverse) text-[0.95rem] font-bold transition-colors cursor-pointer"
          >
            {view === 'tenant' ? 'Start building your record' : 'Join the network'}
          </button>

          {view === 'tenant' && (
            <button
              type="button"
              onClick={() => onNavigate?.('#how-it-works')}
              className="btn-link text-[0.9rem] text-(--ink) font-bold hover:text-(--accent-fg) transition-colors py-2 px-3"
            >
              See how it works <span className="text-(--accent-fg) text-lg font-bold">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};