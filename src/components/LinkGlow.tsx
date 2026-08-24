import React from 'react';

interface LinkGlowProps {
  onNavigate?: (path: string) => void;
}

export const LinkGlow: React.FC<LinkGlowProps> = ({ onNavigate }) => {
  return (
    <section id="security" className="wrap py-12 md:py-16">
      <div className="relative rounded-[32px] md:rounded-[40px] bg-[#0F0C15] text-[#FCFBFB] overflow-hidden px-6 md:px-14 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center shadow-2xl">
        {/* Glowing Cyan and Lime Ambient Blobs */}
        <div
          className="absolute -top-28 -left-20 w-[26rem] h-[26rem] rounded-full bg-[#59FCF9] opacity-45 pointer-events-none"
          style={{ filter: 'blur(70px)' }}
        />
        <div
          className="absolute -bottom-24 -right-16 w-[20rem] h-[20rem] rounded-full bg-[#DAFF35] opacity-45 pointer-events-none"
          style={{ filter: 'blur(70px)' }}
        />

        {/* Left: Copy */}
        <div className="relative z-10 flex flex-col items-start min-w-0">
          <div className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-bold text-[#DAFF35] uppercase tracking-wider mb-3">
            bank-grade security
          </div>
          <h2 className="display text-[clamp(1.8rem,4.5vw,3rem)] text-[#FCFBFB] mb-4 max-w-[14ch]">
            your data, only ever used for your record
          </h2>
          <p className="text-[#FCFBFB]/60 text-[clamp(0.9rem,1.4vw,1.1rem)] leading-relaxed max-w-[40ch] mb-6">
            we never see your login details, and you can disconnect at any time. licensed verification partners handle every connection.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('#security')}
            className="btn-link text-[#FCFBFB] text-[0.9rem] font-medium hover:opacity-90"
          >
            read our security overview <span className="text-[#59FCF9] text-lg font-normal">→</span>
          </button>
        </div>

        {/* Right: Floating Bank/Bureau Tiles */}
        <div className="relative z-10 flex flex-col gap-3 w-full max-w-xs mx-auto">
          <div className="flex items-center justify-between bg-white/[0.08] border border-white/[0.15] rounded-[16px] px-5 py-4 backdrop-blur-md text-[#FCFBFB] shadow-lg animate-float-1">
            <span className="font-semibold text-[0.95rem]">FNB •• 4821</span>
            <span className="text-[0.75rem] font-medium px-2.5 py-1 rounded-full bg-[#DAFF35]/20 text-[#DAFF35]">
              linked
            </span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.08] border border-white/[0.15] rounded-[16px] px-5 py-4 backdrop-blur-md text-[#FCFBFB] shadow-lg animate-float-2">
            <span className="font-semibold text-[0.95rem]">Capitec •• 0093</span>
            <span className="text-[0.75rem] font-medium px-2.5 py-1 rounded-full bg-[#59FCF9]/20 text-[#59FCF9]">
              linked
            </span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.08] border border-white/[0.15] rounded-[16px] px-5 py-4 backdrop-blur-md text-[#FCFBFB] shadow-lg animate-float-3">
            <span className="font-semibold text-[0.95rem]">TransUnion</span>
            <span className="text-[0.75rem] font-medium px-2.5 py-1 rounded-full bg-white/20 text-[#FCFBFB]">
              reporting
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
