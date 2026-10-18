import { coreAreas, education, principles, skillGroups, summary } from '../data/portfolio';

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__main">
          <h2 id="about-title" className="section-title">
            About me
          </h2>
          {summary.map((p) => (
            <p key={p.slice(0, 24)} className="about__p">
              {p}
            </p>
          ))}

          <h3 className="sub-title">Experience in core areas</h3>
          <ul className="ticks">
            {coreAreas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <h3 className="sub-title">How I build</h3>
          <div className="principles">
            {principles.map((p) => (
              <div className="principle" key={p.title}>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="about__side" aria-label="Education and skills">
          <div className="edu">
            <h3 className="sub-title sub-title--tight">Education</h3>
            <p className="edu__degree">{education.degree}</p>
            <p className="edu__school">{education.school}</p>
            <p className="edu__row">
              <span>{education.years}</span>
              <span>CGPA {education.cgpa}</span>
            </p>
          </div>

          <div className="skills">
            <h3 className="sub-title sub-title--tight">Skills</h3>
            <dl>
              {skillGroups.map((g) => (
                <div className="skills__group" key={g.title}>
                  <dt>{g.title}</dt>
                  <dd>
                    {g.items.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
