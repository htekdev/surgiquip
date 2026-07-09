/**
 * change-proof-blog-hero-images-orthopedic-womens.spec.ts
 *
 * Quality fix: Orthopedic OR and Women's Health OR blog posts were using the
 * generic `or-installation-planning-hero.webp` as their hero — visually
 * misrepresenting the article topic on LinkedIn/social sharing.
 *
 * Now each has a dedicated, topically accurate hero image:
 *   - orthopedic-or-suite-hero.webp   (C-arm + radiolucent table, orthopedic/spine OR)
 *   - womens-health-or-suite-hero.webp (laparoscopic GYN/robotic OR setup)
 *
 * Proof: navigate each article, assert correct hero src, verify image visible.
 *
 * Proof keyword: change-proof
 */

import { test, expect } from '@playwright/test';
import { expectVisible, showPhaseLabel } from './visual-assert';

test.setTimeout(120000);

test('change-proof: orthopedic + womens-health blog posts render dedicated hero images', async ({
  page,
}) => {
  // ── 1. Orthopedic OR blog post ────────────────────────────────────────────
  await page.goto('/blog/orthopedic-or-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🏥 Orthopedic OR — dedicated hero image proof');

  // H1 visible
  const h1ortho = page.locator('h1').first();
  await expectVisible(h1ortho, 'Orthopedic blog H1 visible');

  // Hero image rendered with the correct dedicated src (NOT the generic planning hero)
  const heroOrtho = page.locator('img[src*="orthopedic-or-suite-hero"]').first();
  await expectVisible(heroOrtho, 'Orthopedic hero image visible');

  const orthoSrc = await heroOrtho.getAttribute('src');
  expect(
    orthoSrc,
    'Orthopedic hero src must reference orthopedic-or-suite-hero.webp',
  ).toContain('orthopedic-or-suite-hero');

  // Must NOT use the generic or-installation-planning image
  const genericOrtho = await page.locator('img[src*="or-installation-planning-hero"]').count();
  expect(
    genericOrtho,
    'Orthopedic post must not use the generic or-installation-planning-hero',
  ).toBe(0);

  await showPhaseLabel(page, '✅ Orthopedic OR hero verified: orthopedic-or-suite-hero.webp');
  await page.waitForTimeout(500);

  // ── 2. Scroll down briefly to show article context ────────────────────────
  await page.evaluate(() => window.scrollBy({ top: 500, behavior: 'smooth' }));
  await page.waitForTimeout(700);

  // ── 3. Women's Health OR blog post ───────────────────────────────────────
  await page.goto('/blog/womens-health-or-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🏥 Women\'s Health OR — dedicated hero image proof');

  // H1 visible
  const h1womens = page.locator('h1').first();
  await expectVisible(h1womens, "Women's Health blog H1 visible");

  // Hero image rendered with the correct dedicated src
  const heroWomens = page.locator('img[src*="womens-health-or-suite-hero"]').first();
  await expectVisible(heroWomens, "Women's health hero image visible");

  const womensSrc = await heroWomens.getAttribute('src');
  expect(
    womensSrc,
    "Women's health hero src must reference womens-health-or-suite-hero.webp",
  ).toContain('womens-health-or-suite-hero');

  // Must NOT use the generic or-installation-planning image
  const genericWomens = await page.locator('img[src*="or-installation-planning-hero"]').count();
  expect(
    genericWomens,
    "Women's health post must not use the generic or-installation-planning-hero",
  ).toBe(0);

  await showPhaseLabel(page, "✅ Women's Health OR hero verified: womens-health-or-suite-hero.webp");
  await page.waitForTimeout(500);

  // ── 4. Scroll down to show article content ────────────────────────────────
  await page.evaluate(() => window.scrollBy({ top: 500, behavior: 'smooth' }));
  await page.waitForTimeout(700);

  // ── 5. Verify blog index still renders both articles ─────────────────────
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '🏥 Blog index — verifying both articles present');

  const blogCards = page.locator('a[href*="/blog/orthopedic-or-equipment-guide"]');
  await expectVisible(blogCards.first(), 'Orthopedic article card visible in blog index');

  const womensCard = page.locator('a[href*="/blog/womens-health-or-equipment-guide"]');
  await expectVisible(womensCard.first(), "Women's health article card visible in blog index");

  await showPhaseLabel(page, '✅ Both articles present in blog index — quality fix complete');
  await page.waitForTimeout(800);
});
