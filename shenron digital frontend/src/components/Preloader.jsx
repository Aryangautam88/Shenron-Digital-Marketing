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
        delay(reduced ? 0 : 1600),
        Promise.race([Promise.all([pageReady, fontsReady]), delay(2100)]),
      ]);
      if (cancelled) return;
      setPhase('leaving');
      await delay(reduced ? 0 : 400);
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
          <div className="kr-clean-brand">
            <div className="kr-clean-word">
              <svg className="kr-clean-k" viewBox="0 0 74 86" aria-hidden="true">
                <defs><linearGradient id="kr-k-purple" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#5521dc"/><stop offset=".55" stopColor="#9750ff"/><stop offset="1" stopColor="#dd91ff"/></linearGradient></defs>
                <path d="M3 4h16v68L3 84Z" fill="#7540ed"/>
                <path d="M25 57C20 29 45 19 71 3c0 28-18 42-46 54Z" fill="url(#kr-k-purple)"/>
                <path d="m29 62 15-15 28 36H47Z" fill="url(#kr-k-purple)"/>
              </svg>
              <span className="kr-clean-letters">RAVS<span className="kr-clean-dot" /></span>
            </div>
            <span className="kr-clean-infotech">INFOTECH</span>
          </div>
        </div>
        <span className="kr-loader-tagline" aria-hidden="true">Think beyond. Build together.</span>
      </div>
      <div className="kr-loader-status" role="status"><span className="kr-loader-status-dot" aria-hidden="true"/>{phase === 'leaving' ? 'Welcome to KRAVS' : 'Preparing your experience'}</div>
    </div>
  );
}
