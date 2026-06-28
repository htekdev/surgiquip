import { test } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel } from './visual-assert';

test.describe('About Pages', () => {
  test('should load about index page', async ({ page }) => {
    await page.goto('/about');
    await showPhaseLabel(page, 'ℹ️ About Index');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'About heading');
    await expectURL(page, /\/about/);
  });

  test('should load Our Story page', async ({ page }) => {
    await page.goto('/about/our-story');
    await showPhaseLabel(page, '📖 Our Story');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Our Story heading');
  });

  test('should load Team page', async ({ page }) => {
    await page.goto('/about/team');
    await showPhaseLabel(page, '👥 Team');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Team heading');
  });

  test('should load Accreditation page', async ({ page }) => {
    await page.goto('/about/accreditation');
    await showPhaseLabel(page, '🏆 Accreditation');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Accreditation heading');
  });
});
