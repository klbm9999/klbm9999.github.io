// Checks every internal link in the built site: each href, src and srcset that
// points inside the site must resolve to a built file, and each #fragment must
// match an id on the target page. External links are not fetched.
//
// Usage: node scripts/check-links.mjs <dist-dir>

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { parseDocument } from 'htmlparser2';
import { findAll } from 'domutils';

const SITE_ORIGIN = 'https://klbm9999.github.io';
const dist = resolve(process.argv[2] ?? 'dist');

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

/** Maps a site path such as "/writing/post/" to the file that serves it. */
function fileForPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidates = decoded.endsWith('/')
    ? [join(dist, decoded, 'index.html')]
    : [join(dist, decoded), join(dist, decoded, 'index.html'), join(dist, `${decoded}.html`)];
  return candidates.find((file) => existsSync(file) && statSync(file).isFile());
}

const idCache = new Map();
function idsIn(file) {
  if (!idCache.has(file)) {
    const doc = parseDocument(readFileSync(file, 'utf8'));
    idCache.set(file, new Set(findAll((el) => Boolean(el.attribs.id), doc.children).map((el) => el.attribs.id)));
  }
  return idCache.get(file);
}

function urlsIn(el) {
  const urls = [];
  for (const name of ['href', 'src']) {
    if (el.attribs[name] !== undefined) urls.push(el.attribs[name]);
  }
  if (el.attribs.srcset) {
    for (const candidate of el.attribs.srcset.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url) urls.push(url);
    }
  }
  // Social cards reference the site by absolute URL.
  if (el.name === 'meta' && /^(og:image|og:url)$/.test(el.attribs.property ?? '')) {
    urls.push(el.attribs.content ?? '');
  }
  return urls;
}

const files = htmlFiles(dist);
if (files.length === 0) {
  console.error(`No HTML files found in ${dist}. Run the build first.`);
  process.exit(1);
}

const problems = [];
let checked = 0;

for (const file of files) {
  const page = '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  const doc = parseDocument(readFileSync(file, 'utf8'));
  for (const el of findAll(() => true, doc.children)) {
    for (const raw of urlsIn(el)) {
      if (raw === '') {
        problems.push(`${page}: empty ${el.name} link`);
        continue;
      }
      const url = new URL(raw, SITE_ORIGIN + page);
      if (url.origin !== SITE_ORIGIN) continue;
      checked += 1;
      const target = fileForPath(url.pathname);
      if (!target) {
        problems.push(`${page}: ${raw} -> no file for ${url.pathname}`);
        continue;
      }
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (fragment && target.endsWith('.html') && !idsIn(target).has(fragment)) {
        problems.push(`${page}: ${raw} -> no element with id "${fragment}"`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`Broken internal links (${problems.length}):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`Checked ${checked} internal links across ${files.length} pages: all resolve.`);
