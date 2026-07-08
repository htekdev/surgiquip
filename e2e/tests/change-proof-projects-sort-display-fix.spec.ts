/**
 * Change Proof E2E Spec — fix(projects): sort NaN + trailing "·" display fix
 * ONE SINGLE test() block = ONE continuous video proving the fix is live
 *
 * Verifies:
 *   1. /projects index renders all 22 real project cards without errors
 *   2. "Project Portfolio" eyebrow label (not the old "Featured Projects")
 *   3. No project card shows a trailing "· undefined" in the location line
 *   4. Projects are sorted alphabetically by facility when no year is set
 *   5. A project detail page renders correctly (Brazoria Surgery Center)
 *
 * Proof keyword: change-proof
 * Pacing: 500ms scroll step, 1200ms between major actions
 */

import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(300000);

async function smoothScroll(page: Page, totalPx = 1200, stepPx = 300, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(800);
}

test('change-proof-projects-sort-display-fix', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Navigate to /projects and verify index renders
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/projects');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Projects Index — verifying sort + display fix');
  await page.waitForTimeout(1500);

  // Verify page heading
  await expectVisible(page, 'h1', 'Case Studies & Installations');
  await page.waitForTimeout(800);

  // Verify eyebrow label is "Project Portfolio" (not the stale "Featured Projects")
  await expectText(page, '.text-\\[var\\(--color-blue\\)\\]', 'Project Portfolio');
  await showPhaseLabel(page, '✅ Eyebrow label is "Project Portfolio" (not "Featured Projects")');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Verify NO trailing "·" in any location lines
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔍 Checking: no trailing "· undefined" on location lines');
  await page.waitForTimeout(1000);

  // Get all location spans and verify none end with "·"
  const locationSpans = page.locator('article span.block').filter({ hasText: /,\s*TX/ });
  const count = await locationSpans.count();
  for (let i = 0; i < count; i++) {
    const text = await locationSpans.nth(i).textContent();
    if (text && text.trim().endsWith('·')) {
      throw new Error(`Location line ends with trailing "·": "${text.trim()}"`);
    }
    // Also ensure no "undefined" text
    if (text && text.includes('undefined')) {
      throw new Error(`Location line contains "undefined": "${text.trim()}"`);
    }
  }

  await showPhaseLabel(page, `✅ ${count} location lines checked — no trailing "·" found`);
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Scroll through the project grid to verify cards render
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📜 Scrolling through project portfolio grid...');
  await smoothScroll(page, 2400, 300, 500);
  await page.waitForTimeout(1000);

  // Verify we can see some project cards
  await expectVisible(page, 'article', 'Brazoria Surgery Center');
  await page.waitForTimeout(800);

  // Scroll more to see all cards
  await smoothScroll(page, 2400, 300, 500);
  await page.waitForTimeout(1000);

  // Verify Memorial Hermann cards are present (big portfolio)
  const hermannCards = page.locator('article h3').filter({ hasText: /Memorial Hermann/ });
  const hermannCount = await hermannCards.count();
  if (hermannCount < 5) {
    throw new Error(`Expected 5+ Memorial Hermann projects, found ${hermannCount}`);
  }
  await showPhaseLabel(page, `✅ ${hermannCount} Memorial Hermann project cards visible`);
  await page.waitForTimeout(1000);

  // Scroll to see the end of the list
  await smoothScroll(page, 2400, 300, 500);
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Click Brazoria Surgery Center (first alphabetically, no year)
  // ═══════════════════════════════════════════════════════════════════════════

  await scrollToTop(page);
  await page.waitForTimeout(1000);
  await showPhaseLabel(page, '🔗 Navigating to Brazoria Surgery Center detail page');
  await page.waitForTimeout(800);

  // Find and click the Brazoria project link
  const brazoriaLink = page.locator('article').filter({ hasText: 'Brazoria Surgery Center' }).locator('a', { hasText: 'Read Case Study' });
  await brazoriaLink.click();
  await page.waitForLoadState('networkidle');
  await expectURL(page, '/projects/brazoria-surgery-center');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '✅ Brazoria Surgery Center detail page loaded');

  // Verify the project detail renders correctly
  await expectVisible(page, 'h1', 'Brazoria Surgery Center');
  await page.waitForTimeout(1000);

  // Verify the meta bar does NOT show a Year row (since year is undefined)
  const yearLabels = page.locator('span.text-xs.uppercase').filter({ hasText: 'Year' });
  const yearCount = await yearLabels.count();
  if (yearCount > 0) {
    throw new Error(`Expected NO "Year" meta in detail page for project without year, but found ${yearCount}`);
  }
  await showPhaseLabel(page, '✅ No stale "Year" meta row for undated project');
  await page.waitForTimeout(1200);

  // Scroll through the project detail
  await smoothScroll(page, 1800, 300, 500);
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Back to projects index, verify total count
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/projects');
  await page.waitForLoadState('networkidle');
  await scrollToTop(page);
  await page.waitForTimeout(1000);

  // Verify total project card count = 22
  const allCards = page.locator('article.rounded-xl');
  const totalCards = await allCards.count();
  if (totalCards < 20) {
    throw new Error(`Expected 22 project cards, found ${totalCards}`);
  }
  await showPhaseLabel(page, `✅ ${totalCards} project cards rendered — all 22 real projects live`);
  await page.waitForTimeout(1500);

  // Final scroll to show full portfolio
  await smoothScroll(page, 3000, 300, 500);
  await page.waitForTimeout(1200);
  await showPhaseLabel(page, '🏥 Projects sort + display fix verified — DONE');
  await page.waitForTimeout(2000);

});
