import React from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="kumo-footer" className="bg-[#0E2203] text-[#EAF3DE] pt-16 pb-12 overflow-x-hidden w-full">
      <div className="max-w-6xl mx-auto px-5 md:px-14 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-16 min-w-0">
          {/* Brand Blurb */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start pr-4 min-w-0">
            <span className="text-[clamp(1.3rem,3.2vw,1.9rem)] font-bold tracking-[-0.03em] leading-[0.92] text-white font-['Georgia',_'Times_New_Roman',_serif] mb-4">
              kumo
            </span>
            <p className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/60 leading-[1.5] max-w-sm mb-4 break-words">
              a south african tenant-initiated rent reporting platform by mohoka solutions (pty) ltd. link your bank account, verify recurring rent payments, and build a verified record with credit bureaus.
            </p>
            <span className="text-[clamp(0.64rem,1.2vw,0.7rem)] text-[#EAF3DE]/40">
              ncr & popia compliant reporting
            </span>
          </div>

          {/* Column 1: Platform */}
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[clamp(0.64rem,1.2vw,0.7rem)] font-semibold text-[#EAF3DE]/40 tracking-wider">
              platform
            </span>
            <button
              type="button"
              onClick={() => onNavigate?.('#overview')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              overview
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('#partners')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              bank partners
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('#bureaus')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              bureau reporting
            </button>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[clamp(0.64rem,1.2vw,0.7rem)] font-semibold text-[#EAF3DE]/40 tracking-wider">
              product
            </span>
            <button
              type="button"
              onClick={() => onNavigate?.('#record')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              record
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('#how-it-works')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              how it works
            </button>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[clamp(0.64rem,1.2vw,0.7rem)] font-semibold text-[#EAF3DE]/40 tracking-wider">
              company
            </span>
            <button
              type="button"
              onClick={() => onNavigate?.('#about')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              about
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('#careers')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              careers
            </button>
          </div>

          {/* Column 4: Legal & Jurisdiction */}
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[clamp(0.64rem,1.2vw,0.7rem)] font-semibold text-[#EAF3DE]/40 tracking-wider">
              legal
            </span>
            <button
              type="button"
              onClick={() => onNavigate?.('#terms')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              terms
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('#privacy')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              privacy
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('#popia')}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#EAF3DE]/80 hover:text-white text-left transition-colors cursor-pointer break-words"
            >
              popia compliance
            </button>
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="border-t border-[#EAF3DE]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[clamp(0.64rem,1.2vw,0.7rem)] text-[#EAF3DE]/40 min-w-0">
          <p className="break-words min-w-0">
            © 2026 mohoka solutions (pty) ltd. all rights reserved. kumo does not extend credit or lend money.
          </p>
          <p className="shrink-0">south africa</p>
        </div>
      </div>
    </footer>
  );
};
