import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { EDUCATION_ITEMS } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#2A2438]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            ACADEMIC & PROFESSIONAL CREDENTIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Education & Accelerator Training
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Formal foundations in Computer Science paired with intensive engineering training.
          </p>
        </div>

        {/* Timeline Visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#DBD8E3] via-[#5C5470] to-[#352F44] -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {EDUCATION_ITEMS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-[#2A2438] border-2 border-[#DBD8E3] flex items-center justify-center z-10 shadow-glow-sm hidden sm:flex">
                    {idx === 0 ? (
                      <GraduationCap className="w-5 h-5 text-[#DBD8E3]" />
                    ) : (
                      <Award className="w-5 h-5 text-[#DBD8E3]" />
                    )}
                  </div>

                  {/* Card Content (Occupies half width on desktop) */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:pl-0 sm:pr-4' : 'sm:pr-0 sm:pl-4'}`}>
                    <div className="glass-card-interactive rounded-2xl p-6 sm:p-8 border border-[#5C5470]/40 relative group">
                      
                      {/* Top Pill: Date & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A2438] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3]">
                          <Calendar className="w-3.5 h-3.5 text-[#5C5470]" />
                          {item.period}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5470]">
                          {idx === 0 ? 'Degree' : 'Accelerator'}
                        </span>
                      </div>

                      {/* Title and Institution */}
                      <h3 className="text-xl font-bold text-white group-hover:text-[#DBD8E3] transition-colors mb-1">
                        {item.degree}
                      </h3>
                      <h4 className="text-sm font-medium text-[#DBD8E3]/80 mb-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#5C5470]" />
                        {item.institution}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#DBD8E3]/75 leading-relaxed font-light mb-6">
                        {item.description}
                      </p>

                      {/* Key Topics Covered */}
                      <div className="pt-4 border-t border-[#5C5470]/30">
                        <p className="text-[11px] uppercase tracking-wider font-mono text-[#5C5470] mb-2.5">
                          Core Focus Areas:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.topics.map((topic, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2A2438]/80 border border-[#5C5470]/30 text-[11px] text-[#DBD8E3]/90 font-mono"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
