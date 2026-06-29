import { test, expect } from '@playwright/test';

test('full-walk-through-austin-tx-hybrid-or', async ({ page }) => {
  // 1. Start at homepage
  await page.goto('/');
  await page.waitForTimeout(1200);

  // Verify homepage hero loads
  await expect(page.locator('h1').first()).toBeVisible();

  // 2. Navigate to Service Areas via nav
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // Verify Service Areas index
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('text=Austin, TX')).toBeVisible();

  // 3. Scroll through service areas index
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 4. Verify Austin appears in city links
  await expect(page.locator('a[href="/service-areas/austin-tx"]').first()).toBeVisible();

  // 5. Click into Austin TX page
  await page.click('a[href="/service-areas/austin-tx"]');
  await page.waitForTimeout(1200);

  // 6. Verify Austin TX hero section
  await expect(page.locator('h1')).toContainText('Austin');
  await expect(page.locator('text=Travis')).toBeVisible();

  // 7. Scroll through Austin TX page (full content review)
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 8. Verify key sections on Austin TX page
  await expect(page.locator('text=Dell Seton').or(page.locator('text=Central Texas'))).toBeVisible();

  // 9. Navigate to Blog index via nav
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // Verify blog index loads with Austin hybrid OR article
  await expect(page.locator('text=Hybrid OR').or(page.locator('text=hybrid OR'))).toBeVisible();

  // 10. Scroll through blog index
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 11. Click into the Hybrid OR planning guide blog post
  const hybridOrLink = page.locator('a[href*="hybrid-or"]').first();
  await expect(hybridOrLink).toBeVisible();
  await hybridOrLink.click();
  await page.waitForTimeout(1200);

  // 12. Verify blog article hero
  await expect(page.locator('h1').first()).toBeVisible();

  // 13. Scroll through the full blog article
  for (let i = 0; i < 14; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 14. Verify blog article contains hybrid OR content
  await expect(page.locator('text=hybrid').or(page.locator('text=Hybrid'))).toBeVisible();

  // 15. Navigate back to Blog index
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // 16. Verify blog listing shows the hybrid OR article
  await expect(page.locator('text=Hybrid OR').or(page.locator('text=hybrid OR').or(page.locator('text=hybrid-or')))).toBeVisible();

  // 17. Navigate back to Service Areas to verify Austin in listing
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // 18. Scroll through index to verify Austin card
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  await expect(page.locator('text=Austin, TX')).toBeVisible();
  await expect(page.locator('text=Central Texas')).toBeVisible();
});
