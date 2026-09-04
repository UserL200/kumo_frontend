import React from 'react';
import { KumoLogo } from './KumoLogo';

type Audience = 'tenant' | 'landlord';

interface ManifestoContent {
  eyebrow: string;
  headline: string;
  body: string[];
  closing: string;
}

const CONTENT: Record<Audience, ManifestoContent> = {
  tenant: {
    eyebrow: 'Why Kumo',
    headline: "Nobody built a system for people who pay in cash and EFT.",
    body: [
      "Credit bureaus track loans and accounts. They've never tracked rent — even though for most tenants, it's the largest, most consistent payment they make every month.",
      "Kumo reads what's already sitting in your bank statement and turns it into a record you can actually use.",
    ],
    closing: "Not new credit. The credit you already earned.",
  },
  landlord: {
    eyebrow: 'Why Kumo',
    headline: "References are just someone's word. Statements aren't.",
    body: [
      "A landlord reference varies from one call to the next — a favor, a guess, sometimes nothing at all. None of it is verifiable, and none of it is consistent.",
      "Kumo reads directly from a tenant's bank statement and verifies the pattern: on time, in full, month after month. Nothing self-reported, nothing you have to take on faith.",
    ],
    closing: "Not a favor. A record you can rely on.",
  },
};

interface ManifestoProps {
  audience?: Audience;
}

export const Manifesto: React.FC<ManifestoProps> = ({ audience = 'tenant' }) => {
  const content = CONTENT[audience];

  return (
    <section id="about" className="wrap py-14 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-center">
        {/* Copy column */}
        <div className="max-w-[50ch]">
          <span className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-bold text-(--accent-fg) uppercase tracking-wider mb-3 inline-block">
            {content.eyebrow}
          </span>

          <h2 className="display text-[clamp(1.6rem,3.4vw,2.4rem)] text-(--ink) leading-[1.25] mb-6">
            {content.headline}
          </h2>

          {content.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-(--ink)/65 text-[clamp(0.95rem,1.3vw,1.05rem)] leading-relaxed max-w-[46ch] mb-4 last:mb-8"
            >
              {paragraph}
            </p>
          ))}

          <p className="font-semibold text-(--ink) text-[clamp(1rem,1.6vw,1.15rem)] leading-snug border-l-2 border-(--accent-fg) pl-4">
            {content.closing}
          </p>
        </div>

        {/* Visual column — small, quiet, no bleed / no rotation */}
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-(--parchment) border border-(--ink)/8 flex items-center justify-center">
            <KumoLogo size={72} className="text-(--ink)/70" />
          </div>
        </div>
      </div>
    </section>
  );
};