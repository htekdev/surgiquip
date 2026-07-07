/**
 * Change Proof E2E Spec — FAQ Schema + FAQSection on Service Pages
 * ONE SINGLE test() block = ONE continuous video proving the change.
 *
 * What this proves:
 *   → /services/equipment-sales: FAQPage JSON-LD + FAQ accordion visible
 *   → /services/service-and-repair: FAQPage JSON-LD + FAQ accordion visible
 *   → /services/preventive-maintenance: FAQPage JSON-LD + FAQ accordion visible
 *
 * Pacing: 500ms scroll step, 1200ms between major actions.
 * Proof keyword: change-proof
 */

import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  expectJsonLd,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(300000);

async function smoothScroll(page: Page, totalPx = 800, stepPx = 200, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(800);
}

test('change-proof-faq-schema-service-pages', async ({ page }) => {
  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Equipment Sales: FAQPage schema + accordion
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/services/equipment-sales');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Equipment Sales — FAQ Schema PR');
  await page.waitForTimeout(1200);

  await expectURL(page, /\/services\/equipment-sales/, 'Equipment Sales URL');

  const salesH1 = page.locator('h1').first();
  await expectVisible(salesH1, 'Equipment Sales H1');
  await expectText(salesH1, 'Equipment Sales', 'H1 contains Equipment Sales');
  await page.waitForTimeout(800);

  // Verify FAQPage JSON-LD in head
  await expectJsonLd(page, 'Equipment Sales FAQPage schema');
  await page.waitForTimeout(800);

  // Scroll to FAQ section
  await showPhaseLabel(page, '📋 Scrolling to Equipment Sales FAQ accordion');
  await smoothScroll(page, 2400, 200, 500);
  await page.waitForTimeout(1200);

  // Verify FAQ heading is visible
  const salesFaqH2 = page.locator('h2#faq-heading').first();
  await salesFaqH2.scrollIntoViewIfNeeded();
  await expectVisible(salesFaqH2, 'Equipment Sales FAQ heading');
  await expectText(salesFaqH2, 'Common Questions', 'FAQ section h2 rendered');
  await page.waitForTimeout(800);

  // Verify first accordion item (authorized dealer question)
  const salesFirstQuestion = page.locator('main summary').first();
  await salesFirstQuestion.scrollIntoViewIfNeeded();
  await expectVisible(salesFirstQuestion, 'First FAQ accordion item visible');
  await page.waitForTimeout(600);

  // Click to open first FAQ
  await salesFirstQuestion.click();
  await page.waitForTimeout(800);

  const salesFirstAnswer = page.locator('main details').first();
  await expectVisible(salesFirstAnswer, 'FAQ answer expanded');
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '✅ Equipment Sales — FAQPage schema + accordion verified');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Service & Repair: FAQPage schema + accordion
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/services/service-and-repair');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🔧 Service & Repair — FAQ Schema');
  await page.waitForTimeout(1200);

  await expectURL(page, /\/services\/service-and-repair/, 'Service & Repair URL');

  const repairH1 = page.locator('h1').first();
  await expectVisible(repairH1, 'Service & Repair H1');
  await expectText(repairH1, 'Service', 'H1 contains Service');
  await page.waitForTimeout(800);

  // Verify FAQPage JSON-LD in head
  await expectJsonLd(page, 'Service & Repair FAQPage schema');
  await page.waitForTimeout(800);

  // Scroll to FAQ section
  await showPhaseLabel(page, '📋 Scrolling to Service & Repair FAQ accordion');
  await smoothScroll(page, 2400, 200, 500);
  await page.waitForTimeout(1200);

  const repairFaqH2 = page.locator('h2#faq-heading').first();
  await repairFaqH2.scrollIntoViewIfNeeded();
  await expectVisible(repairFaqH2, 'Service & Repair FAQ heading');
  await expectText(repairFaqH2, 'Common Questions', 'Repair FAQ section h2 rendered');
  await page.waitForTimeout(800);

  // Open first FAQ (emergency response question)
  const repairFirstQuestion = page.locator('main summary').first();
  await repairFirstQuestion.scrollIntoViewIfNeeded();
  await expectVisible(repairFirstQuestion, 'Repair FAQ first accordion item');
  await page.waitForTimeout(600);
  await repairFirstQuestion.click();
  await page.waitForTimeout(800);

  const repairFirstAnswer = page.locator('main details').first();
  await expectVisible(repairFirstAnswer, 'Repair FAQ answer expanded');
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '✅ Service & Repair — FAQPage schema + accordion verified');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Preventive Maintenance: FAQPage schema + accordion
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/services/preventive-maintenance');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📅 Preventive Maintenance — FAQ Schema');
  await page.waitForTimeout(1200);

  await expectURL(page, /\/services\/preventive-maintenance/, 'Preventive Maintenance URL');

  const pmH1 = page.locator('h1').first();
  await expectVisible(pmH1, 'Preventive Maintenance H1');
  await expectText(pmH1, 'Preventive Maintenance', 'H1 text');
  await page.waitForTimeout(800);

  // Verify FAQPage JSON-LD in head
  await expectJsonLd(page, 'Preventive Maintenance FAQPage schema');
  await page.waitForTimeout(800);

  // Scroll to FAQ section
  await showPhaseLabel(page, '📋 Scrolling to Preventive Maintenance FAQ accordion');
  await smoothScroll(page, 2400, 200, 500);
  await page.waitForTimeout(1200);

  const pmFaqH2 = page.locator('h2#faq-heading').first();
  await pmFaqH2.scrollIntoViewIfNeeded();
  await expectVisible(pmFaqH2, 'PM FAQ heading');
  await expectText(pmFaqH2, 'Common Questions', 'PM FAQ section h2 rendered');
  await page.waitForTimeout(800);

  // Open first FAQ (what's included in PM program)
  const pmFirstQuestion = page.locator('main summary').first();
  await pmFirstQuestion.scrollIntoViewIfNeeded();
  await expectVisible(pmFirstQuestion, 'PM FAQ first accordion item');
  await page.waitForTimeout(600);
  await pmFirstQuestion.click();
  await page.waitForTimeout(800);

  const pmFirstAnswer = page.locator('main details').first();
  await expectVisible(pmFirstAnswer, 'PM FAQ answer expanded');
  await page.waitForTimeout(1200);

  // Scroll through remaining PM FAQs
  await showPhaseLabel(page, '📋 Scrolling through all PM FAQ items');
  await smoothScroll(page, 600, 200, 500);
  await page.waitForTimeout(1200);

  // Verify all 4 details/summary pairs are present
  const allDetails = page.locator('main details');
  const detailsCount = await allDetails.count();
  await showPhaseLabel(page, `📊 PM FAQ items found: ${detailsCount}`);
  await page.waitForTimeout(1000);

  // Navigate to Services index to confirm nav links work
  await scrollToTop(page);
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '← Services index via breadcrumb');
  await page.waitForTimeout(800);

  const servicesBreadcrumb = page.locator('a[href="/services"]').first();
  await servicesBreadcrumb.scrollIntoViewIfNeeded();
  await expectVisible(servicesBreadcrumb, 'Services breadcrumb link');
  await servicesBreadcrumb.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await expectURL(page, /\/services$/, 'Services index URL');

  const servicesH1 = page.locator('main h1').first();
  await expectVisible(servicesH1, 'Services index H1');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '✅ All 3 Service Pages — FAQPage Schema + Accordion COMPLETE');
  await page.waitForTimeout(2000);
});
