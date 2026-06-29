/**
 * Change Proof E2E Spec — Cycle 41: Houston Suburb Service Areas (Proven Presence)
 * ONE SINGLE test() block = ONE continuous video
 *
 * PR-specific: visits all 8 new service area pages added by this PR.
 * 90% of video time on new pages — not homepage.
 *
 * Proof keyword: change-proof
 * Pacing: 500ms scroll step, 1000ms between major actions
 */
import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectURL,
  expectJsonLd,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(600000);

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
  await page.waitForTimeout(600);
}

async function visitServiceArea(page: Page, slug: string, label: string, verifyText: string) {
  await showPhaseLabel(page, `📍 ${label}`);
  await page.waitForTimeout(800);

  await page.goto(`/service-areas/${slug}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await expectURL(page, new RegExp(`/service-areas/${slug}`), `${label} URL`);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, `${label} H1`);
  await page.waitForTimeout(600);

  await expectJsonLd(page, `${label} Schema`);
  await page.waitForTimeout(600);

  const refText = page.locator(`text=${verifyText}`).first();
  await refText.scrollIntoViewIfNeeded();
  await expectVisible(refText, `${label} — real content: "${verifyText}"`);
  await page.waitForTimeout(600);

  await smoothScroll(page, 1500, 300, 500);
  await page.waitForTimeout(1000);
}

test('change-proof-houston-suburbs-service-areas', async ({ page }) => {
  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage (2s)
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1000);

  const homeH1 = page.locator('h1').first();
  await expectVisible(homeH1, 'Homepage H1');
  await page.waitForTimeout(600);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Sugar Land (crown jewel — Methodist Sugar Land 18 OR + 2 Hybrid)
  // ═══════════════════════════════════════════════════════════════════════════

  await visitServiceArea(page, 'sugar-land-tx', 'Sugar Land TX — 18 OR + 2 Hybrid', 'Houston Methodist Sugar Land Hospital');

  await showPhaseLabel(page, '🏥 Sugar Land — 18 OR + 4 CV + 2 Hybrid (Siemens Zeego)');
  await page.waitForTimeout(800);

  const hybridCard = page.locator('text=Hybrid ORs').first();
  await hybridCard.scrollIntoViewIfNeeded();
  await expectVisible(hybridCard, 'Hybrid ORs stat card');
  await page.waitForTimeout(600);

  const orCount = page.locator('text=18').first();
  await orCount.scrollIntoViewIfNeeded();
  await expectVisible(orCount, '18 Standard ORs stat');
  await page.waitForTimeout(800);

  await scrollToTop(page);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Galveston (UTMB John Sealy — 32 OR + 360 boom)
  // ═══════════════════════════════════════════════════════════════════════════

  await visitServiceArea(page, 'galveston-tx', 'Galveston TX — UTMB John Sealy 32 OR', 'UTMB John Sealy Hospital');

  await showPhaseLabel(page, '🏥 Galveston — 32 ORs + 360-degree Boom + Cath Lab');
  await page.waitForTimeout(800);

  const boomText = page.locator('text=360').first();
  await boomText.scrollIntoViewIfNeeded();
  await expectVisible(boomText, '360 boom solution');
  await page.waitForTimeout(600);

  await scrollToTop(page);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Webster/Clear Lake
  // ═══════════════════════════════════════════════════════════════════════════

  await visitServiceArea(page, 'webster-tx', 'Webster/Clear Lake TX — 10 OR + LDRP', 'Clear Lake Regional Medical Center');

  const cSectionStat = page.locator('text=C-Section Rooms').first();
  await cSectionStat.scrollIntoViewIfNeeded();
  await expectVisible(cSectionStat, 'C-Section Rooms stat');
  await page.waitForTimeout(600);

  await scrollToTop(page);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — The Woodlands (34 LDRP wand lights)
  // ═══════════════════════════════════════════════════════════════════════════

  await visitServiceArea(page, 'the-woodlands-tx', 'The Woodlands TX — 34 LDRP Suites', 'Memorial Hermann The Woodlands');

  const wandText = page.locator('text=wand-controlled').first();
  await wandText.scrollIntoViewIfNeeded();
  await expectVisible(wandText, 'Wand-controlled lights');
  await page.waitForTimeout(800);

  await scrollToTop(page);

  // ═══════════════════════════════════════════════════════════════════════════
  // PARTS 6-9 — Remaining 4 cities
  // ═══════════════════════════════════════════════════════════════════════════

  await visitServiceArea(page, 'humble-tx', 'Humble TX — Hybrid OR Philips', 'Memorial Hermann Northeast');
  await scrollToTop(page);

  await visitServiceArea(page, 'cypress-tx', 'Cypress TX — North Cypress Medical', 'North Cypress Medical Center');
  await scrollToTop(page);

  await visitServiceArea(page, 'pearland-tx', 'Pearland TX — Memorial Hermann', 'Memorial Hermann Pearland');
  await scrollToTop(page);

  await visitServiceArea(page, 'league-city-tx', 'League City TX — UTMB Victory Lakes', 'UTMB Specialty Care Center at Victory Lakes');
  await scrollToTop(page);

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL — Service areas index
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📋 Service Areas Index — All Proven Markets');
  await page.waitForTimeout(800);

  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 1200, 300, 500);
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '✅ Cycle 41 Complete — 8 Proven Houston Suburb Markets Live');
  await page.waitForTimeout(2000);
});
