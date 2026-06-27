import { test } from '@playwright/test';
import { expectVisible, expectHidden, expectURL, showPhaseLabel } from './visual-assert';

test.describe('Navigation — Desktop', () => {
  test('should render desktop header with nav links', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🖥️ Desktop Nav');

    const header = page.locator('header').first();
    await expectVisible(header, 'Header');

    // Logo / brand link
    const logo = page.locator('header a[href="/"]').first();
    await expectVisible(logo, 'Logo link');

    // Main nav links
    const servicesLink = page.locator('header a[href="/services"], header a:has-text("Services")').first();
    await expectVisible(servicesLink, 'Services link');

    const productsLink = page.locator('header a[href="/products"], header a:has-text("Products")').first();
    await expectVisible(productsLink, 'Products link');
  });

  test('should navigate to services page via header', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🔗 Nav → Services');

    const servicesLink = page.locator('header a[href="/services"], header a:has-text("Services")').first();
    await servicesLink.click();
    await expectURL(page, /\/services/);
  });

  test('should navigate to contact page via header', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🔗 Nav → Contact');

    const contactLink = page.locator('header a[href="/contact"], header a:has-text("Contact")').first();
    await contactLink.click();
    await expectURL(page, /\/contact/);
  });
});

test.describe('Navigation — Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('should show mobile menu toggle', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '📱 Mobile Menu');

    // Mobile hamburger button
    const menuBtn = page.locator('button[aria-label*="menu" i], button[aria-label*="Menu" i], header button').first();
    await expectVisible(menuBtn, 'Menu button');
  });

  test('should open mobile menu and show nav links', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '📱 Open Mobile Menu');

    const menuBtn = page.locator('button[aria-label*="menu" i], button[aria-label*="Menu" i], header button').first();
    await menuBtn.click();
    await page.waitForTimeout(500);

    // After opening, nav links should be visible
    const servicesLink = page.locator('a[href="/services"], a:has-text("Services")').first();
    await expectVisible(servicesLink, 'Services in mobile menu');
  });
});
