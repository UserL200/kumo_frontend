import React from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="kumo-footer"
      className="bg-[#0F0C15] text-[#FCFBFB] pt-16 pb-8 overflow-hidden relative"
    >
      <div className="wrap">
        {/* Top Grid */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[5fr_7fr] gap-12 mb-12">
          {/* Brand Blurb */}
          <div className="flex flex-col items-start pr-4 max-w-md">
            <span className="logo display text-[2rem] text-[#FCFBFB] mb-4">
              kumo
            </span>
            <p className="text-[#FCFBFB]/55 text-[0.85rem] leading-relaxed mb-4">
              Kumo is South Africa's tenant-initiated rent reporting platform. We enable renters across formal and informal housing to build verified payment records without landlord involvement.
            </p>
            <div className="text-[0.75rem] font-bold text-[#DAFF35] tracking-wide mt-2">
              Kumo, by Mohoka Solutions (Pty) Ltd
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-[#FCFBFB]/40 mb-4">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-[0.85rem]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#about')}
                    className="text-[#FCFBFB]/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#careers')}
                    className="text-[#FCFBFB]/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Careers
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-[#FCFBFB]/40 mb-4">
                Product
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-[0.85rem]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#record')}
                    className="text-[#FCFBFB]/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Record
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#how-it-works')}
                    className="text-[#FCFBFB]/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    How it works
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-[#FCFBFB]/40 mb-4">
                Legal
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-[0.85rem]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#terms')}
                    className="text-[#FCFBFB]/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Terms
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#privacy')}
                    className="text-[#FCFBFB]/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('#popia')}
                    className="text-[#FCFBFB]/60 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    POPIA Compliance
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-[#FCFBFB]/40 pt-6 border-t border-[#FCFBFB]/10">
          <div>© 2026 Mohoka Solutions (Pty) Ltd. All rights reserved.</div>
          <div>Built for South African Renters</div>
        </div>

        {/* Giant Ghost Watermark Wordmark */}
        <div className="text-center overflow-hidden select-none pointer-events-none mt-6 -mb-4">
          <span className="display text-[14vw] leading-none text-[#FCFBFB]/[0.07] tracking-tight block">
            KUMO
          </span>
        </div>
      </div>
    </footer>
  );
};
