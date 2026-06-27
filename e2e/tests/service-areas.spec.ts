import { test } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel } from './visual-assert';

test.describe('Service Area Pages', () => {
  test('should load service areas index', async ({ page }) => {
    await page.goto('/service-areas');
    await showPhaseLabel(page, '📍 Service Areas Index');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Service areas heading');
    await expectURL(page, /\/service-areas/);
  });

  test('should load Houston TX page', async ({ page }) => {
    await page.goto('/service-areas/houston-tx');
    await showPhaseLabel(page, '📍 Houston TX');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Houston heading');
    await expectText(heading, 'Houston', 'Houston in title');
  });

  test('should load Southeast Texas page', async ({ page }) => {
    await page.goto('/service-areas/southeast-texas');
    await showPhaseLabel(page, '📍 Southeast Texas');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'SE Texas heading');
    await expectText(heading, 'Texas', 'Texas in title');
  });

  test('should have JSON-LD schema on service area pages', async ({ page }) => {
    await page.goto('/service-areas/houston-tx');
    await showPhaseLabel(page, '🔍 Schema Check');
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    await expectVisible(jsonLd, 'JSON-LD present');
  });
});
