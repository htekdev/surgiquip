/**
 * Change Proof E2E Spec — Cycle 65: Unique blog hero for preventive maintenance article
 * ONE SINGLE test() block = ONE continuous video proving unique hero image is live
 *
 * Article changed:
 *   → preventive-maintenance-or-equipment-texas.md
 *     Before: /images/services/preventive-maintenance-hero.webp (shared service page hero)
 *     After:  /images/blog/preventive-maintenance-hero.webp (unique AI-generated blog hero)
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

test.setTimeout(180000);

async function smoothScroll(page: Page, totalPx = 800, stepPx = 260, delayMs = 450) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-cycle65-pm-unique-hero', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Blog index: establish context
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📝 Surgiquip Blog — Verifying Unique Hero Images');
  await page.waitForTimeout(1200);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');
  await smoothScroll(page, 400, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Preventive Maintenance Guide (new unique hero)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔧 Opening Preventive Maintenance Guide →');
  await page.waitForTimeout(700);

  await page.goto('/blog/preventive-maintenance-or-equipment-texas');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /preventive-maintenance-or-equipment-texas/);
  await showPhaseLabel(page, '🔧 PM Guide — Unique Hero: preventive-maintenance-hero.webp');
  await page.waitForTimeout(1200);

  const pmH1 = page.locator('h1').first();
  await expectVisible(pmH1, 'PM Guide H1');
  await expectText(pmH1, /Preventive Maintenance/i, 'H1 contains "Preventive Maintenance"');

  // Verify the hero image is the new unique blog image (not the service page image)
  const pmHero = page.locator('img[src*="preventive-maintenance-hero"]').first();
  await expectVisible(pmHero, 'PM Guide unique hero image present');
  await expectAttribute(pmHero, 'src', /blog\/preventive-maintenance-hero/, 'PM hero src points to unique blog image');

  await showPhaseLabel(page, '✅ PM Guide: Unique hero loaded — /images/blog/preventive-maintenance-hero.webp');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Key content sections visible
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Why OR Equipment PM Is Different Section');
  await page.waitForTimeout(900);

  const whyPMH2 = page.locator('.blog-body h2').filter({ hasText: /Why OR Equipment PM/i }).first();
  await whyPMH2.waitFor({ state: 'visible', timeout: 20000 });
  await whyPMH2.scrollIntoViewIfNeeded();
  await expectVisible(whyPMH2, '"Why OR Equipment PM" section heading');

  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '🔩 Core Elements Section');
  await page.waitForTimeout(700);

  const coreH2 = page.locator('.blog-body h2').filter({ hasText: /Core Elements/i }).first();
  await coreH2.waitFor({ state: 'visible', timeout: 20000 });
  await coreH2.scrollIntoViewIfNeeded();
  await expectVisible(coreH2, '"Core Elements" section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Phone CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA visible');
  await page.waitForTimeout(800);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone CTA visible');

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '✅ Cycle 65 Complete — PM Guide Now Has Unique Blog Hero Image');
  await page.waitForTimeout(2000);
});
