import React, { useState } from 'react';

interface FlipTileData {
  front: string;
  back: string;
  pastelBg: string;
}

const TILES: FlipTileData[] = [
  {
    front: 'informal leases',
    back: 'no formal lease? we detect the payment pattern, not the paperwork.',
    pastelBg: '#F8FFDA',
  },
  {
    front: 'shared housing',
    back: 'splitting rent with roommates? report your own portion of the payment.',
    pastelBg: '#FDDCC9',
  },
  {
    front: 'backyard rentals',
    back: 'informal backyard units count too, as long as the payment is traceable.',
    pastelBg: '#EAE7FC',
  },
  {
    front: 'student housing',
    back: "building credit history before you've even graduated.",
    pastelBg: '#F8FFDA',
  },
  {
    front: 'no lease on file',
    back: 'no signed lease needed — your bank statement is the record.',
    pastelBg: '#FDDCC9',
  },
  {
    front: 'first-time renters',
    back: 'start your credit file from your very first month of rent.',
    pastelBg: '#EAE7FC',
  },
];

export const FlipGrid: React.FC = () => {
  const [openTiles, setOpenTiles] = useState<{ [key: number]: boolean }>({});

  const toggleTile = (index: number) => {
    setOpenTiles((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="directory-grid" className="wrap py-12 md:py-16">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="display text-[clamp(1.6rem,4vw,2.5rem)] text-[#0F0C15] mb-2">
          built for how south africans actually rent
        </h3>
        <p className="text-[#0F0C15]/50 text-[0.8rem]">hover or tap a card</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {TILES.map((tile, idx) => {
          const isOpen = !!openTiles[idx];
          return (
            <div
              key={tile.front}
              id={`flip-tile-${idx}`}
              onClick={() => toggleTile(idx)}
              className="group aspect-[4/3] rounded-[16px] md:rounded-[24px] cursor-pointer select-none"
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative w-full h-full rounded-[16px] md:rounded-[24px] transition-transform duration-500 ease-[cubic-bezier(0.38,0.92,0.18,1)] ${
                  isOpen ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Face */}
                <div
                  className="absolute inset-0 rounded-[16px] md:rounded-[24px] flex items-center justify-center p-4 md:p-6 text-center font-bold text-[clamp(0.85rem,2vw,1.1rem)] text-[#0F0C15] shadow-sm border border-[#0F0C15]/[0.05]"
                  style={{
                    backgroundColor: tile.pastelBg,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <span>{tile.front}</span>
                </div>

                {/* Back Face */}
                <div
                  className="absolute inset-0 rounded-[16px] md:rounded-[24px] bg-[#0F0C15] text-[#FCFBFB] flex items-center justify-center p-4 md:p-6 text-center text-[clamp(0.7rem,1.5vw,0.85rem)] leading-relaxed shadow-md"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p>{tile.back}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
