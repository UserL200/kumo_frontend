import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { LogoBar } from './components/LogoBar.tsx';
import { ScrollStory } from './components/ScrollStory.tsx';
import { FlipGrid } from './components/FlipGrid.tsx';
import { LinkGlow } from './components/LinkGlow.tsx';
import { FeatureSplit } from './components/FeatureSplit.tsx';
import { ExpandGrid } from './components/ExpandGrid.tsx';
import { FAQ } from './components/FAQ.tsx';
import { StepBand } from './components/StepBand.tsx';
import { LargeCTA } from './components/LargeCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { SignupModal } from './components/SignupModal.tsx';
import { Reveal } from './components/Reveal.tsx';
import { Manifesto } from './components/Manifesto.tsx';

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
    <div className="min-h-screen bg-(--ink) text-(--parchment) flex flex-col font-['Suisse_Intl',_-apple-system,_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_sans-serif] overflow-x-clip w-full selection:bg-(--moss) selection:text-(--ink)">
      {/* 1. Header Navigation */}
      <Header
        activeView={view}
        onToggleView={(newView) => setView(newView)}
        onNavigate={handleNavigate}
        onOpenSignup={openSignup}
        onOpenLogin={openLogin}
      />

      {/* Main Content Container with Rounded Bottom for Reveal Shell */}
      <main className="relative z-10 bg-(--parchment) mx-2 md:mx-4 rounded-[28px] md:rounded-[40px] overflow-x-hidden shadow-2xl pb-6 border border-(--parchment)/20">
        {/* 2. Hero Component */}
        <Hero
          view={view}
          onNavigate={handleNavigate}
          onOpenSignup={openSignup}
        />

        {/* 3. Manifesto — audience-aware */}
        <Reveal>
          <Manifesto audience={view === 'business' ? 'landlord' : 'tenant'} />
        </Reveal>

        {/* 4. FeatureSplit — shared, view-aware. Replaces BusinessSplit;
            gives both audiences the same "quick hit" split block before
            branching into deeper, audience-specific content below. */}
        {/* <Reveal>
          <FeatureSplit view={view} onNavigate={handleNavigate} onActionClick={() => openSignup(view)} />
        </Reveal> */}

        {/* Dynamic View Sections */}
        {view === 'tenant' ? (
          <div id="tenant-panel" className="flex flex-col">
            {/* 5. Credit-score benefit rows */}
            <Reveal>
              <LogoBar onNavigate={handleNavigate} />
            </Reveal>

            {/* 6. Sticky Scroll Story with Phone Mockup — has its own
                internal id="how-it-works", so no wrapping div/id here
                (avoids the duplicate-id bug from the previous version) */}
            <ScrollStory />

            {/* 7. Flip-Tile Housing Situations Grid */}
            <Reveal>
              <FlipGrid />
            </Reveal>

            {/* 8. Bank-Link Security Section */}
            <Reveal>
              <LinkGlow onNavigate={handleNavigate} />
            </Reveal>
          </div>
        ) : (
          <div id="business-panel" className="flex flex-col">
            {/* 5. Landlord Benefits Expand Grid */}
            <Reveal>
              <ExpandGrid />
            </Reveal>
          </div>
        )}

        {/* 9. FAQ Accordion — view-aware */}
        <Reveal>
          <FAQ view={view} />
        </Reveal>

        {/* 10. Compact step recap, right before the final ask */}
        {/* <Reveal>
          <StepBand onNavigate={handleNavigate} />
        </Reveal> */}

        {/* 11. Large Glowing CTA — final close */}
        <Reveal>
          <LargeCTA onOpenSignup={() => openSignup(view)} />
        </Reveal>
      </main>

      {/* 12. Fixed Bottom Footer */}
      <Footer onNavigate={handleNavigate} onOpenSignup={openSignup} />

      {/* 13. Signup / Login Interactive Modal */}
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
};