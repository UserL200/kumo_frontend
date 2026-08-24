import React, { useState, useEffect } from 'react';
import { KumoLogo } from './KumoLogo';

interface HeaderProps {
  activeView: 'tenant' | 'business';
  onToggleView: (view: 'tenant' | 'business') => void;
  onNavigate?: (path: string) => void;
  onOpenSignup?: (mode?: 'tenant' | 'business') => void;
  onOpenLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onToggleView,
  onNavigate,
  onOpenSignup,
  onOpenLogin,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 120) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (hash: string) => {
    setIsMobileMenuOpen(false);
    onNavigate?.(hash);
  };

  return (
    <>
      <header
        id="kumo-header"
        className={`sticky top-0 z-50 bg-[#529651] border-b border-black/10 transition-transform duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out)' }}
      >
        <div className="wrap flex items-center justify-between h-[4.5rem] gap-4">
          {/* Logo & View Switch */}
          <div className="flex items-center gap-7">
            <button
              id="header-logo-button"
              onClick={() => handleLinkClick('#')}
              className="flex items-center gap-2.5 text-[#FFFFFF] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center text-white">
                <KumoLogo className="w-5 h-5 shrink-0 text-white" />
              </div>
              <span className="logo display text-[1.5625rem] text-white leading-none tracking-tight">kumo</span>
            </button>

            {/* Desktop Switch */}
            <div
              id="header-view-switch"
              className="hidden min-[900px]:flex items-center bg-[#000000]/20 backdrop-blur-sm rounded-full p-[3px] border border-white/10"
            >
              <button
                id="header-tenant-tab"
                type="button"
                onClick={() => onToggleView('tenant')}
                className={`px-4 py-2 text-[0.8rem] rounded-full font-bold transition-all cursor-pointer ${
                  activeView === 'tenant'
                    ? 'bg-[#000000] text-[#FFFFFF] shadow-sm'
                    : 'bg-transparent text-[#FFFFFF]/85 hover:text-[#FFFFFF]'
                }`}
              >
                Tenant
              </button>
              <button
                id="header-business-tab"
                type="button"
                onClick={() => onToggleView('business')}
                className={`px-4 py-2 text-[0.8rem] rounded-full font-bold transition-all cursor-pointer ${
                  activeView === 'business'
                    ? 'bg-[#000000] text-[#FFFFFF] shadow-sm'
                    : 'bg-transparent text-[#FFFFFF]/85 hover:text-[#FFFFFF]'
                }`}
              >
                Business
              </button>
            </div>
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden min-[900px]:flex items-center gap-5">
            <button
              id="header-login-button"
              type="button"
              onClick={() => onOpenLogin?.()}
              className="text-[0.85rem] font-bold text-[#FFFFFF] hover:opacity-80 transition-opacity cursor-pointer"
            >
              Log in
            </button>

            {/* Split CTA Button with Plus Icon */}
            <button
              id="header-get-started-button"
              type="button"
              onClick={() => onOpenSignup?.(activeView)}
              className="inline-flex items-center gap-[2px] p-0 border-none cursor-pointer group active:scale-[0.98] transition-transform"
            >
              <span className="px-5 py-2.5 rounded-full bg-[#E06336] text-white text-[0.85rem] font-bold group-hover:bg-[#c95126] transition-colors whitespace-nowrap shadow-md">
                Get started
              </span>
              <span className="w-9 h-9 rounded-full bg-[#E06336] group-hover:bg-[#c95126] transition-colors flex items-center justify-center relative shrink-0 shadow-md">
                <span className="absolute w-[11px] h-[2px] bg-white rounded-[1px]" />
                <span className="absolute w-[2px] h-[11px] bg-white rounded-[1px]" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="min-[900px]:hidden font-black uppercase text-[0.8rem] text-white bg-transparent border-none cursor-pointer py-2 px-1 tracking-wider"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Drawer */}
      <div
        id="mobile-fullscreen-menu"
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.38,0.13,0,0.88)] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background:
              'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 30%, #AFE7FC 70%, #529651 100%)',
          }}
        >
          {/* Top Row */}
          <div className="wrap flex justify-between items-center h-[4.5rem] w-full">
            <div className="flex items-center gap-2.5 text-[#000000]">
              <KumoLogo className="w-7 h-7 shrink-0 text-[#000000]" />
              <span className="logo display text-[1.5625rem] leading-none">kumo</span>
            </div>
            <button
              id="mobile-menu-close-button"
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-bold uppercase text-[0.8rem] text-[#000000] bg-transparent border-none cursor-pointer py-2 px-1 tracking-wider"
            >
              Close
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 text-center">
            {/* Mobile View Switch */}
            <div className="flex items-center bg-[#FFFFFF] rounded-full p-[4px] border border-[#000000]/15 shadow-sm">
              <button
                type="button"
                onClick={() => onToggleView('tenant')}
                className={`px-6 py-2.5 text-[0.85rem] rounded-full font-bold transition-colors cursor-pointer ${
                  activeView === 'tenant'
                    ? 'bg-[#000000] text-[#FFFFFF]'
                    : 'bg-transparent text-[#000000]'
                }`}
              >
                Tenant
              </button>
              <button
                type="button"
                onClick={() => onToggleView('business')}
                className={`px-6 py-2.5 text-[0.85rem] rounded-full font-bold transition-colors cursor-pointer ${
                  activeView === 'business'
                    ? 'bg-[#000000] text-[#FFFFFF]'
                    : 'bg-transparent text-[#000000]'
                }`}
              >
                Business
              </button>
            </div>

            <button
              onClick={() => handleLinkClick('#how-it-works')}
              className="display text-[9vw] max-text-5xl text-[#000000] hover:opacity-80 transition-opacity uppercase tracking-tight cursor-pointer"
            >
              How it works
            </button>
            <button
              onClick={() => handleLinkClick('#security')}
              className="display text-[9vw] max-text-5xl text-[#000000] hover:opacity-80 transition-opacity uppercase tracking-tight cursor-pointer"
            >
              Security
            </button>
            <button
              onClick={() => handleLinkClick('#faq')}
              className="display text-[9vw] max-text-5xl text-[#000000] hover:opacity-80 transition-opacity uppercase tracking-tight cursor-pointer"
            >
              FAQ
            </button>

            <div className="flex flex-col gap-4 w-full max-w-xs mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSignup?.(activeView);
                }}
                className="w-full py-4 rounded-full bg-[#E06336] text-white text-[1rem] font-bold active:scale-95 transition-transform shadow-lg cursor-pointer"
              >
                Get started
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin?.();
                }}
                className="w-full py-3 rounded-full bg-white text-[#000000] text-[0.9rem] font-bold border border-[#000000]/15 cursor-pointer hover:bg-[#F4F8F3] transition-colors"
              >
                Log in to your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
