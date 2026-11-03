import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search, key, hash } = useLocation();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, key, hash]);

  useEffect(() => {
    function handleSamePageLink(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const target = new URL(link.href, window.location.href);
      if (target.origin === window.location.origin && target.pathname === pathname && target.search === search && !target.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
    document.addEventListener('click', handleSamePageLink, true);
    return () => document.removeEventListener('click', handleSamePageLink, true);
  }, [pathname, search]);

  return null;
}
