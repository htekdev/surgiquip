/**
 * Change Proof E2E Spec — Cycle 51: GI & Endoscopy Suite Equipment Guide blog article
 * ONE SINGLE test() block = ONE continuous video proving the article is live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Blog index — scroll to find endoscopy article card
 *   → Navigate directly to article — verify title, tags, body content
 *   → Scroll through key sections:
 *       - Endo Suite vs OR section
 *       - Boom Systems for GI
 *       - Scope Reprocessing
 *       - MH Sugar Land crown jewel
 *       - MH Southeast Cysto
 *       - Texas ASC reprocessing installs
 *       - CTA / phone number
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

test('change-proof-cycle51-endoscopy-gi-suite-guide', async ({ page }) => {

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
  // PART 2 — Blog Index — find endoscopy article card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Blog Index — Surgiquip Resources');
  await page.waitForTimeout(1000);

  const blogH1 = page.locator('h1').first();
  await expectVisible(blogH1, 'Blog index H1');

  await smoothScroll(page, 800, 260, 450);
  await showPhaseLabel(page, '🔍 Locating GI Endoscopy Equipment Guide Card');
  await page.waitForTimeout(800);

  const endoLink = page.locator('a[href*="endoscopy-gi-suite"]').first();
  await endoLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expectVisible(endoLink, 'Endoscopy GI Suite article card link');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Navigate directly to article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📖 Opening GI & Endoscopy Suite Guide →');
  await page.waitForTimeout(700);
  await page.goto('/blog/endoscopy-gi-suite-equipment-guide-texas-hospitals');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /endoscopy-gi-suite-equipment-guide/);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Article hero — verify title and tags
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 GI Endoscopy Guide — Article Hero');
  await page.waitForTimeout(1200);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /Endoscopy/i, 'Article title contains "Endoscopy"');

  const endoTag = page.locator('text=endoscopy suite equipment').first();
  await expectVisible(endoTag, 'Endoscopy suite equipment tag visible');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Scroll — verify Endo Suite vs OR section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 Endoscopy Suite Is Not a Simplified OR Section');
  await page.waitForTimeout(1200);

  const endoNotOrSection = page.locator('text=Endoscopy Suite Is Not a Simplified OR').first();
  await endoNotOrSection.scrollIntoViewIfNeeded();
  await expectVisible(endoNotOrSection, 'Endo Suite vs OR section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — Boom Systems section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '⚙️ Ceiling-Mount Boom Systems for Endoscopy');
  await page.waitForTimeout(1200);

  const boomSection = page.locator('text=Ceiling-Mount Boom Systems for Endoscopy').first();
  await boomSection.scrollIntoViewIfNeeded();
  await expectVisible(boomSection, 'Boom Systems for GI/Endoscopy section heading');

  // Monitor arm positioning subsection
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '🖥️ Monitor Arm Positioning — Critical Design Variable');
  await page.waitForTimeout(1000);

  const monitorArmSection = page.locator('text=Monitor Arm Positioning Is the Critical Design Variable').first();
  await monitorArmSection.scrollIntoViewIfNeeded();
  await expectVisible(monitorArmSection, 'Monitor arm positioning section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Scope Reprocessing section
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '🔬 Scope Reprocessing Infrastructure Challenge');
  await page.waitForTimeout(1200);

  const reprocessingSection = page.locator('text=Scope Reprocessing: The Hidden Infrastructure Challenge').first();
  await reprocessingSection.scrollIntoViewIfNeeded();
  await expectVisible(reprocessingSection, 'Scope Reprocessing section heading');

  // AER reference
  await smoothScroll(page, 600, 260, 500);
  await showPhaseLabel(page, '⚗️ AER — Automated Endoscope Reprocessors');
  await page.waitForTimeout(1000);

  const aerSection = page.locator('text=Automated Endoscope Reprocessors').first();
  await aerSection.scrollIntoViewIfNeeded();
  await expectVisible(aerSection, 'AER section heading');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 8 — Crown Jewel: MH Sugar Land
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1200, 260, 500);
  await showPhaseLabel(page, '👑 Memorial Hermann Sugar Land — 8 OR + 1 Endo Suite');
  await page.waitForTimeout(1200);

  const sugarLandSection = page.locator('h3').filter({ hasText: /Sugar Land/ }).first();
  await sugarLandSection.scrollIntoViewIfNeeded();
  await expectVisible(sugarLandSection, 'MH Sugar Land section heading');

  // SkyVision reference
  await smoothScroll(page, 500, 260, 500);
  await showPhaseLabel(page, '📺 SkyVision Integration at Sugar Land Endo Suite');
  await page.waitForTimeout(1000);

  const skyVisionRef = page.locator('text=SkyVision').first();
  await skyVisionRef.scrollIntoViewIfNeeded();
  await expectVisible(skyVisionRef, 'SkyVision integration reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 9 — MH Southeast Cysto Room
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '🏥 Memorial Hermann Southeast — Cystoscopy Suite');
  await page.waitForTimeout(1000);

  const cystoSection = page.locator('text=Cystoscopy Suite').first();
  await cystoSection.scrollIntoViewIfNeeded();
  await expectVisible(cystoSection, 'Cystoscopy Suite section');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 10 — Texas ASC reprocessing installs
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1000, 260, 500);
  await showPhaseLabel(page, '🏢 Texas ASC Scope Reprocessing Installs');
  await page.waitForTimeout(1000);

  const brazoriaRef = page.locator('text=Brazoria Surgery Center').first();
  await brazoriaRef.scrollIntoViewIfNeeded();
  await expectVisible(brazoriaRef, 'Brazoria Surgery Center reference');

  await smoothScroll(page, 400, 260, 500);
  const christusRef = page.locator('text=CHRISTUS St. Catherine Surgery Center').first();
  await christusRef.scrollIntoViewIfNeeded();
  await expectVisible(christusRef, 'CHRISTUS St. Catherine reference');

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 11 — CTA + Phone
  // ═══════════════════════════════════════════════════════════════════════════

  await smoothScroll(page, 1400, 260, 500);
  await showPhaseLabel(page, '📞 Working With Surgiquip CTA Section');
  await page.waitForTimeout(1200);

  const ctaSection = page.locator('text=Working With Surgiquip on Your Texas GI Suite Project').first();
  await ctaSection.scrollIntoViewIfNeeded();
  await expectVisible(ctaSection, 'Working With Surgiquip CTA section heading');

  const phoneRef = page.locator('text=(713) 681-6362').first();
  await phoneRef.scrollIntoViewIfNeeded();
  await expectVisible(phoneRef, 'Phone number in CTA');

  await showPhaseLabel(page, '✅ GI & Endoscopy Suite Guide — Fully Verified');
  await page.waitForTimeout(1500);
});
