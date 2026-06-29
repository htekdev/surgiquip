import { test, expect } from '@playwright/test';

test('change-proof-contact-email-restore', async ({ page }) => {
  // 1. Start at homepage
  await page.goto('/');
  await page.waitForTimeout(1200);

  // Verify homepage loads
  await expect(page.locator('h1').first()).toBeVisible();

  // 2. Navigate to Contact via nav
  await page.click('a[href="/contact"]');
  await page.waitForTimeout(1000);

  // 3. Verify contact page heading
  await expect(page.locator('h1')).toBeVisible();

  // 4. Scroll slowly to find contact info
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 250);
    await page.waitForTimeout(600);
  }

  // 5. Verify the email mailto link exists (the fix: it was missing after PR #18)
  const emailLink = page.locator('a[href^="mailto:"]').first();
  await emailLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute('href', /mailto:/);

  // 6. Verify email label is present
  await expect(page.locator('text=Email').first()).toBeVisible();

  // 7. Scroll down to see the contact form
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 8. Verify contact form is present
  await expect(page.locator('form').first()).toBeVisible();

  // 9. Scroll back up to confirm email link still accessible
  await page.mouse.wheel(0, -900);
  await page.waitForTimeout(800);

  // 10. Final verify: email link still visible/accessible on page
  await expect(page.locator('a[href^="mailto:"]').first()).toBeAttached();
});
