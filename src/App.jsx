import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Assistant from './components/Assistant';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <div className="bg-grid" aria-hidden="true"></div>
      <MobileNav open={navOpen} onToggle={() => setNavOpen((o) => !o)} onClose={() => setNavOpen(false)} />
      <div className="shell">
        <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
        <main className="main">
          <Hero />
          <About />
          <Skills />
          <Journey />
          <Projects />
          <Assistant />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
