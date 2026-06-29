/**
 * Change Proof E2E Spec — Epic G: Real Project Installations
 * ONE SINGLE test() block = ONE continuous video proving the real content is live
 *
 * Flow:
 *   → Homepage (quick load verify only — NO scrolling)
 *   → Navigate to Projects via nav link
 *   → Scroll through index — verify real project cards are present
 *   → Click TMC Sarofim (crown jewel, featured)
 *   → Scroll through Sarofim detail — verify content
 *   → Back to Projects index
 *   → Click Houston Methodist Sugar Land (flagship, featured)
 *   → Scroll through Methodist detail — verify content
 *   → Back to Projects index
 *   → Click UTMB John Sealy (Galveston flagship)
 *   → Scroll through UTMB detail
 *   → Back to Projects index — verify Women's Hospital card
 *   → Final index scroll showing full 22-project portfolio
 *
 * Proof keyword: change-proof
 * Pacing: 500ms scroll step, 1200ms between major actions (slow for video clarity)
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

test('change-proof-real-projects', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage (minimal — just verify loaded, then move on)
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage loaded');
  await page.waitForTimeout(1500);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Navigate to Projects via nav
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔗 Navigating → Projects');
  await page.waitForTimeout(800);

  // Click Projects in nav
  const projectsNavLink = page.locator('nav a[href="/projects"]').first();
  await expectVisible(projectsNavLink, 'Projects nav link');
  await page.waitForTimeout(600);
  await projectsNavLink.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Projects Index — verify real content is loaded
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📋 Projects Index — 22 Real Installations');
  await page.waitForTimeout(1000);

  await expectURL(page, /\/projects$/, 'Projects index URL');

  const projectsH1 = page.locator('h1').first();
  await expectVisible(projectsH1, 'Projects index H1');
  await page.waitForTimeout(800);

  // Verify JSON-LD schema
  await expectJsonLd(page, 'Projects Index Schema');
  await page.waitForTimeout(800);

  // Scroll slowly through the index to show all project cards
  await showPhaseLabel(page, '📋 Scrolling Projects Index — All 22 Real Projects');
  await page.waitForTimeout(800);
  await smoothScroll(page, 1500, 300, 500);
  await page.waitForTimeout(1200);

  // Verify key real project cards are visible
  const sarofimCard = page.locator('text=Memorial Hermann TMC Sarofim Pavilion').first();
  await sarofimCard.scrollIntoViewIfNeeded();
  await expectVisible(sarofimCard, 'TMC Sarofim card — REAL content');
  await page.waitForTimeout(800);

  const methodistCard = page.locator('text=Houston Methodist Sugar Land Hospital').first();
  await methodistCard.scrollIntoViewIfNeeded();
  await expectVisible(methodistCard, 'Methodist Sugar Land card — REAL content');
  await page.waitForTimeout(800);

  // Verify a non-Houston card (Galveston)
  const utmbCard = page.locator('text=UTMB John Sealy Hospital').first();
  await utmbCard.scrollIntoViewIfNeeded();
  await expectVisible(utmbCard, 'UTMB John Sealy card — Galveston market');
  await page.waitForTimeout(800);

  // Verify Woman's Hospital card
  const womansCard = page.locator('text=Woman').first();
  await womansCard.scrollIntoViewIfNeeded();
  await expectVisible(womansCard, "Woman's Hospital card");
  await page.waitForTimeout(800);

  await scrollToTop(page);
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Click TMC Sarofim (crown jewel) → detail page
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏆 Opening TMC Sarofim — Crown Jewel Project');
  await page.waitForTimeout(800);

  const sarofimLink = page.locator('a[href*="memorial-hermann-tmc-sarofim"]').first();
  await sarofimLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await sarofimLink.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // Sarofim detail page
  await showPhaseLabel(page, '🏥 TMC Sarofim Pavilion — 36 ORs + 3 Hybrid');
  await page.waitForTimeout(1000);

  await expectURL(page, /\/projects\/memorial-hermann-tmc-sarofim/, 'Sarofim detail URL');

  const sarofimH1 = page.locator('h1').first();
  await expectVisible(sarofimH1, 'Sarofim H1');
  await expectText(sarofimH1, 'Sarofim', 'Sarofim title text');
  await page.waitForTimeout(800);

  // Verify JSON-LD on detail page
  await expectJsonLd(page, 'Sarofim Article Schema');
  await page.waitForTimeout(800);

  // Scroll through detail page slowly
  await showPhaseLabel(page, '📜 Scrolling TMC Sarofim Detail Page');
  await page.waitForTimeout(800);
  await smoothScroll(page, 2400, 300, 500);
  await page.waitForTimeout(1200);

  // Verify equipment sidebar
  const auroraEquipment = page.locator('text=Aurora LED Surgical Lights').first();
  await auroraEquipment.scrollIntoViewIfNeeded();
  await expectVisible(auroraEquipment, 'Aurora LED equipment listed');
  await page.waitForTimeout(800);

  // Verify key scale fact
  const orCount = page.locator('text=36').first();
  await orCount.scrollIntoViewIfNeeded();
  await expectVisible(orCount, '36 ORs referenced');
  await page.waitForTimeout(800);

  await smoothScroll(page, 1200, 300, 500);
  await page.waitForTimeout(1200);

  // Navigate back to projects
  await showPhaseLabel(page, '← Back to Projects Index');
  await page.waitForTimeout(800);
  const backLink = page.locator('a[href="/projects"]').first();
  await backLink.scrollIntoViewIfNeeded();
  await backLink.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Click Houston Methodist Sugar Land
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Opening Methodist Sugar Land — Full Hospital Build');
  await page.waitForTimeout(800);

  const methodistLink = page.locator('a[href*="houston-methodist-sugar-land"]').first();
  await methodistLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await methodistLink.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // Methodist detail page
  await showPhaseLabel(page, '🏥 Methodist Sugar Land — 18 OR + 2 Hybrid + Siemens Zeego');
  await page.waitForTimeout(1000);

  await expectURL(page, /\/projects\/houston-methodist-sugar-land/, 'Methodist detail URL');

  const methodistH1 = page.locator('h1').first();
  await expectVisible(methodistH1, 'Methodist H1');
  await expectText(methodistH1, 'Methodist', 'Methodist title text');
  await page.waitForTimeout(800);

  // Scroll through Methodist detail
  await showPhaseLabel(page, '📜 Scrolling Methodist Sugar Land Detail');
  await page.waitForTimeout(800);
  await smoothScroll(page, 2400, 300, 500);
  await page.waitForTimeout(1200);

  // Verify hybrid OR content
  const hybridText = page.locator('text=Hybrid Operating Room').first();
  await hybridText.scrollIntoViewIfNeeded();
  await expectVisible(hybridText, 'Hybrid OR section visible');
  await page.waitForTimeout(800);

  await smoothScroll(page, 1200, 300, 500);
  await page.waitForTimeout(1200);

  // Back to projects
  await showPhaseLabel(page, '← Back to Projects Index');
  await page.waitForTimeout(800);
  const backLink2 = page.locator('a[href="/projects"]').first();
  await backLink2.scrollIntoViewIfNeeded();
  await backLink2.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Click UTMB John Sealy (Galveston)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Opening UTMB John Sealy — Galveston Campus');
  await page.waitForTimeout(800);

  const utmbLink = page.locator('a[href*="utmb-john-sealy"]').first();
  await utmbLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await utmbLink.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🏥 UTMB John Sealy — 32 ORs + 360° Boom Solution');
  await page.waitForTimeout(1000);

  await expectURL(page, /\/projects\/utmb-john-sealy/, 'UTMB detail URL');

  const utmbH1 = page.locator('h1').first();
  await expectVisible(utmbH1, 'UTMB H1');
  await page.waitForTimeout(800);

  // Scroll through UTMB detail
  await smoothScroll(page, 2400, 300, 500);
  await page.waitForTimeout(1200);

  // Verify 360° boom detail
  const boomText = page.locator('text=360°').first();
  await boomText.scrollIntoViewIfNeeded();
  await expectVisible(boomText, '360° boom solution referenced');
  await page.waitForTimeout(800);

  await smoothScroll(page, 1200, 300, 500);
  await page.waitForTimeout(1200);

  // Back to projects
  await showPhaseLabel(page, '← Back to Projects Index — Final View');
  await page.waitForTimeout(800);
  const backLink3 = page.locator('a[href="/projects"]').first();
  await backLink3.scrollIntoViewIfNeeded();
  await backLink3.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Final index scroll — show complete 22-project portfolio
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📋 Full Portfolio — 22 Real Installations from surgiquip2.com');
  await page.waitForTimeout(1200);

  // Scroll from top through entire index
  await scrollToTop(page);
  await page.waitForTimeout(800);
  await smoothScroll(page, 4000, 300, 500);
  await page.waitForTimeout(1200);

  // Verify HVI card (Hybrid OR)
  const hviCard = page.locator('text=Heart & Vascular').first();
  await hviCard.scrollIntoViewIfNeeded();
  await expectVisible(hviCard, 'Memorial Hermann HVI card visible');
  await page.waitForTimeout(800);

  // Verify CHRISTUS card
  const christusCard = page.locator('text=CHRISTUS').first();
  await christusCard.scrollIntoViewIfNeeded();
  await expectVisible(christusCard, 'CHRISTUS St. Catherine card visible');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '✅ Epic G Complete — 22 Real Projects Live on /projects');
  await page.waitForTimeout(2000);
});
