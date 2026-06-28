import { test } from '@playwright/test';
import { expectVisible, expectText, expectURL, showPhaseLabel, expectJsonLd } from './visual-assert';

test.describe('Service Pages', () => {
  test('should load services index page', async ({ page }) => {
    await page.goto('/services');
    await showPhaseLabel(page, '🔧 Services Index');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Services heading');
    await expectURL(page, /\/services/);
  });

  test('should load OR Installation page', async ({ page }) => {
    await page.goto('/services/or-installation');
    await showPhaseLabel(page, '🏗️ OR Installation');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Page heading');
    await expectText(heading, 'Installation', 'OR Installation title');
  });

  test('should load Service & Repair page', async ({ page }) => {
    await page.goto('/services/service-and-repair');
    await showPhaseLabel(page, '🔩 Service & Repair');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Page heading');
    await expectText(heading, 'Repair', 'Service & Repair title');
  });

  test('should load Preventive Maintenance page', async ({ page }) => {
    await page.goto('/services/preventive-maintenance');
    await showPhaseLabel(page, '🛡️ Preventive Maintenance');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Page heading');
    await expectText(heading, 'Maintenance', 'Preventive Maintenance title');
  });

  test('should load Equipment Sales page', async ({ page }) => {
    await page.goto('/services/equipment-sales');
    await showPhaseLabel(page, '💰 Equipment Sales');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Page heading');
    await expectText(heading, 'Equipment', 'Equipment Sales title');
  });

  test('should have JSON-LD schema on service pages', async ({ page }) => {
    await page.goto('/services/or-installation');
    await showPhaseLabel(page, '🔍 Schema Check');
    // OR Installation page injects a Service JSON-LD block via BaseLayout
    await expectJsonLd(page, 'Service JSON-LD');
  });
});
