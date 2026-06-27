import { test } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel } from './visual-assert';

test.describe('Blog Pages', () => {
  test('should load blog index page', async ({ page }) => {
    await page.goto('/blog');
    await showPhaseLabel(page, '📰 Blog Index');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Blog heading');
    await expectURL(page, /\/blog/);
  });

  test('should display blog article cards', async ({ page }) => {
    await page.goto('/blog');
    await showPhaseLabel(page, '📄 Article Cards');
    // At least one article link should exist
    const articleLink = page.locator('a[href*="/blog/"]').first();
    await expectVisible(articleLink, 'Blog article link');
  });

  test('should load a blog article', async ({ page }) => {
    await page.goto('/blog/skytron-authorized-dealer-southeast-texas');
    await showPhaseLabel(page, '📖 Article Page');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Article heading');
    await expectText(heading, 'Skytron', 'Skytron in article title');
  });

  test('should have JSON-LD schema on blog articles', async ({ page }) => {
    await page.goto('/blog/skytron-authorized-dealer-southeast-texas');
    await showPhaseLabel(page, '🔍 Schema Check');
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    await expectVisible(jsonLd, 'JSON-LD present');
  });
});
