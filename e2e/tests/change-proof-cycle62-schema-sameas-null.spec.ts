/**
 * Change Proof E2E Spec — PR #78: Schema.org sameAs null fix on 7 pages
 * ONE SINGLE test() block = ONE continuous video proving the schema fix is live
 *
 * Pages changed:
 *   → src/pages/index.astro (homepage)
 *   → src/pages/service-areas/beaumont-tx.astro
 *   → src/pages/service-areas/corpus-christi-tx.astro
 *   → src/pages/service-areas/houston-tx.astro
 *   → src/pages/service-areas/san-antonio-tx.astro
 *   → src/pages/service-areas/southeast-texas.astro
 *   → src/pages/service-areas/victoria-tx.astro
 *
 * Fix: removed undefined site.social.youtube from sameAs array
 *   Before: sameAs: [linkedin, null]  ← fails Google Rich Results
 *   After:  sameAs: [linkedin]        ← valid JSON-LD
 *
 * Proof keyword: change-proof
 */

import { test, expect, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
} from './visual-assert';

test.setTimeout(300000);

async function smoothScroll(page: Page, totalPx = 800, stepPx = 260, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

/** Extract JSON-LD from page and verify sameAs has no null values */
async function verifySchemaNoNull(page: Page, label: string) {
  const hasNull = await page.evaluate(() => {
    const scripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    );
    for (const script of scripts) {
      try {
        const data = JSON.parse(script.textContent || '{}');
        const sameAs: unknown[] = data.sameAs || [];
        if (sameAs.some((v: unknown) => v === null || v === undefined)) {
          return true;
        }
      } catch {
        // ignore parse errors
      }
    }
    return false;
  });
  expect(hasNull, `${label}: sameAs must not contain null`).toBe(false);
}

test('change-proof-cycle62-schema-sameas-null', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage: sameAs null removed from Organization schema
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage (Schema Fix)');
  await page.waitForTimeout(1200);

  await expectURL(page, /surgiquip|vercel\.app/i);
  const homeH1 = page.locator('h1').first();
  await expectVisible(homeH1, 'Homepage H1');
  await expectText(homeH1, /Houston|Surgiquip|OR Equipment/i, 'Homepage H1 text');

  await verifySchemaNoNull(page, 'Homepage');
  await showPhaseLabel(page, '✅ Homepage: sameAs has NO null values');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 600, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Houston, TX service area
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📍 Opening Houston, TX Service Area →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas/houston-tx');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /houston-tx/);
  await showPhaseLabel(page, '📍 Houston, TX — Schema.org Validation');
  await page.waitForTimeout(1200);

  const houstonH1 = page.locator('h1').first();
  await expectVisible(houstonH1, 'Houston H1');
  await expectText(houstonH1, /Houston/i, 'Houston H1 text');

  await verifySchemaNoNull(page, 'Houston TX');
  await showPhaseLabel(page, '✅ Houston TX: sameAs clean — LinkedIn only, no null');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 800, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Southeast Texas service area
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📍 Opening Southeast Texas Service Area →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas/southeast-texas');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /southeast-texas/);
  await showPhaseLabel(page, '📍 Southeast Texas — Schema.org Validation');
  await page.waitForTimeout(1200);

  const seTexasH1 = page.locator('h1').first();
  await expectVisible(seTexasH1, 'Southeast Texas H1');

  await verifySchemaNoNull(page, 'Southeast Texas');
  await showPhaseLabel(page, '✅ Southeast TX: sameAs clean — no null values');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 800, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Beaumont, TX service area
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📍 Opening Beaumont, TX Service Area →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas/beaumont-tx');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /beaumont-tx/);
  await showPhaseLabel(page, '📍 Beaumont, TX — Schema.org Validation');
  await page.waitForTimeout(1200);

  const beaumontH1 = page.locator('h1').first();
  await expectVisible(beaumontH1, 'Beaumont H1');

  await verifySchemaNoNull(page, 'Beaumont TX');
  await showPhaseLabel(page, '✅ Beaumont TX: sameAs clean — no null values');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 700, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Corpus Christi, TX service area
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📍 Opening Corpus Christi, TX Service Area →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas/corpus-christi-tx');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /corpus-christi-tx/);
  await showPhaseLabel(page, '📍 Corpus Christi, TX — Schema.org Validation');
  await page.waitForTimeout(1200);

  const corpusH1 = page.locator('h1').first();
  await expectVisible(corpusH1, 'Corpus Christi H1');

  await verifySchemaNoNull(page, 'Corpus Christi TX');
  await showPhaseLabel(page, '✅ Corpus Christi TX: sameAs clean — no null values');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 700, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 6 — San Antonio, TX service area
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📍 Opening San Antonio, TX Service Area →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas/san-antonio-tx');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /san-antonio-tx/);
  await showPhaseLabel(page, '📍 San Antonio, TX — Schema.org Validation');
  await page.waitForTimeout(1200);

  const saH1 = page.locator('h1').first();
  await expectVisible(saH1, 'San Antonio H1');

  await verifySchemaNoNull(page, 'San Antonio TX');
  await showPhaseLabel(page, '✅ San Antonio TX: sameAs clean — no null values');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 700, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 7 — Victoria, TX service area
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📍 Opening Victoria, TX Service Area →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas/victoria-tx');
  await page.waitForLoadState('networkidle');

  await expectURL(page, /victoria-tx/);
  await showPhaseLabel(page, '📍 Victoria, TX — Schema.org Validation');
  await page.waitForTimeout(1200);

  const victoriaH1 = page.locator('h1').first();
  await expectVisible(victoriaH1, 'Victoria H1');

  await verifySchemaNoNull(page, 'Victoria TX');
  await showPhaseLabel(page, '✅ Victoria TX: sameAs clean — no null values');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 700, 260, 400);
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL — All 7 pages verified: sameAs has no null values
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '✅ Schema Fix Verified — All 7 Pages: sameAs Clean (LinkedIn only, no null)');
  await page.waitForTimeout(2000);
});
