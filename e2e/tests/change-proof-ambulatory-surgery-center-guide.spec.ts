/**
 * Change Proof E2E Spec — Ambulatory Surgery Center Equipment Guide
 * Verifies the ASC equipment guide article renders correctly:
 * page loads, H1 present, key regulatory and equipment sections visible, CTA.
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

test('change-proof-ambulatory-surgery-center-guide', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/ambulatory-surgery-center-equipment-guide-texas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 ASC Equipment Guide — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /ambulatory-surgery-center-equipment-guide-texas/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Ambulatory Surgery Center/i, 'H1 contains "Ambulatory Surgery Center"');
  await page.waitForTimeout(800);

  // PART 3 — Regulatory environment section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Regulatory Environment Section');
  await page.waitForTimeout(900);

  const regulatoryH2 = page.locator('.blog-body h2').filter({ hasText: /Regulatory Environment/i }).first();
  await regulatoryH2.waitFor({ state: 'visible', timeout: 20000 });
  await regulatoryH2.scrollIntoViewIfNeeded();
  await expectVisible(regulatoryH2, '"Regulatory Environment" section heading');

  // PART 4 — Key equipment categories section
  await smoothScroll(page, 1000, 260, 400);
  await showPhaseLabel(page, '🔬 Key Equipment Categories Section');
  await page.waitForTimeout(900);

  const equipCatH2 = page.locator('.blog-body h2').filter({ hasText: /Key Equipment Categories/i }).first();
  await equipCatH2.waitFor({ state: 'visible', timeout: 20000 });
  await equipCatH2.scrollIntoViewIfNeeded();
  await expectVisible(equipCatH2, '"Key Equipment Categories" section heading');

  // PART 5 — Surgiquip Solutions section
  await smoothScroll(page, 1200, 260, 400);
  await showPhaseLabel(page, '🏢 Surgiquip Solutions for Texas ASCs Section');
  await page.waitForTimeout(900);

  const surgiquipH2 = page.locator('.blog-body h2').filter({ hasText: /Surgiquip Solutions/i }).first();
  await surgiquipH2.waitFor({ state: 'visible', timeout: 20000 });
  await surgiquipH2.scrollIntoViewIfNeeded();
  await expectVisible(surgiquipH2, '"Surgiquip Solutions for Texas ASCs" section heading');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ ASC Equipment Guide — Article Fully Verified');
  await page.waitForTimeout(1200);
});
