import React, { useState } from 'react';

interface ExpandGridProps {
  onNavigate?: (path: string) => void;
  view: 'tenant' | 'business';
}

interface CardData {
  label: string;
  bg: string;
  textColor: string;
}

const CARD_BACKGROUNDS = [
  '#EAF3DE', // surface-2
  '#FCE7CC', // peach tint
  '#D6F0F6', // blue tint
  '#F5F6EF', // surface-1
  '#EAF3DE', // surface-2
  '#0E2203', // ink
];

const TENANT_LABELS = [
  'informal leases',
  'shared housing',
  'backyard rentals',
  'student housing',
  'no lease on file',
  'first-time renters',
];

const BUSINESS_LABELS = [
  'attracts reliable tenants',
  'zero admin burden',
  'no data shared with you',
  'no liability added',
  'free to list',
  'tenant-led, always',
];

export const ExpandGrid: React.FC<ExpandGridProps> = ({ onNavigate, view }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const labels = view === 'tenant' ? TENANT_LABELS : BUSINESS_LABELS;

  const cards: CardData[] = labels.map((label, idx) => ({
    label,
    bg: CARD_BACKGROUNDS[idx],
    textColor: idx === 5 ? '#EAF3DE' : '#0E2203',
  }));

  return (
    <section id="expand-grid-section" className="bg-[#FCFBF7] py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-14">
        {/* Desktop Container (768px+): Row with 24px container radius & hover-expand */}
        <div
          id="expand-grid-desktop"
          className="hidden md:flex h-[280px] w-full rounded-[24px] overflow-hidden border border-[#0E2203]/[0.08]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            const flexValue = hoveredIndex === null ? 1 : isHovered ? 2.4 : 1;

            return (
              <div
                key={`${view}-${index}-${card.label}`}
                id={`expand-card-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative h-full flex flex-col justify-end p-5 select-none transition-[flex] cursor-pointer min-w-0"
                style={{
                  flex: flexValue,
                  backgroundColor: card.bg,
                  color: card.textColor,
                  transitionDuration: '700ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <span className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-semibold leading-snug break-words">
                  {card.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Container (<768px): Stack vertically, fixed 72px per card, no hover-expand */}
        <div
          id="expand-grid-mobile"
          className="md:hidden flex flex-col w-full rounded-[24px] overflow-hidden border border-[#0E2203]/[0.08]"
        >
          {cards.map((card, index) => (
            <div
              key={`mobile-${view}-${index}-${card.label}`}
              id={`mobile-expand-card-${index}`}
              className="h-[72px] flex items-end p-5 select-none min-w-0"
              style={{
                backgroundColor: card.bg,
                color: card.textColor,
              }}
            >
              <span className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-semibold leading-snug break-words">
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
