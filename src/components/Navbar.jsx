import { useEffect, useState } from 'react';
import { navItems, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useInView';
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from './Icons';

const ids = navItems.map((n) => n.id);

export default function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" aria-label="Siddharth, back to top">
          siddharth<span>.</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a className="btn btn--small btn--ghost nav__resume" href={profile.resume} download>
            Resume
          </a>
          <button className="icon-btn nav__menu" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="sheet__top">
            <span className="nav__logo">
              siddharth<span>.</span>
            </span>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>
          <nav className="sheet__links" aria-label="Mobile">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className={active === n.id ? 'is-active' : ''}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="sheet__social">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.resume} download>
              Download resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
