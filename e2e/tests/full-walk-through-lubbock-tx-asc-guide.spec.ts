/**
 * Full-Walk-Through E2E Spec — Cycle 33: Lubbock TX + ASC Equipment Guide
 *
 * Validates the COMPLETE lifecycle of PR #40:
 *   - Lubbock TX service area page (hero, markets grid, trust block, JSON-LD)
 *   - ASC Equipment Guide blog article (content, JSON-LD schema)
 *   - Service areas index updated with Lubbock TX card
 *   - Navigation flows between service areas and blog
 *   - JSON-LD schema validity on all new pages
 *
 * Proof keyword: full-walk-through
 */

import { test } from '@playwright/test';
import {
  expectVisible,
  expectText,
  expectURL,
  showPhaseLabel,
  expectJsonLd,
} from './visual-assert';

// ─── Lubbock TX Service Area Page ─────────────────────────────────────────────

test.describe('Full-Walk-Through: Lubbock TX Service Area', () => {
  test('should load Lubbock TX page with hero section', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await showPhaseLabel(page, '🏙️ Lubbock TX — Hero');

    const heading = page.locator('h1').first();
    await expectVisible(heading, 'H1 heading');
    await expectText(heading, 'Lubbock', 'Lubbock in heading');

    // Breadcrumb present
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]').first();
    await expectVisible(breadcrumb, 'Breadcrumb nav');

    // CTA button
    const quoteCta = page.locator('a[href="/quote"]').first();
    await expectVisible(quoteCta, 'Request a Quote CTA');
  });

  test('should render West Texas market grid', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await showPhaseLabel(page, '📍 Lubbock TX — Markets Grid');

    // UMC Health System — Lubbock's Level 1 Trauma center
    const umc = page.locator('text=UMC').first();
    await expectVisible(umc, 'UMC Health System market card');

    // Covenant Health — CommonSpirit
    const covenant = page.locator('text=Covenant').first();
    await expectVisible(covenant, 'Covenant Health market card');

    // Lubbock Heart & Surgical Hospital
    const lubbockHeart = page.locator('text=Lubbock Heart').first();
    await expectVisible(lubbockHeart, 'Lubbock Heart & Surgical market card');
  });

  test('should render services section and trust block', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await showPhaseLabel(page, '🛠️ Lubbock TX — Services & Trust');

    // Services section heading
    const servicesHeading = page.locator('h2:has-text("Services")').first();
    await expectVisible(servicesHeading, 'Services section heading');

    // Why Surgiquip / trust block — Houston-Based reference
    const trustHeading = page.locator('h2:has-text("Houston")').first();
    await expectVisible(trustHeading, 'Trust block heading');

    // Contact CTA link at bottom
    const contactLink = page.locator('a[href="/contact"]').first();
    await expectVisible(contactLink, 'Contact CTA link');
  });

  test('should show West Texas badge', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await showPhaseLabel(page, '🏷️ Lubbock TX — West Texas Badge');

    const badge = page.locator('text=West Texas').first();
    await expectVisible(badge, 'West Texas badge');
  });

  test('should have valid JSON-LD schema on Lubbock TX page', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await expectJsonLd(page, 'Lubbock TX LocalBusiness + BreadcrumbList JSON-LD');
  });
});

// ─── ASC Equipment Guide Blog Article ────────────────────────────────────────

test.describe('Full-Walk-Through: ASC Equipment Guide Blog Article', () => {
  test('should load ASC Equipment Guide blog article page', async ({ page }) => {
    await page.goto('/blog/ambulatory-surgery-center-equipment-guide-texas');
    await showPhaseLabel(page, '📖 ASC Blog — Page Load');

    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Article H1');
    await expectText(heading, /[Aa]mbulatory|[Aa][Ss][Cc]/, 'ASC in article title');

    await expectURL(page, /\/blog\/ambulatory-surgery-center-equipment-guide-texas/);
  });

  test('should render article content body', async ({ page }) => {
    await page.goto('/blog/ambulatory-surgery-center-equipment-guide-texas');
    await showPhaseLabel(page, '📄 ASC Blog — Content Body');

    const articleBody = page.locator('article, main, .prose, [class*="prose"]').first();
    await expectVisible(articleBody, 'Article body');
  });

  test('should display ASC Equipment Guide in blog index', async ({ page }) => {
    await page.goto('/blog');
    await showPhaseLabel(page, '📰 Blog Index — ASC Guide Listed');

    const ascLink = page.locator('a[href*="ambulatory-surgery-center"]').first();
    await expectVisible(ascLink, 'ASC Equipment Guide link in blog index');
  });

  test('should have valid JSON-LD Article schema on ASC Equipment Guide page', async ({
    page,
  }) => {
    await page.goto('/blog/ambulatory-surgery-center-equipment-guide-texas');
    await expectJsonLd(page, 'ASC Equipment Guide Article + BreadcrumbList JSON-LD');
  });
});

// ─── Service Areas Index — Lubbock TX Card ───────────────────────────────────

test.describe('Full-Walk-Through: Service Areas Index — Lubbock TX Card', () => {
  test('should show Lubbock TX card in service areas index', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '📍 Service Areas Index — Lubbock TX');

    const lubbockLink = page.locator('a[href="/service-areas/lubbock-tx"]').first();
    await expectVisible(lubbockLink, 'Lubbock TX card link');
  });

  test('should navigate from service areas index to Lubbock TX page', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '🔗 Index → Lubbock TX');

    const lubbockLink = page.locator('a[href="/service-areas/lubbock-tx"]').first();
    await lubbockLink.click();

    await expectURL(page, /\/service-areas\/lubbock-tx/);
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Lubbock TX H1 after nav');
    await expectText(heading, 'Lubbock', 'Lubbock in heading');
  });

  test('should display Lubbock city reference in service areas index', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '🏙️ Index — Lubbock City Reference');

    const lubbockText = page.locator('text=Lubbock').first();
    await expectVisible(lubbockText, 'Lubbock city reference in index');
  });
});

// ─── Cross-Navigation: Service Areas ↔ Blog ──────────────────────────────────

test.describe('Full-Walk-Through: Navigation Between Lubbock TX and ASC Blog', () => {
  test('should navigate from Lubbock TX page to ASC Equipment Guide via internal link', async ({
    page,
  }) => {
    await page.goto('/service-areas/lubbock-tx');
    await showPhaseLabel(page, '🔗 Lubbock TX → ASC Equipment Guide Blog');

    // Lubbock TX page links to ASC Equipment Guide blog
    const ascLink = page.locator('a[href*="ambulatory-surgery-center"]').first();
    await expectVisible(ascLink, 'ASC Equipment Guide blog link on Lubbock TX page');
    await ascLink.click();

    await expectURL(page, /\/blog\/ambulatory-surgery-center/);
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'ASC Equipment Guide article heading');
  });

  test('should navigate from blog back to service areas via nav', async ({ page }) => {
    await page.goto('/blog/ambulatory-surgery-center-equipment-guide-texas');
    await showPhaseLabel(page, '🔗 Blog → Service Areas Nav');

    const serviceAreasLink = page.locator('a[href="/service-areas"]').first();
    await expectVisible(serviceAreasLink, 'Service areas nav link');
    await serviceAreasLink.click();

    await expectURL(page, /\/service-areas/);
  });
});

// ─── Full JSON-LD Schema Coverage ────────────────────────────────────────────

test.describe('Full-Walk-Through: JSON-LD Schema Validation — All New Pages', () => {
  test('should have valid JSON-LD on Lubbock TX service area', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await expectJsonLd(page, 'Lubbock TX — LocalBusiness + BreadcrumbList');
  });

  test('should have valid JSON-LD on ASC Equipment Guide blog article', async ({ page }) => {
    await page.goto('/blog/ambulatory-surgery-center-equipment-guide-texas');
    await expectJsonLd(page, 'ASC Equipment Guide — Article + BreadcrumbList');
  });

  test('should have valid JSON-LD on service areas index', async ({ page }) => {
    await page.goto('/service-areas');
    await expectJsonLd(page, 'Service Areas Index JSON-LD');
  });
});
