/**
 * Change Proof E2E Spec — PR #79: Unique blog hero images for 3 remaining articles (cycle 63)
 * ONE SINGLE test() block = ONE continuous video proving unique hero images are live
 *
 * Articles changed:
 *   → ambulatory-surgery-center-equipment-guide-texas.md
 *     Before: /images/services/equipment-repair-hero.webp (shared)
 *     After:  /images/blog/ambulatory-surgery-center-hero.webp (unique)
 *
 *   → or-table-selection-guide-texas-hospitals.md
 *     Before: /images/services/equipment-sales-hero.webp (service page hero)
 *     After:  /images/blog/or-table-selection-hero.webp (unique)
 *
 *   → sterilization-equipment-guide-texas-hospitals.md
 *     Before: /images/services/equipment-repair-hero.webp (shared)
 *     After:  /images/blog/sterilization-equipment-hero.webp (unique)
 *
 * Proof keyword: change-proof
 */

import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  expectAttribute,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(240000);

async function smoothScroll(page: Page, totalPx = 900, stepPx = 260, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-cycle63-unique-blog-heroes-remaining', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Blog index: establish context
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📝 Surgiquip Blog — All Articles');
  await page.waitForTimeout(1200);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');
  await smoothScroll(page, 400, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Ambulatory Surgery Center Guide (new hero)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Opening Ambulatory Surgery Center Guide →');
  await page.waitForTimeout(700);

  const ascLink = page.locator('main a[href="/blog/ambulatory-surgery-center-equipment-guide-texas"]').first();
  await ascLink.click();
  await page.waitForLoadState('networkidle');

  await expectURL(page, /ambulatory-surgery-center-equipment-guide/);
  await showPhaseLabel(page, '🏥 ASC Guide — Unique Hero: ambulatory-surgery-center-hero.webp');
  await page.waitForTimeout(1200);

  const ascH1 = page.locator('h1').first();
  await expectVisible(ascH1, 'ASC Guide H1');
  await expectText(ascH1, /Ambulatory/i, 'ASC Guide title');

  // Verify the hero image is the new unique one
  const ascHero = page.locator('img[src*="ambulatory-surgery-center-hero"]').first();
  await expectVisible(ascHero, 'ASC unique hero image present');
  await expectAttribute(ascHero, 'src', /ambulatory-surgery-center-hero/, 'ASC hero src is unique blog image');

  await showPhaseLabel(page, '✅ ASC Guide: Unique hero loaded — ambulatory-surgery-center-hero.webp');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 900, 260, 450);
  await showPhaseLabel(page, '📋 ASC Guide — CMS CoP & AAAHC Equipment Content');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — OR Table Selection Guide (new hero)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🛏 Opening OR Table Selection Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/or-table-selection-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /or-table-selection-guide/);
  await showPhaseLabel(page, '🛏 OR Table Guide — Unique Hero: or-table-selection-hero.webp');
  await page.waitForTimeout(1200);

  const tableH1 = page.locator('h1').first();
  await expectVisible(tableH1, 'OR Table Guide H1');
  await expectText(tableH1, /OR Table|Surgical Table/i, 'OR Table Guide title');

  // Verify the hero image is the new unique one
  const tableHero = page.locator('img[src*="or-table-selection-hero"]').first();
  await expectVisible(tableHero, 'OR table unique hero image present');
  await expectAttribute(tableHero, 'src', /or-table-selection-hero/, 'OR table hero src is unique blog image');

  await showPhaseLabel(page, '✅ OR Table Guide: Unique hero loaded — or-table-selection-hero.webp');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 900, 260, 450);
  await showPhaseLabel(page, '📋 OR Table Guide — Skytron Configuration & Imaging Compatibility');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Sterilization Equipment Guide (new hero)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🧪 Opening Sterilization Equipment Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/sterilization-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /sterilization-equipment-guide/);
  await showPhaseLabel(page, '🧪 Sterilization Guide — Unique Hero: sterilization-equipment-hero.webp');
  await page.waitForTimeout(1200);

  const sterilH1 = page.locator('h1').first();
  await expectVisible(sterilH1, 'Sterilization Guide H1');
  await expectText(sterilH1, /Sterilization/i, 'Sterilization Guide title');

  // Verify the hero image is the new unique one
  const sterilHero = page.locator('img[src*="sterilization-equipment-hero"]').first();
  await expectVisible(sterilHero, 'Sterilization unique hero image present');
  await expectAttribute(sterilHero, 'src', /sterilization-equipment-hero/, 'Sterilization hero src is unique blog image');

  await showPhaseLabel(page, '✅ Sterilization Guide: Unique hero loaded — sterilization-equipment-hero.webp');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 900, 260, 450);
  await showPhaseLabel(page, '📋 Sterilization Guide — AAMI/TJC, Autoclave & Knight Equipment');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL — All 3 articles verified with unique hero images
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '✅ Cycle 63 Complete — All 3 Blog Articles Now Have Unique Hero Images');
  await page.waitForTimeout(2000);
});
// retrigger: 2026-07-06
