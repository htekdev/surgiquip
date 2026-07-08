/**
 * change-proof-blog-post-schema-blogposting.spec.ts
 *
 * Quality fix: Blog post JSON-LD upgraded from generic `Article` to specific
 * `BlogPosting` (preferred by Google for blog content).
 *
 * Also verifies:
 *   - `keywords` field populated from frontmatter `tags`
 *   - `publisher.logo` ImageObject present
 *   - All three JSON-LD schemas present: BlogPosting, BreadcrumbList
 *
 * Proof keyword: change-proof
 */

import { test, expect } from '@playwright/test';
import { expectVisible, showPhaseLabel } from './visual-assert';

test.setTimeout(120000);

test('change-proof: blog post JSON-LD uses BlogPosting schema with keywords', async ({ page }) => {
  // ── 1. Navigate to a known blog post ─────────────────────────────────────
  await page.goto('/blog/surgical-lighting-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '🏥 Surgiquip — BlogPosting Schema Proof');

  // ── 2. Verify H1 renders ──────────────────────────────────────────────────
  const h1 = page.locator('main h1').first();
  await expectVisible(h1, 'Blog post H1 visible');

  // ── 3. Extract JSON-LD from <head> ────────────────────────────────────────
  const schemas = await page.evaluate(() => {
    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    );
    return scripts.map((s) => {
      try {
        return JSON.parse(s.textContent ?? '');
      } catch {
        return null;
      }
    });
  });

  const blogPostingSchema = schemas.find((s) => s && s['@type'] === 'BlogPosting');
  const breadcrumbSchema = schemas.find((s) => s && s['@type'] === 'BreadcrumbList');

  // ── 4. BlogPosting schema present (NOT Article) ───────────────────────────
  expect(blogPostingSchema, 'BlogPosting JSON-LD must be present in <head>').toBeTruthy();

  const articleSchema = schemas.find((s) => s && s['@type'] === 'Article');
  expect(articleSchema, 'Generic Article JSON-LD should NOT be present (replaced by BlogPosting)').toBeUndefined();

  // ── 5. Required BlogPosting fields ───────────────────────────────────────
  expect(blogPostingSchema.headline, 'BlogPosting.headline must be set').toBeTruthy();
  expect(blogPostingSchema.description, 'BlogPosting.description must be set').toBeTruthy();
  expect(blogPostingSchema.datePublished, 'BlogPosting.datePublished must be set').toBeTruthy();
  expect(blogPostingSchema.url, 'BlogPosting.url must be set').toBeTruthy();

  // ── 6. keywords from tags ─────────────────────────────────────────────────
  expect(blogPostingSchema.keywords, 'BlogPosting.keywords must be populated from tags').toBeTruthy();
  expect(typeof blogPostingSchema.keywords, 'BlogPosting.keywords should be a string').toBe('string');

  // ── 7. publisher.logo ImageObject ─────────────────────────────────────────
  expect(blogPostingSchema.publisher, 'BlogPosting.publisher must be set').toBeTruthy();
  expect(
    blogPostingSchema.publisher.logo,
    'BlogPosting.publisher.logo must be an ImageObject',
  ).toBeTruthy();
  expect(
    blogPostingSchema.publisher.logo['@type'],
    'publisher.logo must have @type: ImageObject',
  ).toBe('ImageObject');

  // ── 8. BreadcrumbList still present ──────────────────────────────────────
  expect(breadcrumbSchema, 'BreadcrumbList JSON-LD must still be present').toBeTruthy();
  expect(breadcrumbSchema.itemListElement.length, 'Breadcrumb must have 3 items').toBe(3);

  await showPhaseLabel(page, '✅ BlogPosting + keywords + publisher.logo — all verified');
  await page.waitForTimeout(600);

  // ── 9. Check a second blog post to confirm template-wide fix ─────────────
  await page.goto('/blog/hybrid-or-planning-design-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);

  const schemas2 = await page.evaluate(() => {
    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    );
    return scripts.map((s) => {
      try {
        return JSON.parse(s.textContent ?? '');
      } catch {
        return null;
      }
    });
  });

  const blogPosting2 = schemas2.find((s) => s && s['@type'] === 'BlogPosting');
  expect(blogPosting2, 'Hybrid OR blog post: BlogPosting schema must be present').toBeTruthy();
  expect(blogPosting2.keywords, 'Hybrid OR blog: keywords must be present').toBeTruthy();

  await showPhaseLabel(page, '✅ Second post confirmed — BlogPosting template-wide fix complete');
  await page.waitForTimeout(800);
});
