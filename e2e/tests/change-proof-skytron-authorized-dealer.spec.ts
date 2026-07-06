/**
 * Change Proof E2E Spec — Authorized Skytron Dealer Southeast Texas
 * Verifies the Skytron authorized dealer article renders correctly:
 * page loads, H1 present, key dealer/authorization sections visible, CTA.
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

test('change-proof-skytron-authorized-dealer', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/skytron-authorized-dealer-southeast-texas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Authorized Skytron Dealer — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /skytron-authorized-dealer-southeast-texas/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Skytron/i, 'H1 contains "Skytron"');
  await page.waitForTimeout(800);

  // PART 3 — What "Authorized Dealer" Actually Means section
  // Note: use regex to avoid apostrophe issues in text= selectors
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Authorized Dealer Definition Section');
  await page.waitForTimeout(900);

  const authorizedH2 = page.locator('.blog-body h2').filter({ hasText: /Authorized Dealer/i }).first();
  await authorizedH2.waitFor({ state: 'visible', timeout: 20000 });
  await authorizedH2.scrollIntoViewIfNeeded();
  await expectVisible(authorizedH2, '"Authorized Dealer" section heading');

  // PART 4 — Southeast Texas Dealer Landscape section
  await smoothScroll(page, 1000, 260, 400);
  await showPhaseLabel(page, '🗺️ Southeast Texas Dealer Landscape Section');
  await page.waitForTimeout(900);

  const landscapeH2 = page.locator('.blog-body h2').filter({ hasText: /Southeast Texas Dealer/i }).first();
  await landscapeH2.waitFor({ state: 'visible', timeout: 20000 });
  await landscapeH2.scrollIntoViewIfNeeded();
  await expectVisible(landscapeH2, '"Southeast Texas Dealer Landscape" section heading');

  // PART 5 — Questions to Ask section
  await smoothScroll(page, 1200, 260, 400);
  await showPhaseLabel(page, '❓ Questions to Ask Section');
  await page.waitForTimeout(900);

  const questionsH2 = page.locator('.blog-body h2').filter({ hasText: /Questions to Ask/i }).first();
  await questionsH2.waitFor({ state: 'visible', timeout: 20000 });
  await questionsH2.scrollIntoViewIfNeeded();
  await expectVisible(questionsH2, '"Questions to Ask" section heading');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ Authorized Skytron Dealer — Article Fully Verified');
  await page.waitForTimeout(1200);
});
