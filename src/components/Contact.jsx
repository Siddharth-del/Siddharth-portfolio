import { useState } from 'react';
import { profile } from '../data/resume';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [ref, visible] = useReveal();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="section-inner reveal" data-in={visible}>
        <div className="eyebrow">07 / contact</div>
        <h2>Let's talk</h2>
        <p className="lede">The fastest way to reach me is email — I check it daily.</p>
      </div>
      <div className="section-inner contact-grid reveal" data-in={visible} style={{ transitionDelay: '100ms' }}>
        <ul className="contact-list">
          <li>
            <span className="c-label">Email</span>
            <span className="c-value">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </li>
          <li>
            <span className="c-label">Phone</span>
            <span className="c-value">
              <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            </span>
          </li>
          <li>
            <span className="c-label">Location</span>
            <span className="c-value">{profile.location}</span>
          </li>
          <li>
            <span className="c-label">LinkedIn / GitHub</span>
            <span className="c-value">Linked from resume — ask the assistant and I'll point you there</span>
          </li>
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="cf-name">Name</label>
            <input id="cf-name" name="name" type="text" required value={form.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="cf-email">Your email</label>
            <input id="cf-email" name="email" type="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="cf-msg">Message</label>
            <textarea id="cf-msg" name="message" required value={form.message} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Send via email →
          </button>
        </form>
      </div>
    </section>
  );
}
