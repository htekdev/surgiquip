import { test } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel, expectJsonLd } from './visual-assert';

// ─── Quote Page ───────────────────────────────────────────────────────────────

test.describe('Quote Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quote');
  });

  test('should render quote page heading', async ({ page }) => {
    await showPhaseLabel(page, '💬 Quote Page Hero');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Quote heading');
    await expectText(heading, 'Quote', 'h1 contains Quote');
  });

  test('should render quote form with required fields', async ({ page }) => {
    await showPhaseLabel(page, '📝 Quote Form Fields');
    const form = page.locator('form').first();
    await expectVisible(form, 'Quote form');

    // Name field (required)
    const nameField = page.locator('#quote-name');
    await expectVisible(nameField, 'Full Name field');

    // Email field (required)
    const emailField = page.locator('#quote-email');
    await expectVisible(emailField, 'Email field');

    // Organization field (required)
    const orgField = page.locator('#quote-organization');
    await expectVisible(orgField, 'Organization field');

    // Phone field (optional)
    const phoneField = page.locator('#quote-phone');
    await expectVisible(phoneField, 'Phone field');
  });

  test('should render area of interest select', async ({ page }) => {
    await showPhaseLabel(page, '📋 Interest Select');
    const interestSelect = page.locator('#quote-interest');
    await expectVisible(interestSelect, 'Interest select');
  });

  test('should render timeline select', async ({ page }) => {
    await showPhaseLabel(page, '⏱️ Timeline Select');
    const timelineSelect = page.locator('#quote-timeline');
    await expectVisible(timelineSelect, 'Timeline select');
  });

  test('should render message textarea and submit button', async ({ page }) => {
    await showPhaseLabel(page, '✉️ Message + Submit');
    const textarea = page.locator('textarea').first();
    await expectVisible(textarea, 'Message textarea');

    const submitBtn = page.locator('button[type="submit"]').first();
    await expectVisible(submitBtn, 'Submit button');
  });

  test('should render trust section with BBB mention', async ({ page }) => {
    await showPhaseLabel(page, '🏅 Trust Section');
    // Trust section contains at least one trust point item visible
    const trustSection = page.locator('section').filter({ hasText: /Years of Excellence|BBB A\+|Factory-Trained/i }).first();
    await expectVisible(trustSection, 'Trust section');
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await showPhaseLabel(page, '🔍 Quote Schema Check');
    await expectJsonLd(page, 'Quote page JSON-LD');
  });
});

// ─── Quote Page — Mobile ──────────────────────────────────────────────────────

test.describe('Quote Page — Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('should render quote form on mobile viewport', async ({ page }) => {
    await page.goto('/quote');
    await showPhaseLabel(page, '📱 Quote Mobile');
    const form = page.locator('form').first();
    await expectVisible(form, 'Quote form on mobile');

    const nameField = page.locator('#quote-name');
    await expectVisible(nameField, 'Name field on mobile');
  });
});

// ─── Thank-You Page ───────────────────────────────────────────────────────────

test.describe('Thank-You Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/thank-you');
  });

  test('should render confirmation heading', async ({ page }) => {
    await showPhaseLabel(page, '✅ Thank-You Confirmation');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Confirmation heading');
    await expectText(heading, 'Received', 'Thank-you heading text');
  });

  test('should show "What Happens Next" section', async ({ page }) => {
    await showPhaseLabel(page, '📋 Next Steps');
    const nextSteps = page.locator('h2').filter({ hasText: /What Happens Next/i }).first();
    await expectVisible(nextSteps, 'What Happens Next heading');
  });

  test('should show back-to-home link', async ({ page }) => {
    await showPhaseLabel(page, '🏠 Back to Home');
    const homeLink = page.locator('main a[href="/"]').first();
    await expectVisible(homeLink, 'Back to Home button');
  });

  test('should show phone call link', async ({ page }) => {
    await showPhaseLabel(page, '📞 Call CTA');
    const callLink = page.locator('a[href^="tel:"]').first();
    await expectVisible(callLink, 'Phone call link');
  });

  test('should have explore links for services and products', async ({ page }) => {
    await showPhaseLabel(page, '🔗 Explore Links');
    const orLink = page.locator('a[href="/services/or-installation"]').first();
    await expectVisible(orLink, 'OR Installation link');

    const skytronLink = page.locator('a[href="/products/skytron"]').first();
    await expectVisible(skytronLink, 'Skytron link');

    const projectsLink = page.locator('a[href="/projects"]').first();
    await expectVisible(projectsLink, 'Case Studies link');
  });
});
