import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#231e30] border-t border-[#5C5470]/40 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#5C5470]/20">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#352F44] border border-[#5C5470] flex items-center justify-center font-mono font-bold text-xs text-[#DBD8E3]">
                ES
              </div>
              <span className="font-extrabold tracking-wider text-lg text-white">
                {PERSONAL_INFO.brand}
              </span>
            </div>
            <p className="text-xs font-mono text-[#5C5470]">
              {PERSONAL_INFO.role} • Mansoura, Egypt
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#2A2438] border border-[#5C5470]/50 text-[#DBD8E3] hover:text-white hover:border-[#DBD8E3] transition-all"
              aria-label="GitHub Profile Placeholder"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#2A2438] border border-[#5C5470]/50 text-[#DBD8E3] hover:text-white hover:border-[#DBD8E3] transition-all"
              aria-label="LinkedIn Profile Placeholder"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.links.email}`}
              className="p-2.5 rounded-xl bg-[#2A2438] border border-[#5C5470]/50 text-[#DBD8E3] hover:text-white hover:border-[#DBD8E3] transition-all"
              aria-label="Send direct email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#352F44] border border-[#5C5470] text-[#DBD8E3] hover:text-white hover:border-[#DBD8E3] transition-all ml-2"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5C5470]">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with React, Node.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};
