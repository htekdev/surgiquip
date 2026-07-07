/**
 * Change Proof E2E Spec — LCP Preload Hints (Epic K, PR #84)
 * ONE SINGLE test() block = ONE continuous video proving the fix
 *
 * Flow:
 *   → Visit each of the 5 pages that now have preloadImage
 *   → Verify H1 visible (page renders)
 *   → Verify <link rel="preload" as="image"> is present in <head>
 *
 * Proof keyword: change-proof
 */

import { test, expect, type Page } from '@playwright/test';
import { expectVisible, showPhaseLabel } from './visual-assert';

test.setTimeout(180000);

async function smoothScroll(page: Page, totalPx = 600, stepPx = 200, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

interface PageSpec {
  path: string;
  label: string;
  heroImage: string;
}

const pages: PageSpec[] = [
  { path: '/services/service-and-repair',    label: 'Service & Repair',        heroImage: 'equipment-repair-hero.webp' },
  { path: '/services/equipment-sales',       label: 'Equipment Sales',          heroImage: 'equipment-sales-hero.webp' },
  { path: '/services/preventive-maintenance',label: 'Preventive Maintenance',   heroImage: 'preventive-maintenance-hero.webp' },
  { path: '/products/hsi',                   label: 'HSI Products',             heroImage: 'hsi-hero.webp' },
  { path: '/products/knight',                label: 'Knight Products',           heroImage: 'knight-hero.webp' },
];

test('change-proof-lcp-preload-hints', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // Start — Homepage context
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — LCP Preload Hint Proof');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // Visit each page — verify H1 + preload hint in <head>
  // ═══════════════════════════════════════════════════════════════════════════

  for (const { path, label, heroImage } of pages) {
    await showPhaseLabel(page, `🔍 ${label} →`);
    await page.waitForTimeout(600);

    await page.goto(path);
    await page.waitForLoadState('networkidle');

    // Confirm page rendered
    const h1 = page.locator('main h1').first();
    await expectVisible(h1, `${label} — H1 visible`);

    // Confirm preload link is present for the hero image
    const preloadHref = await page.evaluate((img: string) => {
      const link = document.querySelector<HTMLLinkElement>(`link[rel="preload"][as="image"]`);
      return link?.href ?? null;
    }, heroImage);

    expect(preloadHref, `${label} — <link rel="preload" as="image"> must be present`).toBeTruthy();
    expect(preloadHref, `${label} — preload href must reference ${heroImage}`).toContain(heroImage);

    await showPhaseLabel(page, `✅ ${label} — preload hint confirmed`);
    await page.waitForTimeout(400);

    // Brief scroll to show the hero image loads
    await smoothScroll(page, 400, 200, 400);
    await page.waitForTimeout(600);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Final confirmation
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '✅ All 5 LCP Preload Hints Verified — Epic K Complete');
  await page.waitForTimeout(1200);
});
