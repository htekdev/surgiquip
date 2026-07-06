/**
 * Change Proof E2E Spec — OR Installation Planning Guide
 * Verifies the OR installation planning guide article renders correctly:
 * page loads, H1 present, key planning phase sections visible, CTA.
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

test('change-proof-or-installation-planning-guide', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/or-installation-planning-guide-texas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏗️ OR Installation Planning Guide — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /or-installation-planning-guide-texas/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /OR Installation/i, 'H1 contains "OR Installation"');
  await page.waitForTimeout(800);

  // PART 3 — Phase 1: Equipment Selection section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Phase 1: Equipment Selection Section');
  await page.waitForTimeout(900);

  const phase1H2 = page.locator('.blog-body h2').filter({ hasText: /Phase 1/i }).first();
  await phase1H2.waitFor({ state: 'visible', timeout: 20000 });
  await phase1H2.scrollIntoViewIfNeeded();
  await expectVisible(phase1H2, '"Phase 1" section heading');

  // PART 4 — Phase 2: Pre-Construction Coordination section
  await smoothScroll(page, 1000, 260, 400);
  await showPhaseLabel(page, '🏗️ Phase 2: Pre-Construction Section');
  await page.waitForTimeout(900);

  const phase2H2 = page.locator('.blog-body h2').filter({ hasText: /Phase 2/i }).first();
  await phase2H2.waitFor({ state: 'visible', timeout: 20000 });
  await phase2H2.scrollIntoViewIfNeeded();
  await expectVisible(phase2H2, '"Phase 2" section heading');

  // PART 5 — Common Planning Mistakes section
  await smoothScroll(page, 1200, 260, 400);
  await showPhaseLabel(page, '⚠️ Common Planning Mistakes Section');
  await page.waitForTimeout(900);

  const mistakesH2 = page.locator('.blog-body h2').filter({ hasText: /Common Planning Mistakes/i }).first();
  await mistakesH2.waitFor({ state: 'visible', timeout: 20000 });
  await mistakesH2.scrollIntoViewIfNeeded();
  await expectVisible(mistakesH2, '"Common Planning Mistakes" section heading');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ OR Installation Planning Guide — Article Fully Verified');
  await page.waitForTimeout(1200);
});
