/**
 * Change Proof E2E Spec — Quality Audit + Epic G Real Projects
 * ONE SINGLE test() block = ONE continuous video proving real project content is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Projects index — scroll to see project cards
 *   → memorial-hermann-hvi — verify "Center Mount Equipment Booms" + "6700B"
 *   → memorial-hermann-tmc-sarofim — verify "Center Mount Equipment Booms" + "Aurora LED"
 *   → memorial-hermann-northeast — verify "6701" + "Aurora LED" (Humble TX)
 *   → utmb-john-sealy-hospital — verify "360°" + "Center Mount Equipment Booms" (Galveston)
 *   → Blog — ambulatory-surgery-center article — verify page renders
 *   → Blog — surgical-lighting article — verify page renders
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

test('change-proof-quality-audit-images-projects', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage (establish context)
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  const homeH1 = page.locator('h1').first();
  await expectVisible(homeH1, 'Homepage H1');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Projects Index
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📂 Opening Projects Index →');
  await page.waitForTimeout(700);
  await page.goto('/projects');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /\/projects/);
  await showPhaseLabel(page, '📁 Projects — All Case Studies');
  await page.waitForTimeout(1200);

  const projectsH1 = page.locator('h1').first();
  await expectVisible(projectsH1, 'Projects index H1');

  await smoothScroll(page, 600, 260, 450);
  await showPhaseLabel(page, '🔍 Project Cards — Real Portfolio');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Memorial Hermann HVI (Center Mount + 6700B + Aurora LED)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '❤️ Opening Memorial Hermann HVI — Cardiac Hybrid OR →');
  await page.waitForTimeout(700);
  await page.goto('/projects/memorial-hermann-hvi');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /memorial-hermann-hvi/);
  await showPhaseLabel(page, '🔬 HVI — 4 CV ORs + Hybrid OR (Siemens Integration)');
  await page.waitForTimeout(1200);

  const hviH1 = page.locator('h1').first();
  await expectVisible(hviH1, 'HVI project H1');

  const hviCenterMount = page.locator('text=Center Mount').first();
  await expectVisible(hviCenterMount, '"Center Mount" booms visible in HVI');

  const hvi6700B = page.locator('text=6700B').first();
  await expectVisible(hvi6700B, '"6700B" Skytron table model visible');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📋 HVI — Cardiac OR Equipment & Integration');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — TMC Sarofim (Center Mount + Aurora LED + 36 ORs)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏆 Opening TMC Sarofim — Crown Jewel (36 ORs) →');
  await page.waitForTimeout(700);
  await page.goto('/projects/memorial-hermann-tmc-sarofim');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /memorial-hermann-tmc-sarofim/);
  await showPhaseLabel(page, '🏥 TMC Sarofim Pavilion — 36 ORs + 3 Hybrid Suites');
  await page.waitForTimeout(1200);

  const sarofimH1 = page.locator('h1').first();
  await expectVisible(sarofimH1, 'Sarofim project H1');
  await expectText(sarofimH1, 'Sarofim', 'Sarofim title text');

  const sarofimCenterMount = page.locator('text=Center Mount').first();
  await expectVisible(sarofimCenterMount, '"Center Mount" booms visible in Sarofim');

  const sarofimAurora = page.locator('text=Aurora LED').first();
  await expectVisible(sarofimAurora, '"Aurora LED" lights visible in Sarofim');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📋 Sarofim — Full Campus Equipment & Scale');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Memorial Hermann Northeast (6701 + Aurora LED + Center Mount)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Opening MH Northeast — Humble TX Hybrid OR →');
  await page.waitForTimeout(700);
  await page.goto('/projects/memorial-hermann-northeast');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /memorial-hermann-northeast/);
  await showPhaseLabel(page, '🏥 MH Northeast — 6701 Tables + Aurora LED (Humble TX)');
  await page.waitForTimeout(1200);

  const northeastH1 = page.locator('h1').first();
  await expectVisible(northeastH1, 'Northeast project H1');

  const northeast6701 = page.locator('text=6701').first();
  await expectVisible(northeast6701, '"6701" Skytron table model visible');

  const northeastAurora = page.locator('text=Aurora LED').first();
  await expectVisible(northeastAurora, '"Aurora LED" product name visible');

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 Northeast — Table Fleet & Hybrid OR Details');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — UTMB John Sealy (360° Center Mount + Stellar Lights)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Opening UTMB John Sealy — 360° Boom Solution →');
  await page.waitForTimeout(700);
  await page.goto('/projects/utmb-john-sealy-hospital');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /utmb-john-sealy-hospital/);
  await showPhaseLabel(page, '🏥 UTMB John Sealy — 32 ORs + 360° Center Mount (Galveston)');
  await page.waitForTimeout(1200);

  const utmbH1 = page.locator('h1').first();
  await expectVisible(utmbH1, 'UTMB project H1');

  const utmb360 = page.locator('text=360°').first();
  await expectVisible(utmb360, '"360°" boom configuration visible');

  const utmbCenterMount = page.locator('text=Center Mount').first();
  await expectVisible(utmbCenterMount, '"Center Mount" booms visible in UTMB');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📋 UTMB — 32 ORs + LDRP Suite + Cath Lab');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Blog: Ambulatory Surgery Center Equipment Guide (image fixed)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📝 Opening Blog — Ambulatory Surgery Center Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/ambulatory-surgery-center-equipment-guide-texas');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /ambulatory-surgery-center-equipment-guide/);
  await showPhaseLabel(page, '🏥 Blog — Ambulatory Surgery Center Equipment Guide');
  await page.waitForTimeout(1200);

  const ascH1 = page.locator('h1').first();
  await expectVisible(ascH1, 'ASC blog article H1');
  await expectText(ascH1, /Ambulatory/i, 'ASC article title');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📋 ASC Article — Content & Equipment Sections');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — Blog: Surgical Lighting Guide (image fixed)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '💡 Opening Blog — Surgical Lighting Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/surgical-lighting-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /surgical-lighting-guide/);
  await showPhaseLabel(page, '💡 Blog — Surgical Lighting Guide (image .webp restored)');
  await page.waitForTimeout(1200);

  const lightingH1 = page.locator('h1').first();
  await expectVisible(lightingH1, 'Surgical lighting blog article H1');
  await expectText(lightingH1, /Surgical Lighting|Aurora/i, 'Surgical lighting article title');

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '📋 Lighting Guide — Skytron LED Systems Section');
  await page.waitForTimeout(1000);

  const skytronLightingSection = page.locator('text=Skytron Surgical Lighting').first();
  await skytronLightingSection.scrollIntoViewIfNeeded();
  await expectVisible(skytronLightingSection, 'Skytron Surgical Lighting section visible in lighting article');

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL — Quality audit verified
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '✅ Real Projects + Real Equipment Names Fully Verified');
  await page.waitForTimeout(1500);
});
