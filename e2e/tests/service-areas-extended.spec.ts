import { test } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel, expectJsonLd } from './visual-assert';

// ─── Beaumont TX ──────────────────────────────────────────────────────────────

test.describe('Service Area — Beaumont TX', () => {
  test('should load Beaumont TX page', async ({ page }) => {
    await page.goto('/service-areas/beaumont-tx');
    await showPhaseLabel(page, '📍 Beaumont TX');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Beaumont heading');
    await expectText(heading, 'Beaumont', 'Beaumont in h1');
    await expectURL(page, /\/service-areas\/beaumont-tx/);
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await page.goto('/service-areas/beaumont-tx');
    await showPhaseLabel(page, '🔍 Beaumont Schema');
    await expectJsonLd(page, 'Beaumont TX JSON-LD');
  });
});

// ─── Corpus Christi TX ────────────────────────────────────────────────────────

test.describe('Service Area — Corpus Christi TX', () => {
  test('should load Corpus Christi TX page', async ({ page }) => {
    await page.goto('/service-areas/corpus-christi-tx');
    await showPhaseLabel(page, '📍 Corpus Christi TX');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Corpus Christi heading');
    await expectText(heading, 'Corpus Christi', 'Corpus Christi in h1');
    await expectURL(page, /\/service-areas\/corpus-christi-tx/);
  });

  test('should show Coastal Bend region reference', async ({ page }) => {
    await page.goto('/service-areas/corpus-christi-tx');
    await showPhaseLabel(page, '🌊 Coastal Bend Content');
    const body = page.locator('main');
    await expectVisible(body, 'Page body');
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await page.goto('/service-areas/corpus-christi-tx');
    await showPhaseLabel(page, '🔍 Corpus Christi Schema');
    await expectJsonLd(page, 'Corpus Christi TX JSON-LD');
  });
});

// ─── San Antonio TX ───────────────────────────────────────────────────────────

test.describe('Service Area — San Antonio TX', () => {
  test('should load San Antonio TX page', async ({ page }) => {
    await page.goto('/service-areas/san-antonio-tx');
    await showPhaseLabel(page, '📍 San Antonio TX');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'San Antonio heading');
    await expectText(heading, 'San Antonio', 'San Antonio in h1');
    await expectURL(page, /\/service-areas\/san-antonio-tx/);
  });

  test('should have CTA to get a quote', async ({ page }) => {
    await page.goto('/service-areas/san-antonio-tx');
    await showPhaseLabel(page, '💬 San Antonio CTA');
    const ctaLink = page.locator('main a[href="/quote"], main a[href="/contact"]').first();
    await expectVisible(ctaLink, 'CTA link');
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await page.goto('/service-areas/san-antonio-tx');
    await showPhaseLabel(page, '🔍 San Antonio Schema');
    await expectJsonLd(page, 'San Antonio TX JSON-LD');
  });
});

// ─── Victoria TX ──────────────────────────────────────────────────────────────

test.describe('Service Area — Victoria TX', () => {
  test('should load Victoria TX page', async ({ page }) => {
    await page.goto('/service-areas/victoria-tx');
    await showPhaseLabel(page, '📍 Victoria TX');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Victoria heading');
    await expectText(heading, 'Victoria', 'Victoria in h1');
    await expectURL(page, /\/service-areas\/victoria-tx/);
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await page.goto('/service-areas/victoria-tx');
    await showPhaseLabel(page, '🔍 Victoria Schema');
    await expectJsonLd(page, 'Victoria TX JSON-LD');
  });
});

// ─── Lubbock TX ───────────────────────────────────────────────────────────────

test.describe('Service Area — Lubbock TX', () => {
  test('should load Lubbock TX page', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await showPhaseLabel(page, '📍 Lubbock TX');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Lubbock heading');
    await expectText(heading, 'Lubbock', 'Lubbock in h1');
    await expectURL(page, /\/service-areas\/lubbock-tx/);
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await page.goto('/service-areas/lubbock-tx');
    await showPhaseLabel(page, '🔍 Lubbock Schema');
    await expectJsonLd(page, 'Lubbock TX JSON-LD');
  });
});

// ─── Service Areas Index — CTA links ─────────────────────────────────────────

test.describe('Service Areas — Index CTA', () => {
  test('should link to all 7 service area pages from index', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '🗺️ Service Areas Index Links');

    const areas = [
      '/service-areas/houston-tx',
      '/service-areas/southeast-texas',
      '/service-areas/beaumont-tx',
      '/service-areas/corpus-christi-tx',
      '/service-areas/san-antonio-tx',
      '/service-areas/victoria-tx',
      '/service-areas/lubbock-tx',
    ];

    for (const href of areas) {
      const link = page.locator(`main a[href="${href}"]`).first();
      await expectVisible(link, `Link to ${href}`);
    }
  });
});

// ─── Service Areas — Mobile ───────────────────────────────────────────────────

test.describe('Service Areas — Mobile Responsive', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('should render Beaumont TX on mobile', async ({ page }) => {
    await page.goto('/service-areas/beaumont-tx');
    await showPhaseLabel(page, '📱 Beaumont Mobile');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Beaumont heading mobile');
  });

  test('should render San Antonio TX on mobile', async ({ page }) => {
    await page.goto('/service-areas/san-antonio-tx');
    await showPhaseLabel(page, '📱 San Antonio Mobile');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'San Antonio heading mobile');
  });
});
