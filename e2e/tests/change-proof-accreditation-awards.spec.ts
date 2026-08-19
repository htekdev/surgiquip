/**
 * Change Proof E2E Spec — Cycle 40: Accreditation & Awards Enhancement
 * ONE SINGLE test() block = ONE continuous video
 *
 * PR-specific: navigates directly to /about/accreditation — the exact page changed.
 * Demonstrates:
 *   → BBB Torch Award section (2014-2018, five consecutive years) — NEW
 *   → Texas DSHS Device Distributor license — NEW
 *   → Texas DSHS Salvage Establishment license — NEW
 *   → South Texas Skytron authorization visible
 *   → Factory certs visible: Skytron, Midmark, Tuttnauer
 *   → Organization Schema with award[] and hasCredential[] — NEW
 *
 * Proof keyword: change-proof
 * Pacing: 500ms scroll step, 1200ms between major actions
 */
import { test, expect, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  expectJsonLd,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(300000);

async function smoothScroll(page: Page, totalPx = 1200, stepPx = 300, delayMs = 500) {
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

test('change-proof-accreditation-awards', async ({ page }) => {
  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage (2s orientation)
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  const homeH1 = page.locator('h1').first();
  await expectVisible(homeH1, 'Homepage H1');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Navigate to Accreditation (the changed page)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔗 Navigating to /about/accreditation');
  await page.waitForTimeout(800);

  await page.goto('/about/accreditation');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🏆 Accreditation & Awards Page');
  await page.waitForTimeout(1000);

  await expectURL(page, /\/about\/accreditation/, 'Accreditation URL');

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Accreditation H1');
  await expectText(h1, 'Accredited', 'H1 text');
  await page.waitForTimeout(800);

  await expectJsonLd(page, 'Organization Schema with awards');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — BBB Torch Award section (NEW)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏆 BBB Torch Award — Five Consecutive Years 2014-2018');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 600, 300, 500);
  await page.waitForTimeout(1200);

  const torchHeading = page.locator('text=Torch Award for Ethics — Five Consecutive Years').first();
  await torchHeading.scrollIntoViewIfNeeded();
  await expectVisible(torchHeading, 'Torch Award heading — NEW real content');
  await page.waitForTimeout(800);

  for (const year of ['2014', '2015', '2016', '2017', '2018']) {
    const yearBadge = page.locator(`text=Torch Award ${year}`).first();
    await yearBadge.scrollIntoViewIfNeeded();
    await expectVisible(yearBadge, `Torch Award ${year} badge`);
    await page.waitForTimeout(400);
  }

  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Current credential cards
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📋 Current Credentials — BBB, South Texas, DSHS');
  await page.waitForTimeout(800);

  await smoothScroll(page, 800, 300, 500);
  await page.waitForTimeout(1200);

  const bbbCard = page.locator('text=Better Business Bureau — A+ Accredited').first();
  await bbbCard.scrollIntoViewIfNeeded();
  await expectVisible(bbbCard, 'BBB A+ credential card');
  await page.waitForTimeout(800);

  const southTexasCard = page.locator('text=Authorized Skytron Dealer — South Texas').first();
  await southTexasCard.scrollIntoViewIfNeeded();
  await expectVisible(southTexasCard, 'South Texas Skytron authorization');
  await page.waitForTimeout(800);

  const dshsDevice = page.locator('text=Texas DSHS: Device Distributor License').first();
  await dshsDevice.scrollIntoViewIfNeeded();
  await expectVisible(dshsDevice, 'DSHS Device Distributor — NEW');
  await page.waitForTimeout(800);

  const dshsSalvage = page.locator('text=Texas DSHS: Salvage Establishment License').first();
  await dshsSalvage.scrollIntoViewIfNeeded();
  await expectVisible(dshsSalvage, 'DSHS Salvage Establishment — NEW');
  await page.waitForTimeout(800);

  const factoryCertCard = page.locator('text=Factory-Certified Technicians').first();
  await factoryCertCard.scrollIntoViewIfNeeded();
  await expectVisible(factoryCertCard, 'Factory-certified technicians card');
  await page.waitForTimeout(800);

  const midmarkMention = page.locator('text=Midmark').first();
  await midmarkMention.scrollIntoViewIfNeeded();
  await expectVisible(midmarkMention, 'Midmark certification listed');
  await page.waitForTimeout(400);

  const tuttnauerMention = page.locator('text=Tuttnauer').first();
  await tuttnauerMention.scrollIntoViewIfNeeded();
  await expectVisible(tuttnauerMention, 'Tuttnauer certification listed');
  await page.waitForTimeout(800);

  // Removed client-meeting content must stay gone
  await expect(page.locator('text=Texas Certified HUB Vendor')).toHaveCount(0);
  await expect(page.locator('text=Vital Affiliate')).toHaveCount(0);
  await expect(page.locator('text=Memorial Hermann IDN')).toHaveCount(0);

  await showPhaseLabel(page, '📜 Scrolling compliance section');
  await page.waitForTimeout(800);
  await smoothScroll(page, 1200, 300, 500);
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Compliance + back to About
  // ═══════════════════════════════════════════════════════════════════════════

  const complianceH2 = page.locator('text=Survey-Ready Documentation').first();
  await complianceH2.scrollIntoViewIfNeeded();
  await expectVisible(complianceH2, 'Compliance section');
  await page.waitForTimeout(800);

  await smoothScroll(page, 600, 300, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '← Back to About Index via breadcrumb');
  await page.waitForTimeout(800);

  await scrollToTop(page);
  await page.waitForTimeout(800);

  const aboutBreadcrumb = page.locator('a[href="/about"]').first();
  await aboutBreadcrumb.scrollIntoViewIfNeeded();
  await expectVisible(aboutBreadcrumb, 'About breadcrumb link');
  await aboutBreadcrumb.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await expectURL(page, /\/about$/, 'About index URL');

  const accreditationLink = page.locator('a[href="/about/accreditation"]').first();
  await accreditationLink.scrollIntoViewIfNeeded();
  await expectVisible(accreditationLink, 'Accreditation link in About nav');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '✅ Cycle 40 Complete — Real Awards & Credentials Live');
  await page.waitForTimeout(2000);
});
