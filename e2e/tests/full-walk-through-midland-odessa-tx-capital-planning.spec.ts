/**
 * Full-Walk-Through E2E Spec — Cycle 39: Midland/Odessa TX + Surgical Equipment Capital Planning Guide
 * ONE SINGLE test() block = ONE continuous video for Hector to review
 *
 * Flow:
 *   → Homepage scroll
 *   → Service Areas Index — find Midland/Odessa TX (NEW)
 *   → Click Midland/Odessa TX — scroll full page
 *   → Blog Index — click Capital Planning Guide
 *   → Scroll full article
 *   → Back to Service Areas Index — Midland/Odessa TX card confirmed
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

test('full-walk-through — Midland/Odessa TX service area + Surgical Equipment Capital Planning Guide blog', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Service Areas Index → Midland/Odessa TX full scroll
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

  await showPhaseLabel(page, '🗺 Service Areas — Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexHeading = page.locator('h1').first();
  await expectVisible(indexHeading, 'Service Areas H1');

  await smoothScroll(page, 900, 260, 500);
  await showPhaseLabel(page, '📍 Spotting Midland/Odessa TX — New!');
  await page.waitForTimeout(1200);

  const midlandCard = page.locator('a[href="/service-areas/midland-odessa-tx"]').first();
  await midlandCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await expectVisible(midlandCard, 'Midland/Odessa TX card');
  await expectText(midlandCard, 'Midland', 'Midland on card');
  await expectText(midlandCard, 'Permian Basin', 'Permian Basin badge');
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '🔗 Clicking → Midland/Odessa TX');
  await page.waitForTimeout(500);
  await midlandCard.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Midland/Odessa TX city page — full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  await expectURL(page, /midland-odessa-tx/, 'URL: midland-odessa-tx');
  await showPhaseLabel(page, '🏥 Midland/Odessa TX — Permian Basin Coverage');
  await page.waitForTimeout(1200);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'City page H1');
  await expectText(h1, 'Midland', 'H1 contains Midland');

  await showPhaseLabel(page, '📊 Stats Bar — 43 Years · 5 Counties · 24hr · Factory');
  await smoothScroll(page, 400, 260, 500);
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '🗺 Coverage Area — 4 Permian Basin Markets');
  await smoothScroll(page, 800, 260, 500);
  await page.waitForTimeout(1200);

  const midlandMarket = page.locator('text=Midland / Midland County').first();
  await midlandMarket.scrollIntoViewIfNeeded();
  await expectVisible(midlandMarket, 'Midland market card');
  await page.waitForTimeout(1200);

  const odessaMarket = page.locator('text=Odessa / Ector County').first();
  await odessaMarket.scrollIntoViewIfNeeded();
  await expectVisible(odessaMarket, 'Odessa market card');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '⚙️ Services for Permian Basin Facilities');
  await smoothScroll(page, 700, 260, 500);
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '✅ Why Surgiquip — Houston-Based Permian Basin Ready');
  await page.waitForTimeout(500);
  const trustSection = page.locator('text=Why Surgiquip').first();
  await trustSection.scrollIntoViewIfNeeded();
  await expectVisible(trustSection, 'Why Surgiquip section');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 600, 260, 500);
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '🔗 Resources — Capital Planning Guide cross-link');
  const capitalPlanningLink = page.locator('a[href="/blog/surgical-equipment-capital-planning-guide-texas-hospitals"]').first();
  await capitalPlanningLink.scrollIntoViewIfNeeded();
  await expectVisible(capitalPlanningLink, 'Capital Planning link');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📋 Checking JSON-LD Schema');
  await expectJsonLd(page, 'Midland/Odessa LocalBusiness + BreadcrumbList');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Blog Index → Capital Planning Guide article
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📰 Opening Blog Index →');
  await page.waitForTimeout(1000);
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '📚 Blog Index — All Articles');
  const blogHeading = page.locator('h1').first();
  await expectVisible(blogHeading, 'Blog H1');
  await page.waitForTimeout(1000);

  await smoothScroll(page, 400, 260, 500);
  await page.waitForTimeout(1000);

  const capitalCard = page.locator('text=Capital Planning').first();
  await capitalCard.scrollIntoViewIfNeeded();
  await expectVisible(capitalCard, 'Capital Planning article card');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🔗 Clicking Capital Planning Guide →');
  await page.waitForTimeout(500);
  const capitalLink = page.locator('a[href="/blog/surgical-equipment-capital-planning-guide-texas-hospitals"]').first();
  await capitalLink.scrollIntoViewIfNeeded();
  await capitalLink.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 4 — Capital Planning Guide article — full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  await expectURL(page, /capital-planning/, 'URL: capital-planning');
  await showPhaseLabel(page, '💰 Surgical Equipment Capital Planning Guide');
  await page.waitForTimeout(1200);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, 'Capital Planning', 'H1 contains Capital Planning');

  await showPhaseLabel(page, '📖 Scrolling Article — Purchase vs Lease vs Lease-to-Own');
  await smoothScroll(page, 800, 260, 500);
  await page.waitForTimeout(1200);

  const purchaseSection = page.locator('text=Purchase vs. Lease vs. Lease-to-Own').first();
  await purchaseSection.scrollIntoViewIfNeeded();
  await expectVisible(purchaseSection, 'Purchase vs Lease section');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 800, 260, 500);
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🛢 Permian Basin Capital Planning Context');
  const permianSection = page.locator('text=Permian Basin Capital Planning Context').first();
  await permianSection.scrollIntoViewIfNeeded();
  await expectVisible(permianSection, 'Permian Basin section');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 600, 260, 500);
  await page.waitForTimeout(1000);

  await showPhaseLabel(page, '📋 Checking Article JSON-LD Schema');
  await expectJsonLd(page, 'Capital Planning Article schema');
  await page.waitForTimeout(1000);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 5 — Back to Service Areas Index — confirm Midland/Odessa card
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔙 Back to Service Areas — confirming Midland/Odessa TX');
  await page.waitForTimeout(1000);
  await scrollToTop(page);
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  await showPhaseLabel(page, '🗺 Service Areas Index — Midland/Odessa TX listed');
  await smoothScroll(page, 900, 260, 500);
  await page.waitForTimeout(1000);

  const finalCard = page.locator('a[href="/service-areas/midland-odessa-tx"]').first();
  await finalCard.scrollIntoViewIfNeeded();
  await expectVisible(finalCard, 'Final: Midland/Odessa TX card confirmed');
  await expectText(finalCard, 'Permian Basin', 'Final: Permian Basin badge confirmed');
  await page.waitForTimeout(1500);

  await showPhaseLabel(page, '✅ Cycle 39 Complete — Midland/Odessa TX + Capital Planning Guide SHIPPED');
  await page.waitForTimeout(2000);
});
