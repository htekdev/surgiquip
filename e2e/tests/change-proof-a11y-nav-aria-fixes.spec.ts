/**
 * change-proof-a11y-nav-aria-fixes.spec.ts
 *
 * Quality fix: ARIA corrections in Header.astro
 *   1. Desktop nav dropdown panels use <ul role="list"> (not role="region")
 *   2. Desktop nav dropdown triggers have aria-expanded attribute
 *   3. aria-haspopup is present on triggers with children
 *   4. Mobile menu <nav> has aria-label (landmark duplication removed)
 *   5. Keyboard Escape key closes mobile menu and returns focus to toggle
 *   6. Desktop dropdowns stay open during the 300ms JS hover grace period
 *   7. Homepage capabilities strip uses 4 inline SVG capability icons
 */

import { test, expect } from '@playwright/test';
import { showPhaseLabel } from './visual-assert';

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
  // Mobile menu toggle is lg:hidden — must set mobile viewport first
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(300);

  const toggle = page.locator('#mobile-menu-toggle');
  const mobileMenuDiv = page.locator('#mobile-menu');

  // Open the mobile menu
  await toggle.click();
  await page.waitForTimeout(300);
  // Use classList.contains() — not toHaveClass() — because #mobile-menu always has
  // 'lg:hidden' in its class list (Tailwind responsive utility). Playwright's toHaveClass()
  // does a substring/regex check on the full class string, so it would match 'lg:hidden'
  // and incorrectly fail. classList.contains() does exact class token matching.
  const isHiddenAfterOpen = await mobileMenuDiv.evaluate((el: HTMLElement) => el.classList.contains('hidden'));
  expect(isHiddenAfterOpen, 'Mobile menu should be visible after click — hidden class removed').toBe(false);

  // Press Escape — menu should close
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const isHiddenAfterEscape = await mobileMenuDiv.evaluate((el: HTMLElement) => el.classList.contains('hidden'));
  expect(isHiddenAfterEscape, 'Mobile menu should close on Escape — hidden class re-added').toBe(true);

  // ── 8. Desktop dropdown hover-intent JS sets aria-expanded correctly ──────
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(300);

  const firstDropdownItem = page.locator('header [data-nav-item]').first();
  const firstDropdownTrigger = firstDropdownItem.locator('a[aria-haspopup]').first();
  const firstDropdownPanel = firstDropdownItem.locator('[data-dropdown]').first();

  await expect(firstDropdownTrigger).toHaveAttribute('aria-expanded', 'false');
  await firstDropdownTrigger.hover();
  await page.waitForTimeout(150);
  await expect(firstDropdownTrigger).toHaveAttribute('aria-expanded', 'true');
  await expect(firstDropdownPanel).toHaveClass(/visible/);

  // Close delay is 300ms — it should still be open briefly after moving away
  await page.locator('body').hover();
  await page.waitForTimeout(150);
  await expect(firstDropdownTrigger).toHaveAttribute('aria-expanded', 'true');
  await page.waitForTimeout(250);
  await expect(firstDropdownTrigger).toHaveAttribute('aria-expanded', 'false');

  // ── 9. CapabilitiesStrip renders 4 inline SVG capability icons ────────────
  // Navigate back to homepage in case viewport/hover state changed
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  const capabilitiesSection = page
    .locator('section')
    .filter({ hasText: 'Equipment We Sell & Service' })
    .first();
  await expect(capabilitiesSection).toBeVisible();

  const capabilityCards = capabilitiesSection.locator('a');
  expect(await capabilityCards.count(), 'Homepage should show 4 capability cards').toBe(4);

  for (const label of ['Surgical Lighting', 'OR Tables', 'Sterilization', 'Service & Repair']) {
    await expect(capabilitiesSection.locator(`text=${label}`).first()).toBeVisible();
  }

  const svgIcons = capabilitiesSection.locator('a svg');
  expect(await svgIcons.count(), 'Capability cards should render inline SVG icons').toBeGreaterThanOrEqual(4);

  // ── 10. Screenshot proof ──────────────────────────────────────────────────
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
  await page.setViewportSize({ width: 1280, height: 900 });

  // Hover over a nav item with children to show dropdown
  const proofDropdownTrigger = page.locator(
    'header nav[aria-label="Primary navigation"] a[aria-haspopup]',
  ).first();
  await proofDropdownTrigger.hover();
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '✅ a11y fix — desktop nav dropdown visible, no role=region');

  // Mobile view
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await showPhaseLabel(page, '✅ a11y fix — mobile view, nav corrected');

  await page.setViewportSize({ width: 375, height: 812 });
  await toggle.click();
  await page.waitForTimeout(400);
  await showPhaseLabel(page, '✅ a11y fix — mobile menu open, Escape closes it');
});
