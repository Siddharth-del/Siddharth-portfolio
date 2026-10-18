import { profile, quickFacts, heroStack } from '../data/portfolio';
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import ApiConsole from './ApiConsole';
import avatar from '../assets/siddharth-face.webp';

export default function Hero() {
  const callHref = `mailto:${profile.email}?subject=${encodeURIComponent('Discovery call with Siddharth')}`;

  return (
    <section className="hero" id="home" aria-labelledby="hero-name">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__eyebrow">Java Developer • Portfolio</p>

          <h1 className="hero__hello" id="hero-name">
            <img className="hero__avatar" src={avatar} alt="" width="240" height="240" />
            <span>
              Hi <span className="wave" role="img" aria-label="waving hand">👋</span> I'm <strong>{profile.name}</strong>
            </span>
          </h1>

          <p className="hero__statement">
            <span className="hero__line hero__line--quiet">I don't just write code.</span>
            <span className="hero__line">I engineer solutions that scale.</span>
          </p>

          <ul className="hero__stack" aria-label="Core stack">
            {heroStack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <div className="hero__actions">
            <a className="btn btn--primary" href={callHref}>
              Book a discovery call
            </a>
            <a className="btn btn--ghost" href="#work">
              See my work
            </a>
          </div>

          <div className="hero__meta">
            <a href={profile.resume} download className="text-link">
              <DownloadIcon width={18} height={18} /> Download resume
            </a>
            <span className="hero__socials">
              <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email">
                <MailIcon />
              </a>
            </span>
          </div>
        </div>

        <ApiConsole />
      </div>

      <div className="container">
        <dl className="facts">
          {quickFacts.map((f) => (
            <div className="facts__item" key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
