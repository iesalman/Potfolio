import React, { useState } from 'react';
import { 
  Code2, 
  FileCode, 
  Cpu, 
  Activity, 
  Layout, 
  Palette, 
  Grid, 
  Smartphone, 
  Server, 
  Terminal, 
  Send, 
  Sliders, 
  Database, 
  Binary, 
  GitFork, 
  Zap, 
  Key, 
  Shield, 
  Lock, 
  GitBranch, 
  CheckCircle, 
  TerminalSquare,
  Sparkles,
  Layers
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { GithubIcon } from './Icons';

export const Skills: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | 'all'>('all');

  const getSkillIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#DBD8E3]" };
    switch (iconName) {
      case 'Code2': return <Code2 {...props} />;
      case 'FileCode': return <FileCode {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Grid': return <Grid {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Send': return <Send {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Binary': return <Binary {...props} />;
      case 'GitFork': return <GitFork {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Key': return <Key {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Github': return <GithubIcon {...props} />;
      case 'CheckCircle': return <CheckCircle {...props} />;
      case 'TerminalSquare': return <TerminalSquare {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const displayedCategories = selectedCategoryIndex === 'all'
    ? SKILL_CATEGORIES
    : [SKILL_CATEGORIES[selectedCategoryIndex]];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#2A2438]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <Layers className="w-3.5 h-3.5" />
            COMPREHENSIVE TECHNICAL TOOLKIT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Skills & Technological Stack
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Modular, high-performance tooling applied across the frontend, backend, database, and security boundaries.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategoryIndex('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
              selectedCategoryIndex === 'all'
                ? 'bg-[#DBD8E3] text-[#2A2438] font-bold shadow-glow-sm'
                : 'bg-[#352F44] text-[#DBD8E3]/80 border border-[#5C5470]/40 hover:border-[#DBD8E3]/50'
            }`}
          >
            All Disciplines ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>

          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategoryIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                selectedCategoryIndex === idx
                  ? 'bg-[#DBD8E3] text-[#2A2438] font-bold shadow-glow-sm'
                  : 'bg-[#352F44] text-[#DBD8E3]/80 border border-[#5C5470]/40 hover:border-[#DBD8E3]/50'
              }`}
            >
              {cat.title} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {displayedCategories.map((category) => (
            <div key={category.title} className="space-y-5">
              
              {/* Category Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-[#5C5470]/30">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DBD8E3]" />
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#5C5470]">
                  {category.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card-interactive rounded-xl p-4 sm:p-5 border border-[#5C5470]/35 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-[#2A2438] border border-[#5C5470] group-hover:border-[#DBD8E3] transition-colors">
                          {getSkillIcon(skill.icon)}
                        </div>
                        <span className="text-[10px] font-mono text-[#5C5470] uppercase">
                          Verified
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-[#DBD8E3] transition-colors mb-1.5">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-[#DBD8E3]/70 font-light leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#5C5470]/20 flex items-center justify-between text-[10px] font-mono text-[#5C5470]">
                      <span>PRODUCTION READY</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
