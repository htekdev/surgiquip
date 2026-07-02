/**
 * Change Proof E2E Spec — Cycle 50: Orthopedic OR Equipment Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find Orthopedic OR Equipment Guide article card
 *   → Navigate directly to article → verify title, tags, body content
 *   → Scroll through full article — verify key sections
 *   → Real installations (MH Orthopedic & Spine, Clear Lake Regional, UTMB Sealy)
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

test('change-proof-cycle50-orthopedic-or-guide', async ({ page }) => {

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
  // PART 2 — Blog Index — find Orthopedic OR article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating Orthopedic OR Guide Article Card');
  await page.waitForTimeout(800);

  const orthoLink = page.locator('a[href*="orthopedic-or-equipment-guide"]').first();
  await orthoLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(orthoLink, 'Orthopedic OR Guide article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate directly to article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening Orthopedic OR Equipment Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/orthopedic-or-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /orthopedic-or-equipment-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🦴 Orthopedic OR Guide — Article Hero');
  await page.waitForTimeout(1200);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Orthopedic OR Equipment/i, 'Article title contains "Orthopedic OR Equipment"');

  const orthoTag = page.locator('text=orthopedic OR equipment').first();
  await expectVisible(orthoTag, 'Orthopedic OR equipment tag visible');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll — verify intro and What Makes an Orthopedic OR Different
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 What Makes an Orthopedic OR Different Section');
  await page.waitForTimeout(1200);

  const orthoIntroSection = page.locator('text=What Makes an Orthopedic OR Different').first();
  await orthoIntroSection.scrollIntoViewIfNeeded();
  await expectVisible(orthoIntroSection, 'Orthopedic OR intro section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Surgical Tables section — 6700B
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🛏️ Surgical Tables — Skytron 6700B Section');
  await page.waitForTimeout(1200);

  const tablesSection = page.locator('text=Surgical Tables for Orthopedic and Spine ORs').first();
  await tablesSection.scrollIntoViewIfNeeded();
  await expectVisible(tablesSection, 'Surgical tables section heading');

  const skytron6700B = page.locator('text=Skytron 6700B — The Orthopedic Workhorse').first();
  await skytron6700B.scrollIntoViewIfNeeded();
  await expectVisible(skytron6700B, 'Skytron 6700B section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Boom systems section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '⚙️ Ceiling-Mount Boom Systems Section');
  await page.waitForTimeout(1200);

  const boomSection = page.locator('text=Ceiling-Mount Boom Systems in Orthopedic ORs').first();
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Boom Systems in Orthopedic ORs section heading');

  // MH Orthopedic & Spine reference
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '🏨 MH Orthopedic and Spine — 10 OR Installation');
  await page.waitForTimeout(1000);

  const mhOrthoRef = page.locator('text=Memorial Hermann Orthopedic').first();
  await mhOrthoRef.scrollIntoViewIfNeeded();
  await expectVisible(mhOrthoRef, 'Memorial Hermann Orthopedic reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — Aurora LED section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '💡 Aurora LED Surgical Lighting Section');
  await page.waitForTimeout(1200);

  const auroraSection = page.locator('text=Aurora LED Surgical Lighting in Orthopedic').first();
  await auroraSection.scrollIntoViewIfNeeded();
  await expectVisible(auroraSection, 'Aurora LED in Orthopedic section');

  // In-camera integration section
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '📷 In-Camera Integration Section');
  await page.waitForTimeout(1000);

  const cameraSection = page.locator('text=In-Camera Integration for Intraoperative').first();
  await cameraSection.scrollIntoViewIfNeeded();
  await expectVisible(cameraSection, 'In-Camera Integration section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 9 — Real installations section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🏥 Real TX Installations — MH Ortho 10 OR Crown');
  await page.waitForTimeout(1200);

  const installSection = page.locator('text=Texas Orthopedic OR Installations').first();
  await installSection.scrollIntoViewIfNeeded();
  await expectVisible(installSection, 'Real TX Installations section heading');

  // MH Orthopedic — 10 OR detail
  await smoothScroll(page, 400, 260, 500);
  const mhOrthoInstall = page.locator('h3').filter({ hasText: /Orthopedic.*Spine.*Houston/ }).first();
  await mhOrthoInstall.scrollIntoViewIfNeeded();
  await expectVisible(mhOrthoInstall, 'MH Orthopedic & Spine installation header');

  // Clear Lake Regional reference
  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🏨 Clear Lake Regional — Webster TX');
  await page.waitForTimeout(1000);

  const clearLakeRef = page.locator('h3').filter({ hasText: /Clear Lake/ }).first();
  await clearLakeRef.scrollIntoViewIfNeeded();
  await expectVisible(clearLakeRef, 'Clear Lake Regional installation header');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 10 — UTMB John Sealy reference
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🎓 UTMB John Sealy — 32 OR Academic Medical Center');
  await page.waitForTimeout(1000);

  const utmbRef = page.locator('h3').filter({ hasText: /UTMB.*John Sealy/ }).first();
  await utmbRef.scrollIntoViewIfNeeded();
  await expectVisible(utmbRef, 'UTMB John Sealy installation header');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 11 — Planning section and CTA
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1400, 260, 500);
  await showPhaseLabel(page, '📋 Planning an Orthopedic OR Suite Section');
  await page.waitForTimeout(1200);

  const planningSection = page.locator('text=Planning an Orthopedic OR Suite in Texas').first();
  await planningSection.scrollIntoViewIfNeeded();
  await expectVisible(planningSection, 'Planning section heading');

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '📞 Working With Surgiquip CTA');
  await page.waitForTimeout(1200);

  const ctaSection = page.locator('text=Working With Surgiquip on Your Texas Orthopedic').first();
  await ctaSection.scrollIntoViewIfNeeded();
  await expectVisible(ctaSection, 'Working with Surgiquip CTA section');

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number in CTA');

  await showPhaseLabel(page, '✅ Orthopedic OR Guide — Article Fully Verified');
  await page.waitForTimeout(1500);
});
