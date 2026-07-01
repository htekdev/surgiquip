/**
 * Change Proof E2E Spec — Cycle 53: Oncologic Surgery Suite Equipment Guide
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

test.setTimeout(240000);

async function smoothScroll(page: Page, totalPx = 1200, stepPx = 260, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('change-proof-cycle53-oncologic-surgery-or-guide', async ({ page }) => {

  // PART 1 — Homepage
  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  // PART 2 — Blog Index
  await showPhaseLabel(page, '📝 Opening Blog Index →');
  await page.waitForTimeout(700);
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Oncologic Surgery Article Card');
  await page.waitForTimeout(800);

  const oncoLink = page.locator('a[href*="oncologic"]').first();
  await oncoLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(oncoLink, 'Oncologic article card link');

  // PART 3 — Navigate to article
  await showPhaseLabel(page, '📖 Opening Oncologic Surgery OR Equipment Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/oncologic-surgery-or-equipment-guide-texas');
  await page.waitForLoadState('networkidle');
  await expectURL(page, /oncologic-surgery-or-equipment-guide/);

  // PART 4 — Article hero
  await showPhaseLabel(page, '🔬 Oncologic Surgery OR Equipment Guide — Article Hero');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Oncologic/i, 'Article title contains "Oncologic"');

  const oncoTag = page.locator('text=oncologic surgery OR equipment').first();
  await expectVisible(oncoTag, 'Oncologic surgery OR equipment tag');

  // PART 5 — Scroll through key sections
  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '💡 Lighting for Tumor Margin Assessment Section');
  await page.waitForTimeout(1200);

  const lightingSection = page.locator('text=Lighting for Tumor Margin Assessment').first();
  await lightingSection.scrollIntoViewIfNeeded();
  await expectVisible(lightingSection, 'Lighting for Tumor Margin Assessment section');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🛏️ Surgical Tables Section');
  await page.waitForTimeout(1200);

  const tablesSection = page.locator('text=Surgical Tables for Oncologic').first();
  await tablesSection.scrollIntoViewIfNeeded();
  await expectVisible(tablesSection, 'Surgical Tables for Oncologic section');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🏥 Texas Oncologic Surgery Installations');
  await page.waitForTimeout(1000);

  const texasSection = page.locator('text=Texas Oncologic Surgery Installations').first();
  await texasSection.scrollIntoViewIfNeeded();
  await expectVisible(texasSection, 'Texas Oncologic Surgery Installations section');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🏛️ MH TMC Sarofim — Crown Jewel');
  await page.waitForTimeout(1000);

  const sarofimSection = page.locator('text=Sarofim').first();
  await sarofimSection.scrollIntoViewIfNeeded();
  await expectVisible(sarofimSection, 'Sarofim installation section');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🎓 UTMB John Sealy Hospital');
  await page.waitForTimeout(1000);

  const utmbSection = page.locator('text=UTMB John Sealy').first();
  await utmbSection.scrollIntoViewIfNeeded();
  await expectVisible(utmbSection, 'UTMB John Sealy section');

  // PART 6 — Bottom CTA
  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📞 Bottom CTA — Contact Surgiquip');
  await page.waitForTimeout(1000);

  const ctaPhone = page.locator('a[href*="tel:"]').first();
  await ctaPhone.scrollIntoViewIfNeeded();
  await expectVisible(ctaPhone, 'Phone CTA link');

  await showPhaseLabel(page, '✅ Oncologic Surgery OR Equipment Guide — Fully Verified');
  await page.waitForTimeout(1500);
});
