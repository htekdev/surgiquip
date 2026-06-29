import { test, expect } from '@playwright/test';

test('full-walk-through-dfw-tx-tjc-compliance', async ({ page }) => {
  // 1. Start at homepage
  await page.goto('/');
  await page.waitForTimeout(1200);

  // Verify homepage hero loads
  await expect(page.locator('h1').first()).toBeVisible();

  // 2. Navigate to Service Areas via nav
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // Verify Service Areas index with DFW card
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('text=Dallas-Fort Worth')).toBeVisible();

  // 3. Scroll through service areas index
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 4. Verify DFW city links are present
  await expect(page.locator('a[href="/service-areas/dallas-fort-worth-tx"]').first()).toBeVisible();

  // 5. Click into Dallas-Fort Worth TX page
  await page.click('a[href="/service-areas/dallas-fort-worth-tx"]');
  await page.waitForTimeout(1200);

  // 6. Verify DFW hero section
  await expect(page.locator('h1')).toContainText('Dallas');
  await expect(page.locator('text=Tarrant').or(page.locator('text=Dallas County'))).toBeVisible();

  // 7. Scroll through DFW page (full content review)
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 8. Verify key hospital/healthcare content on DFW page
  await expect(page.locator('text=Baylor').or(page.locator('text=UT Southwestern').or(page.locator('text=North Texas')))).toBeVisible();

  // 9. Navigate to Blog via nav
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // Verify Joint Commission / TJC article appears
  await expect(page.locator('text=Joint Commission').or(page.locator('text=TJC').or(page.locator('text=compliance')))).toBeVisible();

  // 10. Scroll through blog index
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 11. Click into the TJC compliance blog post
  const tjcLink = page.locator('a[href*="joint-commission"]').first();
  await expect(tjcLink).toBeVisible();
  await tjcLink.click();
  await page.waitForTimeout(1200);

  // 12. Verify blog article hero
  await expect(page.locator('h1').first()).toBeVisible();

  // 13. Scroll through the full blog article
  for (let i = 0; i < 14; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 14. Verify TJC compliance content
  await expect(page.locator('text=Joint Commission').or(page.locator('text=EC.02'))).toBeVisible();

  // 15. Navigate back to Blog index
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // 16. Navigate back to Service Areas to verify DFW in listing
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // 17. Scroll to verify DFW card visible
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  await expect(page.locator('text=Dallas-Fort Worth, TX')).toBeVisible();
  await expect(page.locator('text=North Texas')).toBeVisible();
});
