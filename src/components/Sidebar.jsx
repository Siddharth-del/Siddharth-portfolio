import { useEffect, useState } from 'react';
import { profile, navItems } from '../data/resume';
import AnimatedAvatar from './AnimatedAvatar';

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
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
    <nav className={`sidebar${open ? ' open' : ''}${collapsed ? ' collapsed' : ''}`} aria-label="Primary">
      {onToggleCollapse && (
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div className="brand">
        <AnimatedAvatar size="sm" />
        <div className="brand-text">
          <div className="brand-name">{profile.name}</div>
          <div className="brand-role">{profile.role}</div>
        </div>
      </div>

      <div className="status-pill">
        <span className="status-dot" /> <span className="status-text">open to opportunities</span>
      </div>

      <ul className="nav-tree">
        <li className="nav-label">
          <span className="nav-label-text">navigate</span>
        </li>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`nav-link${active === item.id ? ' active' : ''}`}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
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
