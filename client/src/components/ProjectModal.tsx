import React from 'react';
import { X, ExternalLink, CheckCircle2, Shield, Layers, Database, Server, AlertCircle } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#2A2438] border border-[#5C5470] rounded-2xl shadow-2xl z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Window Bar */}
        <div className="bg-[#352F44] px-6 py-4 border-b border-[#5C5470]/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-md bg-[#2A2438] text-[11px] font-mono text-[#DBD8E3] border border-[#5C5470]/50">
              {project.category}
            </span>
            <h3 className="text-lg font-bold text-white tracking-wide">
              {project.title} — System Architecture
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#2A2438] text-[#DBD8E3] hover:text-white hover:border-[#DBD8E3] border border-[#5C5470] transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Header Summary */}
          <div>
            <h4 className="text-2xl font-extrabold text-white mb-2">
              {project.title}
              <span className="text-sm font-normal text-[#DBD8E3]/70 block mt-1 font-mono">
                {project.tagline}
              </span>
            </h4>
            <p className="text-sm sm:text-base text-[#DBD8E3]/90 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Architecture Breakdown Matrix */}
          <div>
            <h5 className="text-xs uppercase font-mono tracking-widest text-[#5C5470] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Technical Architecture
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#352F44]/60 border border-[#5C5470]/30">
                <div className="flex items-center gap-2 text-xs font-mono text-[#DBD8E3] mb-1 font-semibold">
                  <Layers className="w-3.5 h-3.5 text-[#5C5470]" /> Frontend Client
                </div>
                <p className="text-xs text-[#DBD8E3]/80 font-light leading-relaxed">
                  {project.architecture.frontend}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#352F44]/60 border border-[#5C5470]/30">
                <div className="flex items-center gap-2 text-xs font-mono text-[#DBD8E3] mb-1 font-semibold">
                  <Server className="w-3.5 h-3.5 text-[#5C5470]" /> Backend API
                </div>
                <p className="text-xs text-[#DBD8E3]/80 font-light leading-relaxed">
                  {project.architecture.backend}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#352F44]/60 border border-[#5C5470]/30">
                <div className="flex items-center gap-2 text-xs font-mono text-[#DBD8E3] mb-1 font-semibold">
                  <Database className="w-3.5 h-3.5 text-[#5C5470]" /> Database Modeling
                </div>
                <p className="text-xs text-[#DBD8E3]/80 font-light leading-relaxed">
                  {project.architecture.database}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#352F44]/60 border border-[#5C5470]/30">
                <div className="flex items-center gap-2 text-xs font-mono text-[#DBD8E3] mb-1 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-[#5C5470]" /> Security & Auth Controls
                </div>
                <p className="text-xs text-[#DBD8E3]/80 font-light leading-relaxed">
                  {project.architecture.security}
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h5 className="text-xs uppercase font-mono tracking-widest text-[#5C5470] mb-3">
              Core Capabilities & Features
            </h5>
            <div className="space-y-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#DBD8E3]/85 font-light">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h5 className="text-xs uppercase font-mono tracking-widest text-[#5C5470] mb-3">
              Technologies & Frameworks
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Disclaimer Banner on Placeholders */}
          <div className="p-3.5 rounded-xl bg-[#352F44]/40 border border-[#5C5470]/40 flex items-start gap-3 text-xs text-[#DBD8E3]/70 font-mono">
            <AlertCircle className="w-4 h-4 text-[#DBD8E3] shrink-0 mt-0.5" />
            <span>
              Note: The live links and repository buttons below are clearly marked placeholders representing this project showcase until the user configures dedicated production domain mappings.
            </span>
          </div>

          {/* External Links Action Bar */}
          <div className="pt-4 border-t border-[#5C5470]/30 flex flex-wrap items-center gap-4">
            <a
              href={project.livePlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo (Placeholder)
            </a>

            <a
              href={project.githubPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              Source Code (GitHub Placeholder)
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
