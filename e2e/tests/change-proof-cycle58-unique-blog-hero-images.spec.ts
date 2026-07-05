import { test, expect } from '@playwright/test';
import { visualAssert } from './visual-assert';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321';

async function smoothScroll(page: any, selector: string, delayMs = 500) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(delayMs);
}

test('change-proof-cycle58-unique-blog-hero-images', async ({ page }, testInfo) => {
  // Step 1: Blog index shows articles with distinct hero images
  await page.goto(`${BASE_URL}/blog`);
  await page.waitForLoadState('networkidle');
  await visualAssert(page, testInfo, '01-blog-index');

  // Step 2: Endoscopy article has its own unique hero image
  await page.goto(`${BASE_URL}/blog/endoscopy-gi-suite-equipment-guide-texas-hospitals`);
  await page.waitForLoadState('networkidle');

  // Verify the correct image is referenced (not or-installation-hero)
  const endoscopyImg = page.locator('img[src*="endoscopy-gi-suite-hero"]');
  await endoscopyImg.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  const endoscopyImgSrc = await page.locator('img').first().getAttribute('src');
  expect(endoscopyImgSrc).not.toContain('or-installation-hero');
  await visualAssert(page, testInfo, '02-endoscopy-hero');

  // Step 3: Scroll to verify article content loads
  await smoothScroll(page, '.blog-body h2', 500);
  await page.waitForTimeout(800);
  await visualAssert(page, testInfo, '03-endoscopy-content');

  // Step 4: Neurosurgery article has its own unique hero image
  await page.goto(`${BASE_URL}/blog/neurosurgery-or-equipment-guide-texas-hospitals`);
  await page.waitForLoadState('networkidle');

  const neuroImg = page.locator('img[src*="neurosurgery-or-suite-hero"]');
  await neuroImg.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  const neuroImgSrc = await page.locator('img').first().getAttribute('src');
  expect(neuroImgSrc).not.toContain('or-installation-hero');
  await visualAssert(page, testInfo, '04-neurosurgery-hero');

  // Step 5: Scroll to neurosurgery article body
  await smoothScroll(page, '.blog-body h2', 500);
  await page.waitForTimeout(800);
  await visualAssert(page, testInfo, '05-neurosurgery-content');

  // Step 6: Oncology article has its own unique hero image
  await page.goto(`${BASE_URL}/blog/oncologic-surgery-or-equipment-guide-texas`);
  await page.waitForLoadState('networkidle');

  const oncoImg = page.locator('img[src*="oncology-or-suite-hero"]');
  await oncoImg.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  const oncoImgSrc = await page.locator('img').first().getAttribute('src');
  expect(oncoImgSrc).not.toContain('or-installation-hero');
  await visualAssert(page, testInfo, '06-oncology-hero');

  // Step 7: Scroll to oncology article body
  await smoothScroll(page, '.blog-body h2', 500);
  await page.waitForTimeout(800);
  await visualAssert(page, testInfo, '07-oncology-content');

  // Step 8: Surgical lighting article has its own unique hero image
  await page.goto(`${BASE_URL}/blog/surgical-lighting-guide-texas-hospitals`);
  await page.waitForLoadState('networkidle');

  const lightImg = page.locator('img[src*="surgical-lighting-hero"]');
  await lightImg.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  const lightImgSrc = await page.locator('img').first().getAttribute('src');
  expect(lightImgSrc).not.toContain('or-installation-hero');
  await visualAssert(page, testInfo, '08-surgical-lighting-hero');

  // Step 9: Blog index — verify multiple distinct card images shown
  await page.goto(`${BASE_URL}/blog`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // All 4 articles should have distinct blog-specific hero images
  const endoscopyCard = page.locator('img[src*="endoscopy-gi-suite-hero"]');
  const neuroCard = page.locator('img[src*="neurosurgery-or-suite-hero"]');
  const oncoCard = page.locator('img[src*="oncology-or-suite-hero"]');
  const lightCard = page.locator('img[src*="surgical-lighting-hero"]');

  await expect(endoscopyCard.first()).toBeVisible({ timeout: 10000 });
  await expect(neuroCard.first()).toBeVisible({ timeout: 10000 });
  await expect(oncoCard.first()).toBeVisible({ timeout: 10000 });
  await expect(lightCard.first()).toBeVisible({ timeout: 10000 });

  await visualAssert(page, testInfo, '09-blog-index-unique-images');

  // Step 10: Homepage integrity check
  await page.goto(`${BASE_URL}/`);
  await page.waitForLoadState('networkidle');
  const heroSection = page.locator('main section').first();
  await expect(heroSection).toBeVisible();
  await visualAssert(page, testInfo, '10-homepage-integrity');
});
