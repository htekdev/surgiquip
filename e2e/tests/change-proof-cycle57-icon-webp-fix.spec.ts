/**
 * Change Proof E2E Spec — Cycle 57: Homepage capability icons
 * Verifies the homepage "Equipment We Sell & Service" strip renders the
 * current 4 inline SVG capability icons and labels.
 * ONE SINGLE test() block = ONE continuous video
 * Proof keyword: change-proof
 */
import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(180000);

async function smoothScroll(page: Page, totalPx = 800, stepPx = 260, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-cycle57-icon-webp-fix', async ({ page }) => {

  // PART 1 — Load homepage
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage Loaded');
  await page.waitForTimeout(1200);

  // PART 2 — Scroll to CapabilitiesStrip ("What We Handle")
  await showPhaseLabel(page, '🔎 Scrolling to Capabilities Strip');
  await smoothScroll(page, 800, 260, 400);
  await page.waitForTimeout(800);

  // Find the "What We Handle" section heading
  const whatWeHandleH2 = page.locator('h2').filter({ hasText: /What We Handle|Equipment We Sell/i }).first();
  await whatWeHandleH2.scrollIntoViewIfNeeded();
  await expectVisible(whatWeHandleH2, '"Equipment We Sell & Service" heading visible');
  await showPhaseLabel(page, '✅ CapabilitiesStrip Section Found');
  await page.waitForTimeout(1000);

  // PART 3 — Verify all 4 capability cards render with inline SVG icons
  await showPhaseLabel(page, '🖼️ Verifying 4 capability cards + SVG icons');

  const capabilitiesSection = page
    .locator('section')
    .filter({ hasText: 'Equipment We Sell & Service' })
    .first();

  const capabilityCards = capabilitiesSection.locator('a');
  const count = await capabilityCards.count();
  if (count !== 4) {
    throw new Error(`Expected 4 capability cards, found ${count}`);
  }

  for (let i = 0; i < count; i++) {
    const card = capabilityCards.nth(i);
    await card.scrollIntoViewIfNeeded();
    await expectVisible(card, `Capability card ${i + 1} of ${count} visible`);
    await expectVisible(card.locator('svg').first(), `Capability icon ${i + 1} visible`);
  }

  await showPhaseLabel(page, `✅ ${count}/4 capability cards verified`);
  await page.waitForTimeout(800);

  // PART 4 — Verify the old /images/icons assets are no longer used
  await showPhaseLabel(page, '🔧 Verifying legacy icon image assets are gone');

  const legacyIconImgs = page.locator('img[src*="/images/icons/"]');
  const legacyCount = await legacyIconImgs.count();
  if (legacyCount !== 0) {
    throw new Error(`Expected 0 legacy /images/icons assets, found ${legacyCount}`);
  }

  await showPhaseLabel(page, '✅ No legacy /images/icons references remain');
  await page.waitForTimeout(800);

  // PART 5 — Scroll down to verify labels visually (show all 4 labels)
  await showPhaseLabel(page, '🏷️ Showing all 4 capability labels');
  await page.waitForTimeout(600);

  const surgicalLighting = capabilitiesSection.locator('text=Surgical Lighting').first();
  await surgicalLighting.scrollIntoViewIfNeeded();
  await expectVisible(surgicalLighting, 'Surgical Lighting label');

  const orTables = capabilitiesSection.locator('text=OR Tables').first();
  await expectVisible(orTables, 'OR Tables label');

  const sterilization = capabilitiesSection.locator('text=Sterilization').first();
  await expectVisible(sterilization, 'Sterilization label');

  const serviceRepair = capabilitiesSection.locator('text=Service & Repair').first();
  await expectVisible(serviceRepair, 'Service & Repair label');

  await showPhaseLabel(page, '✅ Cycle 57 — Homepage capability icons VERIFIED');
  await page.waitForTimeout(1500);
});
