import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { serviceCategories } from '../src/subpages/serviceContent.js';

// Run against a local Vite preview. Chrome is supplied by the host.
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4175';
const output = path.join(os.tmpdir(), 'kravs-public-qa');
await mkdir(output, { recursive: true });
const profile = path.join(output, `chrome-${Date.now()}`);
const browser = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9335', `--user-data-dir=${profile}`, 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
try {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9335/json')).json(); break; }
    catch { await pause(100); }
  }
  if (!targets) throw new Error('Chrome debugging endpoint unavailable');
  socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const handler = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) handler.reject(new Error(JSON.stringify(message.error)));
      else handler.resolve(message.result);
    }
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const next = ++id;
    pending.set(next, { resolve, reject });
    socket.send(JSON.stringify({ id: next, method, params }));
  });
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  await call('Page.enable');
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const routes = new Set(['/', '/services', '/industries', '/blog', '/company/about', '/contact',
    '/services/web-development/website-design', '/services/seo', '/industries/finance',
    '/industries/saas', '/business-types/small-business', '/testimonials', '/about', '/company/contact',
    '/privacy-policy', '/terms-of-service']);
  for (const [category, data] of Object.entries(serviceCategories)) {
    routes.add(`/services/${category}`);
    for (const [slug] of data.items) routes.add(`/services/${category}/${slug}`);
  }
  const industryRoutes = await readFile(new URL('../src/subpages/industries/industryPageRoutes.js', import.meta.url), 'utf8');
  for (const match of industryRoutes.matchAll(/path:\s*'([^']+)'/g)) routes.add(match[1]);
  const results = [];
  const selectedRoutes = process.env.QA_ROUTES ? process.env.QA_ROUTES.split(',') : [...routes];
  const widths = process.env.QA_WIDTHS ? process.env.QA_WIDTHS.split(',').map(Number) : [320, 390, 768, 1440];
  for (const width of widths) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: Number(process.env.QA_HEIGHT) || 900, deviceScaleFactor: 1, mobile: false });
    for (const route of selectedRoutes) {
      await call('Page.navigate', { url: base + route });
      for (let i = 0; i < 100; i++) {
        if (await evaluate(`location.pathname === ${JSON.stringify(route)} && !!document.querySelector('h1') && document.readyState === 'complete'`)) break;
        await pause(100);
      }
      await evaluate('document.fonts.ready.then(() => true)');
      await pause(150);
      const result = await evaluate(`(() => {
        const visible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        const hero = document.querySelector('.hero, .service-hero, .industries-hero, .blog-hero, .about-hero, .contact-hero');
        const copy = hero?.querySelector('.hero-description, .service-description, .industries-description, .blog-hero-copy, .about-description, .contact-intro');
        const badAnchors = [...document.querySelectorAll('a[href^="#"]')].filter(a => a.hash && !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a => a.hash);
        const badCtas = [...document.querySelectorAll('.site-cta')].filter(visible).filter(el => {
          const css = getComputedStyle(el);
          return css.backgroundColor !== 'rgb(17, 16, 22)' || css.color !== 'rgb(255, 255, 255)' || css.fontSize !== '14px' || el.getBoundingClientRect().height < 47;
        }).map(el => el.className);
        return {
          width: innerWidth, route: location.pathname, overflow: document.documentElement.scrollWidth > innerWidth + 1,
          documentWidth: document.documentElement.scrollWidth,
          heading: document.querySelector('h1')?.textContent,
          copySize: copy ? getComputedStyle(copy).fontSize : null,
          ctaCount: [...document.querySelectorAll('.site-cta')].filter(visible).length,
          badCtas, badAnchors,
          whatsapp: document.querySelector('.navbar-cta')?.href,
          gmail: document.querySelector('.footer-email')?.href,
          serviceStrip: location.pathname === '/' ? { width: document.querySelector('.hero-stats').getBoundingClientRect().width, display: getComputedStyle(document.querySelector('.hero-stats')).display } : null,
          sectionTitleSize: document.querySelector('.ka-heading, .kr-services__intro h1, .industries-section-title, .about-story h2, .contact-copy h2, .sd-overview h2, .id-overview h2') ? getComputedStyle(document.querySelector('.ka-heading, .kr-services__intro h1, .industries-section-title, .about-story h2, .contact-copy h2, .sd-overview h2, .id-overview h2')).fontSize : null,
          removedBannerCount: document.querySelectorAll('.sd-cta').length,
          overflowing: [...document.querySelectorAll('main *, .hero *')].filter(visible).filter(el => {
            const r = el.getBoundingClientRect(); return r.right > innerWidth + 2 && r.width > 0;
          }).slice(0, 8).map(el => ({ tag: el.tagName, className: typeof el.className === 'string' ? el.className : '', right: Math.round(el.getBoundingClientRect().right) })),
        };
      })()`);
      results.push(result);
      if (route === '/') {
        const menu = await evaluate(`(() => {
          if (innerWidth > 768) return true;
          document.querySelector('.mobile-menu-toggle').click();
          return true;
        })()`);
        await pause(50);
        result.mobileMenuWorks = menu && await evaluate(`innerWidth > 768 || (document.querySelector('.kravs-navbar').classList.contains('mobile-menu-open') && document.querySelector('.mobile-cta').href === 'https://wa.me/971565702852')`);
        await evaluate(`if (innerWidth <= 768) document.querySelector('.mobile-menu-toggle').click()`);
      }
      if (['/', '/company/about', '/business-types/small-business'].includes(route) && [390, 1440].includes(width)) {
        const screenshot = await call('Page.captureScreenshot', { format: 'png' });
        await writeFile(path.join(output, `${route === '/' ? 'home' : route.split('/').pop()}-${width}.png`), Buffer.from(screenshot.data, 'base64'));
        if (route === '/' || route === '/company/about') {
          await evaluate(`document.querySelector('${route === '/' ? '.hero-stats' : '.about-discipline-bar'}').scrollIntoView({ block: 'center' })`);
          await pause(100);
          const strip = await call('Page.captureScreenshot', { format: 'png' });
          await writeFile(path.join(output, `${route === '/' ? 'services-strip' : 'discipline-strip'}-${width}.png`), Buffer.from(strip.data, 'base64'));
        }
      }
    }
    console.log(`Checked ${selectedRoutes.length} routes at ${width}px`);
  }
  await writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
  const failures = results.filter(r => r.overflow || r.badAnchors.length || r.badCtas.length || r.removedBannerCount || !r.heading || r.mobileMenuWorks === false || r.whatsapp !== 'https://wa.me/971565702852' || !r.gmail?.startsWith('https://mail.google.com/mail/?view=cm') || (r.serviceStrip && (r.serviceStrip.display === 'none' || r.serviceStrip.width < r.width - 20)));
  console.log(JSON.stringify({ checked: results.length, output, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  socket?.close();
  browser.kill();
  await pause(300);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
