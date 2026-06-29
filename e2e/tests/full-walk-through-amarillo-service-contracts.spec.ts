/**
 * Full-Walk-Through E2E Spec — Cycle 35: Surgical Equipment Service Contracts Guide
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

test('full-walk-through - Cycle 35: Service Contracts Guide blog', async ({ page }) => {

  // ── PHASE 1: Homepage ────────────────────────────────────────────────────
  await page.goto('/');
  await showPhaseLabel(page, 'Surgiquip -- Homepage');
  await page.waitForTimeout(1200);
  await smoothScroll(page, 500, 280, 500);
  await page.waitForTimeout(1200);

  // ── PHASE 2: Navigate to Blog Index ─────────────────────────────────────
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Blog Index -- Service Contracts Article');
  await page.waitForTimeout(1200);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Blog Index H1');

  // Scroll to find the service contracts article
  await smoothScroll(page, 400, 260, 500);
  await page.waitForTimeout(1200);

  const contractsLink = page.locator('a[href*="service-contracts"]').first();
  await contractsLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(contractsLink, 'Service Contracts Guide link');
  await expectText(contractsLink, /[Ss]ervice [Cc]ontracts/, 'Service Contracts in link text');

  // ── PHASE 3: Click into Service Contracts Guide ──────────────────────────
  await showPhaseLabel(page, 'Clicking into Service Contracts Guide');
  await contractsLink.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Surgical Equipment Service Contracts Guide -- New Article');
  await page.waitForTimeout(1500);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /[Ss]ervice [Cc]ontracts/, 'Service Contracts in title');
  await expectURL(page, /\/blog\/surgical-equipment-service-contracts/);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  // ── PHASE 4: Scroll through the full article ─────────────────────────────
  await showPhaseLabel(page, 'Article: Why Service Contracts Matter...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: Types of Service Agreements...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: OEM vs Third-Party -- Key Tradeoffs...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: 7 Questions Before Signing...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: Red Flags in Service Contracts...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, 'Article: The Surgiquip Advantage...');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1500);

  await expectJsonLd(page, 'Service Contracts Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(1200);

  // ── PHASE 5: Back to Blog Index -- verify article in listing ────────────
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Blog Index -- Confirming Service Contracts Article');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 400, 260, 500);
  await page.waitForTimeout(1000);

  const contractsFinal = page.locator('a[href*="service-contracts"]').first();
  await contractsFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(contractsFinal, 'Service Contracts article in listing');

  await showPhaseLabel(page, 'Service Contracts Guide Live -- Cycle 35 Complete!');
  await page.waitForTimeout(1500);
  await expectJsonLd(page, 'Blog Index JSON-LD');
});
