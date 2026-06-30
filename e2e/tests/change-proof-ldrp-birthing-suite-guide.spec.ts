/**
 * Change Proof E2E Spec — Cycle 44: LDRP & Birthing Suite Equipment Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the LDRP article card
 *   → Click article → verify title, tags, body content
 *   → Scroll through full article — verify key sections
 *   → Real Texas installation data (Woman's Hospital, MH Memorial City, MH Woodlands)
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

test('change-proof-ldrp-birthing-suite-guide', async ({ page }) => {

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
  // PART 2 — Blog Index — find LDRP article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 1200, 260, 450);
  await showPhaseLabel(page, '🔍 Locating LDRP Birthing Suite Article Card');
  await page.waitForTimeout(800);

  // Find the LDRP article card link
  const ldrpLink = page.locator('a[href*="ldrp"]').first();
  await ldrpLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(ldrpLink, 'LDRP article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to LDRP article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening LDRP Birthing Suite Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/ldrp-birthing-suite-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /ldrp-birthing-suite-equipment-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 LDRP Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /LDRP/i, 'Article title contains "LDRP"');

  // Tags should be visible
  const ldrpTag = page.locator('text=LDRP').first();
  await expectVisible(ldrpTag, 'LDRP tag');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through article body — verify key sections
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 Multi-Mode Clinical Demands Section');
  await page.waitForTimeout(1200);

  const multiModeSection = page.locator('text=Multi-Mode Clinical Demands').first();
  await multiModeSection.scrollIntoViewIfNeeded();
  await expectVisible(multiModeSection, 'Multi-Mode Clinical Demands section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🦠 Infection Control Section');
  await page.waitForTimeout(1200);

  const infectionSection = page.locator('text=Infection Control and Ceiling-Mount Hygiene').first();
  await infectionSection.scrollIntoViewIfNeeded();
  await expectVisible(infectionSection, 'Infection Control section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🎯 Wand-Controlled Repositioning Standard');
  await page.waitForTimeout(1200);

  const wandSection = page.locator('text=Wand-Controlled Repositioning Standard').first();
  await wandSection.scrollIntoViewIfNeeded();
  await expectVisible(wandSection, 'Wand-Controlled Repositioning section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Real Texas installations (crown jewel content)
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🏗️ Real-World Texas Installations Evidence');
  await page.waitForTimeout(1000);

  const texasSection = page.locator('text=Real-World Evidence').first();
  await texasSection.scrollIntoViewIfNeeded();
  await expectVisible(texasSection, 'Real-World Evidence section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🏥 Woman\'s Hospital of Texas — 35 LDRP Suites');
  await page.waitForTimeout(1000);

  const womansSection = page.locator("text=Woman's Hospital of Texas").first();
  await womansSection.scrollIntoViewIfNeeded();
  await expectVisible(womansSection, "Woman's Hospital of Texas installation");

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '⚙️ Key Equipment Categories Section');
  await page.waitForTimeout(1200);

  const equipSection = page.locator('text=Key Equipment Categories for Texas LDRP').first();
  await equipSection.scrollIntoViewIfNeeded();
  await expectVisible(equipSection, 'Key Equipment Categories section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🔍 Vendor Evaluation Criteria Section');
  await page.waitForTimeout(1000);

  const vendorSection = page.locator('text=Vendor Evaluation Criteria for Texas LDRP').first();
  await vendorSection.scrollIntoViewIfNeeded();
  await expectVisible(vendorSection, 'Vendor Evaluation Criteria section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Bottom CTA (contact Surgiquip)
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1400, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Contact Surgiquip');
  await page.waitForTimeout(1000);

  const bottomCTA = page.locator('text=Surgiquip Solutions has equipped').first();
  await bottomCTA.scrollIntoViewIfNeeded();
  await expectVisible(bottomCTA, 'Bottom CTA / contact section');

  await showPhaseLabel(page, '✅ LDRP Birthing Suite Guide — Article Fully Verified');
  await page.waitForTimeout(1500);
});
