/**
 * Change Proof E2E Spec — Cycle 56: Address Accuracy Fix
 * Verifies the correct address (10653 Kinghurst Drive, Houston TX 77099) appears
 * throughout the site — footer, contact page, and homepage JSON-LD schema.
 * Previously site.ts had wrong address: 2020 Johanna Drive, 77055.
 * CI retrigger: 2026-07-04
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

test('change-proof-cycle56-address-accuracy', async ({ page }) => {

  // PART 1 — Homepage footer address
  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // Scroll to footer
  await smoothScroll(page, 4000, 400, 400);
  await showPhaseLabel(page, '📍 Footer — Verifying Address');
  await page.waitForTimeout(1000);

  // Footer should show correct address — 10653 Kinghurst Drive
  const footerAddress = page.locator('footer').locator('text=10653 Kinghurst Drive').first();
  await footerAddress.scrollIntoViewIfNeeded();
  await expectVisible(footerAddress, '10653 Kinghurst Drive in footer');

  const footerZip = page.locator('footer').locator('text=77099').first();
  await footerZip.scrollIntoViewIfNeeded();
  await expectVisible(footerZip, 'Zip code 77099 in footer');

  // PART 2 — Homepage JSON-LD schema accuracy
  await showPhaseLabel(page, '🔍 Homepage JSON-LD Schema Check');
  await page.waitForTimeout(700);

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const orgSchema = schemas.find(s => s.includes('"streetAddress"'));
  if (!orgSchema) throw new Error('Organization schema not found');
  const parsed = JSON.parse(orgSchema);
  // Walk arrays or direct schema
  const org = Array.isArray(parsed) ? parsed.find((s: any) => s?.address?.streetAddress) : parsed;
  const streetAddress = org?.address?.streetAddress ?? parsed?.address?.streetAddress;
  if (streetAddress !== '10653 Kinghurst Drive') {
    throw new Error(`Wrong address in JSON-LD: expected "10653 Kinghurst Drive", got "${streetAddress}"`);
  }

  await showPhaseLabel(page, '✅ JSON-LD streetAddress = 10653 Kinghurst Drive');
  await page.waitForTimeout(1000);

  // PART 3 — Contact page display address
  await showPhaseLabel(page, '📞 Opening Contact Page →');
  await page.waitForTimeout(700);
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📞 Contact Page — Address Display');
  await page.waitForTimeout(1200);

  // Contact page address element
  const contactAddress = page.locator('address').first();
  await contactAddress.scrollIntoViewIfNeeded();
  await expectVisible(contactAddress, 'Contact address element');
  await expectText(contactAddress, /10653 Kinghurst/i, 'Contact address shows 10653 Kinghurst');

  // Maps link should reference the correct address
  const mapsLink = page.locator('a[href*="10653"]').first();
  await mapsLink.scrollIntoViewIfNeeded();
  await expectVisible(mapsLink, 'Google Maps link with 10653 Kinghurst');

  // PART 4 — Scroll down to maps embed
  await smoothScroll(page, 1200, 300, 400);
  await showPhaseLabel(page, '🗺️ Contact Page — Maps Section');
  await page.waitForTimeout(1200);

  const mapsFrame = page.locator('iframe[title*="Surgiquip"]').first();
  await mapsFrame.scrollIntoViewIfNeeded();
  await expectVisible(mapsFrame, 'Google Maps embed visible');

  await showPhaseLabel(page, '✅ Address Accuracy Fix — Verified');
  await page.waitForTimeout(1500);
});
