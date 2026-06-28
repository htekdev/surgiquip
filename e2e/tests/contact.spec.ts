import { test } from '@playwright/test';
import { expectVisible, expectText, showPhaseLabel, expectJsonLd } from './visual-assert';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should render contact page heading', async ({ page }) => {
    await showPhaseLabel(page, '📞 Contact Page');
    const heading = page.locator('h1').first();
    await expectVisible(heading, 'Contact heading');
    await expectText(heading, 'Contact', 'Contact title');
  });

  test('should render contact form', async ({ page }) => {
    await showPhaseLabel(page, '📝 Contact Form');
    const form = page.locator('form').first();
    await expectVisible(form, 'Contact form');

    // Check form fields exist
    const nameField = page.locator('input[name="name"], input[type="text"]').first();
    await expectVisible(nameField, 'Name field');

    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    await expectVisible(emailField, 'Email field');

    const messageField = page.locator('textarea').first();
    await expectVisible(messageField, 'Message field');

    const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await expectVisible(submitBtn, 'Submit button');
  });

  test('should display company contact info', async ({ page }) => {
    await showPhaseLabel(page, '📋 Company Info');
    const phone = page.locator('a[href^="tel:"]').first();
    await expectVisible(phone, 'Phone number');

    // Email intentionally removed per Carla feedback (spam) - PR #18
  });

  test('should have JSON-LD schema', async ({ page }) => {
    await showPhaseLabel(page, '🔍 Schema Check');
    // Contact page injects ContactPage + LocalBusiness JSON-LD via BaseLayout
    await expectJsonLd(page, 'Contact JSON-LD');
  });
});
