import React, { useEffect, useRef, useState } from 'react';

export const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(1.25rem)',
        transition:
          'opacity 520ms cubic-bezier(0.38,0.13,0,0.88), transform 520ms cubic-bezier(0.38,0.13,0,0.88)',
      }}
    >
      {children}
    </div>
  );
};
