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

  // 3. Scroll through service areas index (partial — just to show the page)
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 4. Find and scroll to DFW city link
  const dfwCardLink = page.locator('a[href="/service-areas/dallas-fort-worth-tx"]').first();
  await dfwCardLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(dfwCardLink).toBeVisible();

  // 5. Click into Dallas-Fort Worth TX page
  await dfwCardLink.click();
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

  // 10. Scroll through blog index
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 11. Find and click into the TJC compliance blog post
  const tjcLink = page.locator('a[href*="joint-commission"]').first();
  await tjcLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
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

  // 17. Find and scroll to DFW card to verify listing
  const dfwFinalCard = page.locator('a[href="/service-areas/dallas-fort-worth-tx"]').first();
  await dfwFinalCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(dfwFinalCard).toBeVisible();
  await expect(page.locator('text=North Texas')).toBeVisible();
});
