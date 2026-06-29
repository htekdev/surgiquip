/**
 * Full-Walk-Through E2E Spec — Cycle 38: Waco TX + Surgical Equipment Maintenance Staffing Guide
 * ONE SINGLE test() block = ONE continuous video for Hector to review
 *
 * Flow:
 *   → Homepage scroll
 *   → Service Areas Index — find Waco TX (NEW)
 *   → Click Waco TX — scroll full page
 *   → Blog Index — click Maintenance Staffing Guide
 *   → Scroll full article
 *   → Back to Service Areas Index — Waco TX card confirmed
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

async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
}

test('full-walk-through — Waco TX service area + Surgical Equipment Maintenance Staffing Guide blog', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Service Areas Index → Waco TX full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 600, 280, 500);
  await showPhaseLabel(page, '📊 43 Years Serving Texas Hospitals');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📍 Opening Service Areas →');
  await page.waitForTimeout(1000);
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🗺️ Service Areas — Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexHeading = page.locator('h1').first();
  await expectVisible(indexHeading, 'Service Areas H1');

  await smoothScroll(page, 700, 260, 500);
  await showPhaseLabel(page, '📍 Spotting Waco TX — New!');
  await page.waitForTimeout(1200);

  const wacoCard = page.locator('a[href="/service-areas/waco-tx"]').first();
  await wacoCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(wacoCard, 'Waco TX card');
  await expectText(wacoCard, 'Waco', 'Waco on card');
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '🔗 Clicking → Waco TX');
  await page.waitForTimeout(500);
  await wacoCard.click();
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🏙️ Waco TX — New Service Area Page');
  await page.waitForTimeout(1200);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Waco TX H1');
  await expectText(h1, 'Waco', 'Waco in heading');
  await expectURL(page, /\/service-areas\/waco-tx/);

  const badge = page.locator('text=Central Texas').first();
  await expectVisible(badge, 'Central Texas badge');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📍 Markets — Baylor Scott & White Hillcrest, Ascension Providence');
  await smoothScroll(page, 700, 260, 500);

  const bswMarket = page.locator('text=Baylor').or(page.locator('text=McLennan')).first();
  await expectVisible(bswMarket, 'Baylor Scott and White / McLennan County');

  await showPhaseLabel(page, '🏥 Waco Hospitals — Central Texas Healthcare Hub');
  await smoothScroll(page, 700, 260, 500);

  const servicesHeading = page.locator('h2:has-text("Services")').or(
    page.locator('h2:has-text("Waco")').or(page.locator('h2:has-text("Equipment")'))
  ).first();
  await expectVisible(servicesHeading, 'Services section');
  await showPhaseLabel(page, '🛠️ OR Equipment Services in Waco TX');
  await smoothScroll(page, 700, 260, 500);

  const trustBlock = page.locator('text=Why Surgiquip').first();
  await trustBlock.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(trustBlock, 'Why Surgiquip trust block');
  await showPhaseLabel(page, '⭐ Why Surgiquip — Houston-Based, 43 Years');
  await smoothScroll(page, 600, 260, 500);

  const contactCta = page.locator('a[href="/contact"]').first();
  await expectVisible(contactCta, 'Contact CTA');
  await showPhaseLabel(page, '📞 Waco TX CTA — Ready to Serve Central Texas');
  await page.waitForTimeout(1200);

  await expectJsonLd(page, 'Waco TX LocalBusiness + BreadcrumbList JSON-LD');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Blog Index → Maintenance Staffing Guide full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Opening Blog Index →');
  await page.waitForTimeout(500);
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '📰 Blog Index — Maintenance Staffing Guide');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 400, 260, 500);

  const staffingLink = page.locator('a[href*="maintenance-staffing"]').first();
  await staffingLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(staffingLink, 'Maintenance Staffing Guide link');

  await showPhaseLabel(page, '🔗 Clicking → Surgical Equipment Maintenance Staffing Guide');
  await page.waitForTimeout(500);
  await staffingLink.click();
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '📖 Maintenance Staffing Guide — New Blog Article');
  await page.waitForTimeout(1200);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /[Mm]aintenance|[Ss]taffing|[Ss]urgical/, 'Maintenance Staffing in title');
  await expectURL(page, /\/blog\/surgical-equipment-maintenance-staffing/);
  await page.waitForTimeout(1200);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  await showPhaseLabel(page, '📄 Scrolling Maintenance Staffing Article — Biomed vs. Contracts vs. ISOs...');
  await smoothScroll(page, 900, 260, 500);
  await smoothScroll(page, 900, 260, 500);
  await smoothScroll(page, 900, 260, 500);
  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '✅ Maintenance Staffing Article — Complete');
  await page.waitForTimeout(700);

  await expectJsonLd(page, 'Maintenance Staffing Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Back to Service Areas Index → Waco TX card confirmed
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔗 Back → Service Areas Index');
  await page.waitForTimeout(500);
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🗺️ Service Areas Index — Confirming Waco TX');
  await page.waitForTimeout(1200);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas H1');

  await smoothScroll(page, 700, 260, 500);

  const wacoFinal = page.locator('a[href="/service-areas/waco-tx"]').first();
  await wacoFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(wacoFinal, 'Waco TX card in listing');
  await expectText(wacoFinal, 'Waco', 'Waco confirmed');

  const centralTexasBadge = page.locator('text=Central Texas').first();
  await expectVisible(centralTexasBadge, 'Central Texas badge');
  await showPhaseLabel(page, '✅ Waco TX Live — Cycle 38 Complete!');
  await page.waitForTimeout(1500);

  await expectJsonLd(page, 'Service Areas Index JSON-LD');
  await page.waitForTimeout(1000);
});
