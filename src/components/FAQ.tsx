import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  view: 'tenant' | 'business';
}

const TENANT_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Does my landlord need to be involved?',
    answer:
      "No. This is entirely between you and your bank connection. Your landlord never needs to sign up, confirm anything, or even know you're using it.",
  },
  {
    question: 'Is this a loan or line of credit?',
    answer:
      "No. We don't extend credit or lend money. We only detect and report your existing rent payments to the credit bureaus.",
  },
  {
    question: 'Is my banking information safe?',
    answer:
      'Yes. We use bank-grade, licensed verification partners and never store your banking login details.',
  },
  {
    question: 'Which South African banks are supported?',
    answer:
      'We support all major South African banks including Capitec, FNB, Standard Bank, Nedbank, Absa, TymeBank, and Discovery Bank through licensed open banking protocols.',
  },
  {
    question: 'What happens if I move to a new property?',
    answer:
      'Your rent history moves with you. When you start paying rent to a new account, simply confirm the new recurring payment in your Kumo dashboard.',
  },
];

const BUSINESS_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Do I need to do anything as a landlord?',
    answer:
      "No. There's zero admin on your side. Your tenants can use Kumo independently after list your properties, and nothing is required from you for them to do it.",
  },
  {
    question: "Will I see my tenant's banking information or payment history?",
    answer:
      "No. Nothing about your tenant's bank data or payment history is shared with you. Verification happens entirely between the tenant and Kumo.",
  },
  {
    question: "Am I liable if a tenant's payment is late or disputed on Kumo?",
    answer:
      "No. Kumo creates no liability on your side. Any dispute over a payment is between the tenant and Kumo, not something that involves you.",
  },
  {
    question: 'Why would this benefit me as a landlord?',
    answer:
      'Tenants using Kumo have a direct incentive to pay rent consistently and on time, since that history is what builds their record. It gives tenants a reason to stay reliable, without adding anything to your workload.',
  },
  {
    question: 'Does listing my properties cost anything?',
    answer:
      "No, listing your properties is free. It's entirely optional and doesn't change anything about how your tenants use Kumo.",
  },
];

export const FAQ: React.FC<FAQProps> = ({ view }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = view === 'tenant' ? TENANT_FAQ_ITEMS : BUSINESS_FAQ_ITEMS;

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section id="faq" className="wrap py-12 md:py-16 bg-(--parchment)">
      <h3 className="display text-[clamp(1.6rem,4vw,2.5rem)] text-(--ink) mb-6">
        Frequently asked questions
      </h3>

      <div className="border-t border-(--ink)/10">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={`faq-${view}-${item.question}`}
              id={`faq-item-${idx}`}
              className="border-b border-(--ink)/10"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-[clamp(0.95rem,2vw,1.25rem)] text-(--ink) pr-4 group-hover:text-(--accent-fg-hover) transition-colors">
                  {item.question}
                </span>
                <span
                  className="text-2xl font-light text-(--accent-fg) shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  maxHeight: isOpen ? '300px' : '0px',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="text-(--ink)/75 text-[clamp(0.85rem,1.5vw,1rem)] leading-relaxed pb-6 max-w-[65ch]">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};