import { test } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel } from './visual-assert';

// ─── Privacy Policy Page ──────────────────────────────────────────────────────

test.describe('Privacy Policy Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacy');
  });

  test('should render Privacy Policy heading', async ({ page }) => {
    await showPhaseLabel(page, '🔒 Privacy Policy');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Privacy Policy heading');
    await expectText(heading, 'Privacy', 'Privacy in h1');
  });

  test('should render policy sections', async ({ page }) => {
    await showPhaseLabel(page, '📄 Privacy Sections');
    // Introduction section h2
    const intro = page.locator('h2').filter({ hasText: /Introduction/i }).first();
    await expectVisible(intro, 'Introduction section');

    // Information We Collect
    const collectH2 = page.locator('h2').filter({ hasText: /Information We Collect/i }).first();
    await expectVisible(collectH2, 'Information We Collect section');
  });

  test('should show last-updated date', async ({ page }) => {
    await showPhaseLabel(page, '📅 Last Updated Date');
    const dateLine = page.locator('p').filter({ hasText: /Last updated/i }).first();
    await expectVisible(dateLine, 'Last updated date');
  });

  test('should show contact info card', async ({ page }) => {
    await showPhaseLabel(page, '📋 Privacy Contact Card');
    // Contact us card at bottom with phone/email links
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expectVisible(phoneLink, 'Phone link in privacy contact card');
  });

  test('should show header and footer', async ({ page }) => {
    await showPhaseLabel(page, '🔗 Page Shell');
    const header = page.locator('header').first();
    await expectVisible(header, 'Header');
    const footer = page.locator('footer').first();
    await expectVisible(footer, 'Footer');
  });
});

// ─── Terms of Use Page ────────────────────────────────────────────────────────

test.describe('Terms of Use Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/terms');
  });

  test('should render Terms of Use heading', async ({ page }) => {
    await showPhaseLabel(page, '📜 Terms of Use');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Terms of Use heading');
    await expectText(heading, 'Terms', 'Terms in h1');
  });

  test('should render key sections', async ({ page }) => {
    await showPhaseLabel(page, '📄 Terms Sections');
    // Acceptance of Terms
    const acceptance = page.locator('h2').filter({ hasText: /Acceptance of Terms/i }).first();
    await expectVisible(acceptance, 'Acceptance of Terms section');

    // Medical Disclaimer
    const disclaimer = page.locator('h2').filter({ hasText: /Medical Disclaimer/i }).first();
    await expectVisible(disclaimer, 'Medical Disclaimer section');
  });

  test('should show governing law section (Texas)', async ({ page }) => {
    await showPhaseLabel(page, '⚖️ Governing Law');
    const govLaw = page.locator('h2').filter({ hasText: /Governing Law/i }).first();
    await expectVisible(govLaw, 'Governing Law section');
  });

  test('should show contact info card', async ({ page }) => {
    await showPhaseLabel(page, '📋 Terms Contact Card');
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expectVisible(phoneLink, 'Phone link in terms contact card');
  });

  test('should show header and footer', async ({ page }) => {
    await showPhaseLabel(page, '🔗 Page Shell');
    const header = page.locator('header').first();
    await expectVisible(header, 'Header');
    const footer = page.locator('footer').first();
    await expectVisible(footer, 'Footer');
  });
});

// ─── Footer Content ───────────────────────────────────────────────────────────

test.describe('Footer Content', () => {
  test('should render footer with address and phone', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🏢 Footer');
    const footer = page.locator('footer').first();
    await expectVisible(footer, 'Footer');

    // Phone link in footer
    const footerPhone = footer.locator('a[href^="tel:"]').first();
    await expectVisible(footerPhone, 'Phone in footer');
  });

  test('should show privacy and terms links in footer', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🔗 Footer Legal Links');
    const footer = page.locator('footer').first();

    const privacyLink = footer.locator('a[href="/privacy"]').first();
    await expectVisible(privacyLink, 'Privacy link in footer');

    const termsLink = footer.locator('a[href="/terms"]').first();
    await expectVisible(termsLink, 'Terms link in footer');
  });

  test('should show footer nav links for key pages', async ({ page }) => {
    await page.goto('/');
    await showPhaseLabel(page, '🔗 Footer Nav');
    const footer = page.locator('footer').first();

    const servicesLink = footer.locator('a[href="/services"]').first();
    await expectVisible(servicesLink, 'Services in footer');

    const contactLink = footer.locator('a[href="/contact"]').first();
    await expectVisible(contactLink, 'Contact in footer');
  });
});
