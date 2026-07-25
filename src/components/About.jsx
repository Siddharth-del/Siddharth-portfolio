import { philosophy, education } from '../data/resume';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const [ref, visible] = useReveal();

  return (
    <section className="section" id="about" ref={ref}>
      <div className="section-inner reveal" data-in={visible}>
        <div className="eyebrow">02 / about</div>
        <h2>How I approach engineering</h2>
        <p className="lede">
          A few things I keep coming back to, learned mostly from shipping systems that had to
          survive contact with real sensors and real users.
        </p>
        <div className="about-grid">
          {philosophy.map((item) => (
            <div className="philosophy-item" key={item.tag}>
              <span className="tag">{item.tag}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="edu-card">
          <div>
            <div className="school">{education.school}</div>
            <div className="degree">{education.degree}</div>
          </div>
          <div className="years">{education.years}</div>
        </div>
      </div>
    </section>
  );
}
