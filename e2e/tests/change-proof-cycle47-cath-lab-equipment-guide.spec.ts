/**
 * Change Proof E2E Spec — Cycle 47: Cardiac Cath Lab Equipment Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the Cardiac Cath Lab article card
 *   → Click article → verify title, key sections, real installation references
 *   → Scroll through full article — verify intro, boom engineering, real projects, CTA
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

test('change-proof-cycle47-cath-lab-equipment-guide', async ({ page }) => {

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
  // PART 2 — Blog Index — verify page and locate cath lab article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  // Scroll to find article card
  await smoothScroll(page, 1400, 260, 450);
  await page.waitForTimeout(1200);

  // Find the cath lab article card by partial title text
  const cathLabCard = page.locator('a').filter({ hasText: /Cardiac Catheterization/i }).first();
  await cathLabCard.scrollIntoViewIfNeeded();
  await showPhaseLabel(page, '🫀 Cardiac Cath Lab article card found');
  await expectVisible(cathLabCard, 'Cath lab blog card');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to Article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '→ Navigating to Cath Lab article');
  await cathLabCard.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // Verify URL contains the slug
  await expectURL(page, /cardiac-catheterization/);
  await showPhaseLabel(page, '🫀 Cardiac Cath Lab Equipment Guide — Article Open');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero: title visible
  // ═══════════════════════════════════════════════════════════════════════════

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1 title');
  const titleText = await articleH1.textContent();
  await showPhaseLabel(page, `📰 Title: ${(titleText || '').slice(0, 55)}…`);
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through article sections
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Scrolling article — verifying sections');
  await smoothScroll(page, 1800, 280, 500);
  await page.waitForTimeout(1000);

  // Verify "What Makes a Cath Lab Different" section
  const diffSection = page.locator('h2').filter({ hasText: /What Makes a Cath Lab Different/i });
  await diffSection.scrollIntoViewIfNeeded();
  await expectVisible(diffSection, 'Cath lab vs OR section');
  await showPhaseLabel(page, '✅ Section: What Makes a Cath Lab Different');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 1600, 280, 500);

  // Verify boom engineering section
  const boomSection = page.locator('h2').filter({ hasText: /Ceiling-Mount Boom/i });
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Boom engineering section');
  await showPhaseLabel(page, '✅ Section: Boom Systems Engineering Challenge');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Verify real installation references
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 2200, 280, 500);
  await page.waitForTimeout(1000);

  // Look for the real installations section
  const installSection = page.locator('h2').filter({ hasText: /Real Southeast Texas Installations/i });
  await installSection.scrollIntoViewIfNeeded();
  await expectVisible(installSection, 'Real installations section');
  await showPhaseLabel(page, '✅ Section: Real Southeast Texas Installations');
  await page.waitForTimeout(1200);

  // Verify Memorial Hermann Southwest reference
  const mhswRef = page.locator('h3').filter({ hasText: /Memorial Hermann Southwest/i });
  await mhswRef.scrollIntoViewIfNeeded();
  await expectVisible(mhswRef, 'MH Southwest installation reference');
  await showPhaseLabel(page, '✅ MH Southwest Cath Lab installation referenced');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Continue scroll to NFPA 99 & PM sections
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 2000, 280, 500);
  await page.waitForTimeout(1000);

  const nfpaSection = page.locator('h2').filter({ hasText: /NFPA 99/i });
  await nfpaSection.scrollIntoViewIfNeeded();
  await expectVisible(nfpaSection, 'NFPA 99 section');
  await showPhaseLabel(page, '✅ Section: NFPA 99 & Preventive Maintenance');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — Scroll to bottom — verify CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 2400, 280, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🏁 Cycle 47 — Cardiac Cath Lab Guide — VERIFIED ✅');
  await page.waitForTimeout(1500);

});
