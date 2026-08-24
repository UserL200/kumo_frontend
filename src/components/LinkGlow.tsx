import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import fintechLockClosed from '../assets/images/fintech_vault_lock_1787592021342.jpg';
import fintechLockOpen from '../assets/images/fintech_lock_open_1787592035272.jpg';

interface LinkGlowProps {
  onNavigate?: (path: string) => void;
}

export const LinkGlow: React.FC<LinkGlowProps> = ({ onNavigate }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [shockwave, setShockwave] = useState(false);

  // Auto-close lock on initial view with a clean mechanical timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocked(true);
      setShockwave(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleLock = () => {
    if (isLocked) {
      setIsLocked(false);
      setTimeout(() => {
        setIsLocked(true);
        setShockwave(true);
      }, 600);
    } else {
      setIsLocked(true);
      setShockwave(true);
    }
  };

  return (
    <section id="security" className="wrap py-12 md:py-16">
      <div className="relative rounded-[32px] md:rounded-[40px] bg-[#000000] text-[#FFFFFF] overflow-hidden px-6 md:px-14 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center shadow-2xl border border-white/10">
        {/* Glowing Green and Sky Blue Ambient Blobs */}
        <div
          className="absolute -top-28 -left-20 w-[26rem] h-[26rem] rounded-full bg-[#AFE7FC] opacity-25 pointer-events-none"
          style={{ filter: 'blur(70px)' }}
        />
        <div
          className="absolute -bottom-24 -right-16 w-[20rem] h-[20rem] rounded-full bg-[#529651] opacity-35 pointer-events-none"
          style={{ filter: 'blur(70px)' }}
        />

        {/* Left: Copy */}
        <div className="relative z-10 flex flex-col items-start min-w-0">
          <h2 className="display text-[clamp(1.8rem,4.5vw,3rem)] text-[#FFFFFF] mb-4 max-w-[14ch] leading-[1.1] tracking-tight">
            Your data, only ever used for your record
          </h2>
          <p className="text-white/75 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed max-w-[42ch] mb-6">
            You can disconnect at any time. Licensed verification partners handle every connection.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('#security')}
            className="btn-link text-[#FFFFFF] text-[0.95rem] font-bold hover:text-[#AFE7FC] cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            Read our security overview <span className="text-[#AFE7FC] text-lg">→</span>
          </button>
        </div>

        {/* Right: Realistic 3D Cyber-Security Padlock (Clean without surrounding block) */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full select-none">
          <div
            onClick={toggleLock}
            className="group relative flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
            title="Click to test locking mechanism"
          >
            {/* Shockwave Radial Wave on Lock Engagement */}
            <AnimatePresence>
              {shockwave && (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0.9 }}
                  animate={{ scale: 1.45, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  onAnimationComplete={() => setShockwave(false)}
                  className="absolute w-72 h-72 rounded-full bg-[#529651]/30 blur-2xl pointer-events-none -z-10"
                />
              )}
            </AnimatePresence>

            {/* Realistic 3D Lock Image Container with Seamless Blending */}
            <div className="relative w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 flex items-center justify-center overflow-visible">
              {/* Subtle back illumination glow */}
              <div
                className={`absolute w-48 h-48 rounded-full blur-2xl transition-colors duration-500 ${
                  isLocked ? 'bg-[#529651]/35' : 'bg-[#AFE7FC]/25'
                }`}
              />

              {/* Closed Lock Image */}
              <motion.img
                src={fintechLockClosed}
                alt="Realistic 3D Cyber Security Padlock Locked"
                referrerPolicy="no-referrer"
                initial={false}
                animate={{
                  opacity: isLocked ? 1 : 0,
                  scale: isLocked ? 1 : 0.96,
                  filter: isLocked ? 'brightness(1.05)' : 'brightness(0.9)',
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] pointer-events-none"
              />

              {/* Open Lock Image */}
              <motion.img
                src={fintechLockOpen}
                alt="Realistic 3D Cyber Security Padlock Open"
                referrerPolicy="no-referrer"
                initial={false}
                animate={{
                  opacity: isLocked ? 0 : 1,
                  scale: isLocked ? 1.04 : 1,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};