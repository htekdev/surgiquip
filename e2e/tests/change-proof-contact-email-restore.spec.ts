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

  // 4. Scroll through contact page
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(600);
  }

  // 5. Verify the email mailto link is present (the fix: it was missing after PR #18)
  const emailLink = page.locator('a[href^="mailto:"]');
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute('href', /mailto:/);

  // 6. Verify email displays correctly
  await expect(page.locator('text=info@surgiquipsolutions.com').or(page.locator('text=@surgiquip'))).toBeVisible();

  // 7. Verify contact form is present
  await expect(page.locator('form').first()).toBeVisible();

  // 8. Verify phone number is present
  await expect(page.locator('text=713').or(page.locator('text=(713)'))).toBeVisible();

  // 9. Scroll back up and verify full contact info block
  await page.mouse.wheel(0, -800);
  await page.waitForTimeout(800);

  // 10. Verify the complete contact info section
  await expect(page.locator('text=Email')).toBeVisible();
  await expect(emailLink.first()).toBeVisible();
});
