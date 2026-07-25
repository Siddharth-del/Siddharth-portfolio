import { journey } from '../data/resume';
import { useReveal } from '../hooks/useReveal';

export default function Journey() {
  const [ref, visible] = useReveal();

  return (
    <section className="section" id="journey" ref={ref}>
      <div className="section-inner reveal" data-in={visible}>
        <div className="eyebrow">04 / journey</div>
        <h2>Academic &amp; engineering timeline</h2>
        <p className="lede">
          Real milestones — no filler roles. Most of my engineering growth has happened through
          self-directed, production-style projects alongside my degree.
        </p>
        <div className="journey">
          {journey.map((item, i) => (
            <div
              className="j-item reveal"
              data-in={visible}
              style={{ transitionDelay: `${i * 70}ms` }}
              key={item.title}
            >
              <div className="j-when">{item.when}</div>
              <span className="j-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
