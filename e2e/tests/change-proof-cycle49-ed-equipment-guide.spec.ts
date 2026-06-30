/**
 * Change Proof E2E Spec — Cycle 49: Emergency Department Equipment Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find ED Equipment Guide article card
 *   → Click article → verify title, tags, body content
 *   → Scroll through full article — verify key sections
 *   → Real installations (Sarofim, St. Luke's, MH Pearland, Methodist Sugar Land)
 *   → Bottom CTA section
 *
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

test('change-proof-cycle49-ed-equipment-guide', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Blog Index
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📝 Opening Blog Index →');
  await page.waitForTimeout(700);
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Blog Index — find ED article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating ED Equipment Guide Article Card');
  await page.waitForTimeout(800);

  const edLink = page.locator('a[href*="emergency-department"]').first();
  await edLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(edLink, 'ED Equipment Guide article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate directly to article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening ED Equipment Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/emergency-department-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /emergency-department-equipment-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 ED Equipment Guide — Article Hero');
  await page.waitForTimeout(1200);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Emergency Department/i, 'Article title contains "Emergency Department"');

  const traumaTag = page.locator('text=trauma bay equipment').first();
  await expectVisible(traumaTag, 'Trauma bay tag visible');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll — verify intro and ED vs OR section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 ED Is Not a Scaled-Down OR Section');
  await page.waitForTimeout(1200);

  const edNotOrSection = page.locator('text=ED Is Not a Scaled-Down OR').first();
  await edNotOrSection.scrollIntoViewIfNeeded();
  await expectVisible(edNotOrSection, 'ED vs OR section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Boom systems section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '⚙️ Ceiling-Mount Boom Systems Section');
  await page.waitForTimeout(1200);

  const boomSection = page.locator('text=Ceiling-Mount Boom Systems in Emergency').first();
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Boom Systems in ED section heading');

  // Methodist Sugar Land trauma reference
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '🏨 Houston Methodist Sugar Land — Trauma Reference');
  await page.waitForTimeout(1000);

  const methodistRef = page.locator('text=Houston Methodist Sugar Land Hospital').first();
  await methodistRef.scrollIntoViewIfNeeded();
  await expectVisible(methodistRef, 'Houston Methodist Sugar Land reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Aurora LED section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '💡 Aurora LED Lighting in ED Environments');
  await page.waitForTimeout(1200);

  const auroraSection = page.locator('text=Aurora LED Lighting in Emergency Department').first();
  await auroraSection.scrollIntoViewIfNeeded();
  await expectVisible(auroraSection, 'Aurora LED in ED section');

  // St. Luke's Vintage reference
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '🏥 St. Lukes at the Vintage — ER/Trauma Install');
  await page.waitForTimeout(1000);

  const stLukesRef = page.locator('h3').filter({ hasText: /Vintage/ }).first();
  await stLukesRef.scrollIntoViewIfNeeded();
  await expectVisible(stLukesRef, 'St. Lukes Vintage section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — MH Pearland reference
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🏨 Memorial Hermann Pearland — 3 ER Rooms');
  await page.waitForTimeout(1000);

  const pearlandRef = page.locator('text=Memorial Hermann Pearland').first();
  await pearlandRef.scrollIntoViewIfNeeded();
  await expectVisible(pearlandRef, 'Memorial Hermann Pearland reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 9 — TMC Sarofim crown jewel section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '👑 TMC Sarofim — 57 ED/Trauma Rooms Crown Jewel');
  await page.waitForTimeout(1200);

  const sarofimSection = page.locator('text=Memorial Hermann Texas Medical Center Sarofim').first();
  await sarofimSection.scrollIntoViewIfNeeded();
  await expectVisible(sarofimSection, 'Sarofim Pavilion section heading');

  // Verify trauma bay count is mentioned
  await smoothScroll(page, 400, 260, 500);
  const traumaBayCount = page.locator('text=9 Trauma bays').first();
  await traumaBayCount.scrollIntoViewIfNeeded();
  await expectVisible(traumaBayCount, 'Sarofim 9 Trauma bays count');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 10 — Planning and CTA section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1400, 260, 500);
  await showPhaseLabel(page, '📞 Planning + Working With Surgiquip CTA');
  await page.waitForTimeout(1200);

  const workingWithSection = page.locator('text=Working With Surgiquip on Your Texas ED Project').first();
  await workingWithSection.scrollIntoViewIfNeeded();
  await expectVisible(workingWithSection, 'Working with Surgiquip CTA section');

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number in CTA');

  await showPhaseLabel(page, '✅ ED Equipment Guide — Article Fully Verified');
  await page.waitForTimeout(1500);
});
