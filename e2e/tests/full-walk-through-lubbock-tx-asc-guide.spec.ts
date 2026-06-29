/**
 * Full-Walk-Through E2E Spec — Cycle 33: Lubbock TX + ASC Equipment Guide
 * ONE SINGLE test() block = ONE continuous video for Hector to review
 *
 * Flow (all in one video):
 *   → Homepage scroll (stats + services)
 *   → Service Areas Index — scroll all cards — find Lubbock TX (NEW)
 *   → Click Lubbock TX — scroll entire page (markets, services, trust, CTA)
 *   → Click ASC Equipment Guide internal link — scroll full article
 *   → Navigate back to Service Areas Index — final scroll — Lubbock TX card
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

// ─── Scroll helper — smooth natural scrolling like a real user ────────────────

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

// ─── ONE SINGLE TEST — entire walk-through in one continuous video ────────────

test('full-walk-through — Lubbock TX service area + ASC Equipment Guide blog', async ({
  page,
}) => {

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1 — Homepage → Service Areas Index → Lubbock TX full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  // 1a. Homepage — show hero and key stats
  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  await smoothScroll(page, 600, 280, 420);
  await showPhaseLabel(page, '📊 43 Years Serving Texas Hospitals');
  await page.waitForTimeout(800);

  await smoothScroll(page, 500, 280, 420);
  await showPhaseLabel(page, '🏥 Equipment + Services Overview');
  await page.waitForTimeout(700);

  // 1b. Navigate to Service Areas
  await showPhaseLabel(page, '📍 Opening Service Areas →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');

  // 1c. Service Areas Index — scroll to find Lubbock TX
  await showPhaseLabel(page, '🗺️ Service Areas — Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexHeading = page.locator('h1').first();
  await expectVisible(indexHeading, 'Service Areas H1');

  await smoothScroll(page, 900, 260, 420);
  await showPhaseLabel(page, '📍 Spotting Lubbock TX — New!');
  await page.waitForTimeout(800);

  const lubbockCard = page.locator('a[href="/service-areas/lubbock-tx"]').first();
  await expectVisible(lubbockCard, 'Lubbock TX card');
  await expectText(lubbockCard, 'Lubbock', 'Lubbock on card');
  await page.waitForTimeout(600);

  // 1d. Click into Lubbock TX
  await showPhaseLabel(page, '🔗 Clicking → Lubbock TX');
  await page.waitForTimeout(500);
  await lubbockCard.click();
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🏙️ Lubbock TX — New Service Area Page');
  await page.waitForTimeout(1000);

  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Lubbock TX H1');
  await expectText(h1, 'Lubbock', 'Lubbock in heading');
  await expectURL(page, /\/service-areas\/lubbock-tx/);

  const badge = page.locator('text=West Texas').first();
  await expectVisible(badge, 'West Texas badge');
  await page.waitForTimeout(800);

  // 1e. Scroll Lubbock TX — markets → services → trust → CTA
  await showPhaseLabel(page, '📍 Markets — UMC, Covenant, Lubbock Heart');
  await page.waitForTimeout(600);
  await smoothScroll(page, 700, 260, 400);

  const umc = page.locator('text=UMC').first();
  await expectVisible(umc, 'UMC Health System');
  const covenant = page.locator('text=Covenant').first();
  await expectVisible(covenant, 'Covenant Health');

  await showPhaseLabel(page, '🏥 Markets Grid — West Texas Hospitals');
  await page.waitForTimeout(700);
  await smoothScroll(page, 700, 260, 400);

  const servicesHeading = page.locator('h2:has-text("Services")').first();
  await expectVisible(servicesHeading, 'Services section heading');
  await showPhaseLabel(page, '🛠️ Services Available in Lubbock TX');
  await page.waitForTimeout(700);

  await smoothScroll(page, 700, 260, 400);

  const trustHeading = page.locator('h2').filter({ hasText: /Why Surgiquip|Houston|43 Year/i }).first();
  await expectVisible(trustHeading, 'Why Surgiquip trust block');
  await showPhaseLabel(page, '⭐ Why Surgiquip — Houston-Based, 43 Years');
  await page.waitForTimeout(700);

  await smoothScroll(page, 600, 260, 400);

  const contactCta = page.locator('a[href="/contact"]').first();
  await expectVisible(contactCta, 'Contact CTA');
  await showPhaseLabel(page, '📞 Ready to Serve Lubbock — CTA Section');
  await page.waitForTimeout(800);

  await expectJsonLd(page, 'Lubbock TX LocalBusiness + BreadcrumbList JSON-LD');
  await page.waitForTimeout(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2 — Lubbock TX → ASC Equipment Guide blog full scroll
  // ═══════════════════════════════════════════════════════════════════════════

  // 2a. Scroll to resources section and click ASC Guide link
  await scrollToTop(page);
  await showPhaseLabel(page, '🏙️ Lubbock TX — Finding Resource Link');
  await page.waitForTimeout(800);
  await smoothScroll(page, 2800, 280, 360);
  await showPhaseLabel(page, '📚 Resources Section — Internal Links');
  await page.waitForTimeout(800);

  const ascLink = page.locator('a[href*="ambulatory-surgery-center"]').first();
  await expectVisible(ascLink, 'ASC Equipment Guide link');
  await showPhaseLabel(page, '🔗 Clicking → ASC Equipment Guide Blog');
  await page.waitForTimeout(600);
  await ascLink.click();
  await page.waitForLoadState('networkidle');

  // 2b. ASC blog — hero
  await showPhaseLabel(page, '📖 ASC Equipment Guide — New Blog Article');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /[Aa]mbulatory|[Ss]urgical|[Aa][Ss][Cc]/, 'ASC in title');
  await expectURL(page, /\/blog\/ambulatory-surgery-center-equipment-guide-texas/);
  await page.waitForTimeout(800);

  // 2c. Scroll full article
  await showPhaseLabel(page, '📄 Article — CMS & AAAHC Requirements');
  await smoothScroll(page, 800, 260, 380);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body visible');
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '🏥 Equipment Categories — Tables, Lighting, Booms');
  await smoothScroll(page, 900, 260, 380);
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '🔬 Sterilization — Capacity Sizing for ASCs');
  await smoothScroll(page, 900, 260, 380);
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '💰 Capital Planning — Lease vs. Buy Analysis');
  await smoothScroll(page, 900, 260, 380);
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '✅ 5 Vendor Questions for ASC Directors');
  await smoothScroll(page, 700, 260, 380);
  await page.waitForTimeout(700);

  await expectJsonLd(page, 'ASC Equipment Guide Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(700);

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 3 — Back to Service Areas Index → Lubbock TX card featured
  // ═══════════════════════════════════════════════════════════════════════════

  // 3a. Navigate back to service areas index
  await showPhaseLabel(page, '🔗 Navigating back → Service Areas Index');
  await page.waitForTimeout(500);
  await scrollToTop(page);

  const serviceAreasLink = page.locator('a[href="/service-areas"]').first();
  await expectVisible(serviceAreasLink, 'Service Areas nav link');
  await serviceAreasLink.click();
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🗺️ Service Areas Index — Full Texas Coverage');
  await page.waitForTimeout(1000);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas H1');

  // 3b. Scroll through entire index
  await showPhaseLabel(page, '📍 Scrolling Texas Coverage...');
  await smoothScroll(page, 600, 260, 420);

  await showPhaseLabel(page, '🏙️ Houston + Southeast + Beaumont + Corpus...');
  await smoothScroll(page, 700, 260, 420);

  await showPhaseLabel(page, '🌅 Victoria + San Antonio + Austin + RGV...');
  await smoothScroll(page, 700, 260, 420);

  await showPhaseLabel(page, '🎸 Dallas-Fort Worth...');
  await smoothScroll(page, 700, 260, 420);

  // 3c. Lubbock TX card — new addition
  await showPhaseLabel(page, '⭐ NEW — Lubbock / West Texas');
  await page.waitForTimeout(800);

  const lubbockFinal = page.locator('a[href="/service-areas/lubbock-tx"]').first();
  await expectVisible(lubbockFinal, 'Lubbock TX card');
  await expectText(lubbockFinal, 'Lubbock', 'Lubbock on card');

  const westBadge = page.locator('text=West Texas').first();
  await expectVisible(westBadge, 'West Texas badge');
  await page.waitForTimeout(1000);

  await expectJsonLd(page, 'Service Areas Index JSON-LD');
  await page.waitForTimeout(600);

  // 3d. Final click — confirm Lubbock TX is live
  await showPhaseLabel(page, '🔗 Final Click — Into Lubbock TX');
  await page.waitForTimeout(500);
  await lubbockFinal.click();
  await page.waitForLoadState('networkidle');

  const finalH1 = page.locator('h1').first();
  await expectVisible(finalH1, 'Lubbock TX H1');
  await expectText(finalH1, 'Lubbock', 'Lubbock confirmed');
  await expectURL(page, /\/service-areas\/lubbock-tx/);
  await showPhaseLabel(page, '✅ Lubbock TX Live — Cycle 33 Complete!');
  await page.waitForTimeout(1500);
});
