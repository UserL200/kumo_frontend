import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [view, setView] = useState<'tenant' | 'business'>('tenant');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'tenant' | 'business' | 'login'>('tenant');

  const openSignup = (mode: 'tenant' | 'business' = 'tenant') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  // Sign in now goes to the real login page instead of the old magic-link modal.
  const openLogin = () => navigate('/login');

  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-(--parchment) text-(--ink) flex flex-col font-['Suisse_Intl',_-apple-system,_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_sans-serif] w-full selection:bg-(--moss) selection:text-(--ink)">
      {/* 1. Header Navigation */}
      <Header
        activeView={view}
        onToggleView={(newView) => setView(newView)}
        onNavigate={handleNavigate}
        onOpenSignup={openSignup}
        onOpenLogin={openLogin}
      />

      {/* Main Content  */}
      <main className="relative z-10 flex flex-col">
        {/* 2. Hero Component */}
        <Hero
          view={view}
          onNavigate={handleNavigate}
          onOpenSignup={openSignup}
        />

        {/* 3. Manifesto */}
        <Reveal>
          <Manifesto audience={view === 'business' ? 'landlord' : 'tenant'} />
        </Reveal>

        {/* 4. FeatureSplit  */}
        <Reveal>
          <FeatureSplit view={view} onNavigate={handleNavigate} onActionClick={() => openSignup(view)} />
        </Reveal>

        {/* Dynamic View Sections */}
        {view === 'tenant' ? (
          <div id="tenant-panel" className="flex flex-col">
            <Reveal>
              <FlipGrid />
            </Reveal>

            {/* LogoBar handles its own per-row Reveal internally now,
                so it isn't wrapped here, avoids double-wrapping. */}
            <LogoBar onNavigate={handleNavigate} />

            <ScrollStory />

            <Reveal>
              <LinkGlow onNavigate={handleNavigate} />
            </Reveal>
          </div>
        ) : (
          <div id="business-panel" className="flex flex-col">
            <Reveal>
              <ExpandGrid />
            </Reveal>
          </div>
        )}

        {/* FAQ Accordion */}
        <Reveal>
          <FAQ view={view} />
        </Reveal>

        {/* Compact step recap, right before the final ask
        <Reveal>
          <StepBand onNavigate={handleNavigate} />
        </Reveal> */}

        {/* Large Glowing */}
        <Reveal>
          <LargeCTA view={view} onOpenSignup={() => openSignup(view)} />
        </Reveal>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenSignup={openSignup} />

      {/* Signup / Login Interactive Modal */}
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
};