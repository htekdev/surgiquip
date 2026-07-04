/**
 * Change Proof E2E Spec — OR Table Selection Guide
 * Verifies the OR table selection article renders correctly:
 * page loads, H1 present, Skytron tables section visible, key specs, CTA.
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

test('change-proof-or-table-selection-guide', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/or-table-selection-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 OR Table Selection Guide — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /or-table-selection-guide-texas-hospitals/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /OR Table/i, 'H1 contains "OR Table"');
  await page.waitForTimeout(800);

  // PART 3 — Surgical Table Types section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Surgical Table Types Section');
  await page.waitForTimeout(900);

  const tableTypesH2 = page.locator('.blog-body h2').filter({ hasText: /Surgical Table Types/i }).first();
  await tableTypesH2.waitFor({ state: 'visible', timeout: 20000 });
  await tableTypesH2.scrollIntoViewIfNeeded();
  await expectVisible(tableTypesH2, '"Surgical Table Types" section heading');

  // PART 4 — Key specs section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '⚙️ Key Specifications Section');
  await page.waitForTimeout(900);

  const keySpecsH2 = page.locator('.blog-body h2').filter({ hasText: /Key Specifications/i }).first();
  await keySpecsH2.waitFor({ state: 'visible', timeout: 20000 });
  await keySpecsH2.scrollIntoViewIfNeeded();
  await expectVisible(keySpecsH2, '"Key Specifications" section heading');

  // PART 5 — Skytron tables in SE Texas
  await smoothScroll(page, 1000, 260, 400);
  await showPhaseLabel(page, '🛏️ Skytron Surgical Tables Section');
  await page.waitForTimeout(900);

  const skytronSection = page.locator('.blog-body h2').filter({ hasText: /Skytron/i }).first();
  await skytronSection.waitFor({ state: 'visible', timeout: 20000 });
  await skytronSection.scrollIntoViewIfNeeded();
  await expectVisible(skytronSection, 'Skytron Surgical Tables section');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ OR Table Selection Guide — Article Fully Verified');
  await page.waitForTimeout(1200);
});
