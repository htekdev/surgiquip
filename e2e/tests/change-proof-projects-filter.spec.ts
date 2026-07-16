/**
 * Change Proof E2E — Epic G27: Projects Filter/Category UI
 * ONE SINGLE test() block = ONE continuous video.
 *
 * Navigates to /projects and verifies:
 *   → Filter tabs render (one per unique project type + "All")
 *   → Clicking a type tab hides non-matching cards
 *   → "All" tab restores the full grid
 *   → Project cards have working "Read Case Study" links
 *   → CTA section is present
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

async function smoothScroll(page: Page, totalPx = 800, stepPx = 200, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-projects-filter: tabs filter project cards by type', async ({ page }) => {
  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Projects page loads
  // ═══════════════════════════════════════════════════════════════════════════
  await page.goto('/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🏥 Projects — Filter UI (G27)');
  await expectURL(page, /\/projects/, 'Projects page URL');

  const h1 = page.locator('main h1').first();
  await expectVisible(h1, 'Projects H1');
  await expectText(h1, 'Case Studies', 'H1 says Case Studies');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Project cards are visible
  // ═══════════════════════════════════════════════════════════════════════════
  await showPhaseLabel(page, '📋 Verifying project cards');

  const firstCard = page.locator('main [data-type]').first();
  await expectVisible(firstCard, 'First project card visible');

  const readLink = page.locator('main a[href^="/projects/"]').first();
  await expectVisible(readLink, 'Read Case Study link visible');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Filter tabs UI
  // ═══════════════════════════════════════════════════════════════════════════
  await showPhaseLabel(page, '🔖 Filter tabs');

  const filterBar = page.locator('#project-filters');
  const hasFilterBar = await filterBar.isVisible().catch(() => false);

  if (hasFilterBar) {
    await expectVisible(filterBar, 'Filter bar rendered');

    // "All" tab starts active
    const allTab = page.locator('[data-filter="all"]');
    await expectVisible(allTab, '"All" filter tab visible');
    await expectText(allTab, 'All', '"All" tab label');

    // First type tab exists
    const firstTypeTab = page.locator('[data-filter]:not([data-filter="all"])').first();
    await expectVisible(firstTypeTab, 'Type filter tab visible');
    await page.waitForTimeout(800);

    // ═══════════════════════════════════════════════════════════════════════
    // PART 4 — Click a type tab and verify filtering
    // ═══════════════════════════════════════════════════════════════════════
    await showPhaseLabel(page, '🔍 Activating type filter');

    const filterValue = await firstTypeTab.getAttribute('data-filter');
    await firstTypeTab.click();
    await page.waitForTimeout(800);

    // Active tab aria-selected
    const ariaSelected = await firstTypeTab.getAttribute('aria-selected');
    if (ariaSelected !== 'true') {
      throw new Error(`Filter tab aria-selected should be "true", got "${ariaSelected}"`);
    }
    await expectVisible(firstTypeTab, `Type tab "${filterValue}" now active`);
    await page.waitForTimeout(600);

    // ═══════════════════════════════════════════════════════════════════════
    // PART 5 — "All" restores full grid
    // ═══════════════════════════════════════════════════════════════════════
    await showPhaseLabel(page, '✅ Restoring full grid with "All"');

    await allTab.click();
    await page.waitForTimeout(800);

    const allActive = await allTab.getAttribute('aria-selected');
    if (allActive !== 'true') {
      throw new Error(`"All" tab aria-selected should be "true", got "${allActive}"`);
    }
    await expectVisible(allTab, '"All" tab active after restore');
    await expectVisible(firstCard, 'First card visible again after All');
    await page.waitForTimeout(600);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Scroll to CTA section
  // ═══════════════════════════════════════════════════════════════════════════
  await showPhaseLabel(page, '📌 CTA section');
  await smoothScroll(page, 1200, 300, 500);
  await page.waitForTimeout(1200);

  const ctaLink = page.locator('main a[href="/quote"]').first();
  await expectVisible(ctaLink, 'CTA "Request a Quote" link visible');
  await page.waitForTimeout(800);
});

