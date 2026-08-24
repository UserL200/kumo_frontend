import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
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

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section id="faq" className="wrap py-12 md:py-16 bg-[#FFFFFF]">
      <h3 className="display text-[clamp(1.6rem,4vw,2.5rem)] text-[#000000] mb-6">
        Frequently asked questions
      </h3>

      <div className="border-t border-[#000000]/10">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={`faq-${item.question}`}
              id={`faq-item-${idx}`}
              className="border-b border-[#000000]/10"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-[clamp(0.95rem,2vw,1.25rem)] text-[#000000] pr-4 group-hover:text-[#E06336] transition-colors">
                  {item.question}
                </span>
                <span
                  className="text-2xl font-light text-[#E06336] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                <p className="text-[#000000]/75 text-[clamp(0.85rem,1.5vw,1rem)] leading-relaxed pb-6 max-w-[65ch]">
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
