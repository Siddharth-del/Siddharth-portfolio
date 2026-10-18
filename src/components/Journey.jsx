import { journey, certifications } from '../data/portfolio';

export function Certifications() {
  return (
    <section className="section" id="certifications" aria-labelledby="cert-title">
      <div className="container">
        <h2 id="cert-title" className="section-title">
          Certifications and achievements
        </h2>
        <ul className="certs">
          {certifications.map((c) => (
            <li className={`cert cert--${c.kind.toLowerCase()}`} key={c.title}>
              <span className="cert__kind">{c.kind}</span>
              <h3 className="cert__title">{c.title}</h3>
              <p className="cert__meta">
                <span>{c.issuer}</span>
                <span>{c.date}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section className="section section--tight" id="journey" aria-labelledby="journey-title">
      <div className="container journey">
        <h2 id="journey-title" className="section-title">
          The road so far
        </h2>
        <ol className="timeline">
          {journey.map((j) => (
            <li key={j.title}>
              <span className="timeline__when">{j.when}</span>
              <div>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
