import React from 'react';

interface LogoBarProps {
  onNavigate?: (path: string) => void;
}

interface PartnerChip {
  name: string;
  bg: string;
  textColor: string;
}

const CHIPS: PartnerChip[] = [
  { name: 'TransUnion', bg: 'bg-[#EAF3DE]', textColor: 'text-[#0E2203]' },
  { name: 'TPN', bg: 'bg-[#FCE7CC]', textColor: 'text-[#0E2203]' },
  { name: 'Stitch', bg: 'bg-[#D6F0F6]', textColor: 'text-[#0E2203]' },
  { name: 'truID', bg: 'bg-[#0E2203]', textColor: 'text-[#EAF3DE]' },
];

export const LogoBar: React.FC<LogoBarProps> = () => {
  // Duplicate set once for seamless loop
  const loopChips = [...CHIPS, ...CHIPS, ...CHIPS, ...CHIPS];

  return (
    <section id="logobar-section" className="bg-[#FCFBF7] py-12 overflow-hidden w-full">
      <div className="max-w-6xl mx-auto px-5 md:px-14 mb-8 text-center min-w-0">
        <p
          id="logobar-eyebrow"
          className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203]/[0.55] font-normal"
        >
          works with the bureaus and banks you already use
        </p>
      </div>

      <div className="w-full overflow-hidden flex justify-center">
        <div className="animate-logo-loop flex gap-6 px-4">
          {loopChips.map((chip, index) => (
            <div
              key={`${chip.name}-${index}`}
              id={`partner-chip-${index}`}
              className={`w-[140px] h-[140px] rounded-[24px] shrink-0 flex items-center justify-center font-semibold text-[clamp(0.85rem,1.4vw,1rem)] select-none ${chip.bg} ${chip.textColor}`}
            >
              {chip.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
