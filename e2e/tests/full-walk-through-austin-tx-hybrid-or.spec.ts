/**
 * Full-Walk-Through E2E Spec — Cycle 30: Austin TX + Hybrid OR Planning Guide
 * ONE SINGLE test() block = ONE continuous video for Hector to review
 *
 * Flow:
 *   → Homepage scroll
 *   → Service Areas Index — find Austin TX (NEW)
 *   → Click Austin TX — scroll full page
 *   → Blog Index — click Hybrid OR Planning Guide
 *   → Scroll full article
 *   → Back to Service Areas Index — Austin TX card confirmed
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

async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(600);
}

test('full-walk-through — Austin TX service area + Hybrid OR Planning Guide blog', async ({ page }) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Service Areas Index → Austin TX full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 600, 280, 420);
  await showPhaseLabel(page, '📊 43 Years Serving Texas Hospitals');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '📍 Opening Service Areas →');
  await page.waitForTimeout(600);
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🗺️ Service Areas — Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexHeading = page.locator('h1').first();
  await expectVisible(indexHeading, 'Service Areas H1');

  await smoothScroll(page, 600, 260, 420);
  await showPhaseLabel(page, '📍 Spotting Austin TX — New!');
  await page.waitForTimeout(800);

  const austinCard = page.locator('a[href="/service-areas/austin-tx"]').first();
  await austinCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(austinCard, 'Austin TX card');
  await expectText(austinCard, 'Austin', 'Austin on card');
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '🔗 Clicking → Austin TX');
  await page.waitForTimeout(500);
  await austinCard.click();
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🏙️ Austin TX — New Service Area Page');
  await page.waitForTimeout(1000);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Austin TX H1');
  await expectText(h1, 'Austin', 'Austin in heading');
  await expectURL(page, /\/service-areas\/austin-tx/);

  const badge = page.locator('text=Central Texas').first();
  await expectVisible(badge, 'Central Texas badge');
  await page.waitForTimeout(800);

  await showPhaseLabel(page, '📍 Markets — Dell Seton, St. David\'s, Ascension Seton');
  await smoothScroll(page, 700, 260, 400);

  const dellSeton = page.locator('text=Dell Seton').or(page.locator('text=Seton')).first();
  await expectVisible(dellSeton, 'Dell Seton / Ascension Seton');

  await showPhaseLabel(page, '🏥 Austin Hospitals — Central Texas Healthcare');
  await smoothScroll(page, 700, 260, 400);

  const servicesHeading = page.locator('h2:has-text("Services")').or(page.locator('h2:has-text("Equipment")').or(page.locator('h2:has-text("OR")'))).first();
  await expectVisible(servicesHeading, 'Services section');
  await showPhaseLabel(page, '🛠️ OR Equipment Services in Austin TX');
  await smoothScroll(page, 700, 260, 400);

  const trustBlock = page.locator('h2').filter({ hasText: /Why Surgiquip|43 Year|Houston/i }).first();
  await expectVisible(trustBlock, 'Why Surgiquip trust block');
  await showPhaseLabel(page, '⭐ Why Surgiquip — Houston-Based, 43 Years');
  await smoothScroll(page, 600, 260, 400);

  const contactCta = page.locator('a[href="/contact"]').first();
  await expectVisible(contactCta, 'Contact CTA');
  await showPhaseLabel(page, '📞 Austin TX CTA — Ready to Serve Central Texas');
  await page.waitForTimeout(800);

  await expectJsonLd(page, 'Austin TX LocalBusiness + BreadcrumbList JSON-LD');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Blog Index → Hybrid OR Planning Guide full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '📚 Opening Blog Index →');
  await page.waitForTimeout(500);
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '📰 Blog Index — Hybrid OR Article');
  await page.waitForTimeout(800);

  await smoothScroll(page, 400, 260, 380);

  const hybridOrLink = page.locator('a[href*="hybrid-or"]').first();
  await hybridOrLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(hybridOrLink, 'Hybrid OR Planning Guide link');

  await showPhaseLabel(page, '🔗 Clicking → Hybrid OR Planning Guide');
  await page.waitForTimeout(500);
  await hybridOrLink.click();
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '📖 Hybrid OR Planning Guide — New Blog Article');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /[Hh]ybrid|[Pp]lanning|[Oo]perating/, 'Hybrid OR in title');
  await expectURL(page, /\/blog\/hybrid-or/);
  await page.waitForTimeout(800);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body');

  await showPhaseLabel(page, '📄 Scrolling Hybrid OR Article...');
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);
  await smoothScroll(page, 900, 260, 380);
  await showPhaseLabel(page, '✅ Hybrid OR Article — Complete');
  await page.waitForTimeout(700);

  await expectJsonLd(page, 'Hybrid OR Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(600);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Back to Service Areas Index → Austin TX card confirmed
  // ═══════════════════════════════════════════════════════════════════════════

  await showPhaseLabel(page, '🔗 Back → Service Areas Index');
  await page.waitForTimeout(500);
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🗺️ Service Areas Index — Confirming Austin TX');
  await page.waitForTimeout(1000);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas H1');

  await smoothScroll(page, 600, 260, 420);

  const austinFinal = page.locator('a[href="/service-areas/austin-tx"]').first();
  await austinFinal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expectVisible(austinFinal, 'Austin TX card in listing');
  await expectText(austinFinal, 'Austin', 'Austin confirmed');

  const centralBadge = page.locator('text=Central Texas').first();
  await expectVisible(centralBadge, 'Central Texas badge');
  await showPhaseLabel(page, '✅ Austin TX Live — Cycle 30 Complete!');
  await page.waitForTimeout(1500);

  await expectJsonLd(page, 'Service Areas Index JSON-LD');
  await page.waitForTimeout(600);
});

