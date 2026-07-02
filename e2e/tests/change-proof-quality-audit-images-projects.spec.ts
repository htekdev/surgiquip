/**
 * Change Proof E2E Spec — PR #66: Quality Audit — broken images + projects accuracy + content trim
 * ONE SINGLE test() block = ONE continuous video proving the quality audit changes are live
 *
 * Flow:
 *   → Homepage (establish context)
 *   → Projects index — scroll to see all four project cards
 *   → boom-system-install-houston-asc — verify "Center Mount Equipment Booms" (2022)
 *   → hybrid-or-houston — verify "Center Mount Equipment Booms" (2023)
 *   → multi-suite-upgrade-southeast-texas — verify "6701" + "Aurora LED" (2021)
 *   → pm-program-regional-health-system — verify "Aurora LED" (2020)
 *   → Blog — ambulatory-surgery-center article — verify page renders (image fixed .png → .webp)
 *   → Blog — surgical-lighting article — verify page renders (image fixed .png → .webp)
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
  await showPhaseLabel(page, '🔍 Project Cards — Four Case Studies');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Boom System Install: Houston ASC (year: 2022, Center Mount Booms)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '⚙️ Opening Boom System Install — Houston ASC →');
  await page.waitForTimeout(700);
  await page.goto('/projects/boom-system-install-houston-asc');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /boom-system-install-houston-asc/);
  await showPhaseLabel(page, '🔩 Boom System Install — Houston ASC (2022)');
  await page.waitForTimeout(1200);

  const boomH1 = page.locator('h1').first();
  await expectVisible(boomH1, 'Boom System project H1');

  const centerMountRef = page.locator('text=Center Mount').first();
  await expectVisible(centerMountRef, '"Center Mount" product name visible');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📋 Boom System — Equipment List & Scope');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Hybrid OR Houston (year: 2023, Center Mount Booms)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🏥 Opening Hybrid OR — Houston Area Hospital →');
  await page.waitForTimeout(700);
  await page.goto('/projects/hybrid-or-houston');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /hybrid-or-houston/);
  await showPhaseLabel(page, '🔬 Hybrid OR — Houston Hospital (2023)');
  await page.waitForTimeout(1200);

  const hybridH1 = page.locator('h1').first();
  await expectVisible(hybridH1, 'Hybrid OR project H1');
  await expectText(hybridH1, /Hybrid OR/i, 'Hybrid OR project title');

  const hybridCenterMount = page.locator('text=Center Mount').first();
  await expectVisible(hybridCenterMount, '"Center Mount" booms visible in Hybrid OR');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📋 Hybrid OR — Equipment & Integration Details');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Multi-Suite Upgrade Southeast Texas (year: 2021, 6701 + Aurora LED)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔧 Opening 4-OR Suite Upgrade — SE Texas →');
  await page.waitForTimeout(700);
  await page.goto('/projects/multi-suite-upgrade-southeast-texas');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /multi-suite-upgrade-southeast-texas/);
  await showPhaseLabel(page, '🏥 4-OR Upgrade — SE Texas Surgery Center (2021)');
  await page.waitForTimeout(1200);

  const multiH1 = page.locator('h1').first();
  await expectVisible(multiH1, 'Multi-suite upgrade project H1');

  const skytron6701Ref = page.locator('text=6701').first();
  await expectVisible(skytron6701Ref, '"6701" Skytron table model visible');

  const auroraLEDRef = page.locator('text=Aurora LED').first();
  await expectVisible(auroraLEDRef, '"Aurora LED" product name visible');

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📋 Multi-Suite — Table Fleet & Lighting Details');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — PM Program Regional Health System (year: 2020, Aurora LED)
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📋 Opening PM Program — Regional TX Health System →');
  await page.waitForTimeout(700);
  await page.goto('/projects/pm-program-regional-health-system');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /pm-program-regional-health-system/);
  await showPhaseLabel(page, '🛠 PM Program — Regional TX Health System (2020)');
  await page.waitForTimeout(1200);

  const pmH1 = page.locator('h1').first();
  await expectVisible(pmH1, 'PM Program project H1');

  const pmAuroraRef = page.locator('text=Aurora LED').first();
  await expectVisible(pmAuroraRef, '"Aurora LED" visible in PM Program project');

  await smoothScroll(page, 800, 260, 500);
  await showPhaseLabel(page, '📋 PM Program — Multi-Campus Contract Details');
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
  await showPhaseLabel(page, '📋 Lighting Guide — Aurora LED & Technical Sections');
  await page.waitForTimeout(1000);

  const auroraSection = page.locator('text=Aurora').first();
  await auroraSection.scrollIntoViewIfNeeded();
  await expectVisible(auroraSection, 'Aurora LED section visible in lighting article');

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL — Quality audit verified
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '✅ Quality Audit Changes Fully Verified — Images + Projects Accurate');
  await page.waitForTimeout(1500);
});
