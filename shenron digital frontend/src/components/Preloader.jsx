import { useEffect, useRef, useState } from 'react';
import './Preloader.css';

export default function Preloader() {
  const [phase, setPhase] = useState('loading');
  const overlayRef = useRef(null);
  const hidden = phase === 'hidden';

  useEffect(() => {
    if (hidden) return;
    const overlay = overlayRef.current;
    const parent = overlay?.parentElement;
    const previousOverflow = document.body.style.overflow;
    const siblings = new Map();
    const makeInert = () => {
      for (const element of parent?.children || []) {
        if (element !== overlay && !siblings.has(element)) {
          siblings.set(element, element.inert);
          element.inert = true;
        }
      }
    };
    makeInert();
    const observer = new MutationObserver(makeInert);
    if (parent) observer.observe(parent, { childList: true });
    document.body.style.overflow = 'hidden';
    return () => {
      observer.disconnect();
      siblings.forEach((previous, element) => { element.inert = previous; });
      document.body.style.overflow = previousOverflow;
    };
  }, [hidden]);

  useEffect(() => {
    let cancelled = false;
    const timers = new Set();
    const delay = (ms) => new Promise((resolve) => {
      const timer = setTimeout(() => { timers.delete(timer); resolve(); }, ms);
      timers.add(timer);
    });
    let onLoad;
    const pageReady = document.readyState === 'complete' ? Promise.resolve() : new Promise((resolve) => {
      onLoad = resolve;
      window.addEventListener('load', onLoad, { once: true });
    });
    const fontsReady = document.fonts?.ready.catch(() => {}) || Promise.resolve();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    async function finish() {
      await Promise.all([
        delay(reduced ? 0 : 2400),
        Promise.race([Promise.all([pageReady, fontsReady]), delay(3800)]),
      ]);
      if (cancelled) return;
      setPhase('leaving');
      await delay(reduced ? 0 : 650);
      if (!cancelled) setPhase('hidden');
    }
    finish();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      if (onLoad) window.removeEventListener('load', onLoad);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div className={`kr-preloader ${phase === 'leaving' ? 'is-leaving' : ''}`} ref={overlayRef}>
      <div className="kr-loader-lockup" role="img" aria-label="KRAVS. Infotech. Think beyond. Build together.">
        <div className="kr-loader-word" aria-hidden="true">
          <svg className="kr-loader-k" viewBox="0 0 80 110"><text className="kr-k-letter" x="1" y="88">K</text></svg>
          <span className="kr-loader-tail">{['R','A','V','S','.'].map((letter,index)=><span key={letter} style={{'--letter-index':index}}>{letter}</span>)}</span>
        </div>
        <span className="kr-loader-infotech" aria-hidden="true">INFOTECH</span>
        <span className="kr-loader-tagline" aria-hidden="true">Think beyond. Build together.</span>
      </div>
      <div className="kr-loader-status" role="status"><span className="kr-loader-status-dot" aria-hidden="true"/>{phase === 'leaving' ? 'Welcome to KRAVS' : 'Preparing your experience'}</div>
    </div>
  );
}
