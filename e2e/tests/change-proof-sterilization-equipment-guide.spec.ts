/**
 * Change Proof E2E Spec — Sterilization Equipment Guide
 * Verifies the sterilization equipment article renders correctly:
 * page loads, H1 present, Knight section visible, regulatory section, CTA.
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

test('change-proof-sterilization-equipment-guide', async ({ page }) => {

  // PART 1 — Navigate to article
  await page.goto('/blog/sterilization-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Sterilization Equipment Guide — Article');
  await page.waitForTimeout(1000);

  await expectURL(page, /sterilization-equipment-guide-texas-hospitals/);

  // PART 2 — Article H1 visible
  await showPhaseLabel(page, '📰 Verifying article H1');
  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Sterilization/i, 'H1 contains "Sterilization"');
  await page.waitForTimeout(800);

  // PART 3 — Steam sterilization section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '🔬 Steam Sterilization Section');
  await page.waitForTimeout(900);

  const steamSection = page.locator('.blog-body h2').filter({ hasText: /Steam Sterilization/i }).first();
  await steamSection.waitFor({ state: 'visible', timeout: 20000 });
  await steamSection.scrollIntoViewIfNeeded();
  await expectVisible(steamSection, '"Steam Sterilization" section heading');

  // PART 4 — Knight: sterile processing section
  await smoothScroll(page, 1200, 260, 400);
  await showPhaseLabel(page, '⚙️ Knight Sterile Processing Section');
  await page.waitForTimeout(900);

  const knightSection = page.locator('.blog-body h2').filter({ hasText: /Knight/i }).first();
  await knightSection.waitFor({ state: 'visible', timeout: 20000 });
  await knightSection.scrollIntoViewIfNeeded();
  await expectVisible(knightSection, 'Knight sterile processing section');

  // PART 5 — Regulatory compliance section
  await smoothScroll(page, 800, 260, 400);
  await showPhaseLabel(page, '📜 Regulatory Compliance Section');
  await page.waitForTimeout(900);

  const regulatorySection = page.locator('.blog-body h2').filter({ hasText: /Regulatory/i }).first();
  await regulatorySection.waitFor({ state: 'visible', timeout: 20000 });
  await regulatorySection.scrollIntoViewIfNeeded();
  await expectVisible(regulatorySection, 'Regulatory Compliance section');

  // PART 6 — Phone CTA visible
  await smoothScroll(page, 1800, 260, 400);
  await showPhaseLabel(page, '📞 Phone CTA');
  await page.waitForTimeout(900);

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number (713) 681-6362 visible');

  await showPhaseLabel(page, '✅ Sterilization Equipment Guide — Article Fully Verified');
  await page.waitForTimeout(1200);
});
