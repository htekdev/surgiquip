/**
 * Full-Walk-Through E2E Spec — Cycle 33: Lubbock TX + ASC Equipment Guide
 * CLIENT DEMO — flows like a real product walkthrough for Hector to review
 *
 * Flow:
 *   Scene 1 — Homepage → nav to Service Areas → click Lubbock TX → scroll entire page
 *   Scene 2 — Lubbock TX → scroll to resources → click ASC Guide link → scroll article
 *   Scene 3 — Service Areas Index → scroll through all cards → Lubbock TX card featured
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

// ─── SCENE 1: Homepage → Service Areas Index → Lubbock TX Full Walk-Through ──

test('Scene 1 — Homepage → Service Areas → Lubbock TX full page walk-through', async ({
  page,
}) => {
  // ── 1a. Land on homepage — show hero and key stats ────────────────────────
  await page.goto('/');
  await showPhaseLabel(page, '🏥 Surgiquip — Homepage');
  await page.waitForTimeout(1200);

  // Scroll down to show stat bar and services section
  await smoothScroll(page, 600, 280, 420);
  await showPhaseLabel(page, '📊 43 Years Serving Texas Hospitals');
  await page.waitForTimeout(800);

  // Scroll a bit further to show partner logos / services grid
  await smoothScroll(page, 500, 280, 420);
  await showPhaseLabel(page, '🏥 Equipment + Services Overview');
  await page.waitForTimeout(700);

  // ── 1b. Navigate directly to Service Areas ────────────────────────────────
  await showPhaseLabel(page, '📍 Opening Service Areas →');
  await page.waitForTimeout(700);
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');

  // ── 1c. Service Areas Index — scroll to find Lubbock TX card ─────────────
  await showPhaseLabel(page, '🗺️ Service Areas — Texas Statewide Coverage');
  await page.waitForTimeout(1000);

  const indexHeading = page.locator('h1').first();
  await expectVisible(indexHeading, 'Service Areas H1');

  // Scroll through the index to show all city cards
  await smoothScroll(page, 900, 260, 420);
  await showPhaseLabel(page, '📍 Spotting Lubbock TX — New!');
  await page.waitForTimeout(800);

  // Highlight the Lubbock TX card
  const lubbockCard = page.locator('a[href="/service-areas/lubbock-tx"]').first();
  await expectVisible(lubbockCard, 'Lubbock TX card');
  await expectText(lubbockCard, 'Lubbock', 'Lubbock on card');
  await page.waitForTimeout(600);

  // ── 1d. Click Lubbock TX card → land on service area page ─────────────────
  await showPhaseLabel(page, '🔗 Clicking → Lubbock TX');
  await page.waitForTimeout(500);
  await lubbockCard.click();
  await page.waitForLoadState('networkidle');

  await showPhaseLabel(page, '🏙️ Lubbock TX — New Service Area Page');
  await page.waitForTimeout(1000);

  // Verify hero loaded
  const h1 = page.locator('h1').first();
  await expectVisible(h1, 'Lubbock TX H1');
  await expectText(h1, 'Lubbock', 'Lubbock in heading');
  await expectURL(page, /\/service-areas\/lubbock-tx/);

  // West Texas badge visible in hero
  const badge = page.locator('text=West Texas').first();
  await expectVisible(badge, 'West Texas badge');
  await page.waitForTimeout(800);

  // ── 1e. Scroll through Lubbock TX page — show all sections ────────────────
  await showPhaseLabel(page, '📍 Markets — UMC, Covenant, Lubbock Heart');
  await page.waitForTimeout(600);
  await smoothScroll(page, 700, 260, 400);

  // Markets grid — check key hospitals as they scroll into view
  const umc = page.locator('text=UMC').first();
  await expectVisible(umc, 'UMC Health System');

  const covenant = page.locator('text=Covenant').first();
  await expectVisible(covenant, 'Covenant Health');

  await showPhaseLabel(page, '🏥 Markets Grid — West Texas Hospitals');
  await page.waitForTimeout(700);
  await smoothScroll(page, 700, 260, 400);

  // Services section
  const servicesHeading = page.locator('h2:has-text("Services")').first();
  await expectVisible(servicesHeading, 'Services section heading');
  await showPhaseLabel(page, '🛠️ Services Available in Lubbock TX');
  await page.waitForTimeout(700);

  await smoothScroll(page, 700, 260, 400);

  // Trust block — broad locator to find "Why Surgiquip" type heading
  const trustHeading = page.locator('h2').filter({ hasText: /Why Surgiquip|Houston|43 Year/i }).first();
  await expectVisible(trustHeading, 'Why Surgiquip trust block');
  await showPhaseLabel(page, '⭐ Why Surgiquip — Houston-Based, 43 Years');
  await page.waitForTimeout(700);

  await smoothScroll(page, 600, 260, 400);

  // CTA at bottom
  const contactCta = page.locator('a[href="/contact"]').first();
  await expectVisible(contactCta, 'Contact CTA');
  await showPhaseLabel(page, '📞 Ready to Serve Lubbock — CTA Section');
  await page.waitForTimeout(1000);

  // Schema check at end
  await expectJsonLd(page, 'Lubbock TX LocalBusiness + BreadcrumbList JSON-LD');
  await page.waitForTimeout(600);
});

// ─── SCENE 2: Lubbock TX → ASC Equipment Guide Blog Full Walk-Through ─────────

test('Scene 2 — Lubbock TX → ASC Equipment Guide blog full article walk-through', async ({
  page,
}) => {
  // ── 2a. Land on Lubbock TX page ───────────────────────────────────────────
  await page.goto('/service-areas/lubbock-tx');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🏙️ Lubbock TX — Finding Blog Resource Link');
  await page.waitForTimeout(1000);

  // Scroll down to the resources / cross-links section
  await smoothScroll(page, 2800, 280, 360);
  await showPhaseLabel(page, '📚 Resources Section — Internal Links');
  await page.waitForTimeout(800);

  // Find the ASC Equipment Guide link
  const ascLink = page.locator('a[href*="ambulatory-surgery-center"]').first();
  await expectVisible(ascLink, 'ASC Equipment Guide link');
  await showPhaseLabel(page, '🔗 Clicking → ASC Equipment Guide Blog');
  await page.waitForTimeout(600);
  await ascLink.click();
  await page.waitForLoadState('networkidle');

  // ── 2b. ASC Equipment Guide blog — verify hero ───────────────────────────
  await showPhaseLabel(page, '📖 ASC Equipment Guide — New Blog Article');
  await page.waitForTimeout(1000);

  const articleH1 = page.locator('h1').first();
  await expectVisible(articleH1, 'Article H1');
  await expectText(articleH1, /[Aa]mbulatory|[Ss]urgical|[Aa][Ss][Cc]/, 'ASC content in title');
  await expectURL(page, /\/blog\/ambulatory-surgery-center-equipment-guide-texas/);
  await page.waitForTimeout(800);

  // ── 2c. Scroll through the full article ──────────────────────────────────
  await showPhaseLabel(page, '📄 Article — Regulatory Requirements');
  await smoothScroll(page, 800, 260, 380);

  const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
  await expectVisible(articleBody, 'Article body visible');
  await page.waitForTimeout(600);

  await showPhaseLabel(page, '🏥 Equipment Categories — Tables, Lighting, Booms');
  await smoothScroll(page, 900, 260, 380);
  await page.waitForTimeout(700);

  await showPhaseLabel(page, '🔬 Sterilization — Capacity Sizing for ASCs');
  await smoothScroll(page, 900, 260, 380);
  await page.waitForTimeout(700);

  await showPhaseLabel(page, '💰 Capital Planning — Lease vs. Buy Analysis');
  await smoothScroll(page, 900, 260, 380);
  await page.waitForTimeout(700);

  await showPhaseLabel(page, '✅ 5 Vendor Questions for ASC Directors');
  await smoothScroll(page, 700, 260, 380);
  await page.waitForTimeout(800);

  // Schema check on blog article
  await expectJsonLd(page, 'ASC Equipment Guide Article + BreadcrumbList JSON-LD');
  await page.waitForTimeout(600);

  // ── 2d. Navigate back to service areas index via nav ─────────────────────
  await showPhaseLabel(page, '🔗 Navigating back → Service Areas');
  await page.waitForTimeout(500);
  await scrollToTop(page);

  const serviceAreasLink = page.locator('a[href="/service-areas"]').first();
  await expectVisible(serviceAreasLink, 'Service Areas link in nav');
  await serviceAreasLink.click();
  await page.waitForLoadState('networkidle');

  await expectURL(page, /\/service-areas/);
  await showPhaseLabel(page, '🗺️ Back on Service Areas Index');
  await page.waitForTimeout(800);
});

// ─── SCENE 3: Service Areas Index — Lubbock TX Card Featured ──────────────────

test('Scene 3 — Service Areas Index full scroll — Lubbock TX card walk-through', async ({
  page,
}) => {
  // ── 3a. Land on service areas index ──────────────────────────────────────
  await page.goto('/service-areas');
  await page.waitForLoadState('networkidle');
  await showPhaseLabel(page, '🗺️ Service Areas Index — Houston to Lubbock');
  await page.waitForTimeout(1200);

  const indexH1 = page.locator('h1').first();
  await expectVisible(indexH1, 'Service Areas Index H1');
  await page.waitForTimeout(800);

  // ── 3b. Scroll through entire index ──────────────────────────────────────
  await showPhaseLabel(page, '📍 Scrolling Texas Coverage...');
  await smoothScroll(page, 600, 260, 420);

  await showPhaseLabel(page, '🏙️ Houston + Southeast Texas + Beaumont...');
  await smoothScroll(page, 700, 260, 420);

  await showPhaseLabel(page, '🌊 Corpus Christi + Victoria + San Antonio...');
  await smoothScroll(page, 700, 260, 420);

  await showPhaseLabel(page, '🎸 Austin + Rio Grande Valley + Dallas-Fort Worth...');
  await smoothScroll(page, 700, 260, 420);

  // ── 3c. Lubbock TX card ───────────────────────────────────────────────────
  await showPhaseLabel(page, '⭐ NEW — Lubbock / West Texas');
  await page.waitForTimeout(800);

  const lubbockLink = page.locator('a[href="/service-areas/lubbock-tx"]').first();
  await expectVisible(lubbockLink, 'Lubbock TX card');
  await expectText(lubbockLink, 'Lubbock', 'Lubbock city name on card');

  const westTexasBadge = page.locator('text=West Texas').first();
  await expectVisible(westTexasBadge, 'West Texas badge on card');
  await page.waitForTimeout(1000);

  // Schema check
  await expectJsonLd(page, 'Service Areas Index JSON-LD');
  await page.waitForTimeout(600);

  // ── 3d. Click into Lubbock and verify one final time ─────────────────────
  await showPhaseLabel(page, '🔗 Final Click — Into Lubbock TX');
  await page.waitForTimeout(500);
  await lubbockLink.click();
  await page.waitForLoadState('networkidle');

  const finalH1 = page.locator('h1').first();
  await expectVisible(finalH1, 'Lubbock TX H1');
  await expectText(finalH1, 'Lubbock', 'Lubbock confirmed');
  await expectURL(page, /\/service-areas\/lubbock-tx/);
  await showPhaseLabel(page, '✅ Lubbock TX Live — Cycle 33 Complete!');
  await page.waitForTimeout(1500);
});
