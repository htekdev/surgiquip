import { test, expect } from '@playwright/test';
import { visualAssert } from './visual-assert';

test('change-proof: projects filter — tabs render, filter cards, and All restores full grid', async ({ page }) => {
  await page.goto('/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // ── 1. Page loads and heading is visible ───────────────────────────────────
  const heading = page.locator('main h1');
  await expect(heading).toContainText('Case Studies');
  await visualAssert(page, 'projects-page-loaded');

  // ── 2. Project cards are rendered ──────────────────────────────────────────
  const cards = page.locator('main [data-type]');
  const totalCards = await cards.count();
  expect(totalCards).toBeGreaterThan(0);

  // ── 3. Filter tabs exist (only if >1 type) ─────────────────────────────────
  const filterBar = page.locator('#project-filters');
  const hasFilter = await filterBar.isVisible().catch(() => false);

  if (hasFilter) {
    // "All" tab is active by default
    const allTab = page.locator('[data-filter="all"]');
    await expect(allTab).toHaveAttribute('aria-selected', 'true');
    await visualAssert(page, 'projects-filter-tabs-visible');

    // ── 4. Click first type tab and verify filtering ─────────────────────────
    const firstTypeTab = page.locator('[data-filter]:not([data-filter="all"])').first();
    const filterValue = await firstTypeTab.getAttribute('data-filter');
    await firstTypeTab.click();
    await page.waitForTimeout(500);

    await expect(firstTypeTab).toHaveAttribute('aria-selected', 'true');
    await expect(allTab).toHaveAttribute('aria-selected', 'false');

    // All visible cards should match the selected type
    const visibleCards = page.locator(`[data-type="${filterValue}"]`);
    const visibleCount = await visibleCards.count();
    expect(visibleCount).toBeGreaterThan(0);

    // Cards of different types should be hidden
    const allTypeAttrs = await cards.evaluateAll((els) =>
      els.map((el) => ({ type: el.getAttribute('data-type'), display: (el as HTMLElement).style.display }))
    );
    const wrongTypeVisible = allTypeAttrs.filter(
      (c) => c.type !== filterValue && c.display !== 'none'
    );
    expect(wrongTypeVisible).toHaveLength(0);

    await visualAssert(page, 'projects-filter-type-active');

    // ── 5. Click "All" restores full grid ────────────────────────────────────
    await allTab.click();
    await page.waitForTimeout(500);

    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    const restoredCards = await cards.evaluateAll((els) =>
      els.filter((el) => (el as HTMLElement).style.display !== 'none').length
    );
    expect(restoredCards).toBe(totalCards);

    await visualAssert(page, 'projects-filter-all-restored');
  }

  // ── 6. Each visible card has a working "Read Case Study" link ──────────────
  const readLink = page.locator('main a[href^="/projects/"]').first();
  await expect(readLink).toBeVisible();

  // ── 7. CTA section is present ─────────────────────────────────────────────
  const cta = page.locator('main a[href="/quote"]').first();
  await expect(cta).toBeVisible();
  await visualAssert(page, 'projects-page-cta-visible');
});
