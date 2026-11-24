import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2A2438] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Initials Logo */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-[#352F44] border border-[#5C5470] rotate-45 transform transition-transform duration-700 animate-pulse-subtle shadow-glow-md" />
          <span className="relative z-10 text-3xl font-extrabold tracking-widest text-[#DBD8E3] font-mono">
            ES
          </span>
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#5C5470] font-mono mb-1">
            INITIALIZING SYSTEM
          </p>
          <h2 className="text-sm font-medium text-[#DBD8E3] tracking-wider">
            EYAD SELEMAN <span className="text-[#5C5470]">/</span> MEAN STACK
          </h2>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-1 bg-[#352F44] rounded-full overflow-hidden border border-[#5C5470]/40">
          <div
            className="h-full bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="mt-3 font-mono text-xs text-[#5C5470] tracking-wider">
          {progress}%
        </div>
      </div>
    </div>
  );
};
