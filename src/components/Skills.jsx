import { skillDomains } from '../data/resume';
import { useReveal } from '../hooks/useReveal';

export default function Skills() {
  const [ref, visible] = useReveal();

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="section-inner reveal" data-in={visible}>
        <div className="eyebrow">03 / skills</div>
        <h2>Engineering domains</h2>
        <p className="lede">Organized by what each toolset is actually for, not a percentage score.</p>
        <div className="skill-grid">
          {skillDomains.map((d, i) => (
            <div
              className="skill-card reveal"
              data-in={visible}
              style={{ transitionDelay: `${i * 60}ms` }}
              key={d.title}
            >
              <h3>{d.title}</h3>
              <div className="desc">{d.desc}</div>
              <div className="chip-row">
                {d.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
