import React, { useState } from 'react';

interface FlipTileData {
  front: string;
  back: string;
  pastelBg: string;
}

const TILES: FlipTileData[] = [
  {
    front: 'Informal Leases',
    back: 'No formal lease? We detect the payment pattern, not the paperwork.',
    pastelBg: '#AFE7FC',
  },
  {
    front: 'Shared Housing',
    back: 'Splitting rent with roommates? Report your own portion of the payment.',
    pastelBg: '#D8F0D7',
  },
  {
    front: 'Backyard Rentals',
    back: 'Informal backyard units count too, as long as the payment is traceable.',
    pastelBg: '#FCE6DD',
  },
  {
    front: 'Student Housing',
    back: "Building credit history before you've even graduated.",
    pastelBg: '#AFE7FC',
  },
  {
    front: 'No Lease on File',
    back: 'No signed lease needed: your bank statement is the record.',
    pastelBg: '#D8F0D7',
  },
  {
    front: 'First-Time Renters',
    back: 'Start your credit file from your very first month of rent.',
    pastelBg: '#FCE6DD',
  },
];

export const FlipGrid: React.FC = () => {
  const [openTiles, setOpenTiles] = useState<{ [key: number]: boolean }>({});

  const toggleTile = (index: number) => {
    setOpenTiles((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="directory-grid" className="wrap py-12 md:py-16 bg-[#FFFFFF]">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="display text-[clamp(1.6rem,4vw,2.5rem)] text-[#000000] mb-2">
          Built for how South Africans actually rent
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {TILES.map((tile, idx) => {
          const isOpen = !!openTiles[idx];
          return (
            <div
              key={tile.front}
              id={`flip-tile-${idx}`}
              onClick={() => toggleTile(idx)}
              className="group aspect-[4/3] rounded-[20px] md:rounded-[28px] cursor-pointer select-none"
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative w-full h-full rounded-[20px] md:rounded-[28px] transition-transform duration-500 ease-[cubic-bezier(0.38,0.92,0.18,1)] ${
                  isOpen ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Face */}
                <div
                  className="absolute inset-0 rounded-[20px] md:rounded-[28px] flex items-center justify-center p-4 md:p-6 text-center font-black text-[clamp(0.95rem,2vw,1.25rem)] text-[#000000] shadow-sm border border-[#000000]/10"
                  style={{
                    backgroundColor: tile.pastelBg,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <span>{tile.front}</span>
                </div>

                {/* Back Face */}
                <div
                  className="absolute inset-0 rounded-[20px] md:rounded-[28px] bg-[#000000] text-[#FFFFFF] border border-white/20 flex items-center justify-center p-4 md:p-6 text-center text-[clamp(0.75rem,1.5vw,0.9rem)] leading-relaxed shadow-md"
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
