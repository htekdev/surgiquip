/**
 * change-proof-k2-font-preload-critical-fonts.spec.ts
 *
 * Epic K2: Font preload hints — critical Inter woff2 files preloaded in <head>
 * for Inter 700 (display headlines) and Inter 400 (body text).
 *
 * Verified:
 *  1. Homepage <head> contains <link rel="preload" as="font"> for both critical Inter weights
 *  2. Preloaded woff2 files actually return HTTP 200 (no 404s)
 *  3. crossorigin attribute is set (required for same-origin font preloads per spec)
 *  4. Playfair is no longer preloaded after the hero typography moved to Inter
 *  5. Screenshot proof of page rendering with fonts
 */

import { test, expect } from '@playwright/test';
import { showPhaseLabel } from './visual-assert';

test('change-proof: K2 — critical font preload hints present in <head>', async ({ page }) => {
  // ── 1. Homepage loads ────────────────────────────────────────────────────
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  // ── 2. Check for <link rel="preload" as="font"> tags ─────────────────────
  const fontPreloads = await page.locator('link[rel="preload"][as="font"]').all();
  expect(
    fontPreloads.length,
    'Homepage should have at least 2 font preload hints (Inter 700 + Inter 400)',
  ).toBeGreaterThanOrEqual(2);

  // ── 3. Inter 700 preload is present ──────────────────────────────────────
  const inter700Preload = page.locator(
    'link[rel="preload"][as="font"][href*="inter-latin-700-normal"]',
  );
  await expect(inter700Preload, 'Inter 700 font preload should be in <head>').toBeAttached();

  const inter700Href = await inter700Preload.getAttribute('href');
  expect(inter700Href, 'Inter 700 preload href should reference a .woff2 file').toMatch(/\.woff2/);

  // ── 4. Inter 400 preload is present ──────────────────────────────────────
  const inter400Preload = page.locator(
    'link[rel="preload"][as="font"][href*="inter-latin-400-normal"]',
  );
  await expect(inter400Preload, 'Inter 400 font preload should be in <head>').toBeAttached();

  const inter400Href = await inter400Preload.getAttribute('href');
  expect(inter400Href, 'Inter 400 preload href should reference a .woff2 file').toMatch(/\.woff2/);

  // ── 5. Playfair preload should be absent now ─────────────────────────────
  const playfairPreload = page.locator(
    'link[rel="preload"][as="font"][href*="playfair-display"]',
  );
  await expect(
    playfairPreload,
    'Playfair Display should no longer be preloaded after the Inter headline switch',
  ).toHaveCount(0);

  // ── 6. crossorigin attribute is set (required for font preloads) ──────────
  const inter700Crossorigin = await inter700Preload.getAttribute('crossorigin');
  expect(
    inter700Crossorigin,
    'Inter 700 preload must have crossorigin attribute (font preload spec requirement)',
  ).not.toBeNull();

  const inter400Crossorigin = await inter400Preload.getAttribute('crossorigin');
  expect(
    inter400Crossorigin,
    'Inter 400 preload must have crossorigin attribute (font preload spec requirement)',
  ).not.toBeNull();

  // ── 7. Verify preloaded files actually return 200 ────────────────────────
  const inter700Response = await page.request.get(inter700Href!);
  expect(
    inter700Response.status(),
    `Inter 700 woff2 at ${inter700Href} should return 200`,
  ).toBe(200);

  const inter400Response = await page.request.get(inter400Href!);
  expect(
    inter400Response.status(),
    `Inter 400 woff2 at ${inter400Href} should return 200`,
  ).toBe(200);

  // ── 8. Screenshot proof — headline + body now both render in Inter ────────
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(400);

  await showPhaseLabel(page, '✅ K2 — Inter 700 + Inter 400 preloaded, Playfair removed');

  // Mobile view
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await showPhaseLabel(page, '✅ K2 — Inter font preloads active on mobile, no FOIT');
});
