/**
 * Change Proof E2E Spec — Cycle 52: Neurosurgery Suite OR Equipment Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the Neurosurgery OR article card
 *   → Click article → verify title, tags, body content
 *   → Scroll through full article — verify key sections
 *   → Bottom CTA section
 *
 * Proof keyword: change-proof
 */

import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(240000);

async function smoothScroll(page: Page, totalPx = 1200, stepPx = 260, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-cycle52-neurosurgery-or-guide', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Blog Index
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📝 Opening Blog Index →');
  await page.waitForTimeout(700);
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Blog Index — find Neurosurgery article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Neurosurgery Article Card');
  await page.waitForTimeout(800);

  // Find the neurosurgery article card link
  const neuroLink = page.locator('a[href*="neurosurgery"]').first();
  await neuroLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(neuroLink, 'Neurosurgery article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to Neurosurgery OR Equipment Guide article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Neurosurgery OR Equipment Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/neurosurgery-or-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /neurosurgery-or-equipment-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🧠 Neurosurgery OR Equipment Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Neurosurgery/i, 'Article title contains "Neurosurgery"');

  // Tags should be visible
  const neuroTag = page.locator('text=neurosurgery OR equipment').first();
  await expectVisible(neuroTag, 'Neurosurgery OR equipment tag');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through article body — verify key sections
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 C-arm Clearance Problem Section');
  await page.waitForTimeout(1200);

  const cArmSection = page.locator('text=C-arm Clearance Problem').first();
  await cArmSection.scrollIntoViewIfNeeded();
  await expectVisible(cArmSection, 'C-arm Clearance Problem section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🪑 Prone Positioning Section');
  await page.waitForTimeout(1200);

  const proneSection = page.locator('text=Prone Positioning').first();
  await proneSection.scrollIntoViewIfNeeded();
  await expectVisible(proneSection, 'Prone Positioning section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '💡 Surgical Lighting Section');
  await page.waitForTimeout(1200);

  const lightingSection = page.locator('text=Aurora LED Performance').first();
  await lightingSection.scrollIntoViewIfNeeded();
  await expectVisible(lightingSection, 'Aurora LED Performance section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🏥 Texas Installations Section');
  await page.waitForTimeout(1000);

  const texasSection = page.locator('text=Texas Neurosurgery Installations').first();
  await texasSection.scrollIntoViewIfNeeded();
  await expectVisible(texasSection, 'Texas Neurosurgery Installations section');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🔬 UTMB John Sealy Crown Jewel');
  await page.waitForTimeout(1000);

  const utmbSection = page.locator('text=UTMB John Sealy').first();
  await utmbSection.scrollIntoViewIfNeeded();
  await expectVisible(utmbSection, 'UTMB John Sealy installation section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Bottom CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Contact Surgiquip');
  await page.waitForTimeout(1000);

  const ctaPhone = page.locator('a[href*="tel:"]').first();
  await ctaPhone.scrollIntoViewIfNeeded();
  await expectVisible(ctaPhone, 'Phone CTA link');

  await showPhaseLabel(page, '✅ Neurosurgery OR Equipment Guide — Fully Verified');
  await page.waitForTimeout(1500);
});
