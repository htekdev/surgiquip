import { test, expect } from '@playwright/test';

test('full-walk-through-el-paso-tx-or-renovation', async ({ page }) => {
  // 1. Start at homepage
  await page.goto('/');
  await page.waitForTimeout(1200);

  // Verify homepage hero loads
  await expect(page.locator('h1').first()).toBeVisible();

  // 2. Navigate to Service Areas via nav
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // Verify Service Areas index loads with El Paso card
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('text=El Paso, TX')).toBeVisible();

  // 3. Scroll through service areas index (partial)
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 4. Find and scroll to El Paso city link
  const elPasoCardLink = page.locator('a[href="/service-areas/el-paso-tx"]').first();
  await elPasoCardLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(elPasoCardLink).toBeVisible();

  // 5. Click into El Paso TX page
  await elPasoCardLink.click();
  await page.waitForTimeout(1200);

  // 6. Verify El Paso hero section
  await expect(page.locator('h1')).toContainText('El Paso');
  await expect(page.locator('text=Borderland').or(page.locator('text=Far West Texas'))).toBeVisible();

  // 7. Scroll through El Paso TX page (full content review)
  for (let i = 0; i < 12; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 8. Verify hospital systems content
  await expect(page.locator('text=Providence').or(page.locator('text=UMC').or(page.locator('text=Del Sol')))).toBeVisible();

  // 9. Verify services grid is visible
  await expect(page.locator('text=Equipment Sales').or(page.locator('text=OR Installation'))).toBeVisible();

  // 10. Continue scrolling through El Paso page
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 11. Verify "Why Surgiquip" section
  await expect(page.locator('text=Authorized Skytron Dealer').or(page.locator('text=43 Years'))).toBeVisible();

  // 12. Navigate to Blog via nav
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // 13. Scroll through blog index
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 14. Find and click into the OR Suite Renovation Planning Guide
  const renovationLink = page.locator('a[href*="renovation"]').first();
  await renovationLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(renovationLink).toBeVisible();
  await renovationLink.click();
  await page.waitForTimeout(1200);

  // 15. Verify blog article hero
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.locator('h1')).toContainText('Renovation');

  // 16. Scroll through the full blog article
  for (let i = 0; i < 16; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
  }

  // 17. Verify key renovation content sections
  await expect(page.locator('text=Phase').first()).toBeVisible();

  // 18. Navigate back to Blog index
  await page.click('a[href="/blog"]');
  await page.waitForTimeout(1000);

  // 19. Navigate back to Service Areas to verify El Paso in listing
  await page.click('a[href="/service-areas"]');
  await page.waitForTimeout(1000);

  // 20. Find and scroll to El Paso card to verify listing
  const elPasoFinalCard = page.locator('a[href="/service-areas/el-paso-tx"]').first();
  await elPasoFinalCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(elPasoFinalCard).toBeVisible();
  await expect(page.locator('text=Far West Texas')).toBeVisible();
});
