import { useEffect } from 'react';

// One delegated listener per page; pointer updates are batched into animation frames.
export default function useServiceMotion(pageRef) {
  useEffect(() => {
    const page = pageRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!page || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || preference.matches) return;
    let frame = 0;
    let activeCard = null;
    const selector = '.sd-capability, .sd-measures, .sx-panel, .sd-cta > .sd-wrap';
    function onMove(event) {
      if (preference.matches) return;
      const card = event.target.closest(selector);
      if (!card || !page.contains(card)) return;
      const { clientX, clientY } = event;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (activeCard && activeCard !== card) activeCard.style.removeProperty('--card-lift');
        activeCard = card;
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        card.style.setProperty('--pointer-x', `${x}px`);
        card.style.setProperty('--pointer-y', `${y}px`);
        card.style.setProperty('--card-lift', `perspective(1000px) rotateX(${(0.5-y/rect.height)*2}deg) rotateY(${(x/rect.width-0.5)*2}deg) translateY(-5px)`);
      });
    }
    function onLeave(event) {
      const card = event.target.closest(selector);
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
      cancelAnimationFrame(frame);
      card.style.removeProperty('--card-lift');
    }
    page.addEventListener('pointermove', onMove);
    page.addEventListener('pointerout', onLeave);
    return () => { cancelAnimationFrame(frame); page.removeEventListener('pointermove', onMove); page.removeEventListener('pointerout', onLeave); activeCard?.style.removeProperty('--card-lift'); };
  }, [pageRef]);
}
