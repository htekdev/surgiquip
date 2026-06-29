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

async function smoothScroll(page: Page, totalPx = 2000, stepPx = 280, delayMs = 380) {
  await page.mouse.move(760, 400);
  const steps = Math.ceil(totalPx / stepPx);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepPx);
    await page.waitForTimeout(delayMs);
  }
}

// Proof keyword: full-walk-through
test('full-walk-through -- DFW TX service area + TJC OR Equipment Compliance blog', async ({ page }) => {
  // PART 1 - Homepage to DFW TX page
  await page.goto('/');
  await showPhaseLabel(page, 'Surgiquip -- Homepage');
  await page.waitForTimeout(1200);
  await smoothScroll(page, 600, 280, 420);

  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Service Areas -- Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 420);
  await showPhaseLabel(page, 'Spotting Dallas-Fort Worth TX -- New!');

  const dfwCard = page.locator('a[href="/service-areas/dallas-fort-worth-tx"]').first();
  await dfwCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(dfwCard, 'DFW TX card');
  await expectText(dfwCard, 'Dallas', 'Dallas on card');

  await showPhaseLabel(page, 'Clicking into Dallas-Fort Worth TX');
  await dfwCard.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Dallas-Fort Worth TX -- New Service Area Page');
  await page.waitForTimeout(1000);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'DFW TX H1');
  await expectText(h1, 'Dallas', 'Dallas in heading');
  await expectURL(page, /\/service-areas\/dallas-fort-worth-tx/);

  await showPhaseLabel(page, 'DFW Markets -- Baylor, UT Southwestern, Parkland');
  await smoothScroll(page, 700, 260, 400);

  const baylor = page.locator('text=Baylor').or(page.locator('text=UT Southwestern')).first();
  await baylor.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(baylor, 'Baylor or UT Southwestern');

  await smoothScroll(page, 700, 260, 400);
  await smoothScroll(page, 700, 260, 400);

  const trustBlock = page.locator('h2').filter({ hasText: /Texas-Based|Statewide|Why Surgiquip|43 Year/i }).first();
  await expectVisible(trustBlock, 'Why Surgiquip trust block');
  await smoothScroll(page, 600, 260, 400);

  await expectJsonLd(page, 'DFW TX LocalBusiness JSON-LD');
  await page.waitForTimeout(800);

  // PART 2 - TJC Compliance blog
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Blog Index -- TJC Compliance Article');
  await smoothScroll(page, 400, 260, 380);

  const tjcLink = page.locator('a[href*="joint-commission"]').first();
  await tjcLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(tjcLink, 'TJC Compliance Guide link');

  await showPhaseLabel(page, 'Clicking into TJC OR Equipment Compliance Guide');
  await tjcLink.click();
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'TJC Compliance Guide -- New Blog Article');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectURL(page, /\/blog\/joint-commission/);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  await showPhaseLabel(page, 'Scrolling TJC Compliance Guide...');
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);

  await expectJsonLd(page, 'TJC Compliance Article JSON-LD');
  await page.waitForTimeout(600);

  // PART 3 - Back to Service Areas to confirm DFW
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, 'Service Areas Index -- Confirming DFW TX');
  await page.waitForTimeout(1000);

  const indexH1Final = page.locator('h1').first();
  await expectVisible(indexH1Final, 'Service Areas H1');
  await smoothScroll(page, 600, 260, 420);

  const dfwFinal = page.locator('a[href="/service-areas/dallas-fort-worth-tx"]').first();
  await dfwFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(dfwFinal, 'DFW TX card in listing');
  await expectText(dfwFinal, 'Dallas', 'DFW confirmed');

  const northBadge = page.locator('text=North Texas').first();
  await expectVisible(northBadge, 'North Texas badge');

  await showPhaseLabel(page, 'Dallas-Fort Worth TX Live -- Cycle 32 Complete!');
  await page.waitForTimeout(1500);
  await expectJsonLd(page, 'Service Areas Index JSON-LD');
});
