/**
 * Change Proof E2E Spec — Surgical Lighting Guide
 * Verifies the original surgical lighting article renders correctly:
 * page loads, H1 is present, key sections visible, Skytron reference, CTA phone.
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

test('change-proof-surgical-lighting-guide', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/surgical-lighting-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Surgical Lighting Guide — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /surgical-lighting-guide-texas-hospitals/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Surgical Lighting/i, 'H1 contains "Surgical Lighting"');
  await page.waitForTimeout(800);

  // PART 3 — Key section: Core Specifications
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📋 Core Specifications Section');
  await page.waitForTimeout(900);

  const coreSpecsH2 = page.locator('.blog-body h2').filter({ hasText: /Core Specifications/i }).first();
  await coreSpecsH2.waitFor({ state: 'visible', timeout: 20000 });
  await coreSpecsH2.scrollIntoViewIfNeeded();
  await expectVisible(coreSpecsH2, '"Core Specifications" section heading');

  // PART 4 — Skytron lighting systems section
  await smoothScroll(page, 1000, 260, 400);
  await showPhaseLabel(page, '💡 Skytron Surgical Lighting Systems Section');
  await page.waitForTimeout(900);

  const skytronSection = page.locator('.blog-body h2').filter({ hasText: /Skytron/i }).first();
  await skytronSection.waitFor({ state: 'visible', timeout: 20000 });
  await skytronSection.scrollIntoViewIfNeeded();
  await expectVisible(skytronSection, 'Skytron Surgical Lighting Systems section');

  // PART 5 — CRI reference (key product spec)
  await smoothScroll(page, 600, 260, 400);
  await showPhaseLabel(page, '🔬 CRI specification mentioned');
  await page.waitForTimeout(800);

  const criRef = page.locator('.blog-body').getByText(/CRI/i).first();
  await criRef.scrollIntoViewIfNeeded();
  await expectVisible(criRef, 'CRI specification reference');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ Surgical Lighting Guide — Article Fully Verified');
  await page.waitForTimeout(1200);
});
