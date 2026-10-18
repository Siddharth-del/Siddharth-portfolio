import { useState } from 'react';
import { profile } from '../data/portfolio';
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from './Icons';

// With VITE_API_BASE_URL set, messages POST to `${base}/api/contact` (the backend from the
// original repo). Without it, or if that call fails, the visitor's email app opens pre-filled.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const REMOTE = Boolean(API_BASE) || import.meta.env.VITE_USE_SAME_ORIGIN_API === 'true';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  function openMail() {
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  async function submit(e) {
    e.preventDefault();
    if (status.state === 'sending') return;
    if (!REMOTE) {
      openMail();
      setStatus({ state: 'sent', text: 'Your email app should open with the message filled in. Press send there to deliver it.' });
      return;
    }
    setStatus({ state: 'sending', text: '' });
    try {
      const resp = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      setStatus({ state: 'sent', text: 'Message sent. Siddharth will reply to the email you gave.' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({ state: 'error', text: 'The contact service did not respond, so your email app is opening with the message instead.' });
      openMail();
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <h2 id="contact-title" className="contact__title">
            Let's build something great together.
          </h2>
          <p className="lede">
            Hiring for a backend role, or need an API built? Send a message or reach me directly. I usually reply within a day.
          </p>
          <ul className="contact__list">
            <li>
              <MailIcon />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <PhoneIcon />
              <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            </li>
            <li>
              <PinIcon />
              <span>{profile.location}</span>
            </li>
            <li>
              <LinkedInIcon />
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/siddharth-java-dev
              </a>
            </li>
            <li>
              <GitHubIcon />
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                github.com/Siddharth-del
              </a>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={submit} noValidate={false}>
          <h3>Let's connect</h3>
          <p className="form__hint">Fill out the form or find me on my socials.</p>
          <label>
            <span>Your name</span>
            <input name="name" value={form.name} onChange={update} required autoComplete="name" />
          </label>
          <label>
            <span>Your email</span>
            <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows={5} value={form.message} onChange={update} required />
          </label>
          <button className="btn btn--primary" type="submit" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Sending message' : 'Send message'}
          </button>
          {status.text && (
            <p className={`form__status form__status--${status.state}`} role="status">
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
