import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'does my landlord need to be involved',
    answer:
      "no. this is entirely between you and your bank connection. your landlord never needs to sign up, confirm anything, or even know you're using it.",
  },
  {
    question: 'is this a loan or line of credit',
    answer:
      "no. we don't extend credit or lend money. we only detect and report your existing rent payments to the credit bureaus.",
  },
  {
    question: 'is my banking information safe',
    answer:
      'yes. we use bank-grade, licensed verification partners and never store your banking login details.',
  },
  {
    question: 'which south african banks are supported',
    answer:
      'we support all major south african banks including capitec, fnb, standard bank, nedbank, absa, tymebank, and discovery bank through licensed open banking protocols.',
  },
  {
    question: 'what happens if i move to a new property',
    answer:
      'your rent history moves with you. when you start paying rent to a new account, simply confirm the new recurring payment in your kumo dashboard.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section id="faq" className="wrap py-12 md:py-16">
      <h3 className="display text-[clamp(1.6rem,4vw,2.5rem)] text-[#0F0C15] mb-6">
        frequently asked
      </h3>

      <div className="border-t border-[#0F0C15]">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={`faq-${item.question}`}
              id={`faq-item-${idx}`}
              className="border-b border-[#0F0C15]"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-[clamp(0.95rem,2vw,1.25rem)] text-[#0F0C15] pr-4">
                  {item.question}
                </span>
                <span
                  className="text-2xl font-light text-[#0F0C15] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                <p className="text-[#0F0C15]/60 text-[clamp(0.85rem,1.5vw,1rem)] leading-relaxed pb-6 max-w-[65ch]">
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
