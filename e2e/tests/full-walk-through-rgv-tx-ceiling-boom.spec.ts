import { test, type Page } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
  expectJsonLd,
} from './visual-assert';

// Long-running demo test -- extend timeout to 6 minutes
test.setTimeout(360000);

async function smoothScroll(page: Page, totalPx = 2000, stepPx = 280, delayMs = 500) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

// Proof keyword: full-walk-through
test('full-walk-through -- RGV TX service area + Ceiling Boom Systems Guide blog', async ({ page }) => {
  // PART 1 - Homepage to RGV TX page
  await page.goto('/');
  await showPhaseLabel(page, 'Surgiquip -- Homepage');
  await page.waitForTimeout(1200);
  await smoothScroll(page, 600, 280, 500);

  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Service Areas -- Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 420);
  await showPhaseLabel(page, 'Spotting Rio Grande Valley TX -- New!');

  const rgvCard = page.locator('a[href="/service-areas/rio-grande-valley-tx"]').first();
  await rgvCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(rgvCard, 'RGV TX card');
  await expectText(rgvCard, 'Rio Grande Valley', 'RGV on card');

  await showPhaseLabel(page, 'Clicking into Rio Grande Valley TX');
  await rgvCard.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Rio Grande Valley TX -- New Service Area Page');
  await page.waitForTimeout(1000);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'RGV TX H1');
  await expectText(h1, 'Rio Grande Valley', 'RGV in heading');
  await expectURL(page, /\/service-areas\/rio-grande-valley-tx/);

  await showPhaseLabel(page, 'RGV Markets -- DHR Health, Valley Baptist, South TX Health');
  await smoothScroll(page, 700, 260, 400);

  const dhr = page.locator('text=DHR').or(page.locator('text=Valley Baptist')).first();
  await dhr.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(dhr, 'DHR Health or Valley Baptist');

  await smoothScroll(page, 700, 260, 400);
  await smoothScroll(page, 700, 260, 400);

  const trustSection = page.locator('text=Why Surgiquip').first();
  await trustSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(trustSection, 'Why Surgiquip section');
  await smoothScroll(page, 600, 260, 400);

  await expectJsonLd(page, 'RGV TX LocalBusiness JSON-LD');
  await page.waitForTimeout(1200);

  // PART 2 - Ceiling Boom Systems Guide blog
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Blog Index -- Ceiling Boom Systems Article');
  await smoothScroll(page, 400, 260, 500);

  const boomLink = page.locator('a[href*="ceiling-boom"]').first();
  await boomLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(boomLink, 'Ceiling Boom Systems Guide link');

  await showPhaseLabel(page, 'Clicking into Ceiling Boom Systems Guide');
  await boomLink.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Ceiling Boom Systems Guide -- New Blog Article');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectURL(page, /\/blog\/ceiling-boom/);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  await showPhaseLabel(page, 'Scrolling Ceiling Boom Systems Guide...');
  await smoothScroll(page, 800, 260, 500);
  await page.waitForTimeout(500);
  await smoothScroll(page, 800, 260, 500);
  await page.waitForTimeout(500);
  await smoothScroll(page, 800, 260, 500);

  await expectJsonLd(page, 'Ceiling Boom Article JSON-LD');
  await page.waitForTimeout(1000);

  // PART 3 - Back to Service Areas to confirm RGV
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Service Areas Index -- Confirming RGV TX');
  await page.waitForTimeout(1000);

  const indexH1Final = page.locator('h1').first();
  await expectVisible(indexH1Final, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 420);

  const rgvFinal = page.locator('a[href="/service-areas/rio-grande-valley-tx"]').first();
  await rgvFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(rgvFinal, 'RGV TX card in listing');
  await expectText(rgvFinal, 'Rio Grande Valley', 'RGV confirmed');

  await showPhaseLabel(page, 'Rio Grande Valley TX Live -- Cycle 31 Complete!');
  await page.waitForTimeout(1500);
  await expectJsonLd(page, 'Service Areas Index JSON-LD');
});
