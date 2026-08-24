import React, { useState } from 'react';

interface FAQProps {
  onNavigate?: (path: string) => void;
}

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
];

export const FAQ: React.FC<FAQProps> = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq-section" className="bg-[#FCFBF7] py-12 md:py-24 w-full">
      <div className="max-w-6xl mx-auto px-5 md:px-14">
        <h2
          id="faq-headline"
          className="text-[clamp(1.3rem,3.2vw,1.9rem)] font-bold tracking-[-0.03em] leading-[0.92] text-[#0E2203] font-['Georgia',_'Times_New_Roman',_serif] mb-12"
        >
          frequently asked
        </h2>

        <div className="flex flex-col min-w-0">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={`faq-${idx}`}
                id={`faq-item-${idx}`}
                className="border-t border-b border-[#0E2203]/[0.12] -mt-[1px] min-w-0"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer select-none group min-w-0"
                  aria-expanded={isOpen}
                >
                  <span className="text-[clamp(0.85rem,1.4vw,1rem)] font-medium text-[#0E2203] min-w-0 pr-2">
                    {item.question}
                  </span>
                  <span
                    className="text-[clamp(1.2rem,3vw,1.6rem)] font-light text-[#0E2203] ml-4 transition-transform leading-none shrink-0"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transitionDuration: '320ms',
                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] overflow-hidden"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transitionDuration: '360ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div className="min-h-0">
                    <p className="text-[clamp(0.72rem,1.6vw,0.85rem)] text-[#0E2203]/[0.55] leading-[1.5] pb-4 max-w-none sm:max-w-[65ch] break-words">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
