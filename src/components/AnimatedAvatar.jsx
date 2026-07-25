import { useEffect, useRef, useState } from 'react';
import avatarVideo from '../assets/avatar-video.mp4';
import avatarPoster from '../assets/avatar-poster.jpg';

/**
 * Signature element: the avatar renders inside a "live status feed" HUD frame —
 * corner brackets, a rotating scan ring, and a real ticking local-time readout —
 * treating the avatar like a monitored system rather than a decorative photo.
 * Falls back to a static poster frame when prefers-reduced-motion is set.
 */
export default function AnimatedAvatar({ size = 'lg' }) {
  const videoRef = useRef(null);
  const [time, setTime] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    if (size !== 'lg') return;
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
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
  }, [size]);

  return (
    <div className={`avatar-hud avatar-hud--${size}`}>
      <div className="avatar-hud__ring" aria-hidden="true" />
      <div className="avatar-hud__frame">
        {reducedMotion ? (
          <img src={avatarPoster} alt="Siddharth" className="avatar-hud__media" />
        ) : (
          <video
            ref={videoRef}
            className="avatar-hud__media"
            src={avatarVideo}
            poster={avatarPoster}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Animated avatar of Siddharth"
          />
        )}
        <span className="avatar-hud__corner avatar-hud__corner--tl" aria-hidden="true" />
        <span className="avatar-hud__corner avatar-hud__corner--tr" aria-hidden="true" />
        <span className="avatar-hud__corner avatar-hud__corner--bl" aria-hidden="true" />
        <span className="avatar-hud__corner avatar-hud__corner--br" aria-hidden="true" />
      </div>
      {size === 'lg' && (
        <div className="avatar-hud__status">
          <span className="avatar-hud__live">
            <span className="avatar-hud__live-dot" /> live
          </span>
          <span className="avatar-hud__sep">·</span>
          <span>siddharth-dev</span>
          <span className="avatar-hud__sep">·</span>
          <span className="avatar-hud__time">{time || '--:--:--'} IST</span>
        </div>
      )}
    </div>
  );
}
