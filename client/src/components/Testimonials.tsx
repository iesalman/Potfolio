import React from 'react';
import { MessageSquareQuote, Star, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#2A2438]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            REPUTATION & ENDORSEMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Mentor & Client Testimonials
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Highlighting clean code delivery, architectural reliability, strong communication, and disciplined execution.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card-interactive rounded-2xl p-6 sm:p-8 border border-[#5C5470]/40 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header with Star Rating and Placeholder Flag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-300/90 text-amber-300" />
                    ))}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#2A2438] border border-[#5C5470]/40 text-[10px] font-mono text-[#5C5470]">
                    {t.tag}
                  </span>
                </div>

                {/* Quote Body */}
                <blockquote className="text-sm sm:text-base text-[#DBD8E3]/90 leading-relaxed font-light mb-6 italic">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Author & Context Strip */}
              <div className="pt-4 border-t border-[#5C5470]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2A2438] border border-[#5C5470] flex items-center justify-center font-mono font-bold text-[#DBD8E3]">
                    <UserCheck className="w-5 h-5 text-[#DBD8E3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#DBD8E3] transition-colors">
                      {t.name}
                    </h4>
                    <p className="text-xs font-mono text-[#5C5470]">
                      {t.role} • {t.affiliation}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-emerald-400 text-xs font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note Regarding Placeholders */}
        <div className="max-w-2xl mx-auto mt-10 p-4 rounded-xl bg-[#352F44]/40 border border-[#5C5470]/30 flex items-center justify-center gap-2 text-xs font-mono text-[#5C5470] text-center">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            These cards are dedicated structural placeholders designed for seamless updating with live verified client recommendations.
          </span>
        </div>

      </div>
    </section>
  );
};
