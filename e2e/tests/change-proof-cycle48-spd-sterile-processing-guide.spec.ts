/**
 * Change Proof E2E Spec — Cycle 48: SPD Sterile Processing Department Equipment Guide
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the SPD article card
 *   → Click article → verify title, key sections, real installation references
 *   → Scroll through full article — intro, washer-disinfectors, sterilizers, compliance, CTA
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

test('change-proof-cycle48-spd-sterile-processing-guide', async ({ page }) => {

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
  // PART 2 — Blog Index — verify page and locate SPD article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  // Scroll to find article card
  await smoothScroll(page, 1400, 260, 450);
  await page.waitForTimeout(1200);

  // Find the SPD article card by partial title text
  const spdCard = page.locator('a').filter({ hasText: /Sterile Processing Department/i }).first();
  await spdCard.scrollIntoViewIfNeeded();
  await showPhaseLabel(page, '🧫 SPD Equipment Guide article card found');
  await expectVisible(spdCard, 'SPD blog card');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to Article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '→ Navigating to SPD Equipment Guide article');
  await spdCard.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // Verify URL contains the slug
  await expectURL(page, /sterile-processing-department/);
  await showPhaseLabel(page, '🧫 SPD Equipment Guide — Article Open');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero: title visible
  // ═══════════════════════════════════════════════════════════════════════════

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1 title');
  const titleText = await articleH1.textContent();
  await showPhaseLabel(page, `📰 Title: ${(titleText || '').slice(0, 55)}…`);
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Verify intro visible, start scroll
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Scrolling article — verifying sections');
  await smoothScroll(page, 1800, 280, 500);
  await page.waitForTimeout(1000);

  // Verify "Why SPD Equipment Decisions Are High-Stakes" section
  const highStakesSection = page.locator('h2').filter({ hasText: /Why SPD Equipment/i });
  await highStakesSection.scrollIntoViewIfNeeded();
  await expectVisible(highStakesSection, 'Why SPD decisions are high-stakes section');
  await showPhaseLabel(page, '✅ Section: Why SPD Equipment Decisions Are High-Stakes');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Washer-disinfectors section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1600, 280, 500);
  await page.waitForTimeout(1000);

  const washerSection = page.locator('h3').filter({ hasText: /Automated Instrument Washer/i });
  await washerSection.scrollIntoViewIfNeeded();
  await expectVisible(washerSection, 'Instrument washer-disinfectors section');
  await showPhaseLabel(page, '✅ Section: Automated Instrument Washer-Disinfectors');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Steam sterilizers section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1800, 280, 500);
  await page.waitForTimeout(1000);

  const steamSection = page.locator('h3').filter({ hasText: /Steam Sterilizers/i });
  await steamSection.scrollIntoViewIfNeeded();
  await expectVisible(steamSection, 'Steam sterilizers section');
  await showPhaseLabel(page, '✅ Section: Steam Sterilizers (Autoclaves)');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — Real installations section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 2000, 280, 500);
  await page.waitForTimeout(1000);

  const installSection = page.locator('h2').filter({ hasText: /Real Surgiquip SPD Installations/i });
  await installSection.scrollIntoViewIfNeeded();
  await expectVisible(installSection, 'Real SPD installations section');
  await showPhaseLabel(page, '✅ Section: Real Surgiquip SPD Installations');
  await page.waitForTimeout(1200);

  // Verify CHRISTUS St. Catherine reference
  const christusRef = page.locator('h3').filter({ hasText: /CHRISTUS St\. Catherine/i });
  await christusRef.scrollIntoViewIfNeeded();
  await expectVisible(christusRef, 'CHRISTUS St. Catherine installation reference');
  await showPhaseLabel(page, '✅ CHRISTUS St. Catherine SPD installation referenced');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 9 — Compliance section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 2000, 280, 500);
  await page.waitForTimeout(1000);

  const complianceSection = page.locator('h2').filter({ hasText: /Regulatory Compliance/i });
  await complianceSection.scrollIntoViewIfNeeded();
  await expectVisible(complianceSection, 'Regulatory compliance section');
  await showPhaseLabel(page, '✅ Section: Regulatory Compliance (AAMI ST79, TJC, CMS)');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 10 — Scroll to CTA / bottom
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 2400, 280, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🏁 Cycle 48 — SPD Equipment Guide — VERIFIED ✅');
  await page.waitForTimeout(1500);

});
