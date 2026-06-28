/**
 * Full-Feature E2E Spec — Cycle 30: Austin TX + Hybrid OR Planning Guide
 *
 * Validates the COMPLETE lifecycle of PR #37:
 *   - Austin TX service area page (hero, markets grid, trust block, JSON-LD)
 *   - Hybrid OR Planning Guide blog article (content, JSON-LD schema)
 *   - Knight brand in Products nav dropdown
 *   - Service areas index updated with Austin TX card
 *   - Navigation flows between service areas and blog
 *   - JSON-LD schema validity on all new pages
 *
 * Proof keyword: full-feature
 */

import { test } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
  expectJsonLd,
  expectCount,
} from './visual-assert';

// ─── Austin TX Service Area Page ─────────────────────────────────────────────

test.describe('Full-Feature: Austin TX Service Area', () => {
  test('should load Austin TX page with hero section', async ({ page }) => {
    await page.goto('/service-areas/austin-tx');
    await showPhaseLabel(page, '🏙️ Austin TX — Hero');

    const heading = page.locator('h1').first();
    await expectVisible(heading, 'H1 heading');
    await expectText(heading, 'Austin', 'Austin in heading');

    // Breadcrumb present
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]').first();
    await expectVisible(breadcrumb, 'Breadcrumb nav');

    // CTA buttons
    const quoteCta = page.locator('a[href="/quote"]').first();
    await expectVisible(quoteCta, 'Request a Quote CTA');
  });

  test('should render Central Texas market grid', async ({ page }) => {
    await page.goto('/service-areas/austin-tx');
    await showPhaseLabel(page, '📍 Austin TX — Markets Grid');

    // 4 markets expected: Austin/Travis, Round Rock/Williamson, Kyle/Hays, Georgetown/Bastrop
    const marketCards = page.locator('text=Travis County');
    await expectVisible(marketCards.first(), 'Travis County market card');

    const roundRock = page.locator('text=Round Rock').first();
    await expectVisible(roundRock, 'Round Rock / Williamson County');

    const haysCounty = page.locator('text=Hays County').first();
    await expectVisible(haysCounty, 'Hays County market card');
  });

  test('should render services section heading and trust block', async ({ page }) => {
    await page.goto('/service-areas/austin-tx');
    await showPhaseLabel(page, '🛠️ Austin TX — Services & Trust');

    // Services section heading should be present
    const servicesHeading = page.locator('h2:has-text("Services for Austin")').first();
    await expectVisible(servicesHeading, 'Services section heading');

    // Why Surgiquip / trust block heading
    const trustHeading = page.locator('h2:has-text("Houston-Based")').first();
    await expectVisible(trustHeading, 'Trust block heading');

    // CTA section at bottom
    const ctaLink = page.locator('a[href="/contact"]').first();
    await expectVisible(ctaLink, 'Contact CTA link');
  });

  test('should have valid JSON-LD schema on Austin TX page', async ({ page }) => {
    await page.goto('/service-areas/austin-tx');
    await expectJsonLd(page, 'Austin TX LocalBusiness + BreadcrumbList JSON-LD');
  });

  test('should show Central Texas badge', async ({ page }) => {
    await page.goto('/service-areas/austin-tx');
    await showPhaseLabel(page, '🏷️ Austin TX — Central Texas Badge');

    const badge = page.locator('text=Central Texas').first();
    await expectVisible(badge, 'Central Texas badge');
  });
});

// ─── Hybrid OR Planning Guide Blog Article ───────────────────────────────────

test.describe('Full-Feature: Hybrid OR Planning Guide Blog Article', () => {
  test('should load Hybrid OR blog article page', async ({ page }) => {
    await page.goto('/blog/hybrid-or-planning-guide-texas-hospitals');
    await showPhaseLabel(page, '📖 Hybrid OR Blog — Page Load');

    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Article H1');
    await expectText(heading, /[Hh]ybrid/, 'Hybrid in article title');

    await expectURL(page, /\/blog\/hybrid-or-planning-guide-texas-hospitals/);
  });

  test('should render article content sections', async ({ page }) => {
    await page.goto('/blog/hybrid-or-planning-guide-texas-hospitals');
    await showPhaseLabel(page, '📄 Hybrid OR Blog — Content');

    // Article body should have meaningful content
    const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
    await expectVisible(articleBody, 'Article body');
  });

  test('should have valid JSON-LD Article schema on Hybrid OR page', async ({ page }) => {
    await page.goto('/blog/hybrid-or-planning-guide-texas-hospitals');
    await expectJsonLd(page, 'Hybrid OR Article + BreadcrumbList JSON-LD');
  });

  test('should display blog article in blog index', async ({ page }) => {
    await page.goto('/blog');
    await showPhaseLabel(page, '📰 Blog Index — Hybrid OR Listed');

    const hybridLink = page.locator('a[href*="hybrid-or"]').first();
    await expectVisible(hybridLink, 'Hybrid OR article link in blog index');
  });
});

// ─── Knight in Products Nav Dropdown ─────────────────────────────────────────

test.describe('Full-Feature: Knight in Products Nav Dropdown', () => {
  test('should show Knight in desktop Products nav dropdown', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🔽 Products Nav — Knight Dropdown');

    // Hover over Products nav link to open dropdown
    const productsNav = page
      .locator('header a[href="/products"], header a:has-text("Products")')
      .first();
    await expectVisible(productsNav, 'Products nav link');
    await productsNav.hover();
    await page.waitForTimeout(400);

    // Knight link should now be visible in dropdown
    const knightLink = page.locator('header a[href="/products/knight"]').first();
    await expectVisible(knightLink, 'Knight in Products nav dropdown');
  });

  test('should navigate to Knight product page via nav', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🏥 Nav → Knight Product Page');

    const productsNav = page
      .locator('header a[href="/products"], header a:has-text("Products")')
      .first();
    await productsNav.hover();
    await page.waitForTimeout(400);

    const knightLink = page.locator('header a[href="/products/knight"]').first();
    await knightLink.click();

    await expectURL(page, /\/products\/knight/);

    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Knight page H1');
    await expectText(heading, 'Knight', 'Knight on product page');
  });

  test('should load Knight product page directly', async ({ page }) => {
    await page.goto('/products/knight');
    await showPhaseLabel(page, '🏥 Knight Product Page Direct');

    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Knight H1');
    await expectText(heading, 'Knight', 'Knight brand');
  });
});

// ─── Service Areas Index — Austin TX Card ────────────────────────────────────

test.describe('Full-Feature: Service Areas Index — Austin TX Card', () => {
  test('should show Austin TX card in service areas index', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '📍 Service Areas Index — Austin TX');

    const austinLink = page.locator('a[href="/service-areas/austin-tx"]').first();
    await expectVisible(austinLink, 'Austin TX card link');
  });

  test('should navigate from service areas index to Austin TX page', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '🔗 Index → Austin TX');

    const austinLink = page.locator('a[href="/service-areas/austin-tx"]').first();
    await austinLink.click();

    await expectURL(page, /\/service-areas\/austin-tx/);
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Austin TX H1 after nav');
    await expectText(heading, 'Austin', 'Austin in heading');
  });

  test('should display Austin TX city links in index', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '🏙️ Index — Austin City Links');

    // Austin or Round Rock should be listed as a city reference
    const austinText = page.locator('text=Austin').first();
    await expectVisible(austinText, 'Austin city reference in index');
  });
});

// ─── Cross-Navigation: Service Areas ↔ Blog ──────────────────────────────────

test.describe('Full-Feature: Navigation Between Service Areas and Blog', () => {
  test('should navigate from Austin TX page to Hybrid OR blog via internal link', async ({
    page,
  }) => {
    await page.goto('/service-areas/austin-tx');
    await showPhaseLabel(page, '🔗 Austin TX → Hybrid OR Blog');

    // Austin TX page should link to the Hybrid OR blog
    const hybridLink = page.locator('a[href*="hybrid-or"]').first();
    await expectVisible(hybridLink, 'Hybrid OR blog link on Austin TX page');
    await hybridLink.click();

    await expectURL(page, /\/blog\/hybrid-or/);
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Hybrid OR article heading');
  });

  test('should navigate from blog back to service areas via nav', async ({ page }) => {
    await page.goto('/blog/hybrid-or-planning-guide-texas-hospitals');
    await showPhaseLabel(page, '🔗 Blog → Service Areas Nav');

    // Navigate to service areas via header nav or footer
    const serviceAreasLink = page
      .locator('a[href="/service-areas"]')
      .first();
    await expectVisible(serviceAreasLink, 'Service areas link');
    await serviceAreasLink.click();

    await expectURL(page, /\/service-areas/);
  });
});

// ─── Full JSON-LD Schema Coverage ────────────────────────────────────────────

test.describe('Full-Feature: JSON-LD Schema Validation — All New Pages', () => {
  test('should have valid JSON-LD on Austin TX service area', async ({ page }) => {
    await page.goto('/service-areas/austin-tx');
    await expectJsonLd(page, 'Austin TX — LocalBusiness + BreadcrumbList');
  });

  test('should have valid JSON-LD on Hybrid OR blog article', async ({ page }) => {
    await page.goto('/blog/hybrid-or-planning-guide-texas-hospitals');
    await expectJsonLd(page, 'Hybrid OR Blog — Article + BreadcrumbList');
  });

  test('should have valid JSON-LD on service areas index', async ({ page }) => {
    await page.goto('/service-areas');
    await expectJsonLd(page, 'Service Areas Index JSON-LD');
  });
});
