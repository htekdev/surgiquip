/**
 * Change Proof E2E Spec — Cycle 57: Icon WebP Optimization
 * Verifies CapabilitiesStrip on homepage uses .webp icons (not .png),
 * and that all 4 icon images load without 404.
 * Fixes: icon-surgical-light.png was broken (file was .webp), and
 * icon-or-table/sterilization/service-tech PNGs were 1MB+ each.
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

  // PART 3 — Verify all 4 icon images load (no broken image indicators)
  await showPhaseLabel(page, '🖼️ Verifying 4 icon images load');

  // Check all 4 capability icons render via img elements pointing to .webp
  const iconImgs = page.locator('img[src*="/images/icons/"]');
  const count = await iconImgs.count();

  // We expect exactly 4 icon images
  if (count < 4) {
    throw new Error(`Expected 4 capability icons, found ${count}`);
  }

  // Verify each icon image is visible
  for (let i = 0; i < count; i++) {
    const img = iconImgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expectVisible(img, `Icon image ${i + 1} of ${count} visible`);
  }

  await showPhaseLabel(page, `✅ ${count}/4 icon images verified`);
  await page.waitForTimeout(800);

  // PART 4 — Verify .webp extension on all icon src attributes (no .png references)
  await showPhaseLabel(page, '🔧 Verifying .webp extension on all icon sources');

  const iconsWithPng = page.locator('img[src*="/images/icons/"][src$=".png"]');
  const pngCount = await iconsWithPng.count();
  if (pngCount > 0) {
    throw new Error(`Found ${pngCount} icon(s) still referencing .png instead of .webp`);
  }

  await showPhaseLabel(page, '✅ All icons use .webp — no .png references');
  await page.waitForTimeout(800);

  // PART 5 — Verify icon images loaded via network (check naturalWidth > 0)
  // Uses waitForFunction to poll — lazy-loaded images may not have their bytes fetched yet
  // even after scrollIntoViewIfNeeded, so page.evaluate() alone is too early.
  await showPhaseLabel(page, '📡 Waiting for all icon images to fully load');

  await page.waitForFunction(
    () => {
      const imgs = Array.from(
        document.querySelectorAll<HTMLImageElement>('img[src*="/images/icons/"]')
      );
      return imgs.length >= 4 && imgs.every((img) => img.complete && img.naturalWidth > 0);
    },
    { timeout: 20000 }
  );

  const allIconsLoaded = await page.evaluate(() => {
    const imgs = document.querySelectorAll<HTMLImageElement>('img[src*="/images/icons/"]');
    const results: Array<{ src: string; loaded: boolean; naturalWidth: number }> = [];
    imgs.forEach((img) => {
      results.push({ src: img.src, loaded: img.complete && img.naturalWidth > 0, naturalWidth: img.naturalWidth });
    });
    return results;
  });

  const failedIcons = allIconsLoaded.filter((r) => !r.loaded);
  if (failedIcons.length > 0) {
    const failList = failedIcons.map((r) => r.src).join(', ');
    throw new Error(`Icon(s) failed to load (naturalWidth=0): ${failList}`);
  }

  await showPhaseLabel(page, `✅ All ${allIconsLoaded.length} icon images loaded successfully`);
  await page.waitForTimeout(1000);

  // PART 6 — Scroll down to verify icons visually (show all 4 labels)
  await showPhaseLabel(page, '🏷️ Showing all 4 capability labels');
  await page.waitForTimeout(600);

  const surgicalLighting = page.locator('text=Surgical Lighting').first();
  await surgicalLighting.scrollIntoViewIfNeeded();
  await expectVisible(surgicalLighting, 'Surgical Lighting label');

  const orTables = page.locator('text=OR Tables').first();
  await expectVisible(orTables, 'OR Tables label');

  const sterilization = page.locator('text=Sterilization').first();
  await expectVisible(sterilization, 'Sterilization label');

  // Scope to main — nav header also has a "Service & Repair" link (hidden, causes false match)
  const serviceRepair = page.locator('main a[href="/services/service-and-repair"]').first();
  await expectVisible(serviceRepair, 'Service & Repair label');

  await showPhaseLabel(page, '✅ Cycle 57 — Icon WebP Fix VERIFIED');
  await page.waitForTimeout(1500);
});
