/**
 * change-proof-blog-lcp-og-article.spec.ts
 *
 * Quality fix: Blog post SEO improvements
 *   1. og:type = "article" on blog post pages (was "website")
 *   2. <link rel="preload"> for blog hero image (LCP hint — was missing)
 *
 * Both fixes are in:
 *   - src/layouts/BaseLayout.astro (new ogType prop, default "website")
 *   - src/pages/blog/[slug].astro (passes ogType="article" + preloadImage={image})
 */

import { test, expect } from '@playwright/test';
import { showPhaseLabel } from './visual-assert';

const TEST_BLOG_SLUG = 'ambulatory-surgery-center-equipment-guide-texas';

test('change-proof: blog posts emit og:type=article and LCP preload link', async ({ page }) => {
  // ── 1. Navigate to a blog post ────────────────────────────────────────────
  await page.goto(`/blog/${TEST_BLOG_SLUG}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  // ── 2. og:type must be "article" (not "website") ──────────────────────────
  const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
  expect(ogType, 'Blog post og:type should be "article" for rich social previews').toBe('article');

  // ── 3. LCP preload link must exist for blog hero image ────────────────────
  const preloadLinks = await page.locator('link[rel="preload"][as="image"]').all();
  expect(preloadLinks.length, 'Blog post should have a preload link for the hero image').toBeGreaterThan(0);

  // The preload href should point to the blog image folder
  const preloadHref = await preloadLinks[0].getAttribute('href');
  expect(preloadHref, 'Preload link should point to blog hero image path').toContain('/images/blog/');

  // fetchpriority="high" must be on the preload link
  const fetchPriority = await preloadLinks[0].getAttribute('fetchpriority');
  expect(fetchPriority, 'Preload link should have fetchpriority=high').toBe('high');

  // ── 4. Homepage still uses og:type = "website" ────────────────────────────
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);

  const homeOgType = await page.locator('meta[property="og:type"]').getAttribute('content');
  expect(homeOgType, 'Homepage og:type should remain "website"').toBe('website');

  // ── 5. Service page also stays "website" ─────────────────────────────────
  await page.goto('/services/or-installation');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);

  const serviceOgType = await page.locator('meta[property="og:type"]').getAttribute('content');
  expect(serviceOgType, 'Service page og:type should remain "website"').toBe('website');

  // ── 6. Screenshot proof — blog post with og:type visible in source ────────
  await page.goto(`/blog/${TEST_BLOG_SLUG}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
  await page.setViewportSize({ width: 1280, height: 900 });

  await showPhaseLabel(page, '✅ og:type=article + LCP preload on blog post');

  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await showPhaseLabel(page, '✅ blog post mobile — og:type=article + LCP preload');
});
