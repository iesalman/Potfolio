import React from 'react';
import { Layers, Sparkles, Server, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

export const Services: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-[#DBD8E3]" };
    switch (iconName) {
      case 'Layers': return <Layers {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Database': return <Database {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            ENGINEERING CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Specialized Development Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Targeted technical solutions tailored for high-performance web products and modern system architectures.
          </p>
        </div>

        {/* Services Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="glass-card-interactive rounded-2xl p-8 border border-[#5C5470]/40 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header with Icon and Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#2A2438] border border-[#5C5470] flex items-center justify-center group-hover:border-[#DBD8E3] transition-colors shadow-glow-sm">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs text-[#5C5470] font-bold">
                    0{idx + 1} // SERVICE
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#DBD8E3] transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#DBD8E3]/80 leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-[#5C5470]/30">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#5C5470]">
                    Key Deliverables:
                  </h4>
                  {service.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-[#DBD8E3]/90 font-light">
                        {del}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link to Contact */}
              <div className="pt-4 border-t border-[#5C5470]/20 flex items-center justify-between">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#DBD8E3] group-hover:text-white transition-colors"
                >
                  <span>Inquire about this service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="w-2 h-2 rounded-full bg-[#DBD8E3]/40 group-hover:bg-[#DBD8E3] transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
