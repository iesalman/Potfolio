import React, { useState } from 'react';
import { 
  ArrowRight, 
  Award, 
  GraduationCap, 
  Briefcase,
  Play,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'mean' | 'api' | 'auth'>('mean');
  const [copied, setCopied] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const codeSnippets = {
    mean: `// Architecture: MEAN Stack High-Performance Pipeline
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MeanPipelineService {
  private readonly API_URL = '/api/v1/workloads';

  constructor(private http: HttpClient) {}

  executeSecureWorkflow(payload: Payload): Observable<Response> {
    // Encrypted JWT Authorization via RxJS Interceptor
    return this.http.post<Response>(this.API_URL, payload);
  }
}`,
    api: `// Express.js + Mongoose REST Controller
import express from 'express';
import { authenticateJWT, checkRole } from '../middleware/auth';
import { MediaModel } from '../models/Media';

const router = express.Router();

router.post('/pipeline/deploy', authenticateJWT, checkRole(['Admin']), async (req, res) => {
  const { title, stack, config } = req.body;
  const project = await MediaModel.create({ title, stack, config, status: 'Active' });
  return res.status(201).json({ status: 'success', data: project });
});`,
    auth: `// Enterprise JWT & RBAC Route Guard (OWASP Top 10)
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated() && auth.hasRole(route.data['roles'])) {
    return true; // Access granted to protected route
  }
  return router.createUrlTree(['/auth/login']);
};`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteCode = () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput("✓ 200 OK — MEAN Stack Service Initialized [MongoDB: Connected | Node/Express: Active | Angular: Hydrated]");
    }, 600);
  };

  const meanPillars = [
    { letter: 'M', name: 'MongoDB', role: 'NoSQL Database & Schemas' },
    { letter: 'E', name: 'Express.js', role: 'Fast RESTful API Engine' },
    { letter: 'A', name: 'Angular', role: 'Type-Safe Reactive SPA' },
    { letter: 'N', name: 'Node.js', role: 'Event-Driven Runtime' },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#352F44]/80 border border-[#5C5470]/50 backdrop-blur-md w-fit mb-6 shadow-glow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-[#DBD8E3]">
                {PERSONAL_INFO.availabilityStatus}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#DBD8E3] leading-[1.12] mb-6">
              <span className="text-white block font-extrabold">{PERSONAL_INFO.name}</span>
              <span className="text-gradient font-light block mt-1 text-3xl sm:text-4xl xl:text-5xl">
                Full-Stack MEAN Stack Developer
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#DBD8E3]/85 max-w-2xl leading-relaxed mb-8 font-light">
              {PERSONAL_INFO.headline}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="btn-primary px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 group cursor-pointer"
              >
                View My Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="btn-secondary px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                Get in Touch
              </a>
            </div>

            {/* Quick Highlights Badge Strip */}
            <div className="pt-6 border-t border-[#5C5470]/30 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#352F44]/40 border border-[#5C5470]/30">
                <GraduationCap className="w-4 h-4 text-[#DBD8E3] shrink-0" />
                <span className="text-xs text-[#DBD8E3]/90 font-medium leading-tight">
                  CIS Graduate 2026
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#352F44]/40 border border-[#5C5470]/30">
                <Award className="w-4 h-4 text-[#DBD8E3] shrink-0" />
                <span className="text-xs text-[#DBD8E3]/90 font-medium leading-tight">
                  NTI MEAN Certified
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#352F44]/40 border border-[#5C5470]/30">
                <Briefcase className="w-4 h-4 text-[#DBD8E3] shrink-0" />
                <span className="text-xs text-[#DBD8E3]/90 font-medium leading-tight">
                  Full-Time & Freelance
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive MEAN Stack Terminal & Architecture Console (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            {/* Ambient background glow behind terminal */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#5C5470]/30 to-[#DBD8E3]/15 rounded-2xl blur-xl opacity-70 pointer-events-none" />

            <div className="relative code-terminal shadow-2xl overflow-hidden border border-[#5C5470]/60">
              {/* Terminal Top Window Controls & Tabs */}
              <div className="bg-[#2A2438] px-4 py-3 border-b border-[#5C5470]/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-[#5C5470]">
                    mean-stack-core.ts
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-md hover:bg-[#352F44] text-[#DBD8E3]/70 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleExecuteCode}
                    disabled={isExecuting}
                    className="px-2.5 py-1 rounded-md bg-[#5C5470]/40 hover:bg-[#5C5470] text-[#DBD8E3] text-xs font-mono flex items-center gap-1 transition-colors"
                    title="Run sandbox routine"
                  >
                    <Play className={`w-3 h-3 ${isExecuting ? 'animate-spin' : ''}`} />
                    <span>Run</span>
                  </button>
                </div>
              </div>

              {/* Terminal Tabs */}
              <div className="flex bg-[#231e30] border-b border-[#5C5470]/30 px-3 pt-2 gap-1 overflow-x-auto text-xs font-mono">
                <button
                  onClick={() => setActiveCodeTab('mean')}
                  className={`px-3 py-1.5 rounded-t-md transition-colors ${
                    activeCodeTab === 'mean'
                      ? 'bg-[#1e1927] text-[#DBD8E3] border-t border-x border-[#5C5470]/40 font-semibold'
                      : 'text-[#5C5470] hover:text-[#DBD8E3]'
                  }`}
                >
                  Angular.service
                </button>
                <button
                  onClick={() => setActiveCodeTab('api')}
                  className={`px-3 py-1.5 rounded-t-md transition-colors ${
                    activeCodeTab === 'api'
                      ? 'bg-[#1e1927] text-[#DBD8E3] border-t border-x border-[#5C5470]/40 font-semibold'
                      : 'text-[#5C5470] hover:text-[#DBD8E3]'
                  }`}
                >
                  Express.route
                </button>
                <button
                  onClick={() => setActiveCodeTab('auth')}
                  className={`px-3 py-1.5 rounded-t-md transition-colors ${
                    activeCodeTab === 'auth'
                      ? 'bg-[#1e1927] text-[#DBD8E3] border-t border-x border-[#5C5470]/40 font-semibold'
                      : 'text-[#5C5470] hover:text-[#DBD8E3]'
                  }`}
                >
                  Jwt.guard
                </button>
              </div>

              {/* Code Area */}
              <div className="p-4 text-xs font-mono text-[#DBD8E3]/90 overflow-x-auto max-h-[290px] leading-relaxed selection:bg-[#5C5470]">
                <pre>
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>

              {/* Execution Feedback Banner */}
              {executionOutput && (
                <div className="bg-[#2A2438] border-t border-emerald-500/30 p-2.5 px-4 font-mono text-[11px] text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{executionOutput}</span>
                </div>
              )}

              {/* MEAN Pillar Strip */}
              <div className="bg-[#2A2438]/90 border-t border-[#5C5470]/40 p-3 grid grid-cols-4 gap-2 text-center">
                {meanPillars.map((pillar) => (
                  <div
                    key={pillar.letter}
                    className="flex flex-col items-center p-1.5 rounded-lg bg-[#352F44]/50 border border-[#5C5470]/30 hover:border-[#DBD8E3]/40 transition-colors"
                  >
                    <span className="font-mono font-bold text-sm text-[#DBD8E3]">
                      {pillar.letter}
                    </span>
                    <span className="text-[10px] text-[#5C5470] font-mono leading-none mt-0.5">
                      {pillar.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
