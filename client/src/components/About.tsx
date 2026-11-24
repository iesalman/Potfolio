import React from 'react';
import { Layers, Server, ShieldCheck, Smartphone, CheckCircle, Terminal, Lock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-6 h-6 text-[#DBD8E3]" />,
    Server: <Server className="w-6 h-6 text-[#DBD8E3]" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#DBD8E3]" />,
    Smartphone: <Smartphone className="w-6 h-6 text-[#DBD8E3]" />
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#DBD8E3]" />
            PROFILE & ENGINEERING PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Architecting Resilient Web Applications
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Turning complex technical requirements into elegant, high-speed digital products.
          </p>
        </div>

        {/* Narrative & Architectural Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Narrative Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-8 sm:p-10 border border-[#5C5470]/40 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-[#5C5470]/20 pointer-events-none">
              <Terminal className="w-36 h-36 -mr-10 -mt-10" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#2A2438] border border-[#5C5470] flex items-center justify-center font-mono font-bold text-[#DBD8E3]">
                  ES
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Eyad Seleman</h3>
                  <p className="text-xs font-mono text-[#5C5470]">Full-Stack MEAN Stack Developer</p>
                </div>
              </div>

              <div className="space-y-4 text-base text-[#DBD8E3]/90 leading-relaxed font-light">
                <p>
                  I am <strong className="text-white font-semibold">Eyad Seleman</strong>, a Full-Stack Web Developer specializing in the MEAN Stack (MongoDB, Express.js, Angular, and Node.js). With a degree in Computer & Information Science and intensive hands-on training from the National Telecommunication Institute (NTI), I focus on turning complex ideas into responsive, high-performance Single Page Applications (SPAs) backed by clean, well-structured RESTful APIs.
                </p>
                <p>
                  Beyond writing maintainable TypeScript and JavaScript code, I prioritize web application security—implementing JWT authentication, role-based access control, and OWASP best practices to ensure every product is reliable and production-ready.
                </p>
              </div>
            </div>

            {/* Core Values Strip */}
            <div className="mt-8 pt-6 border-t border-[#5C5470]/30 flex flex-wrap gap-4 text-xs font-mono text-[#DBD8E3]/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Single Page Applications (SPAs)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>RESTful API Contracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>OWASP Security Standards</span>
              </div>
            </div>
          </div>

          {/* Side Architectural Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="p-6 rounded-2xl bg-[#352F44]/70 border border-[#5C5470]/40 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#2A2438] border border-[#5C5470]">
                  <Lock className="w-5 h-5 text-[#DBD8E3]" />
                </div>
                <h4 className="text-base font-bold text-white">Security by Design</h4>
              </div>
              <p className="text-xs text-[#DBD8E3]/80 leading-relaxed font-light">
                Proactive defenses against token tampering, cross-site scripting (XSS), SQL/NoSQL injection, and unauthorized data leakage with strict route guards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#352F44]/70 border border-[#5C5470]/40 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#2A2438] border border-[#5C5470]">
                  <Server className="w-5 h-5 text-[#DBD8E3]" />
                </div>
                <h4 className="text-base font-bold text-white">Stateless REST Architecture</h4>
              </div>
              <p className="text-xs text-[#DBD8E3]/80 leading-relaxed font-light">
                Decoupled backend services engineered with Express controllers, async error interceptors, and strict Mongoose schema validation rules.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#352F44]/70 border border-[#5C5470]/40 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#2A2438] border border-[#5C5470]">
                  <Layers className="w-5 h-5 text-[#DBD8E3]" />
                </div>
                <h4 className="text-base font-bold text-white">Reactive Front-End Flow</h4>
              </div>
              <p className="text-xs text-[#DBD8E3]/80 leading-relaxed font-light">
                Modular Angular architectures driven by RxJS observables, reactive forms, standalone components, and declarative route transitions.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Feature Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAL_INFO.aboutCards.map((card, idx) => (
            <div
              key={idx}
              className="glass-card-interactive rounded-xl p-6 border border-[#5C5470]/40 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2A2438] border border-[#5C5470] flex items-center justify-center mb-4 group-hover:border-[#DBD8E3] transition-colors shadow-glow-sm">
                  {iconMap[card.icon]}
                </div>
                <h4 className="text-base font-bold text-[#DBD8E3] group-hover:text-white transition-colors mb-2">
                  {card.title}
                </h4>
                <p className="text-xs text-[#DBD8E3]/75 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#5C5470]/20 flex items-center justify-between text-[11px] font-mono text-[#5C5470]">
                <span>CAPABILITY 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DBD8E3]/50" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
