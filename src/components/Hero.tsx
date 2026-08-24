import React from 'react';
import heroImage from '../assets/images/hero_housing_1787469471730.jpg';

interface HeroProps {
  onNavigate?: (path: string) => void;
  onOpenSignup?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenSignup }) => {
  return (
    <section
      id="hero-section"
      className="bg-[#0E2203] text-white rounded-b-[40px] rounded-t-0 py-12 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-14">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center min-w-0">
          {/* Pill badge */}
          <div
            id="hero-pill-badge"
            className="bg-[#C3E85C] text-[#28390d] text-[clamp(0.72rem,1.6vw,0.85rem)] px-4 py-2 rounded-full font-medium mb-8 inline-block"
          >
            verified rent history, no landlord needed
          </div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="text-[clamp(1.9rem,6vw,3.6rem)] font-bold tracking-[-0.03em] leading-[0.92] text-white font-['Georgia',_'Times_New_Roman',_serif] mb-6"
          >
            your rent payments should count for something
          </h1>

          {/* Paragraph */}
          <p
            id="hero-description"
            className="text-[clamp(1rem,2vw,1.25rem)] text-[#EAF3DE]/60 max-w-lg mb-8 leading-[1.5]"
          >
            connect your bank account, and every on-time rent payment builds a verified record with the credit bureaus. no paperwork, no landlord involved.
          </p>

          {/* Button */}
          <button
            id="hero-cta-button"
            type="button"
            onClick={() => onOpenSignup?.()}
            className="bg-[#2F6E2E] text-white px-6 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer mb-12"
          >
            start building your record
          </button>

          {/* Hero image container */}
          <div
            id="hero-media-container"
            className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/8] rounded-[24px] border border-[#EAF3DE]/10 overflow-hidden relative shadow-2xl bg-[#142e06]"
          >
            <img
              id="hero-image"
              src={heroImage}
              alt="South African residential homes and neighborhood community"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2203]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
