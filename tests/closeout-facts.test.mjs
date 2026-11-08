import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { retiredPartnerRedirects, includeCurrentPage } from '../scripts/retired-partner-routes.mjs';

const read = (path) => readFileSync(path, 'utf8');
const digest = (text) => createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');

test('both retired dealer routes permanently redirect to the existing catalog', () => {
  assert.deepEqual(Object.keys(retiredPartnerRedirects).sort(), ['/products/hsi', '/products/knight']);
  for (const route of Object.values(retiredPartnerRedirects)) {
    assert.equal(route.status, 301);
    assert.equal(route.destination, '/products');
  }
});

test('sitemap excludes only retired paths, including trailing slash/query/hash variants', () => {
  for (const path of ['/products/hsi', '/products/hsi/', '/products/knight///', '/products/knight?old=1#bookmark']) {
    assert.equal(includeCurrentPage(`https://surgiquip.com${path}`), false, path);
  }
  for (const path of ['/', '/products', '/products/skytron', '/projects', '/products/hsi-other', '/privacy']) {
    assert.equal(includeCurrentPage(`https://surgiquip.com${path}`), true, path);
  }
});

test('malformed sitemap input raises an error instead of silently filtering unrelated pages', () => {
  assert.throws(() => includeCurrentPage('not-an-absolute-url'), TypeError);
});

test('complete built public HTML/XML omits withdrawn dealer claims and obsolete processor', () => {
  let checked = 0;
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) scan(path);
      else if (/\.(html|xml)$/.test(entry.name)) {
        assert.doesNotMatch(read(path), /\b(?:HSI|Knight|Resend)\b/i, path);
        checked++;
      }
    }
  }
  scan('dist');
  assert.ok(checked >= 90, 'Complete build, not a single sampled page');
  const sitemap = read('dist/sitemap-0.xml');
  assert.doesNotMatch(sitemap, /\/products\/(?:hsi|knight)(?:\/|<)/);
  assert.match(sitemap, /\/products\/skytron/);
  assert.match(sitemap, /\/projects/); // Frozen portfolio disposition is untouched.
});

test('Vercel build emits canonical 301s and project config covers retired slash/index aliases', () => {
  const output = JSON.parse(read('.vercel/output/config.json'));
  for (const path of ['/products/hsi', '/products/knight']) {
    const rule = output.routes.find((route) => route.src && new RegExp(route.src).test(path) && route.status === 301);
    assert.ok(rule, `301 rule for ${path}`);
    assert.equal(rule.headers?.Location, '/products');
  }
  const project = JSON.parse(read('vercel.json'));
  for (const source of ['/products/hsi/:path*', '/products/knight/:path*']) {
    const rule = project.redirects.find((route) => route.source === source);
    assert.ok(rule, source);
    assert.equal(rule.destination, '/products');
    assert.equal(rule.statusCode, 301);
  }
});

test('privacy change identifies the actual form processor, not new legal/analytics assurances', () => {
  const privacy = read('src/pages/privacy.astro');
  assert.match(privacy, /Our contact and quote forms send submissions to Formspree for processing/);
  assert.doesNotMatch(privacy, /\bResend\b/);
  assert.match(privacy, /const updated = 'November 8, 2026'/);
  assert.match(privacy, /3 years/); // Existing policy terms remain owner-review items, not invented replacements.
  assert.match(privacy, /Google Analytics 4/);
});

test('complete live form blocks and private provider files retain immutable baseline hashes', () => {
  const expected = {
    'src/pages/contact.astro': '49a0865ef699572ef4ac5e56d20b3d7d819b254db3029e014cc3ae010ef98c60',
    'src/pages/quote.astro': 'd0eb1e41fe56964271b22984595d30bfb0451c5e36db12a602d786215763e300',
  };
  for (const [path, hash] of Object.entries(expected)) {
    const form = read(path).match(/<form\b[\s\S]*?<\/form>/);
    assert.ok(form, path);
    assert.equal(digest(form[0]), hash, path);
  }
  assert.equal(digest(read('api/quote-request.ts')), '66b5c03430906331eb5250e4fda284382f5dae564b9165a5302fef5d3e9a628c');
  assert.equal(digest(read('formspree.json')), '62503c53f25e0ee2a037b39b28a25ed2defa3a37ea88ef20442fdaf79933de73');
});
