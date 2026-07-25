import { useEffect, useRef, useState } from 'react';

// Animates a numeric value counting up from 0 once visible. Non-numeric
// values (like "15+") are parsed for their leading integer and the suffix
// is preserved.
export function useCountUp(target, visible, duration = 1200) {
  const [display, setDisplay] = useState('0');
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible || startedRef.current) return;
    startedRef.current = true;

    const match = String(target).match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }
    const end = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(`${end}${suffix}`);
      return;
    }

    const start = performance.now();
    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, [target, visible, duration]);

  return display;
}
