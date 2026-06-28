import { test } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel, expectJsonLd } from './visual-assert';

test.describe('Product Pages', () => {
  test('should load products index page', async ({ page }) => {
    await page.goto('/products');
    await showPhaseLabel(page, '📦 Products Index');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Products heading');
    await expectURL(page, /\/products/);
  });

  test('should load Skytron page', async ({ page }) => {
    await page.goto('/products/skytron');
    await showPhaseLabel(page, '🏥 Skytron');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Page heading');
    await expectText(heading, 'Skytron', 'Skytron brand name');
  });

  test('should load HSI page', async ({ page }) => {
    await page.goto('/products/hsi');
    await showPhaseLabel(page, '🏥 HSI');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Page heading');
    await expectText(heading, 'HSI', 'HSI brand name');
  });

  test('should load Knight page', async ({ page }) => {
    await page.goto('/products/knight');
    await showPhaseLabel(page, '🏥 Knight');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Page heading');
    await expectText(heading, 'Knight', 'Knight brand name');
  });

  test('should have JSON-LD schema on product pages', async ({ page }) => {
    await page.goto('/products/skytron');
    await showPhaseLabel(page, '🔍 Schema Check');
    // Skytron page injects an ItemList JSON-LD block via BaseLayout
    await expectJsonLd(page, 'Product JSON-LD');
  });
});
