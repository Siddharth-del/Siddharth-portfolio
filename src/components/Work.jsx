import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/portfolio';
import { CloseIcon, ExternalIcon, GitHubIcon } from './Icons';

function BrowserFrame({ shot, eager = false }) {
  return (
    <div className="frame">
      <div className="frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="frame__url">{shot.url}</span>
      </div>
      <img
        src={shot.src}
        alt={shot.caption}
        loading={eager ? 'eager' : 'lazy'}
        width={shot.width || 1440}
        height={shot.height || 900}
      />
    </div>
  );
}

function PendingCover({ name }) {
  return (
    <div className="frame frame--pending" aria-hidden="true">
      <div className="frame__bar">
        <i />
        <i />
        <i />
      </div>
      <div className="cosmos">
        <span className="cosmos__planet" />
        <span className="cosmos__ring" />
        <span className="cosmos__name">{name}</span>
        <span className="cosmos__note">Screenshots coming soon</span>
      </div>
    </div>
  );
}

function LinkButtons({ links }) {
  return links.map((l) => (
    <a key={l.url} className="btn btn--ghost btn--small" href={l.url} target="_blank" rel="noopener noreferrer">
      {l.kind === 'github' ? <GitHubIcon width={16} height={16} /> : <ExternalIcon width={16} height={16} />}
      {l.label}
    </a>
  ));
}

function CaseStudy({ project, onClose }) {
  const ref = useRef(null);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (!d.open) d.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const cs = project.caseStudy;
  const current = project.screenshots[shot];

  return (
    <dialog
      ref={ref}
      className="case"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <div className="case__inner">
        <header className="case__head">
          <div>
            <p className="case__kicker">Case study</p>
            <h3 id="case-title">{project.name}</h3>
            <p className="case__sub">{project.subtitle}</p>
          </div>
          <button className="icon-btn" onClick={() => ref.current.close()} aria-label="Close case study" autoFocus>
            <CloseIcon />
          </button>
        </header>

        {current && (
          <figure className="case__gallery">
            <BrowserFrame shot={current} eager />
            <figcaption>{current.caption}</figcaption>
            {project.screenshots.length > 1 && (
              <div className="case__thumbs" role="tablist" aria-label="Screenshots">
                {project.screenshots.map((s, i) => (
                  <button
                    key={s.src}
                    role="tab"
                    aria-selected={i === shot}
                    className={i === shot ? 'is-active' : ''}
                    onClick={() => setShot(i)}
                    aria-label={`Screenshot ${i + 1}: ${s.caption}`}
                  >
                    <img src={s.src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </figure>
        )}

        {project.features && (
          <section className="case__features" aria-labelledby="case-features">
            <h4 id="case-features">Features</h4>
            <ul className="ticks">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="case__cols">
          <div>
            <h4>The problem</h4>
            <p>{cs.problem}</p>
            <h4>What I built</h4>
            <p>{cs.solution}</p>
            <h4>The hardest part</h4>
            <p>{cs.challenge}</p>
          </div>
          <div>
            <h4>Key decisions</h4>
            <ul className="ticks">
              {cs.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h4>Sample endpoints</h4>
            <ul className="endpoints">
              {cs.endpoints.map((e) => {
                const [verb, ...path] = e.split(' ');
                return (
                  <li key={e}>
                    <code>
                      <b className={`verb verb--${verb.toLowerCase()}`}>{verb}</b> {path.join(' ')}
                    </code>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <footer className="case__foot">
          <p className="stack-line">{project.stack.join(', ')}</p>
          <div className="case__links">
            <LinkButtons links={project.links} />
          </div>
        </footer>
      </div>
    </dialog>
  );
}

export default function Work() {
  const [open, setOpen] = useState(null);
  const active = projects.find((p) => p.id === open);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <h2 id="work-title" className="section-title">
          My project work
        </h2>
        <p className="lede">Backends I have designed, secured, tested and shipped. Open a case study for the decisions behind each one.</p>

        <div className="projects">
          {projects.map((p, idx) => (
            <article className={`project ${idx % 2 ? 'project--flip' : ''} ${p.pending ? 'project--pending' : ''}`} key={p.id}>
              <div className="project__media">
                {p.screenshots[0] ? (
                  <button className="project__shot" onClick={() => setOpen(p.id)} aria-label={`${p.screenshots[0].url}: open ${p.name} case study`}>
                    <BrowserFrame shot={p.screenshots[0]} />
                  </button>
                ) : (
                  <PendingCover name={p.name} />
                )}
              </div>

              <div className="project__text">
                <h3 className="project__name">{p.name}</h3>
                <p className="project__sub">{p.subtitle}</p>
                <p className="project__summary">{p.summary}</p>
                {p.highlights.length > 0 && (
                  <ul className="ticks ticks--compact">
                    {p.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                {p.stack.length > 0 && <p className="stack-line">{p.stack.join(', ')}</p>}
                <div className="project__actions">
                  {p.caseStudy && (
                    <button className="btn btn--primary btn--small" onClick={() => setOpen(p.id)}>
                      View case study
                    </button>
                  )}
                  <LinkButtons links={p.links} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && <CaseStudy project={active} onClose={() => setOpen(null)} />}
    </section>
  );
}
