import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { LogoBar } from './components/LogoBar.tsx';
import { ScrollStory } from './components/ScrollStory.tsx';
import { FlipGrid } from './components/FlipGrid.tsx';
import { LinkGlow } from './components/LinkGlow.tsx';
import { BusinessSplit } from './components/BusinessSplit.tsx';
import { ExpandGrid } from './components/ExpandGrid.tsx';
import { FAQ } from './components/FAQ.tsx';
import { LargeCTA } from './components/LargeCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { SignupModal } from './components/SignupModal.tsx';
import { Reveal } from './components/Reveal.tsx';

export const LandingPage: React.FC = () => {
  const [view, setView] = useState<'tenant' | 'business'>('tenant');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'tenant' | 'business' | 'login'>('tenant');

  const openSignup = (mode: 'tenant' | 'business' = 'tenant') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const openLogin = () => {
    setModalMode('login');
    setIsModalOpen(true);
  };

  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#529651] text-[#000000] flex flex-col font-['Suisse_Intl',_-apple-system,_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_sans-serif] overflow-x-clip w-full selection:bg-[#AFE7FC] selection:text-[#000000]">
      {/* 1. Header Navigation */}
      <Header
        activeView={view}
        onToggleView={(newView) => setView(newView)}
        onNavigate={handleNavigate}
        onOpenSignup={openSignup}
        onOpenLogin={openLogin}
      />

      {/* Main Content Container with Rounded Bottom for Reveal Shell */}
      <main className="relative z-10 bg-[#FFFFFF] mx-2 md:mx-4 rounded-[28px] md:rounded-[40px] overflow-hidden shadow-2xl pb-6 border border-white/20">
        {/* 2. Hero Component */}
        <Hero
          view={view}
          onNavigate={handleNavigate}
          onOpenSignup={openSignup}
        />

        {/* Dynamic View Sections */}
        {view === 'tenant' ? (
          <div id="tenant-panel" className="flex flex-col">
            {/* 3. 3D Logo Carousel */}
            <Reveal>
              <LogoBar onNavigate={handleNavigate} />
            </Reveal>

            {/* 4. Sticky Scroll Story with Phone Mockup */}
            <ScrollStory />

            {/* 5. Flip-Tile Directory Grid */}
            <Reveal>
              <FlipGrid />
            </Reveal>

            {/* 6. Bank-Link Glow Section */}
            <Reveal>
              <LinkGlow onNavigate={handleNavigate} />
            </Reveal>
          </div>
        ) : (
          <div id="business-panel" className="flex flex-col">
            {/* Business Split Section */}
            <Reveal>
              <BusinessSplit onOpenSignup={() => openSignup('business')} />
            </Reveal>

            {/* Business Expand Cards Grid */}
            <Reveal>
              <ExpandGrid />
            </Reveal>
          </div>
        )}

        {/* 7. FAQ Accordion */}
        <Reveal>
          <FAQ />
        </Reveal>

        {/* 8. Large Glowing CTA */}
        <Reveal>
          <LargeCTA onOpenSignup={() => openSignup(view)} />
        </Reveal>
      </main>

      {/* 9. Fixed Bottom Reveal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 10. Signup / Login Interactive Modal */}
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
};
