import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#2A2438]/85 backdrop-blur-md border-b border-[#5C5470]/30 shadow-glass'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DBD8E3] rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-[#352F44] border border-[#5C5470] flex items-center justify-center font-mono font-bold text-[#DBD8E3] text-sm group-hover:border-[#DBD8E3] transition-colors shadow-glow-sm">
                ES
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-wider text-base text-[#DBD8E3] group-hover:text-white transition-colors">
                  {PERSONAL_INFO.brand}
                </span>
                <span className="text-[10px] tracking-widest text-[#5C5470] uppercase font-mono hidden sm:inline-block">
                  MEAN Stack Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#352F44]/50 border border-[#5C5470]/30 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3 py-1 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 relative ${
                      isActive
                        ? 'text-[#2A2438] bg-[#DBD8E3] font-semibold shadow-glow-sm'
                        : 'text-[#DBD8E3]/80 hover:text-[#DBD8E3] hover:bg-[#5C5470]/30'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Availability Badge & Quick CTA */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#352F44]/60 border border-[#5C5470]/40 text-xs text-[#DBD8E3]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[11px] text-[#DBD8E3]/90">Available for opportunities</span>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden xl:inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#DBD8E3] text-[#2A2438] hover:bg-white transition-colors shadow-glow-sm"
              >
                Hire Me
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#352F44] border border-[#5C5470] text-[#DBD8E3] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#DBD8E3]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-3/4 max-w-sm h-full bg-[#2A2438] border-l border-[#5C5470]/40 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-16">
            <div className="flex items-center gap-2 mb-6 px-2 py-1.5 rounded-lg bg-[#352F44] border border-[#5C5470]/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-[#DBD8E3] font-mono">Available for opportunities</span>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#352F44] text-[#DBD8E3] border border-[#5C5470]'
                        : 'text-[#DBD8E3]/70 hover:text-white hover:bg-[#352F44]/40'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#5C5470]/30">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DBD8E3] text-[#2A2438] font-bold text-sm shadow-glow-sm hover:bg-white transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Get in Touch
            </a>
            <p className="mt-3 text-center text-[11px] text-[#5C5470] font-mono">
              Mansoura, Egypt • Remote Ready
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
