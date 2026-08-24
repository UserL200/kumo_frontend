import React from 'react';
import propertyImage from '../assets/images/bank_security_visual_1787470823806.jpg';

interface BusinessSplitProps {
  onOpenSignup?: () => void;
}

export const BusinessSplit: React.FC<BusinessSplitProps> = ({ onOpenSignup }) => {
  return (
    <section id="business-split" className="wrap py-12 md:py-16 bg-[#FFFFFF]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left Column: Copy */}
        <div className="flex flex-col items-start min-w-0">
          <div className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-bold text-[#E06336] uppercase tracking-wider mb-2">
            No work for you
          </div>
          <h2 className="display text-[clamp(1.8rem,4.5vw,3rem)] text-[#000000] mb-4 max-w-[14ch]">
            You don't do anything. That's the point.
          </h2>
          <p className="text-[#000000]/75 text-[clamp(0.9rem,1.4vw,1.1rem)] leading-relaxed max-w-[44ch] mb-8">
            Tenants opt in and connect their own bank account. You're not asked to confirm payments, share records, or take on any reporting responsibility.
          </p>
          <button
            type="button"
            onClick={() => onOpenSignup?.()}
            className="px-8 py-3.5 rounded-full bg-[#E06336] hover:bg-[#c95126] text-white text-[0.95rem] font-bold transition-all active:scale-98 cursor-pointer shadow-md"
          >
            Learn more
          </button>
        </div>

        {/* Right Column: Property Media */}
        <div className="aspect-square rounded-[32px] overflow-hidden bg-[#FFFFFF] relative border border-black/10 shadow-lg group">
          <img
            src={propertyImage}
            alt="Verified property and landlord protection"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
