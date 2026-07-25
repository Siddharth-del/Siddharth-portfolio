import { useEffect, useState } from 'react';
import { heroStats } from '../data/resume';
import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';
import heroVideo from '../assets/avatar-bg.mp4';
import heroPoster from '../assets/avatar-bg-poster.jpg';

function Stat({ s, visible, delay }) {
  const val = useCountUp(s.num, visible);
  return (
    <div className="stat reveal" style={{ transitionDelay: `${delay}ms` }} data-in={visible}>
      <div className="num">{val}</div>
      <div className="label">{s.label}</div>
    </div>
  );
}

function LiveBadge() {
  const [time, setTime] = useState('');
  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="live-badge">
      <span className="live-badge__dot" />
      <span>live</span>
      <span className="live-badge__sep">·</span>
      <span>siddharth-dev</span>
      <span className="live-badge__sep">·</span>
      <span className="live-badge__time">{time || '--:--:--'} IST</span>
    </div>
  );
}

export default function Hero() {
  const [ref, visible] = useReveal(0.1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return (
    <section className="section hero" id="overview" ref={ref}>
      <div className="hero-bg">
        {reducedMotion ? (
          <img src={heroPoster} alt="" className="hero-bg__media" aria-hidden="true" />
        ) : (
          <video
            className="hero-bg__media"
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <div className="hero-bg__tint" />
        <div className="hero-bg__scrim" />
        <div className="hero-bg__vignette" />
      </div>

      <LiveBadge />

      <div className="hero-content">
        <div className="eyebrow reveal" data-in={visible}>
          01 / overview
        </div>
        <h1 className="reveal" data-in={visible} style={{ transitionDelay: '80ms' }}>
          I build backend systems
          <br />
          that don't break when
          <br />
          real life hits them<span className="hl">.</span>
        </h1>
        <p className="hero-sub reveal" data-in={visible} style={{ transitionDelay: '160ms' }}>
          I'm <b>Siddharth</b>, a Java &amp; Spring Boot engineer finishing my B.Tech. I'd rather ship
          something reliable than something clever — which is why my favorite projects connect to
          real hardware, real weather data, and real AI models instead of clean, forgiving test
          data. I'm looking for a backend team to build that kind of software with.
        </p>
        <div className="hero-ctas reveal" data-in={visible} style={{ transitionDelay: '240ms' }}>
          <a href="#projects" className="btn btn-primary">
            View engineering case studies →
          </a>
          <a href="#assistant" className="btn btn-ghost">
            Ask my AI assistant
          </a>
        </div>
      </div>

      <div className="stat-row stat-row--overlay">
        {heroStats.map((s, i) => (
          <Stat s={s} visible={visible} delay={300 + i * 80} key={s.label} />
        ))}
      </div>

    </section>
  );
}
