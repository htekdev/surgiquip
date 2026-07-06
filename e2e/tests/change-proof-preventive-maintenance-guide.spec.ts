/**
 * Change Proof E2E Spec — Preventive Maintenance for OR Equipment
 * Verifies the PM guide article renders correctly:
 * page loads, H1 present, key PM sections visible, CTA.
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

test('change-proof-preventive-maintenance-guide', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/preventive-maintenance-or-equipment-texas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🔧 Preventive Maintenance Guide — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /preventive-maintenance-or-equipment-texas/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Preventive Maintenance/i, 'H1 contains "Preventive Maintenance"');
  await page.waitForTimeout(800);

  // PART 3 — Why OR Equipment PM Is Different section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Why OR Equipment PM Is Different Section');
  await page.waitForTimeout(900);

  const whyPMH2 = page.locator('.blog-body h2').filter({ hasText: /Why OR Equipment PM/i }).first();
  await whyPMH2.waitFor({ state: 'visible', timeout: 20000 });
  await whyPMH2.scrollIntoViewIfNeeded();
  await expectVisible(whyPMH2, '"Why OR Equipment PM" section heading');

  // PART 4 — Core Elements section
  await smoothScroll(page, 1000, 260, 400);
  await showPhaseLabel(page, '🔩 Core Elements of PM Program Section');
  await page.waitForTimeout(900);

  const coreElementsH2 = page.locator('.blog-body h2').filter({ hasText: /Core Elements/i }).first();
  await coreElementsH2.waitFor({ state: 'visible', timeout: 20000 });
  await coreElementsH2.scrollIntoViewIfNeeded();
  await expectVisible(coreElementsH2, '"Core Elements" section heading');

  // PART 5 — PM Service Partner expectations section
  await smoothScroll(page, 1200, 260, 400);
  await showPhaseLabel(page, '🤝 What Texas Hospitals Should Expect Section');
  await page.waitForTimeout(900);

  const partnerH2 = page.locator('.blog-body h2').filter({ hasText: /Texas Hospitals Should Expect/i }).first();
  await partnerH2.waitFor({ state: 'visible', timeout: 20000 });
  await partnerH2.scrollIntoViewIfNeeded();
  await expectVisible(partnerH2, '"What Texas Hospitals Should Expect" section heading');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ Preventive Maintenance Guide — Article Fully Verified');
  await page.waitForTimeout(1200);
});
