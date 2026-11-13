import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { serviceCategories } from '../src/subpages/serviceContent.js';

const root = fileURLToPath(new URL('../src/', import.meta.url));
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.filter(entry => entry.name !== 'admin').map(async entry => {
    const filename = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(filename) : /\.(js|jsx)$/.test(filename) ? [filename] : [];
  }))).flat();
}
const sources = await Promise.all((await walk(root)).map(async filename => ({ filename, text: await readFile(filename, 'utf8') })));
const routes = new Set(['/', '/services', '/industries', '/business-types', '/testimonials', '/blog', '/about', '/contact', '/company/about', '/company/contact', '/privacy-policy', '/terms-of-service']);
const industryRoutes = await readFile(path.join(root, 'subpages/industries/industryPageRoutes.js'), 'utf8');
for (const match of industryRoutes.matchAll(/path:\s*'([^']+)'/g)) routes.add(match[1]);
for (const [category, data] of Object.entries(serviceCategories)) {
  routes.add(`/services/${category}`);
  for (const [slug] of data.items) routes.add(`/services/${category}/${slug}`);
}
const allIds = new Set(sources.flatMap(({ text }) => [...text.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1])));
const errors = [];
let checked = 0;
for (const { filename, text } of sources) {
  if (!/[/\\](pages|components|subpages)[/\\]/.test(filename)) continue;
  const destinations = new Set([
    ...[...text.matchAll(/\b(?:href|to)=["']([^"']*)["']/g)].map(match => match[1]),
    // Include service card data and navigation menu arrays.
    ...[...text.matchAll(/["'](\/services\/[a-z0-9/-]+)["']/g)].map(match => match[1]),
    ...[...text.matchAll(/\[\s*["'][^"']+["']\s*,\s*["'](\/[^"']+)["']/g)].map(match => match[1]),
  ]);
  for (const destination of destinations) {
    checked++;
    if (!destination || destination === '#') errors.push(`${filename}: empty destination`);
    else if (destination.startsWith('#') && !allIds.has(destination.slice(1))) errors.push(`${filename}: missing anchor ${destination}`);
    else if (destination.startsWith('/') && !destination.startsWith('//') && !routes.has(destination.split(/[?#]/)[0])) errors.push(`${filename}: missing route ${destination}`);
  }
  // A plain anchor to an app route would reload the document and replay the preloader.
  for (const match of text.matchAll(/<a\b[^>]*\bhref=["']\/(?!\/)[^"']*["']/g)) errors.push(`${filename}: internal navigation must use Link: ${match[0]}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Navigation audit passed: ${checked} static destinations and ${routes.size} valid routes, including all service offerings.`);
  console.log('Live blog slugs, external profiles, and contact delivery require runtime verification.');
}
