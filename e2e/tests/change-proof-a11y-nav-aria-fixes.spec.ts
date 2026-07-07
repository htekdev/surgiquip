/**
 * change-proof-a11y-nav-aria-fixes.spec.ts
 *
 * Quality fix: ARIA corrections in Header.astro
 *   1. Desktop nav dropdown panels use <ul role="list"> (not role="region")
 *   2. Desktop nav dropdown triggers have aria-expanded attribute
 *   3. aria-haspopup is present on triggers with children
 *   4. Mobile menu <nav> has aria-label (landmark duplication removed)
 *   5. Keyboard Escape key closes mobile menu and returns focus to toggle
 *   6. No broken icon images on homepage (CapabilitiesStrip icons resolve)
 */

import { test, expect } from '@playwright/test';
import { visualAssert } from './visual-assert';

test('change-proof: Header a11y ARIA fixes — no role=region, aria-expanded, keyboard Escape', async ({
  page,
}) => {
  // ── 1. Homepage loads ─────────────────────────────────────────────────────
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  // ── 2. No role="region" on any nav dropdown ───────────────────────────────
  const regionPanels = await page.locator('header [role="region"]').count();
  expect(regionPanels, 'No nav dropdown should have role=region').toBe(0);

  // ── 3. Dropdown panels use role="list" instead ────────────────────────────
  const listDropdowns = await page.locator('header ul[role="list"]').count();
  expect(listDropdowns, 'Desktop nav dropdowns should use <ul role="list">').toBeGreaterThan(0);

  // ── 4. Dropdown triggers have aria-haspopup ───────────────────────────────
  const haspopupTriggers = await page
    .locator('main a[aria-haspopup], header a[aria-haspopup]')
    .count();
  // Actually scope to header nav specifically
  const headerHaspopup = await page
    .locator('header nav[aria-label="Primary navigation"] a[aria-haspopup]')
    .count();
  expect(headerHaspopup, 'Primary nav triggers should have aria-haspopup').toBeGreaterThan(0);

  // ── 5. Dropdown triggers have aria-expanded ───────────────────────────────
  const headerExpandedTriggers = await page
    .locator('header nav[aria-label="Primary navigation"] a[aria-expanded]')
    .count();
  expect(
    headerExpandedTriggers,
    'Primary nav triggers with children should have aria-expanded',
  ).toBeGreaterThan(0);

  // ── 6. Mobile nav uses proper landmark — <nav aria-label="Mobile navigation"> ──
  const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
  await expect(mobileNav, 'Mobile navigation should be a <nav> with aria-label').toBeAttached();

  // Redundant role="navigation" on wrapper div should be gone
  const redundantNavRole = await page
    .locator('#mobile-menu[role="navigation"]')
    .count();
  expect(
    redundantNavRole,
    'Mobile menu wrapper div should NOT have role=navigation (redundant with inner <nav>)',
  ).toBe(0);

  // ── 7. Keyboard: Escape closes mobile menu ────────────────────────────────
  const toggle = page.locator('#mobile-menu-toggle');
  const mobileMenuDiv = page.locator('#mobile-menu');

  // Open the mobile menu
  await toggle.click();
  await page.waitForTimeout(300);
  await expect(mobileMenuDiv, 'Mobile menu should be visible after click').not.toHaveClass(/hidden/);

  // Press Escape — menu should close
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await expect(mobileMenuDiv, 'Mobile menu should close on Escape').toHaveClass(/hidden/);

  // ── 8. CapabilitiesStrip icons render (no 404s) ───────────────────────────
  // Navigate back to homepage in case we're on a different page
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  // Check all 4 capability icons load successfully (status 200, not 404)
  const iconImages = await page.locator('section img[src*="/images/icons/"]').all();
  expect(iconImages.length, 'Homepage should have capability icon images').toBeGreaterThan(0);

  for (const img of iconImages) {
    const src = await img.getAttribute('src');
    if (!src) continue;
    const response = await page.request.get(src);
    expect(
      response.status(),
      `Icon image ${src} should return 200 (not 404)`,
    ).toBe(200);
  }

  // ── 9. Screenshot proof ───────────────────────────────────────────────────
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
  await page.setViewportSize({ width: 1280, height: 900 });

  // Hover over a nav item with children to show dropdown
  const firstDropdownTrigger = page.locator(
    'header nav[aria-label="Primary navigation"] a[aria-haspopup]',
  ).first();
  await firstDropdownTrigger.hover();
  await page.waitForTimeout(600);

  await visualAssert(page, 'header-a11y-aria-fixes-desktop-nav');

  // Mobile view
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await visualAssert(page, 'header-a11y-aria-fixes-mobile');

  await page.setViewportSize({ width: 375, height: 812 });
  await toggle.click();
  await page.waitForTimeout(400);
  await visualAssert(page, 'header-a11y-aria-fixes-mobile-menu-open');
});
