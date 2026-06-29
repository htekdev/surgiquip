/**
 * Full-Walk-Through E2E Spec — Cycle 34: El Paso TX + OR Suite Renovation Planning Guide
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

test('full-walk-through — El Paso TX service area + OR Suite Renovation Planning Guide blog', async ({ page }) => {

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
  await showPhaseLabel(page, '📍 Spotting El Paso TX — New!');

  const elPasoCard = page.locator('a[href="/service-areas/el-paso-tx"]').first();
  await elPasoCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(elPasoCard, 'El Paso TX card');
  await expectText(elPasoCard, 'El Paso', 'El Paso on card');

  await showPhaseLabel(page, '🔗 Clicking → El Paso TX');
  await elPasoCard.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏜️ El Paso TX — New Service Area Page');
  await page.waitForTimeout(1000);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'El Paso TX H1');
  await expectText(h1, 'El Paso', 'El Paso in heading');
  await expectURL(page, /\/service-areas\/el-paso-tx/);

  const badge = page.locator('text=West Texas').first();
  await expectVisible(badge, 'West Texas · Borderland badge');

  await showPhaseLabel(page, '🏥 El Paso Markets — Hospitals of Providence, UMC, Del Sol');
  await smoothScroll(page, 700, 260, 400);

  const umc = page.locator('text=Providence').or(page.locator('text=UMC')).first();
  await expectVisible(umc, 'Hospitals of Providence / UMC');

  await smoothScroll(page, 700, 260, 400);
  await smoothScroll(page, 700, 260, 400);

  const trustBlock = page.locator('h2').filter({ hasText: /Why Surgiquip|43 Year|Houston/i }).first();
  await expectVisible(trustBlock, 'Why Surgiquip trust block');
  await showPhaseLabel(page, '⭐ Why Surgiquip — Houston-Based, 43 Years');
  await smoothScroll(page, 600, 260, 400);

  await expectJsonLd(page, 'El Paso TX LocalBusiness + BreadcrumbList JSON-LD');
  await page.waitForTimeout(800);

  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📰 Blog Index — OR Suite Renovation Article');
  await smoothScroll(page, 400, 260, 380);

  const renovationLink = page.locator('a[href*="renovation"]').first();
  await renovationLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(renovationLink, 'OR Suite Renovation Planning Guide link');

  await showPhaseLabel(page, '🔗 Clicking → OR Suite Renovation Planning Guide');
  await renovationLink.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '📖 OR Suite Renovation Guide — New Blog Article');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /[Rr]enovation|[Oo]perating/, 'Renovation in title');
  await expectURL(page, /\/blog\/or-suite-renovation/);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  await showPhaseLabel(page, '📄 Scrolling OR Suite Renovation Guide...');
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);

  await showPhaseLabel(page, '✅ 6-Phase Renovation Guide — Complete Coverage');
  await expectJsonLd(page, 'OR Renovation Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(600);

  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🗺️ Service Areas Index — Confirming El Paso TX');
  await page.waitForTimeout(1000);

  const indexH1Final = page.locator('h1').first();
  await expectVisible(indexH1Final, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 420);

  const elPasoFinal = page.locator('a[href="/service-areas/el-paso-tx"]').first();
  await elPasoFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(elPasoFinal, 'El Paso TX card in listing');
  await expectText(elPasoFinal, 'El Paso', 'El Paso confirmed');

  const westBadge = page.locator('text=Far West Texas').first();
  await expectVisible(westBadge, 'Far West Texas badge');

  await showPhaseLabel(page, '✅ El Paso TX Live — Cycle 34 Complete!');
  await page.waitForTimeout(1500);
  await expectJsonLd(page, 'Service Areas Index JSON-LD');
});

