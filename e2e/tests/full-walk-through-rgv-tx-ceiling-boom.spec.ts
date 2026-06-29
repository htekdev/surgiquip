/**
 * Full-Walk-Through E2E Spec — Cycle 31: Rio Grande Valley TX + Ceiling Boom Systems Guide
 * ONE SINGLE test() block = ONE continuous video for Hector to review
 *
 * Proof keyword: full-walk-through
 */

import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
  expectJsonLd,
} from './visual-assert';

test.setTimeout(360000);

async function smoothScroll(page: Page, totalPx = 2000, stepPx = 280, delayMs = 380) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('full-walk-through — Rio Grande Valley TX service area + Ceiling Boom Systems Guide blog', async ({ page }) => {

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);
  await smoothScroll(page, 600, 280, 420);

  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🗺️ Service Areas — Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 420);
  await showPhaseLabel(page, '📍 Spotting Rio Grande Valley TX — New!');

  const rgvCard = page.locator('a[href="/service-areas/rio-grande-valley-tx"]').first();
  await rgvCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(rgvCard, 'RGV TX card');
  await expectText(rgvCard, 'Rio Grande Valley', 'RGV on card');

  await showPhaseLabel(page, '🔗 Clicking → Rio Grande Valley TX');
  await rgvCard.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🌊 Rio Grande Valley TX — New Service Area Page');
  await page.waitForTimeout(1000);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'RGV TX H1');
  await expectText(h1, 'Rio Grande Valley', 'RGV in heading');
  await expectURL(page, /\/service-areas\/rio-grande-valley-tx/);

  await showPhaseLabel(page, '🏥 RGV Markets — DHR Health, Valley Baptist');
  await smoothScroll(page, 700, 260, 400);

  const dhr = page.locator('text=DHR').or(page.locator('text=Valley Baptist')).first();
  await expectVisible(dhr, 'DHR Health / Valley Baptist');

  await smoothScroll(page, 700, 260, 400);
  await smoothScroll(page, 700, 260, 400);

  const trustBlock = page.locator('h2').filter({ hasText: /Why Surgiquip|43 Year|Houston/i }).first();
  await expectVisible(trustBlock, 'Why Surgiquip trust block');
  await showPhaseLabel(page, '⭐ Why Surgiquip — Houston-Based, 43 Years');
  await smoothScroll(page, 600, 260, 400);

  await expectJsonLd(page, 'RGV TX LocalBusiness + BreadcrumbList JSON-LD');
  await page.waitForTimeout(800);

  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📰 Blog Index — Ceiling Boom Systems Article');
  await smoothScroll(page, 400, 260, 380);

  const boomLink = page.locator('a[href*="ceiling-boom"]').first();
  await boomLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(boomLink, 'Ceiling Boom Systems Guide link');

  await showPhaseLabel(page, '🔗 Clicking → Ceiling Boom Systems Guide');
  await boomLink.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📖 Ceiling Boom Systems Guide — New Blog Article');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectURL(page, /\/blog\/ceiling-boom/);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  await showPhaseLabel(page, '📄 Scrolling Ceiling Boom Systems Guide...');
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);

  await expectJsonLd(page, 'Ceiling Boom Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(600);

  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🗺️ Service Areas Index — Confirming RGV TX');
  await page.waitForTimeout(1000);

  const indexH1Final = page.locator('h1').first();
  await expectVisible(indexH1Final, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 420);

  const rgvFinal = page.locator('a[href="/service-areas/rio-grande-valley-tx"]').first();
  await rgvFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(rgvFinal, 'RGV TX card in listing');
  await expectText(rgvFinal, 'Rio Grande Valley', 'RGV confirmed');

  await showPhaseLabel(page, '✅ Rio Grande Valley TX Live — Cycle 31 Complete!');
  await page.waitForTimeout(1500);
  await expectJsonLd(page, 'Service Areas Index JSON-LD');
});

  await boomLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(boomLink).toBeVisible();
  await boomLink.click();
  await page.waitForTimeout(1200);

  // 12. Verify blog article hero
  await expect(page.locator('h1').first()).toBeVisible();

  // 13. Scroll through the full blog article
  for (let i = 0; i < 14; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 14. Verify ceiling boom article content
  await expect(page.locator('text=boom').or(page.locator('text=Skytron'))).toBeVisible();

  // 16. Navigate back to Blog index
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // 17. Navigate back to Service Areas to verify RGV in listing
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // 18. Find and scroll to RGV card to verify it's in the listing
  const rgvFinalCard = page.locator('a[href="/service-areas/rio-grande-valley-tx"]').first();
  await rgvFinalCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(rgvFinalCard).toBeVisible();
  await expect(page.locator('text=Rio Grande Valley').first()).toBeVisible();
});
