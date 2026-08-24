import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onNavigate?: (path: string) => void;
  activeView: 'tenant' | 'business';
  onToggleView: (view: 'tenant' | 'business') => void;
  onOpenSignup?: () => void;
  onOpenLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeView,
  onToggleView,
  onOpenSignup,
  onOpenLogin,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 72) {
        // Scrolling down -> hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show header
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="kumo-header"
      className="sticky top-0 z-40 w-full bg-[#FCFBF7] border-b border-[#0E2203]/[0.08] transition-transform"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transitionDuration: '320ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-14">
        {/* Desktop Layout (768px+) */}
        <div className="hidden md:flex h-[72px] items-center justify-between min-w-0">
          <div className="flex items-center gap-8 min-w-0">
            <button
              id="header-logo-button"
              onClick={() => onNavigate?.('/')}
              className="text-[clamp(1.3rem,3.2vw,1.9rem)] font-bold tracking-[-0.03em] leading-[0.92] text-[#0E2203] font-['Georgia',_'Times_New_Roman',_serif] cursor-pointer shrink-0"
            >
              kumo
            </button>

            {/* Pill Switch */}
            <div className="flex items-center p-1 rounded-full bg-[#F5F6EF] border border-[#0E2203]/[0.08] shrink-0">
              <button
                id="header-tenant-tab"
                type="button"
                onClick={() => onToggleView('tenant')}
                className={`px-4 py-1.5 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full transition-colors cursor-pointer ${
                  activeView === 'tenant'
                    ? 'bg-[#0E2203] text-[#EAF3DE]'
                    : 'bg-transparent text-[#0E2203] hover:text-[#0E2203]/80'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                Tenant
              </button>
              <button
                id="header-business-tab"
                type="button"
                onClick={() => onToggleView('business')}
                className={`px-4 py-1.5 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full transition-colors cursor-pointer ${
                  activeView === 'business'
                    ? 'bg-[#0E2203] text-[#EAF3DE]'
                    : 'bg-transparent text-[#0E2203] hover:text-[#0E2203]/80'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                Business
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              id="header-login-button"
              type="button"
              onClick={() => onOpenLogin?.()}
              className="text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium text-[#0E2203] hover:opacity-80 transition-opacity cursor-pointer"
            >
              Log in
            </button>
            <button
              id="header-get-started-button"
              type="button"
              onClick={() => onOpenSignup?.()}
              className="bg-[#2F6E2E] text-white px-6 py-3 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
            >
              Get started
            </button>
          </div>
        </div>

        {/* Mobile Layout (<768px): Two rows */}
        <div className="md:hidden py-3 flex flex-col gap-3 min-w-0">
          {/* Row 1: Logo & Get Started Button */}
          <div className="flex items-center justify-between min-w-0">
            <button
              id="header-mobile-logo-button"
              onClick={() => onNavigate?.('/')}
              className="text-[clamp(1.3rem,3.2vw,1.9rem)] font-bold tracking-[-0.03em] leading-[0.92] text-[#0E2203] font-['Georgia',_'Times_New_Roman',_serif] cursor-pointer shrink-0"
            >
              kumo
            </button>

            <button
              id="header-mobile-get-started-button"
              type="button"
              onClick={() => onOpenSignup?.()}
              className="bg-[#2F6E2E] text-white px-5 py-2.5 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
            >
              Get started
            </button>
          </div>

          {/* Row 2: Full-width Centered Pill Switch */}
          <div className="flex items-center justify-center p-1 rounded-full bg-[#F5F6EF] border border-[#0E2203]/[0.08] w-full min-w-0">
            <button
              id="header-mobile-tenant-tab"
              type="button"
              onClick={() => onToggleView('tenant')}
              className={`flex-1 py-1.5 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full text-center transition-colors cursor-pointer min-w-0 ${
                activeView === 'tenant'
                  ? 'bg-[#0E2203] text-[#EAF3DE]'
                  : 'bg-transparent text-[#0E2203]'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              Tenant
            </button>
            <button
              id="header-mobile-business-tab"
              type="button"
              onClick={() => onToggleView('business')}
              className={`flex-1 py-1.5 text-[clamp(0.72rem,1.6vw,0.85rem)] font-medium rounded-full text-center transition-colors cursor-pointer min-w-0 ${
                activeView === 'business'
                  ? 'bg-[#0E2203] text-[#EAF3DE]'
                  : 'bg-transparent text-[#0E2203]'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              Business
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
