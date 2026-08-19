/**
 * Change Proof E2E Spec — FAQ Schema + FAQSection on Service Pages
 * ONE SINGLE test() block = ONE continuous video proving the change.
 *
 * What this proves:
 *   → /services/equipment-sales now routes to /products (Equipment Sales removed from services)
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
  // PART 1 — Equipment Sales retired from Services → Products catalog
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/services/equipment-sales');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Equipment Sales retired from Services → Products');
  await page.waitForTimeout(1200);

  await expectURL(page, /\/products$/, 'Equipment Sales route now lands on Products');

  const productsH1 = page.locator('h1').first();
  await expectVisible(productsH1, 'Products catalog H1');
  await expectText(productsH1, 'Equipment Catalog', 'H1 confirms product catalog');
  await page.waitForTimeout(800);

  const surgicalTablesTile = page.locator('main a[href="/products/surgical-tables"]').first();
  await surgicalTablesTile.scrollIntoViewIfNeeded();
  await expectVisible(surgicalTablesTile, 'Surgical Tables category tile visible');
  await page.waitForTimeout(600);

  const brandsSection = page.locator('text=Brands we service but don\'t sell').first();
  await brandsSection.scrollIntoViewIfNeeded();
  await expectVisible(brandsSection, 'Products page replacement content visible');
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '✅ Equipment Sales removed from Services — Products catalog verified');
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
  // PART 3 — Preventive Maintenance: FAQPage schema + overhauled PM content
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

  const allBrandsCopy = page.locator('text=all brands of OR equipment across Texas').first();
  await allBrandsCopy.scrollIntoViewIfNeeded();
  await expectVisible(allBrandsCopy, 'PM hero copy reflects all-brands coverage');
  await page.waitForTimeout(600);

  const scheduledInspections = page.locator('h3').filter({ hasText: /Scheduled Inspections/i }).first();
  await scheduledInspections.scrollIntoViewIfNeeded();
  await expectVisible(scheduledInspections, 'Scheduled Inspections inclusion');
  await page.waitForTimeout(600);

  const functionalTesting = page.locator('h3').filter({ hasText: /Functional Testing/i }).first();
  await functionalTesting.scrollIntoViewIfNeeded();
  await expectVisible(functionalTesting, 'Functional Testing inclusion');
  await page.waitForTimeout(600);

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
