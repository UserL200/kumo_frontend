/**
 * ==============================================================================
 * KUMO BACKEND INTEGRATION SEAMS & ENDPOINT SPECIFICATIONS
 * ==============================================================================
 * This landing page connects to the following backend services and endpoints:
 *
 * 1. Bank-Link Flow:
 *    - POST /api/bank-link/initiate
 *      Payload: { tenantId?: string, provider: 'stitch' | 'truid', redirectUri: string }
 *      Returns: { redirectUrl: string, sessionId: string }
 *      Description: Initializes a secure Open Banking session with the provider.
 *
 *    - POST /api/webhooks/bank-link
 *      Payload: { event: 'PAYMENT_DETECTED' | 'LINK_SUCCESS', data: object }
 *      Description: Webhook receiver from Stitch / truID for async confirmation.
 *
 *    - GET /bank-link/callback (Frontend Route / Redirect Handler)
 *      Params: ?session=...&status=success
 *      Description: Receives tenant back from Open Banking partner authentication.
 *
 * 2. Tenant Registration:
 *    - POST /api/tenants/signup
 *      Payload: { email: string, phone: string }
 *      Returns: { success: boolean, tenantId: string }
 *      Description: Creates initial unverified tenant profile prior to bank link.
 *
 * 3. Landlord / Property Registration:
 *    - POST /api/landlords/join
 *      Payload: { name: string, email: string, propertyCount?: string }
 *      Returns: { success: boolean, landlordId: string }
 *      Description: Captures landlord lead / property portfolio listing.
 *
 * 4. Configuration:
 *    - Defined in /src/config.ts (API_BASE_URL, BANK_LINK_PROVIDER, BANK_LINK_REDIRECT_URI).
 * ==============================================================================
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { LogoBar } from './components/LogoBar.tsx';
import { FeatureSplit } from './components/FeatureSplit.tsx';
import { ExpandGrid } from './components/ExpandGrid.tsx';
import { StepBand } from './components/StepBand.tsx';
import { SecuritySplit } from './components/SecuritySplit.tsx';
import { FAQ } from './components/FAQ.tsx';
import { CTA } from './components/CTA.tsx';
import { Footer } from './components/Footer.tsx';
import { SignupModal } from './components/SignupModal.tsx';
import { Reveal } from './components/Reveal.tsx';

export const LandingPage: React.FC = () => {
  const [view, setView] = useState<'tenant' | 'business'>('tenant');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'tenant' | 'business' | 'login';
  }>({
    isOpen: false,
    mode: 'tenant',
  });

  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      const el = document.getElementById(path.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openSignup = (mode: 'tenant' | 'business' = view) => {
    setModalState({ isOpen: true, mode });
  };

  const openLogin = () => {
    setModalState({ isOpen: true, mode: 'login' });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#0E2203] flex flex-col font-['Helvetica_Neue',_Arial,_sans-serif] overflow-x-hidden w-full">
      {/* 1. Header (Not wrapped in Reveal) */}
      <Header
        activeView={view}
        onToggleView={(newView) => setView(newView)}
        onNavigate={handleNavigate}
        onOpenSignup={() => openSignup(view)}
        onOpenLogin={openLogin}
      />

      {/* 2. Hero (Not wrapped in Reveal) */}
      <Hero
        onNavigate={handleNavigate}
        onOpenSignup={() => openSignup('tenant')}
      />

      {/* 3. LogoBar */}
      <Reveal>
        <LogoBar onNavigate={handleNavigate} />
      </Reveal>

      {/* 4. FeatureSplit */}
      <Reveal>
        <FeatureSplit
          view={view}
          onNavigate={handleNavigate}
          onActionClick={() => openSignup(view)}
        />
      </Reveal>

      {/* 5. ExpandGrid */}
      <Reveal>
        <ExpandGrid
          view={view}
          onNavigate={handleNavigate}
        />
      </Reveal>

      {/* 6. StepBand */}
      <Reveal>
        <StepBand onNavigate={handleNavigate} />
      </Reveal>

      {/* 7. SecuritySplit */}
      <Reveal>
        <SecuritySplit onNavigate={handleNavigate} />
      </Reveal>

      {/* 8. FAQ */}
      <Reveal>
        <FAQ onNavigate={handleNavigate} />
      </Reveal>

      {/* 9. CTA */}
      <Reveal>
        <CTA
          onNavigate={handleNavigate}
          onOpenSignup={() => openSignup('tenant')}
        />
      </Reveal>

      {/* 10. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Signup / Bank Link Modal */}
      <SignupModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
      />
    </div>
  );
};
