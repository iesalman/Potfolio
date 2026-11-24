import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal } from 'lucide-react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            PROFESSIONAL BACKGROUND
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Work Experience & Practice
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Hands-on delivery across enterprise-level training programs and client-driven web applications.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="glass-card-interactive rounded-2xl p-6 sm:p-8 border border-[#5C5470]/40 relative group overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#2A2438] border border-[#5C5470] text-[11px] font-mono text-[#DBD8E3]">
                      0{idx + 1} // {item.type}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#DBD8E3] transition-colors">
                    {item.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1.5 text-xs font-mono text-[#DBD8E3]/75">
                    <span className="font-semibold text-[#DBD8E3]">{item.organization}</span>
                    <span className="flex items-center gap-1 text-[#5C5470]">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2A2438] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] shrink-0 self-start">
                  <Calendar className="w-3.5 h-3.5 text-[#5C5470]" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Responsibilities / Achievements */}
              <div className="space-y-3 mb-6">
                {item.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-[#2A2438] border border-[#5C5470]/50 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#DBD8E3]/85 leading-relaxed font-light">
                      {ach}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies Tag Bar */}
              <div className="pt-4 border-t border-[#5C5470]/30 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-[#5C5470] mr-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> Tech Stack:
                </span>
                {item.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-[#2A2438] border border-[#5C5470]/40 text-xs font-mono text-[#DBD8E3] hover:border-[#DBD8E3]/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
