import React, { useState } from 'react';
import homeImg from '../assets/images/card_home_loan_1787567124862.webp';
import leaseImg from '../assets/images/user_lease_agreement_1787568743485.jpg';
import carLotImg from '../assets/images/user_car_dealership_1787568727128.webp';
import bankCardsImg from '../assets/images/user_bank_cards_1787568712617.jpg';
import phoneLineupImg from '../assets/images/user_phone_contracts_1787568698147.jpeg';

interface LogoBarProps {
  onNavigate?: (path: string) => void;
}

interface BenefitCardData {
  title: string;
  detail: string;
  image: string;
  rotate: number;
}

const BENEFIT_CARDS: BenefitCardData[] = [
  {
    title: 'Phone Contracts',
    detail: 'Pass credit vetting instantly with all major mobile network providers.',
    image: phoneLineupImg,
    rotate: -3,
  },
  {
    title: 'Vehicle Financing',
    detail: 'Save thousands on car financing interest and monthly repayments.',
    image: carLotImg,
    rotate: -2,
  },
  {
    title: 'Higher Credit Limits',
    detail: 'Unlock premium credit cards and unsecured personal borrowing with ease.',
    image: bankCardsImg,
    rotate: 4,
  },
  {
    title: 'Home Loans',
    detail: 'Qualify for prime bond interest rates when buying your first home.',
    image: homeImg,
    rotate: -4,
  },
  {
    title: 'Zero-Deposit Leases',
    detail: 'Skip heavy two-month rental deposits on verified tenant profiles.',
    image: leaseImg,
    rotate: 3,
  },
];

export const LogoBar: React.FC<LogoBarProps> = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="benefits-section" className="wrap py-12 md:py-20 text-center bg-[#FFFFFF]">
      {/* Section Eyebrow & Title */}
      <div className="max-w-xl mx-auto mb-10 md:mb-14">
        <div className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#E06336] font-bold uppercase tracking-wider mb-2">
          Unlock What You Deserve
        </div>
        <h3 className="display text-[clamp(1.6rem,4vw,2.6rem)] text-[#000000] leading-tight">
          What updating & improving your score gets you
        </h3>
      </div>

      {/* Flat Tilted Card Row */}
      <div className="flex flex-wrap justify-center items-start gap-x-6 gap-y-14 md:gap-x-10 px-2">
        {BENEFIT_CARDS.map((card, i) => {
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={card.title}
              id={`benefit-card-${i}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex((curr) => (curr === i ? null : curr))}
              className="relative w-[clamp(210px,26vw,270px)] h-[clamp(260px,32vw,340px)] rounded-[28px] overflow-hidden cursor-pointer select-none border border-black/10"
              style={{
                transform: isHovered
                  ? 'rotate(0deg) translateY(-6px) scale(1.04)'
                  : `rotate(${card.rotate}deg)`,
                boxShadow: isHovered
                  ? '0 20px 40px -12px rgba(0,0,0,0.28)'
                  : '0 10px 24px -10px rgba(0,0,0,0.18)',
                transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms ease',
                zIndex: isHovered ? 20 : 1,
              }}
            >
              {/* Background Photo */}
              <img
                src={card.image}
                alt={card.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Centered White Label Box */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div
                  className="bg-white rounded-2xl px-5 py-4 shadow-lg max-w-[85%] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  <div className="font-bold text-[clamp(0.9rem,1.6vw,1.05rem)] text-[#000000] leading-tight">
                    {card.title}
                  </div>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      maxHeight: isHovered ? '120px' : '0px',
                      opacity: isHovered ? 1 : 0,
                      marginTop: isHovered ? '0.5rem' : '0px',
                    }}
                  >
                    <p className="text-[0.75rem] text-[#000000]/70 leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};