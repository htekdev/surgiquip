/**
 * Change Proof E2E Spec — Medical Equipment Suppliers Houston TX
 * Verifies the surgical equipment suppliers guide article renders correctly:
 * page loads, H1 present, key sections about dealer status and service visible, CTA.
 * ONE SINGLE test() block = ONE continuous video
 * Proof keyword: change-proof
 */
import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(180000);

async function smoothScroll(page: Page, totalPx = 800, stepPx = 260, delayMs = 450) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-surgical-equipment-suppliers', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/surgical-equipment-suppliers-houston-tx');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Medical Equipment Suppliers Houston — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /surgical-equipment-suppliers-houston-tx/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Medical Equipment Suppliers/i, 'H1 contains "Medical Equipment Suppliers"');
  await page.waitForTimeout(800);

  // PART 3 — Authorized Dealer Status section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Authorized Dealer Status Section');
  await page.waitForTimeout(900);

  const dealerH2 = page.locator('.blog-body h2').filter({ hasText: /Authorized Dealer Status/i }).first();
  await dealerH2.waitFor({ state: 'visible', timeout: 20000 });
  await dealerH2.scrollIntoViewIfNeeded();
  await expectVisible(dealerH2, '"Authorized Dealer Status Matters" section heading');

  // PART 4 — Service & Repair Capability section
  await smoothScroll(page, 1000, 260, 400);
  await showPhaseLabel(page, '🔧 Service & Repair Capability Section');
  await page.waitForTimeout(900);

  const serviceH2 = page.locator('.blog-body h2').filter({ hasText: /Service.*Repair Capability/i }).first();
  await serviceH2.waitFor({ state: 'visible', timeout: 20000 });
  await serviceH2.scrollIntoViewIfNeeded();
  await expectVisible(serviceH2, '"Service & Repair Capability" section heading');

  // PART 5 — Accreditation & Track Record section
  await smoothScroll(page, 1200, 260, 400);
  await showPhaseLabel(page, '🏆 Accreditation & Track Record Section');
  await page.waitForTimeout(900);

  const accredH2 = page.locator('.blog-body h2').filter({ hasText: /Accreditation.*Track Record/i }).first();
  await accredH2.waitFor({ state: 'visible', timeout: 20000 });
  await accredH2.scrollIntoViewIfNeeded();
  await expectVisible(accredH2, '"Accreditation & Track Record" section heading');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ Medical Equipment Suppliers Houston — Article Fully Verified');
  await page.waitForTimeout(1200);
});
