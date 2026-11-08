import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { site } from '../src/data/site.ts';

const publishedEmail = /mailto:|@[a-z0-9.-]*surgiquip(?:solutions)?\.com\b/i;
const output = resolve('.vercel/output/static');
const digest = (text) => createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');

function filesIn(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

test('public shared identity omits business email and retains phone and address', () => {
  assert.equal(Object.hasOwn(site, 'email'), false);
  assert.equal(site.phoneE164, '+17136816362');
  assert.equal(site.address.street, '2020 Johanna Drive');
});

test('every built public textual asset omits addresses and mailto links, including JSON-LD and RSS', () => {
  assert.ok(existsSync(output), 'Run npm run build first: expected Vercel static output');
  const files = filesIn(output).filter((path) => /\.(?:html|xml|js|json|txt|svg|css)$/i.test(path));
  assert.ok(files.filter((path) => path.endsWith('.html')).length >= 90, 'Scan the complete built website, not a few routes');
  assert.ok(files.some((path) => path.endsWith('rss.xml')), 'RSS is included');
  for (const path of files) {
    const text = readFileSync(path, 'utf8').replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi,
      (_, hex, decimal) => String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)));
    assert.doesNotMatch(text, publishedEmail, relative(output, path));
  }
});

test('contact and quote forms are byte-identical to main, including native validation and honeypots', () => {
  // Immutable normalized snapshots from main 6cf00cc; not a self-comparison after commit.
  const hashes = {
    contact: '49a0865ef699572ef4ac5e56d20b3d7d819b254db3029e014cc3ae010ef98c60',
    quote: 'd0eb1e41fe56964271b22984595d30bfb0451c5e36db12a602d786215763e300',
  };
  for (const [route, hash] of Object.entries(hashes)) {
    const path = `src/pages/${route}.astro`;
    const current = readFileSync(resolve(path), 'utf8');
    const forms = current.match(/<form\b[\s\S]*?<\/form>/g);
    assert.ok(forms?.length, `${route} form exists`);
    assert.equal(digest(forms.join('\n')), hash, `${route} form unchanged`);
    assert.match(current, /action="https:\/\/formspree\.io\/f\/mykrddag"/);
    assert.match(current, /name="_gotcha"/);
    assert.match(current, /type="email"/);
  }
});

test('private API and provider recipient configuration are byte-identical to main', () => {
  const hashes = {
    'api/quote-request.ts': '66b5c03430906331eb5250e4fda284382f5dae564b9165a5302fef5d3e9a628c',
    'formspree.json': '62503c53f25e0ee2a037b39b28a25ed2defa3a37ea88ef20442fdaf79933de73',
  };
  for (const [path, hash] of Object.entries(hashes)) {
    assert.equal(digest(readFileSync(resolve(path), 'utf8')), hash, `${path} unchanged`);
  }
});

test('existing contact paths survive on every formerly email-linked utility page', () => {
  for (const route of ['about/team', 'about/accreditation', 'privacy', 'terms', 'quote', 'thank-you']) {
    const html = readFileSync(join(output, route, 'index.html'), 'utf8');
    assert.match(html, /href="\/contact"/, `${route}: existing form route available`);
    assert.match(html, /href="tel:\+17136816362"/, `${route}: existing phone available`);
  }
});

test('RSS retains items, channel identity and real article links without editor addresses', () => {
  const xml = readFileSync(join(output, 'rss.xml'), 'utf8');
  assert.match(xml, /<rss\b/);
  assert.match(xml, /<item>/);
  assert.match(xml, /Surgiquip Solutions/);
  assert.match(xml, /https:\/\/surgiquip\.com\/blog\//);
  assert.doesNotMatch(xml, /<(?:managingEditor|webMaster)>/);
});
