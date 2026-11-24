import React, { useState } from 'react';
import { 
  ExternalLink, 
  Layers, 
  Eye, 
  Film, 
  ShoppingCart, 
  CheckSquare, 
  Search
} from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // CineScope Interactive Simulator State
  const [cineCategory, setCineCategory] = useState<'All' | 'Action' | 'Drama' | 'Comedy'>('All');
  const [cineSearch, setCineSearch] = useState('');

  const cineMovies = [
    { id: 1, title: 'Inception Protocol', genre: 'Action', rating: '8.8', year: '2024' },
    { id: 2, title: 'The Chrono Valley', genre: 'Drama', rating: '8.4', year: '2025' },
    { id: 3, title: 'Quantum Heist', genre: 'Comedy', rating: '7.9', year: '2025' },
    { id: 4, title: 'Cyber Pulse', genre: 'Action', rating: '8.2', year: '2026' },
  ];

  const filteredMovies = cineMovies.filter(m => 
    (cineCategory === 'All' || m.genre === cineCategory) &&
    m.title.toLowerCase().includes(cineSearch.toLowerCase())
  );

  // NexusMart Interactive Simulator State
  const [cartCount, setCartCount] = useState(2);
  const [isAdminView, setIsAdminView] = useState(false);

  // TaskFlow Interactive Simulator State
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Implement JWT Refresh Token Hook', status: 'In Progress', priority: 'High' },
    { id: 't2', title: 'Optimize MongoDB Compound Index', status: 'Done', priority: 'Medium' },
    { id: 't3', title: 'Angular Reactive Form Schema', status: 'Backlog', priority: 'High' },
  ]);

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Backlog' ? 'In Progress' : t.status === 'In Progress' ? 'Done' : 'Backlog';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44] border border-[#5C5470]/50 text-xs font-mono text-[#DBD8E3] mb-4">
            <Layers className="w-3.5 h-3.5" />
            FLAGSHIP SOFTWARE DELIVERIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DBD8E3] tracking-tight">
            Featured Full-Stack Projects
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#DBD8E3]/75 font-light">
            Architected with precision across the MEAN stack, emphasizing reactive frontends, REST APIs, and database modeling.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-20">
          {PROJECTS.map((project, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={project.id}
                className="glass-card rounded-2xl border border-[#5C5470]/40 overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#DBD8E3]/50"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch`}>
                  
                  {/* Info Column (6 cols) */}
                  <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      {/* Category & Serial Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#2A2438] border border-[#5C5470]/40 text-xs font-mono text-[#DBD8E3]">
                          PROJECT 0{idx + 1} // {project.category}
                        </span>
                        <span className="text-xs font-mono text-[#5C5470]">
                          MEAN Architecture
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                        {project.title}
                      </h3>
                      <h4 className="text-sm font-mono text-[#DBD8E3]/70 mb-4">
                        {project.tagline}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#DBD8E3]/85 leading-relaxed font-light mb-6">
                        {project.description}
                      </p>

                      {/* Metrics strip */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-[#2A2438]/70 border border-[#5C5470]/30 text-center">
                          {project.metrics.map((m, mIdx) => (
                            <div key={mIdx}>
                              <div className="text-xs font-bold text-white font-mono">{m.value}</div>
                              <div className="text-[10px] text-[#5C5470] font-mono">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-[#2A2438] border border-[#5C5470]/40 text-xs font-mono text-[#DBD8E3]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="pt-6 border-t border-[#5C5470]/30 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        Inspect Architecture
                      </button>

                      <a
                        href={project.livePlaceholder}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        title="Live Demo Placeholder"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo (Placeholder)
                      </a>

                      <a
                        href={project.githubPlaceholder}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#2A2438] text-[#DBD8E3] hover:text-white border border-[#5C5470] hover:border-[#DBD8E3] transition-colors"
                        title="GitHub Repository Placeholder"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Interactive UI Mockup Column (6 cols) */}
                  <div className={`lg:col-span-6 bg-[#231e30] border-t lg:border-t-0 ${isReversed ? 'lg:border-r border-[#5C5470]/40 lg:order-1' : 'lg:border-l border-[#5C5470]/40 lg:order-2'} p-4 sm:p-6 flex flex-col justify-center`}>
                    
                    {/* Browser Shell Frame */}
                    <div className="rounded-xl bg-[#2A2438] border border-[#5C5470]/60 overflow-hidden shadow-xl">
                      {/* Browser Top Bar */}
                      <div className="px-4 py-2.5 bg-[#1e1927] border-b border-[#5C5470]/40 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="px-3 py-0.5 rounded-md bg-[#2A2438] border border-[#5C5470]/30 text-[10px] font-mono text-[#5C5470] max-w-[200px] truncate">
                          https://{project.id}.eyadseleman.dev
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">● Live View</span>
                      </div>

                      {/* Interactive Canvas/App Simulator Inside */}
                      <div className="p-4 sm:p-5 min-h-[300px] flex flex-col justify-between">
                        
                        {/* PROJECT 1: CINESCOPE SIMULATOR */}
                        {project.previewType === 'cinescope' && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 text-xs font-bold text-white">
                                <Film className="w-4 h-4 text-[#DBD8E3]" />
                                <span>CineScope DB</span>
                              </div>
                              <div className="flex items-center gap-1 bg-[#1e1927] px-2 py-1 rounded-md border border-[#5C5470]/30 text-xs">
                                <Search className="w-3 h-3 text-[#5C5470]" />
                                <input
                                  type="text"
                                  placeholder="Search title..."
                                  value={cineSearch}
                                  onChange={(e) => setCineSearch(e.target.value)}
                                  className="bg-transparent text-[#DBD8E3] text-[11px] outline-none w-24 sm:w-32"
                                />
                              </div>
                            </div>

                            {/* Genre Tabs */}
                            <div className="flex gap-1.5 overflow-x-auto text-[11px] font-mono">
                              {(['All', 'Action', 'Drama', 'Comedy'] as const).map(cat => (
                                <button
                                  key={cat}
                                  onClick={() => setCineCategory(cat)}
                                  className={`px-2.5 py-1 rounded-md transition-colors ${
                                    cineCategory === cat
                                      ? 'bg-[#DBD8E3] text-[#2A2438] font-bold'
                                      : 'bg-[#352F44] text-[#DBD8E3]/70 hover:text-white'
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>

                            {/* Movie Grid */}
                            <div className="grid grid-cols-2 gap-2.5">
                              {filteredMovies.map(movie => (
                                <div
                                  key={movie.id}
                                  className="p-2.5 rounded-lg bg-[#352F44]/80 border border-[#5C5470]/40 hover:border-[#DBD8E3]/60 transition-colors"
                                >
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-mono text-[#5C5470]">{movie.year}</span>
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#2A2438] text-amber-300 rounded">
                                      ★ {movie.rating}
                                    </span>
                                  </div>
                                  <h5 className="text-xs font-bold text-white truncate">{movie.title}</h5>
                                  <span className="text-[10px] text-[#DBD8E3]/60 font-mono">{movie.genre}</span>
                                </div>
                              ))}
                            </div>
                            <div className="text-[10px] font-mono text-[#5C5470] text-center pt-2">
                              ⚡ MongoDB Atlas Aggregation Filter Active
                            </div>
                          </div>
                        )}

                        {/* PROJECT 2: NEXUSMART SIMULATOR */}
                        {project.previewType === 'nexusmart' && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs font-bold text-white">
                                <ShoppingCart className="w-4 h-4 text-[#DBD8E3]" />
                                <span>NexusMart Store</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setIsAdminView(!isAdminView)}
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                                    isAdminView 
                                      ? 'bg-purple-900/60 border-purple-400 text-purple-200' 
                                      : 'bg-[#352F44] border-[#5C5470] text-[#DBD8E3]'
                                  }`}
                                >
                                  {isAdminView ? 'Admin Mode (RBAC)' : 'Customer Mode'}
                                </button>
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2A2438] text-emerald-400 border border-[#5C5470]/40">
                                  🛒 {cartCount} items
                                </span>
                              </div>
                            </div>

                            {/* Products simulation */}
                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="p-3 rounded-lg bg-[#352F44]/80 border border-[#5C5470]/40">
                                <span className="text-[10px] font-mono text-emerald-400">$189.00</span>
                                <h5 className="text-xs font-bold text-white mt-1">Noise-Canceling Pro</h5>
                                <p className="text-[10px] text-[#5C5470] mb-2 font-mono">Stock: 14 units</p>
                                <button
                                  onClick={() => setCartCount(c => c + 1)}
                                  className="w-full py-1 rounded bg-[#2A2438] hover:bg-[#DBD8E3] hover:text-[#2A2438] text-[10px] font-mono text-[#DBD8E3] transition-colors border border-[#5C5470]/50"
                                >
                                  + Add to Cart
                                </button>
                              </div>

                              <div className="p-3 rounded-lg bg-[#352F44]/80 border border-[#5C5470]/40">
                                <span className="text-[10px] font-mono text-emerald-400">$340.00</span>
                                <h5 className="text-xs font-bold text-white mt-1">Mechanical Key Matrix</h5>
                                <p className="text-[10px] text-[#5C5470] mb-2 font-mono">Stock: 8 units</p>
                                <button
                                  onClick={() => setCartCount(c => c + 1)}
                                  className="w-full py-1 rounded bg-[#2A2438] hover:bg-[#DBD8E3] hover:text-[#2A2438] text-[10px] font-mono text-[#DBD8E3] transition-colors border border-[#5C5470]/50"
                                >
                                  + Add to Cart
                                </button>
                              </div>
                            </div>

                            <div className="p-2 rounded bg-[#2A2438] border border-[#5C5470]/30 text-[10px] font-mono text-[#DBD8E3]/70 flex items-center justify-between">
                              <span>Auth: JWT Bearer Token Attached</span>
                              <span className="text-emerald-400">Verified</span>
                            </div>
                          </div>
                        )}

                        {/* PROJECT 3: TASKFLOW SIMULATOR */}
                        {project.previewType === 'taskflow' && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs font-bold text-white">
                                <CheckSquare className="w-4 h-4 text-[#DBD8E3]" />
                                <span>TaskFlow Kanban</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#5C5470]">
                                Click task to transition status
                              </span>
                            </div>

                            {/* Interactive Mini Tasks */}
                            <div className="space-y-2">
                              {tasks.map(t => (
                                <div
                                  key={t.id}
                                  onClick={() => toggleTaskStatus(t.id)}
                                  className="p-2.5 rounded-lg bg-[#352F44]/90 border border-[#5C5470]/40 hover:border-[#DBD8E3] cursor-pointer transition-all flex items-center justify-between"
                                >
                                  <div>
                                    <h6 className="text-xs font-medium text-white">{t.title}</h6>
                                    <span className="text-[10px] font-mono text-[#5C5470]">Priority: {t.priority}</span>
                                  </div>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                    t.status === 'Done' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40' :
                                    t.status === 'In Progress' ? 'bg-amber-900/60 text-amber-300 border border-amber-500/40' :
                                    'bg-[#2A2438] text-[#DBD8E3] border border-[#5C5470]'
                                  }`}>
                                    {t.status}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="text-[10px] font-mono text-[#5C5470] text-center pt-2">
                              ⚡ RxJS Subject Observable Pipeline Synchronized
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Architecture Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
