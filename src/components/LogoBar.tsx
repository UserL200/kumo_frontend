import React, { useState, useEffect, useRef } from 'react';
import homeImg from '../assets/images/card_home_loan_1787567124862.jpg';
import leaseImg from '../assets/images/user_lease_agreement_1787568743485.jpg';
import carLotImg from '../assets/images/user_car_dealership_1787568727128.jpg';
import bankCardsImg from '../assets/images/user_bank_cards_1787568712617.jpg';
import phoneLineupImg from '../assets/images/user_phone_contracts_1787568698147.jpg';

interface LogoBarProps {
  onNavigate?: (path: string) => void;
}

interface BenefitCardData {
  title: string;
  detail: string;
  image: string;
}

const BENEFIT_CARDS: BenefitCardData[] = [
  {
    title: 'Home Loan Approvals',
    detail: 'Qualify for prime bond interest rates when buying your first home.',
    image: homeImg,
  },
  {
    title: 'Zero Deposit Leases',
    detail: 'Skip heavy two-month rental deposits on verified tenant profiles.',
    image: leaseImg,
  },
  {
    title: 'Lower Vehicle Rates',
    detail: 'Save thousands on car financing interest and monthly repayments.',
    image: carLotImg,
  },
  {
    title: 'Higher Credit Limits',
    detail: 'Unlock premium credit cards and unsecured personal borrowing with ease.',
    image: bankCardsImg,
  },
  {
    title: 'Instant Phone Contracts',
    detail: 'Pass credit vetting instantly with all major mobile network providers.',
    image: phoneLineupImg,
  },
];

export const LogoBar: React.FC<LogoBarProps> = () => {
  const [pos, setPos] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(700);

  // Measure track width for perspective & radius
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Automatic rotation interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPos((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const n = BENEFIT_CARDS.length;
  const radius = Math.max(220, trackWidth * 0.48);

  return (
    <section id="benefits-section" className="wrap py-12 md:py-20 text-center bg-[#FFFFFF]">
      {/* Section Eyebrow & Title */}
      <div className="max-w-xl mx-auto mb-8 md:mb-12">
        <div className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#E06336] font-bold uppercase tracking-wider mb-2">
          Unlock What You Deserve
        </div>
        <h3 className="display text-[clamp(1.6rem,4vw,2.6rem)] text-[#000000] leading-tight">
          What updating & improving your score gets you
        </h3>
      </div>

      {/* 3D Carousel Container */}
      <div
        className="w-full overflow-x-clip py-6 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredCardIndex(null);
        }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="relative w-full h-[clamp(270px,40vw,340px)] mx-auto"
          style={{
            perspective: `${Math.max(500, trackWidth * 0.85)}px`,
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {BENEFIT_CARDS.map((card, i) => {
            let offset = i - (pos % n);
            while (offset > n / 2) offset -= n;
            while (offset < -n / 2) offset += n;

            const angle = (offset / n) * 75;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = (Math.cos(rad) - 1) * radius * 0.65;
            const scale = 1 - Math.min(Math.abs(offset), 1) * 0.14;
            const opacity = 1 - Math.min(Math.abs(offset), 1.5) * 0.35;
            const zIndex = Math.round(100 - Math.abs(offset) * 10);
            const isCenter = Math.abs(offset) < 0.5;
            const isCardHovered = hoveredCardIndex === i;

            return (
              <div
                key={card.title}
                id={`benefit-card-${i}`}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onMouseLeave={() => setHoveredCardIndex((curr) => (curr === i ? null : curr))}
                onClick={() => {
                  setPos(i);
                  setIsPaused(true);
                  setHoveredCardIndex(i);
                }}
                className={`group absolute left-1/2 top-1/2 w-[clamp(260px,42vw,350px)] h-[clamp(250px,36vw,320px)] rounded-[28px] md:rounded-[36px] overflow-hidden flex flex-col justify-end p-6 md:p-7 text-left cursor-pointer select-none border border-black/10 transition-all duration-700 ${
                  isCenter ? 'shadow-xl' : 'shadow-md hover:opacity-100'
                }`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                  opacity,
                  zIndex: isCardHovered ? 120 : zIndex,
                  transition:
                    'transform 1400ms cubic-bezier(0.87, 0.12, 0.11, 0.88), opacity 1400ms cubic-bezier(0.87, 0.12, 0.11, 0.88), box-shadow 300ms ease',
                }}
              >
                {/* Background Card Image with subtle zoom on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Top & Bottom Vignette Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C15]/90 via-[#0F0C15]/20 to-transparent" />
                </div>

                {/* Bottom Content Area: Specific Title as header at the bottom, description reveals ONLY for this card */}
                <div className="relative z-10 w-full flex flex-col justify-end">
                  {/* Title Header at bottom */}
                  <h4 className="display text-[clamp(1.2rem,2.2vw,1.6rem)] text-white tracking-tight uppercase leading-tight mb-2 drop-shadow-md">
                    {card.title}
                  </h4>

                  {/* Description reveals ONLY when THIS specific card is hovered/active */}
                  <div
                    className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
                    style={{
                      maxHeight: isCardHovered ? '140px' : '0px',
                      opacity: isCardHovered ? 1 : 0,
                      transform: isCardHovered ? 'translateY(0px)' : 'translateY(8px)',
                    }}
                  >
                    <div className="bg-[#0F0C15]/80 backdrop-blur-md border border-white/15 rounded-[16px] p-3.5 text-white shadow-lg mt-1">
                      <p className="text-[clamp(0.78rem,1.4vw,0.88rem)] leading-relaxed font-normal text-[#FCFBFB]/90">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Indicator Pills */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {BENEFIT_CARDS.map((card, i) => {
            const isCurrent = ((pos % n) + n) % n === i;
            return (
              <button
                key={`dot-${card.title}`}
                type="button"
                onClick={() => {
                  setPos(i);
                  setIsPaused(true);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent ? 'bg-[#E06336] w-8' : 'bg-[#000000]/20 w-2 hover:bg-[#000000]/40'
                }`}
                aria-label={`Go to ${card.title}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
