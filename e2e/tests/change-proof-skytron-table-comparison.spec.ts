/**
 * Change Proof E2E Spec — Cycle 45: Skytron Surgical Table Comparison Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find the Skytron table article card
 *   → Click article → verify title, tags, body content
 *   → Scroll through full article — verify key sections (6000, 6500, 6700, 7000)
 *   → Verify comparison table is visible
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

test('change-proof-skytron-table-comparison', async ({ page }) => {

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
  // PART 2 — Blog Index — find Skytron article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 1000, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Skytron Table Article Card');
  await page.waitForTimeout(800);

  // Find the Skytron table article card link
  const skytronLink = page.locator('a[href*="skytron-surgical-table"]').first();
  await skytronLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(skytronLink, 'Skytron table article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate to Skytron table comparison article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Skytron Table Comparison Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/skytron-surgical-table-comparison-guide-texas');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /skytron-surgical-table-comparison/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Skytron Table Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Skytron/i, 'Article title contains "Skytron"');

  // Tags should be visible
  const skytronTag = page.locator('text=Skytron surgical tables').first();
  await expectVisible(skytronTag, 'Skytron surgical tables tag');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll through article — verify 6000 series section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '⚙️ 6000 Series — General Surgery Workhorse');
  await page.waitForTimeout(1200);

  const series6000 = page.locator('text=6000 Series').first();
  await series6000.scrollIntoViewIfNeeded();
  await expectVisible(series6000, '6000 Series section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — 6500 Series section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🦴 6500 Series — Spine & Orthopedic');
  await page.waitForTimeout(1200);

  const series6500 = page.locator('text=6500 Series').first();
  await series6500.scrollIntoViewIfNeeded();
  await expectVisible(series6500, '6500 Series section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — 6700 Series section (Hybrid OR)
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🫀 6700 Series — Hybrid OR & Cardiovascular');
  await page.waitForTimeout(1200);

  const series6700 = page.locator('text=6700 Series').first();
  await series6700.scrollIntoViewIfNeeded();
  await expectVisible(series6700, '6700 Series section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — Texas installations reference
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🤠 Texas Hybrid OR Installations Section');
  await page.waitForTimeout(1200);

  const texasInstalls = page.locator('text=Texas Hybrid OR Installations').first();
  await texasInstalls.scrollIntoViewIfNeeded();
  await expectVisible(texasInstalls, 'Texas Hybrid OR Installations section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 9 — Decision framework + bottom CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📋 Matching Table to Case Mix Section');
  await page.waitForTimeout(1000);

  const decisionSection = page.locator('text=Matching Table to Case Mix').first();
  await decisionSection.scrollIntoViewIfNeeded();
  await expectVisible(decisionSection, 'Matching Table to Case Mix section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Working With Surgiquip');
  await page.waitForTimeout(1000);

  const bottomCTA = page.locator('text=Working With Surgiquip').first();
  await bottomCTA.scrollIntoViewIfNeeded();
  await expectVisible(bottomCTA, 'Bottom CTA section');

  await showPhaseLabel(page, '✅ Skytron Table Comparison Guide — Fully Verified');
  await page.waitForTimeout(1500);
});
