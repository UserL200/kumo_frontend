import React from 'react';
import { Reveal } from './Reveal';
import homeImg from '../assets/images/card_home_loan_1787567124862.webp';
import leaseImg from '../assets/images/user_lease_agreement_1787568743485.jpg';
import carLotImg from '../assets/images/user_car_dealership_1787568727128.webp';
import bankCardsImg from '../assets/images/markus-winkler-DJoG5GsXfMw-unsplash.jpg';
import phoneLineupImg from '../assets/images/georgiy-lyamin-PkmlAbLdRhc-unsplash.jpg';

interface LogoBarProps {
  onNavigate?: (path: string) => void;
}

interface BenefitRowData {
  title: string;
  detail: string;
  image: string;
  linkLabel: string;
}

const BENEFITS: BenefitRowData[] = [
  {
    title: 'Phone contracts',
    detail: 'Pass credit vetting instantly with all major mobile network providers.',
    image: phoneLineupImg,
    linkLabel: 'Explore phone contracts',
  },
  {
    title: 'Vehicle financing',
    detail: 'Save thousands on car financing interest and monthly repayments.',
    image: carLotImg,
    linkLabel: 'Explore vehicle financing',
  },
  {
    title: 'Higher credit limits',
    detail: 'Unlock premium credit cards and unsecured personal borrowing with ease.',
    image: bankCardsImg,
    linkLabel: 'Explore credit limits',
  },
  {
    title: 'Home loans',
    detail: 'Qualify for prime bond interest rates when buying your first home.',
    image: homeImg,
    linkLabel: 'Explore home loans',
  },
  {
    title: 'Zero-deposit leases',
    detail: 'Skip heavy two-month rental deposits on verified tenant profiles.',
    image: leaseImg,
    linkLabel: 'Explore rental leases',
  },
];

export const LogoBar: React.FC<LogoBarProps> = () => {
  return (
    <section id="benefits-section" className="wrap py-14 md:py-24">
      <div className="max-w-xl mb-14 md:mb-20">
        <span className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-bold text-(--accent-fg) uppercase tracking-wider mb-3 inline-block">
          What your record unlocks
        </span>
        <h3 className="display text-[clamp(1.5rem,3vw,2.2rem)] text-(--ink) leading-[1.25]">
          What updating your score gets you
        </h3>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {BENEFITS.map((item, i) => {
          const imageOnRight = i % 2 === 0;
          return (
            <Reveal key={item.title}>
              <div
                id={`benefit-row-${i}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                <div className={imageOnRight ? 'order-1' : 'order-1 lg:order-2'}>
                  <h4 className="display text-[clamp(1.1rem,1.8vw,1.35rem)] text-(--ink) mb-3">
                    {item.title}
                  </h4>
                  <p className="text-(--ink)/60 text-[clamp(0.9rem,1.2vw,1rem)] leading-relaxed max-w-[40ch] mb-5">
                    {item.detail}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-(--accent-fg) text-[0.9rem] font-medium hover:text-(--accent-fg-hover) transition-colors"
                  >
                    {item.linkLabel} <span className="text-lg">→</span>
                  </a>
                </div>

                <div
                  className={`rounded-[16px] overflow-hidden bg-(--parchment) border border-(--ink)/8 aspect-[4/3] ${
                    imageOnRight ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};