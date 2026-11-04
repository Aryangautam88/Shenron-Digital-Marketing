import { useEffect, useRef } from 'react';
import useServiceMotion from '../useServiceMotion';

export default function useIndustryPage(name) {
  const pageRef = useRef(null);
  useServiceMotion(pageRef);
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${name} Digital Solutions | KRAVS Infotech`;
    const page = pageRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!page || motion.matches || !('IntersectionObserver' in window)) return () => { document.title = previousTitle; };
    const blocks = [...page.querySelectorAll('[data-service-reveal]')];
    const reveal = (block) => { block.classList.remove('sd-pending'); observer.unobserve(block); };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target); }), { threshold: .08 });
    blocks.forEach((block) => { block.style.setProperty('--reveal-delay', `${Math.min([...block.parentElement.children].indexOf(block), 3) * 65}ms`); block.classList.add('sd-pending'); observer.observe(block); });
    const onFocus = (event) => { const block = event.target.closest('[data-service-reveal]'); if (block) reveal(block); };
    const onPreference = () => { if (motion.matches) blocks.forEach(reveal); };
    page.addEventListener('focusin', onFocus);
    motion.addEventListener('change', onPreference);
    return () => { observer.disconnect(); blocks.forEach((block) => block.classList.remove('sd-pending')); page.removeEventListener('focusin', onFocus); motion.removeEventListener('change', onPreference); document.title = previousTitle; };
  }, [name]);
  return pageRef;
}
