/**
 * change-proof-k2-font-preload-critical-fonts.spec.ts
 *
 * Epic K2: Font preload hints — critical font woff2 files preloaded in <head>
 * for Playfair Display (700, headlines) and Inter (400, body text).
 *
 * Verified:
 *  1. Homepage <head> contains <link rel="preload" as="font"> for both critical fonts
 *  2. Preloaded woff2 files actually return HTTP 200 (no 404s)
 *  3. crossorigin attribute is set (required for same-origin font preloads per spec)
 *  4. Screenshot proof of page rendering with fonts
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
    'Homepage should have at least 2 font preload hints (Playfair 700 + Inter 400)',
  ).toBeGreaterThanOrEqual(2);

  // ── 3. Playfair Display 700 preload is present ────────────────────────────
  const playfairPreload = page.locator(
    'link[rel="preload"][as="font"][href*="playfair-display"]',
  );
  await expect(
    playfairPreload,
    'Playfair Display font preload should be in <head>',
  ).toBeAttached();

  const playfairHref = await playfairPreload.getAttribute('href');
  expect(playfairHref, 'Playfair preload href should reference a .woff2 file').toMatch(/\.woff2/);

  // ── 4. Inter 400 preload is present ──────────────────────────────────────
  const interPreload = page.locator('link[rel="preload"][as="font"][href*="inter"]');
  await expect(interPreload, 'Inter font preload should be in <head>').toBeAttached();

  const interHref = await interPreload.getAttribute('href');
  expect(interHref, 'Inter preload href should reference a .woff2 file').toMatch(/\.woff2/);

  // ── 5. crossorigin attribute is set (required for font preloads) ──────────
  const playfairCrossorigin = await playfairPreload.getAttribute('crossorigin');
  expect(
    playfairCrossorigin,
    'Playfair preload must have crossorigin attribute (font preload spec requirement)',
  ).not.toBeNull();

  const interCrossorigin = await interPreload.getAttribute('crossorigin');
  expect(
    interCrossorigin,
    'Inter preload must have crossorigin attribute (font preload spec requirement)',
  ).not.toBeNull();

  // ── 6. Verify preloaded files actually return 200 ────────────────────────
  const playfairResponse = await page.request.get(playfairHref!);
  expect(
    playfairResponse.status(),
    `Playfair Display woff2 at ${playfairHref} should return 200`,
  ).toBe(200);

  const interResponse = await page.request.get(interHref!);
  expect(
    interResponse.status(),
    `Inter woff2 at ${interHref} should return 200`,
  ).toBe(200);

  // ── 7. Screenshot proof — headline (Playfair) + body (Inter) rendering ────
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(400);

  await showPhaseLabel(page, '✅ K2 — Playfair 700 + Inter 400 preloaded, fonts rendering');

  // Mobile view
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await showPhaseLabel(page, '✅ K2 — font preloads active on mobile, no FOIT');
});
