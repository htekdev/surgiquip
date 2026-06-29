import { test, expect } from '@playwright/test';

test('full-walk-through-rgv-tx-ceiling-boom', async ({ page }) => {
  // 1. Start at homepage
  await page.goto('/');
  await page.waitForTimeout(1200);

  // Verify homepage hero loads
  await expect(page.locator('h1').first()).toBeVisible();

  // 2. Navigate to Service Areas via nav
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // Verify Service Areas index with RGV card
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('text=Rio Grande Valley')).toBeVisible();

  // 3. Scroll through service areas index
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 4. Verify RGV city links are present
  await expect(page.locator('a[href="/service-areas/rio-grande-valley-tx"]').first()).toBeVisible();

  // 5. Click into Rio Grande Valley TX page
  await page.click('a[href="/service-areas/rio-grande-valley-tx"]');
  await page.waitForTimeout(1200);

  // 6. Verify RGV hero section
  await expect(page.locator('h1')).toContainText('Rio Grande Valley');
  await expect(page.locator('text=Hidalgo').or(page.locator('text=McAllen'))).toBeVisible();

  // 7. Scroll through RGV page (full content review)
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 8. Verify key content on RGV page
  await expect(page.locator('text=DHR').or(page.locator('text=Valley Baptist'))).toBeVisible();

  // 9. Navigate to Blog via nav
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // Verify ceiling boom article appears
  await expect(page.locator('text=boom').or(page.locator('text=Boom').or(page.locator('text=ceiling')))).toBeVisible();

  // 10. Scroll through blog index
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 11. Click into the ceiling boom systems guide
  const boomLink = page.locator('a[href*="ceiling-boom"]').first();
  await expect(boomLink).toBeVisible();
  await boomLink.click();
  await page.waitForTimeout(1200);

  // 12. Verify blog article hero
  await expect(page.locator('h1').first()).toBeVisible();

  // 13. Scroll through the full blog article
  for (let i = 0; i < 14; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 14. Verify ceiling boom article content
  await expect(page.locator('text=boom').or(page.locator('text=Skytron'))).toBeVisible();

  // 15. Navigate back to Blog index
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // 16. Navigate back to Service Areas to verify RGV in listing
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // 17. Scroll to verify RGV card visible in listing
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  await expect(page.locator('text=Rio Grande Valley, TX')).toBeVisible();
  await expect(page.locator('text=Rio Grande Valley').first()).toBeVisible();
});
