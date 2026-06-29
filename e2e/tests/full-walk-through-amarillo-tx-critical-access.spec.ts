/**
 * Full-Walk-Through E2E Spec — Cycle 36: Amarillo TX + Critical Access Hospital Equipment Guide
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

async function smoothScroll(page: Page, totalPx = 2000, stepPx = 280, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

test('full-walk-through - Cycle 36: Amarillo TX + Critical Access Hospital Equipment Guide', async ({ page }) => {

  // ── PHASE 1: Homepage ────────────────────────────────────────────────────
  await page.goto('/');
  await showPhaseLabel(page, 'Surgiquip -- Homepage');
  await page.waitForTimeout(1500);
  await smoothScroll(page, 600, 280, 500);
  await page.waitForTimeout(1200);

  // ── PHASE 2: Service Areas Index ────────────────────────────────────────
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Service Areas -- Texas Statewide Coverage');
  await page.waitForTimeout(1200);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Spotting Amarillo TX -- New Texas Panhandle!');

  const amarilloCard = page.locator('a[href="/service-areas/amarillo-tx"]').first();
  await amarilloCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(amarilloCard, 'Amarillo TX card');
  await expectText(amarilloCard, 'Amarillo', 'Amarillo on card');

  // ── PHASE 3: Amarillo TX city page ──────────────────────────────────────
  await showPhaseLabel(page, 'Clicking into Amarillo TX');
  await amarilloCard.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Amarillo TX -- New Service Area Page');
  await page.waitForTimeout(1500);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Amarillo TX H1');
  await expectText(h1, 'Amarillo', 'Amarillo in heading');
  await expectURL(page, /\/service-areas\/amarillo-tx/);

  const badge = page.locator('text=Texas Panhandle').first();
  await expectVisible(badge, 'Texas Panhandle badge');

  // ── PHASE 4: Scroll through Amarillo page ────────────────────────────────
  await showPhaseLabel(page, 'Amarillo Markets -- BSA Health, Northwest Texas Healthcare');
  await smoothScroll(page, 700, 260, 500);
  await page.waitForTimeout(1200);

  const bsa = page.locator('text=BSA').or(page.locator('text=Northwest Texas')).first();
  await bsa.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(bsa, 'BSA Health / Northwest Texas Healthcare');

  await smoothScroll(page, 700, 260, 500);
  await smoothScroll(page, 700, 260, 500);
  await page.waitForTimeout(1200);

  const trustSection = page.locator('text=Why Surgiquip').first();
  await trustSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(trustSection, 'Why Surgiquip section');
  await showPhaseLabel(page, 'Why Surgiquip -- Houston-Based, Panhandle Ready');
  await smoothScroll(page, 600, 260, 500);
  await page.waitForTimeout(1200);

  await expectJsonLd(page, 'Amarillo TX LocalBusiness + BreadcrumbList JSON-LD');
  await page.waitForTimeout(1200);

  // ── PHASE 5: Critical Access Hospital Equipment Guide blog ───────────────
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Blog Index -- Critical Access Hospital Equipment Guide');
  await page.waitForTimeout(1200);
  await smoothScroll(page, 400, 260, 500);
  await page.waitForTimeout(1200);

  const cahLink = page.locator('a[href*="critical-access"]').first();
  await cahLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(cahLink, 'Critical Access Hospital Equipment Guide link');

  await showPhaseLabel(page, 'Clicking into Critical Access Hospital Equipment Guide');
  await cahLink.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Critical Access Hospital Equipment Guide -- New Article');
  await page.waitForTimeout(1500);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /[Cc]ritical [Aa]ccess/, 'Critical Access in title');
  await expectURL(page, /\/blog\/critical-access/);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  await showPhaseLabel(page, 'Article: What Makes CAH OR Equipment Planning Different...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: Equipment Right-Sizing for CAH Surgical Programs...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: PM Compliance for CAH Medical Equipment...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: Selecting a Service Partner for Rural Texas...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: Capital Planning for CAH OR Equipment...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1500);

  await expectJsonLd(page, 'CAH Equipment Guide Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(1200);

  // ── PHASE 6: Back to Service Areas -- confirm Amarillo ──────────────────
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Service Areas Index -- Confirming Amarillo TX');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 600, 260, 500);
  await page.waitForTimeout(1200);

  const amarilloFinal = page.locator('a[href="/service-areas/amarillo-tx"]').first();
  await amarilloFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(amarilloFinal, 'Amarillo TX card in listing');
  await expectText(amarilloFinal, 'Amarillo', 'Amarillo confirmed in listing');

  const panhandleBadge = page.locator('text=Texas Panhandle').first();
  await expectVisible(panhandleBadge, 'Texas Panhandle badge in listing');

  await showPhaseLabel(page, 'Amarillo TX Live -- Cycle 36 Complete!');
  await page.waitForTimeout(1500);
  await expectJsonLd(page, 'Service Areas Index JSON-LD');
});
