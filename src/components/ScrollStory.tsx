import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  CreditCard, 
  TrendingUp, 
  Wifi, 
  Battery, 
  Search, 
  BadgeCheck, 
  Landmark,
  Radio
} from 'lucide-react';

interface Step {
  num: string;
  headline: string;
  description: string;
  badge: string;
}

const STEPS: Step[] = [
  {
    num: 'Step One',
    headline: 'Your bank statement is already proof.',
    description:
      "You don't need to build a case for who you are. Connect once, securely, through a licensed partner — and the payment history that was already there becomes usable.",
    badge: 'Bank-Grade Open Banking',
  },
  {
    num: 'Step Two',
    headline: 'Nobody should have to explain their rent.',
    description:
      'The system finds the recurring payment on its own, straight from your transactions. No forms, no manual entry, no convincing anyone it was real.',
    badge: 'Transaction Pattern Match',
  },
  {
    num: 'Step Three',
    headline: 'One tap. Not one favor.',
    description:
      "You confirm it's your rent — that's the only thing we ask of you. No landlord sign-off, no waiting on someone else's word.",
    badge: '1-Tap Independent Verification',
  },
  {
    num: 'Step Four',
    headline: 'Consistency should speak for itself.',
    description:
      'Every on-time month gets reported automatically from there. The record builds itself, the same way the payments already did.',
    badge: 'TransUnion & TPN Synced',
  },
];

export const ScrollStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-it-works" ref={outerRef} className="relative min-h-[260vh]">
      <div className="sticky top-[4.5rem] min-h-[calc(100vh-4.5rem)] flex items-center py-8 md:py-12 overflow-hidden">
        <div className="wrap w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          
          {/* Left: Interactive Copy & Steps */}
          <div className="flex flex-col justify-center min-w-0">
            {/* Interactive Step Content */}
            <div className="relative min-h-[15rem] flex flex-col justify-center">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.num}
                    id={`scroll-step-panel-${idx}`}
                    className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'opacity-100 translate-y-0 relative pointer-events-auto'
                        : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <span className="text-[clamp(0.7rem,1.5vw,0.8rem)] font-bold text-(--accent-fg) uppercase tracking-wider mb-3 inline-block">
                      {step.badge}
                    </span>
                    <h2 className="display text-[clamp(1.7rem,3.2vw,2.6rem)] text-(--ink) mb-4 leading-[1.25]">
                      {step.headline}
                    </h2>
                    <p className="text-(--ink)/65 text-[clamp(0.95rem,1.3vw,1.05rem)] max-w-[44ch] leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Step Navigation Progress Indicators */}
            <div className="flex items-center gap-2 mt-8">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={`step-btn-${step.num}`}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? 'w-12 bg-(--ink)' : 'w-5 bg-(--ink)/15 hover:bg-(--ink)/50'
                    }`}
                    aria-label={`Jump to ${step.num}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right: Ultra-Realistic Phone Shell Mockup */}
          <div className="flex items-center justify-center relative select-none">
            <div
              className="absolute w-[280px] sm:w-[320px] h-[480px] rounded-full blur-3xl -z-10 opacity-60 pointer-events-none"
              style={{
                backgroundColor: '#0F2A4A',
              }}
            />

            <div
              id="phone-shell-container"
              className="relative w-[300px] sm:w-[320px] md:w-[340px] aspect-[9/18.5] bg-[#000000] p-[10px] sm:p-[12px] rounded-[48px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_0_2px_rgba(255,255,255,0.06)] ring-1 ring-black/40"
            >
              <div className="absolute -left-[3px] top-[90px] w-[3px] h-[24px] bg-[#2E2B3D] rounded-l-md border-r border-[#000000]" />
              <div className="absolute -left-[3px] top-[128px] w-[3px] h-[46px] bg-[#2E2B3D] rounded-l-md border-r border-[#000000]" />
              <div className="absolute -left-[3px] top-[184px] w-[3px] h-[46px] bg-[#2E2B3D] rounded-l-md border-r border-[#000000]" />
              <div className="absolute -right-[3px] top-[138px] w-[3px] h-[64px] bg-[#2E2B3D] rounded-r-md border-l border-[#000000]" />

              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0F2A4A] shadow-inner flex flex-col justify-between border border-black/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none z-30" />

                <div className="relative z-40 pt-2.5 px-6 pb-1 flex items-center justify-between text-xs font-semibold select-none">
                  <span className="text-[0.72rem] tracking-tight font-bold text-white">
                    09:41
                  </span>

                  <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[90px] h-[24px] bg-[#000000] rounded-full flex items-center justify-between px-2.5 shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d14] ring-1 ring-white/10 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#AFE7FC]" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AFE7FC] animate-pulse" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-white">
                    <span className="text-[0.62rem] font-bold tracking-tighter">5G</span>
                    <Wifi className="w-3 h-3 stroke-[2.5]" />
                    <div className="w-5 h-2.5 rounded-[3px] border border-white/60 p-0.5 flex items-center">
                      <div className="w-full h-full bg-[#AFE7FC] rounded-[1.5px]" />
                    </div>
                  </div>
                </div>

                <div className="relative flex-1 w-full overflow-hidden">
                  {/* ================= STEP 1 SCREEN: BANK LINK AUTH ================= */}
                  <div
                    className={`absolute inset-0 p-4 flex flex-col justify-between bg-[#0F2A4A] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeStep === 0
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/15 mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-[#AFE7FC] flex items-center justify-center text-[#0F2A4A] text-[10px] font-black">
                            K
                          </div>
                          <span className="text-[0.78rem] font-bold tracking-tight text-white">Kumo Dashboard</span>
                        </div>
                      </div>

                      <h3 className="text-[0.95rem] font-bold text-white mb-1">
                        Connect Bank Account
                      </h3>
                      <p className="text-[0.68rem] text-white/60 mb-3 leading-tight">
                        Select the account where you make your monthly rent payment.
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 bg-white/[0.06] rounded-xl border-2 border-[#AFE7FC] shadow-sm">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#004B87] text-white flex items-center justify-center text-[10px] font-black">
                              C
                            </div>
                            <div>
                              <div className="text-[0.75rem] font-bold text-white leading-tight">
                                Capitec Bank
                              </div>
                              <div className="text-[0.62rem] text-white/50">
                                Primary Savings · *4821
                              </div>
                            </div>
                          </div>
                          <span className="w-4 h-4 rounded-full bg-[#AFE7FC] text-[#0F2A4A] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-white/[0.03] rounded-xl border border-white/10">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#009E96] text-white flex items-center justify-center text-[10px] font-black">
                              FNB
                            </div>
                            <div>
                              <div className="text-[0.75rem] font-semibold text-white leading-tight">
                                First National Bank
                              </div>
                              <div className="text-[0.62rem] text-white/50">
                                Cheque Account
                              </div>
                            </div>
                          </div>
                          <span className="w-3.5 h-3.5 rounded-full border border-white/30" />
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-white/[0.03] rounded-xl border border-white/10">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#0033A0] text-white flex items-center justify-center text-[10px] font-black">
                              SB
                            </div>
                            <div>
                              <div className="text-[0.75rem] font-semibold text-white leading-tight">
                                Standard Bank
                              </div>
                              <div className="text-[0.62rem] text-white/50">
                                Current Account
                              </div>
                            </div>
                          </div>
                          <span className="w-3.5 h-3.5 rounded-full border border-white/30" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-1.5 p-2 bg-white/[0.06] rounded-lg border border-[#AFE7FC]/30 text-[0.63rem] text-white/80">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#AFE7FC] shrink-0" />
                        <span>Read-only access. We cannot move funds or view credentials.</span>
                      </div>

                      <button
                        type="button"
                        className="w-full py-2.5 bg-[#E06336] text-white rounded-xl text-[0.75rem] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#E06336]/20"
                      >
                        Authorize Capitec Link <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ================= STEP 2 SCREEN: RENT DETECTED ================= */}
                  <div
                    className={`absolute inset-0 p-4 flex flex-col justify-between bg-[#0F2A4A] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeStep === 1
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/15 mb-2">
                        <span className="text-[0.78rem] font-bold tracking-tight text-white">Transaction Radar</span>
                        <span className="text-[0.62rem] font-bold px-2 py-0.5 rounded-full bg-[#AFE7FC] text-[#0F2A4A] border border-white/15">
                          1 Match Found
                        </span>
                      </div>

                      <div className="text-[0.68rem] text-white/60 mb-2.5 flex items-center justify-between">
                        <span>Recent Statement Scan</span>
                        <span className="font-bold text-white">March 2026</span>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 bg-white/[0.06] text-white rounded-xl border-2 border-[#AFE7FC] shadow-lg relative overflow-hidden">
                          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#AFE7FC]/20 rounded-full blur-md" />
                          
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="inline-flex items-center px-1.5 py-0.5 bg-[#AFE7FC] text-[#0F2A4A] text-[0.58rem] font-black rounded uppercase tracking-wider">
                              Detected Rent
                            </span>
                            <span className="text-[0.62rem] text-[#AFE7FC] font-bold font-mono">99.8% Match</span>
                          </div>

                          <div className="text-[0.85rem] font-bold text-white leading-tight mb-0.5">
                            Soweto Prop Mgt / Apt 402
                          </div>
                          
                          <div className="flex items-baseline justify-between mt-1">
                            <span className="text-[1.25rem] font-black text-[#AFE7FC] tracking-tight">
                              R 6,850.00
                            </span>
                            <span className="text-[0.62rem] text-white/70 font-semibold">
                              Monthly on 1st
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white/[0.06] rounded-xl border border-white/10 flex items-center gap-2 text-[0.65rem] text-white">
                      <BadgeCheck className="w-4 h-4 text-[#AFE7FC] shrink-0" />
                      <span>Isolated 8 consecutive monthly payments to the same landlord reference.</span>
                    </div>
                  </div>

                  {/* ================= STEP 3 SCREEN: USER CONFIRMATION ================= */}
                  <div
                    className={`absolute inset-0 p-4 flex flex-col justify-between bg-[#0F2A4A] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeStep === 2
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/15 mb-3">
                        <span className="text-[0.78rem] font-bold tracking-tight text-white">One-Tap Verification</span>
                        <span className="text-[0.62rem] font-bold px-2 py-0.5 rounded-full bg-[#E06336]/20 text-[#E06336]">
                          Action Required
                        </span>
                      </div>

                      <h3 className="text-[0.95rem] font-bold text-white mb-1">
                        Is this your rent?
                      </h3>
                      <p className="text-[0.68rem] text-white/60 mb-3 leading-tight">
                        Confirm once. From next month, everything reports automatically.
                      </p>

                      <div className="p-3 bg-white/[0.06] rounded-xl border border-[#AFE7FC]/30 shadow-sm space-y-2.5">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <span className="text-[0.65rem] text-white/60 font-medium">Monthly Rent</span>
                          <span className="text-[1.1rem] font-black text-white">R 6,850.00</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[0.65rem]">
                          <div>
                            <span className="text-white/50 block">Payment Recipient</span>
                            <span className="font-semibold text-white truncate block">Soweto Prop Mgt</span>
                          </div>
                          <div>
                            <span className="text-white/50 block">Statement Ref</span>
                            <span className="font-mono font-semibold text-white">UNIT-402-RENT</span>
                          </div>
                        </div>

                        <div className="pt-1 text-[0.62rem] text-white/70 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#AFE7FC] shrink-0" />
                          <span>No landlord signature or approval required.</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        className="w-full py-3 bg-[#E06336] text-white hover:bg-[#c95126] rounded-xl text-[0.8rem] font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer border border-[#E06336]/30"
                      >
                        <Check className="w-4 h-4 stroke-[3]" /> Yes, Confirm This Is Rent
                      </button>
                      <p className="text-center text-[0.6rem] text-white/50">
                        You can edit or unlink this payment anytime from your dashboard.
                      </p>
                    </div>
                  </div>

                  {/* ================= STEP 4 SCREEN: BUREAU REPORTED DASHBOARD ================= */}
                  <div
                    className={`absolute inset-0 p-4 flex flex-col justify-between bg-[#0F2A4A] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeStep === 3
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#AFE7FC] animate-pulse" />
                        </div>
                        <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-[#AFE7FC]/20 text-[#AFE7FC] border border-[#AFE7FC]/40">
                          Active
                        </span>
                      </div>

                      <div className="p-3 bg-white/[0.05] rounded-xl border border-white/10 mb-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[0.65rem] text-white/60 font-medium">Estimated Credit Score</span>
                          <span className="text-[0.62rem] font-bold text-[#AFE7FC] bg-[#AFE7FC]/15 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <TrendingUp className="w-2.5 h-2.5" /> +42 pts
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-[1.8rem] font-black text-white font-mono tracking-tight">
                            724
                          </span>
                          <span className="text-[0.7rem] text-[#AFE7FC] font-semibold">
                            Excellent Standing
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-white/[0.03] rounded-xl border border-white/10">
                        <div className="flex justify-between items-center mb-2 text-[0.65rem]">
                          <span className="font-semibold text-white">6-Month On-Time Record</span>
                        </div>

                        <div className="grid grid-cols-6 gap-1 text-center">
                          {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((m) => (
                            <div
                              key={m}
                              className="bg-[#AFE7FC]/20 border border-[#AFE7FC]/40 rounded-lg py-1 px-0.5"
                            >
                              <div className="text-[0.58rem] text-[#AFE7FC] font-bold">{m}</div>
                              <Check className="w-2.5 h-2.5 text-[#AFE7FC] mx-auto stroke-[3]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 bg-[#AFE7FC]/20 border border-[#AFE7FC]/40 text-white rounded-xl flex items-center justify-between text-[0.68rem] font-bold">
                      <div className="flex items-center gap-1.5">
                        <BadgeCheck className="w-4 h-4 text-[#AFE7FC]" />
                        <span>Kumo Verified Rent</span>
                      </div>
                      <span className="font-mono text-[0.6rem] text-white/70">ZA-402</span>
                    </div>
                  </div>

                </div>

                <div className="relative z-40 py-2 flex justify-center">
                  <div className="w-28 h-1 rounded-full bg-white/40" />
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};