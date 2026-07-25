import { useEffect, useState } from 'react';
import { profile, navItems } from '../data/resume';
import AnimatedAvatar from './AnimatedAvatar';

export default function Sidebar({ open, onClose }) {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className={`sidebar${open ? ' open' : ''}`} aria-label="Primary">
      <div className="brand">
        <AnimatedAvatar size="sm" />
        <div>
          <div className="brand-name">{profile.name}</div>
          <div className="brand-role">{profile.role}</div>
        </div>
      </div>

      <div className="status-pill">
        <span className="status-dot" /> open to opportunities
      </div>

      <ul className="nav-tree">
        <li className="nav-label">navigate</li>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`nav-link${active === item.id ? ' active' : ''}`}
              onClick={onClose}
            >
              <span className="idx">{item.idx}</span> {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="contact-line">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className="contact-line">
          <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
        </div>
        <div className="contact-line">{profile.location}</div>
      </div>
    </nav>
  );
}
