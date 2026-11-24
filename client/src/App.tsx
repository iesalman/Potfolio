import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = [
        'home',
        'about',
        'education',
        'experience',
        'skills',
        'projects',
        'testimonials',
        'services',
        'contact'
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#2A2438] text-[#DBD8E3] selection:bg-[#5C5470] selection:text-[#DBD8E3]">
      {/* Intro Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Ambient background particles & gradients */}
      <BackgroundCanvas />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Testimonials />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
