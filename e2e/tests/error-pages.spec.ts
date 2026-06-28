import { test, expect } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel } from './visual-assert';

test.describe('Error Pages', () => {
  test('should render custom 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-xyz');
    await showPhaseLabel(page, '🚫 404 Page');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should show some 404 content
    const heading = page.locator('h1').first();
    await expectVisible(heading, '404 heading');
  });

  test('404 page should have navigation back to home', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-xyz');
    await showPhaseLabel(page, '🔗 404 Navigation');

    const homeLink = page.locator('a[href="/"]').first();
    await expectVisible(homeLink, 'Home link on 404');
  });
});
