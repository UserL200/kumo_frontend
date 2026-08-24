import React, { useState } from 'react';

interface ExpandCardData {
  label: string;
  bg: string;
  textColor: string;
}

const CARDS: ExpandCardData[] = [
  { label: 'attracts reliable tenants', bg: '#F8FFDA', textColor: '#0F0C15' },
  { label: 'zero admin burden', bg: '#FDDCC9', textColor: '#0F0C15' },
  { label: 'no data shared with you', bg: '#EAE7FC', textColor: '#0F0C15' },
  { label: 'no liability added', bg: '#FCFBFB', textColor: '#0F0C15' },
  { label: 'free to list', bg: '#F8FFDA', textColor: '#0F0C15' },
  { label: 'tenant-led, always', bg: '#0F0C15', textColor: '#FCFBFB' },
];

export const ExpandGrid: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="expand-grid-section" className="wrap py-12 md:py-16">
      <h3 className="display text-[clamp(1.4rem,3.5vw,2.2rem)] text-[#0F0C15] mb-6">
        why landlords join the network
      </h3>

      {/* Desktop Expanding Cards (Hidden on Mobile) */}
      <div
        id="desktop-expand-cards"
        onMouseLeave={() => setHoveredIndex(null)}
        className="hidden md:flex gap-3 h-[clamp(280px,36vh,420px)] w-full rounded-[24px] overflow-hidden p-1 bg-[#F5F4F4]"
      >
        {CARDS.map((card, index) => {
          let flexValue = 1;
          if (hoveredIndex !== null) {
            flexValue = hoveredIndex === index ? 6 : 2;
          }

          const isCollapsedTextHidden = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <div
              key={card.label}
              id={`expand-card-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative h-full flex flex-col justify-end p-6 select-none transition-all duration-700 rounded-[20px] cursor-pointer shadow-sm overflow-hidden"
              style={{
                flex: flexValue,
                backgroundColor: card.bg,
                color: card.textColor,
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <span
                className={`display text-[clamp(0.95rem,2vw,1.4rem)] leading-tight uppercase transition-opacity duration-300 max-w-[12ch] ${
                  isCollapsedTextHidden ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {card.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Stacked Cards (Visible on Mobile) */}
      <div id="mobile-expand-cards" className="flex md:hidden flex-col gap-2.5">
        {CARDS.map((card, index) => (
          <div
            key={`mobile-${card.label}`}
            id={`mobile-expand-card-${index}`}
            className="min-h-[76px] flex items-center p-5 rounded-[16px] select-none shadow-sm"
            style={{
              backgroundColor: card.bg,
              color: card.textColor,
            }}
          >
            <span className="display text-[1rem] leading-snug uppercase">
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
