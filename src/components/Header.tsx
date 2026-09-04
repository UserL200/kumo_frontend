import React, { useState, useEffect } from 'react';
import { KumoLogo } from './KumoLogo';

interface HeaderProps {
  activeView: 'tenant' | 'business';
  onToggleView: (view: 'tenant' | 'business') => void;
  onNavigate?: (path: string) => void;
  onOpenSignup?: (mode?: 'tenant' | 'business') => void;
  onOpenLogin?: () => void;
}

interface MegaMenuItem {
  label: string;
  description: string;
  onClick: () => void;
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
  const [openMenu, setOpenMenu] = useState<'product' | 'company' | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 120) {
        setIsHidden(true);
        setOpenMenu(null);
      } else {
        setIsHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (hash: string) => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
    onNavigate?.(hash);
  };

  const productItems: MegaMenuItem[] = [
    {
      label: 'For tenants',
      description: 'Connect your bank account and turn rent you already pay into a verified credit record.',
      onClick: () => handleLinkClick('#how-it-works'),
    },
    {
      label: 'For landlords',
      description: 'List your properties for free. Zero admin, zero liability, on your side.',
      onClick: () => onOpenSignup?.('business'),
    },
  ];

  const companyItems: MegaMenuItem[] = [
    {
      label: 'About',
      description: 'Why nobody had built a system for people who pay in cash and EFT.',
      onClick: () => handleLinkClick('#about'),
    },
    {
      label: 'Security',
      description: 'How your data is used, and only ever used, for your own record.',
      onClick: () => handleLinkClick('#security'),
    },
    {
      label: 'FAQ',
      description: 'Answers to the most common questions from tenants and landlords.',
      onClick: () => handleLinkClick('#faq'),
    },
  ];

  const MegaPanel: React.FC<{ items: MegaMenuItem[] }> = ({ items }) => (
    <div
      className="absolute top-full left-0 mt-3 w-[22rem] bg-(--parchment) border border-(--ink)/10 rounded-[24px] shadow-2xl p-2 z-50"
      onMouseEnter={() => setOpenMenu((m) => m)}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className="w-full text-left px-4 py-3.5 rounded-[16px] hover:bg-(--ink)/5 transition-colors cursor-pointer flex flex-col gap-1"
        >
          <span className="font-bold text-[0.9rem] text-(--ink)">{item.label}</span>
          <span className="text-[0.78rem] text-(--ink)/60 leading-snug">{item.description}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header
        id="kumo-header"
        className={`sticky top-0 z-50 bg-(--bg-chrome) border-b border-black/10 transition-transform duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out)' }}
      >
        <div className="wrap flex items-center justify-between h-18 gap-4">
          {/* Logo & View Switch */}
          <div className="flex items-center gap-7">
            <button
              id="header-logo-button"
              onClick={() => handleLinkClick('#')}
              className="flex items-center gap-2.5 text-(--text-inverse) cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-(--ink) flex items-center justify-center">
                <KumoLogo className="w-5 h-5 shrink-0 text-(--text-inverse)" />
              </div>
              <span className="logo display text-[1.5625rem] text-(--text-inverse) leading-none tracking-tight">kumo</span>
            </button>

            {/* Desktop Mega-Menu Nav */}
            <nav
              className="hidden min-[900px]:flex items-center gap-1"
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className="relative" onMouseEnter={() => setOpenMenu('product')}>
                <button
                  type="button"
                  className="px-3 py-2 text-[0.85rem] font-bold text-(--text-inverse)/85 hover:text-(--text-inverse) transition-colors cursor-pointer"
                >
                  Product
                </button>
                {openMenu === 'product' && <MegaPanel items={productItems} />}
              </div>
              <div className="relative" onMouseEnter={() => setOpenMenu('company')}>
                <button
                  type="button"
                  className="px-3 py-2 text-[0.85rem] font-bold text-(--text-inverse)/85 hover:text-(--text-inverse) transition-colors cursor-pointer"
                >
                  Company
                </button>
                {openMenu === 'company' && <MegaPanel items={companyItems} />}
              </div>
            </nav>

            {/* Desktop Switch */}
            <div
              id="header-view-switch"
              className="hidden min-[900px]:flex items-center bg-(--ink)/20 backdrop-blur-sm rounded-full p-0.75 border border-(--parchment)/15"
            >
              <button
                id="header-tenant-tab"
                type="button"
                onClick={() => onToggleView('tenant')}
                className={`px-4 py-2 text-[0.8rem] rounded-full font-bold transition-all cursor-pointer ${
                  activeView === 'tenant'
                    ? 'bg-(--ink) text-(--text-inverse) shadow-sm'
                    : 'bg-transparent text-(--text-inverse)/85 hover:text-(--text-inverse)'
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
                    ? 'bg-(--ink) text-(--text-inverse) shadow-sm'
                    : 'bg-transparent text-(--text-inverse)/85 hover:text-(--text-inverse)'
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
              className="text-[0.85rem] font-bold text-(--text-inverse) hover:opacity-80 transition-opacity cursor-pointer"
            >
              Log in
            </button>

            <button
              id="header-get-started-button"
              type="button"
              onClick={() => onOpenSignup?.(activeView)}
              className="inline-flex items-center gap-0.5 p-0 border-none cursor-pointer group active:scale-[0.98] transition-transform"
            >
              <span className="px-5 py-2.5 rounded-full bg-(--ink) text-(--text-inverse) text-[0.85rem] font-bold group-hover:bg-[#1f1f1f] transition-colors whitespace-nowrap shadow-md">
                Get started
              </span>
              <span className="w-9 h-9 rounded-full bg-(--ink) group-hover:bg-[#1f1f1f] transition-colors flex items-center justify-center relative shrink-0 shadow-md">
                <span className="absolute w-2.75 h-0.5 bg-(--parchment) rounded-[1px]" />
                <span className="absolute w-0.5 h-2.75 bg-(--parchment) rounded-[1px]" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="min-[900px]:hidden font-black uppercase text-[0.8rem] text-(--text-inverse) bg-transparent border-none cursor-pointer py-2 px-1 tracking-wider"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Drawer */}
      <div
        id="mobile-fullscreen-menu"
        className={`fixed inset-0 z-200 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.38,0.13,0,0.88)] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background:
              'linear-gradient(to bottom, #EAF3DE 0%, #EAF3DE 30%, #e3df96 70%, #657747 100%)',
          }}
        >
          <div className="wrap flex justify-between items-center h-18 w-full">
            <div className="flex items-center gap-2.5 text-(--ink)">
              <KumoLogo className="w-7 h-7 shrink-0 text-(--ink)" />
              <span className="logo display text-[1.5625rem] leading-none">kumo</span>
            </div>
            <button
              id="mobile-menu-close-button"
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-bold uppercase text-[0.8rem] text-(--ink) bg-transparent border-none cursor-pointer py-2 px-1 tracking-wider"
            >
              Close
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 text-center overflow-y-auto py-8">
            <div className="flex items-center bg-(--parchment) rounded-full p-1 border border-(--ink)/15 shadow-sm">
              <button
                type="button"
                onClick={() => onToggleView('tenant')}
                className={`px-6 py-2.5 text-[0.85rem] rounded-full font-bold transition-colors cursor-pointer ${
                  activeView === 'tenant'
                    ? 'bg-(--ink) text-(--text-inverse)'
                    : 'bg-transparent text-(--ink)'
                }`}
              >
                Tenant
              </button>
              <button
                type="button"
                onClick={() => onToggleView('business')}
                className={`px-6 py-2.5 text-[0.85rem] rounded-full font-bold transition-colors cursor-pointer ${
                  activeView === 'business'
                    ? 'bg-(--ink) text-(--text-inverse)'
                    : 'bg-transparent text-(--ink)'
                }`}
              >
                Business
              </button>
            </div>

            <button
              onClick={() => handleLinkClick('#how-it-works')}
              className="display text-[9vw] max-text-5xl text-(--ink) hover:opacity-80 transition-opacity uppercase tracking-tight cursor-pointer"
            >
              How it works
            </button>
            <button
              onClick={() => handleLinkClick('#security')}
              className="display text-[9vw] max-text-5xl text-(--ink) hover:opacity-80 transition-opacity uppercase tracking-tight cursor-pointer"
            >
              Security
            </button>
            <button
              onClick={() => handleLinkClick('#about')}
              className="display text-[9vw] max-text-5xl text-(--ink) hover:opacity-80 transition-opacity uppercase tracking-tight cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('#faq')}
              className="display text-[9vw] max-text-5xl text-(--ink) hover:opacity-80 transition-opacity uppercase tracking-tight cursor-pointer"
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
                className="w-full py-4 rounded-full bg-(--ink) text-(--text-inverse) text-[1rem] font-bold active:scale-95 transition-transform shadow-lg cursor-pointer"
              >
                Get started
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin?.();
                }}
                className="w-full py-3 rounded-full bg-(--parchment) text-(--ink) text-[0.9rem] font-bold border border-(--ink)/15 cursor-pointer hover:bg-[#dde8cc] transition-colors"
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